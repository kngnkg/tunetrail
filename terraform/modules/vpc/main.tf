locals {
  service = "foderee"
  # natgw_count        = var.create ? 2 : 0
  count              = var.create ? 1 : 0
  vpc_endpoint_count = var.create ? 1 : 0
}

# ネットワーク ACL はデフォルトのものを使用するため、Terraform での設定は不要

resource "aws_vpc" "main" {
  cidr_block           = var.env == "prod" ? "10.0.0.0/16" : "10.1.0.0/16"
  enable_dns_support   = true # プライベートDNSの有効化
  enable_dns_hostnames = true # ホスト名の自動設定

  tags = {
    Name = "${local.service}-${var.env}-vpc"
  }
}

resource "aws_subnet" "public1" {
  vpc_id            = aws_vpc.main.id
  availability_zone = "ap-northeast-1a"
  cidr_block        = var.env == "prod" ? "10.0.10.0/24" : "10.1.10.0/24"

  tags = {
    Name = "${local.service}-${var.env}-public1"
  }
}

resource "aws_subnet" "public2" {
  vpc_id            = aws_vpc.main.id
  availability_zone = "ap-northeast-1c"
  cidr_block        = var.env == "prod" ? "10.0.11.0/24" : "10.1.11.0/24"

  tags = {
    Name = "${local.service}-${var.env}-public2"
  }
}

resource "aws_subnet" "private1" {
  vpc_id            = aws_vpc.main.id
  availability_zone = "ap-northeast-1a"
  cidr_block        = var.env == "prod" ? "10.0.20.0/24" : "10.1.20.0/24"

  tags = {
    Name = "${local.service}-${var.env}-private1"
  }
}

resource "aws_subnet" "private2" {
  vpc_id            = aws_vpc.main.id
  availability_zone = "ap-northeast-1c"
  cidr_block        = var.env == "prod" ? "10.0.21.0/24" : "10.1.21.0/24"

  tags = {
    Name = "${local.service}-${var.env}-private2"
  }
}

# Internet Gateway
resource "aws_internet_gateway" "main" {
  vpc_id = aws_vpc.main.id

  tags = {
    Name = "${local.service}-${var.env}-igw"
  }
}

# NAT Gateway
# 2つのパブリックサブネットにそれぞれNAT Gatewayを作成する
resource "aws_nat_gateway" "public1" {
  count         = local.count
  subnet_id     = aws_subnet.public1.id
  allocation_id = aws_eip.natgw_public1[0].id

  tags = {
    Name = "${local.service}-${var.env}-natgw-public1"
  }
}

resource "aws_nat_gateway" "public2" {
  count         = local.count
  subnet_id     = aws_subnet.public2.id
  allocation_id = aws_eip.natgw_public2[0].id

  tags = {
    Name = "${local.service}-${var.env}-natgw-public2"
  }
}

# NAT Gateway 用の Elastic IP
resource "aws_eip" "natgw_public1" {
  count = local.count
  # depends_on = [aws_internet_gateway.public1]

  tags = {
    Name = "${local.service}-${var.env}-natgw-eip-public1"
  }
}

resource "aws_eip" "natgw_public2" {
  count = local.count
  # depends_on = [aws_internet_gateway.public2]

  tags = {
    Name = "${local.service}-${var.env}-natgw-eip-public2"
  }
}

# パブリックサブネットのルートテーブル
resource "aws_route_table" "main" {
  vpc_id = aws_vpc.main.id

  # IGW へのルートを追加
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.main.id
  }

  tags = {
    Name = "${local.service}-${var.env}-rtb-public"
  }
}

# ルートテーブルをパブリックサブネットに紐づける

resource "aws_route_table_association" "public1" {
  subnet_id      = aws_subnet.public1.id
  route_table_id = aws_route_table.main.id
}

resource "aws_route_table_association" "public2" {
  subnet_id      = aws_subnet.public2.id
  route_table_id = aws_route_table.main.id
}

# プライベートサブネットのルートテーブル
resource "aws_route_table" "private1" {
  vpc_id = aws_vpc.main.id

  tags = {
    Name = "${local.service}-${var.env}-rtb-private1"
  }
}

resource "aws_route_table" "private2" {
  vpc_id = aws_vpc.main.id

  tags = {
    Name = "${local.service}-${var.env}-rtb-private2"
  }
}

# プライベートサブネットから NAT Gateway へのルートを追加
resource "aws_route" "nat_route_private1" {
  count                  = local.count
  route_table_id         = aws_route_table.private1.id
  destination_cidr_block = "0.0.0.0/0"
  nat_gateway_id         = aws_nat_gateway.public1[0].id
}

resource "aws_route" "nat_route_private2" {
  count                  = local.count
  route_table_id         = aws_route_table.private2.id
  destination_cidr_block = "0.0.0.0/0"
  nat_gateway_id         = aws_nat_gateway.public2[0].id
}

resource "aws_route_table_association" "private1" {
  subnet_id      = aws_subnet.private1.id
  route_table_id = aws_route_table.private1.id
}

resource "aws_route_table_association" "private2" {
  subnet_id      = aws_subnet.private2.id
  route_table_id = aws_route_table.private2.id
}

# VPC Endpoint に適用するセキュリティグループ
resource "aws_security_group" "vpc_endpoint" {
  name        = "${local.service}-${var.env}-vpcep-sg"
  description = "Security Group for VPC Endpoint"
  vpc_id      = aws_vpc.main.id

  ingress {
    description = "For VPC Endpoint"
    cidr_blocks = [aws_vpc.main.cidr_block]
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    "Name" = "${local.service}-${var.env}-vpcep-sg"
  }
}

# ECRのAPIを呼び出すためのVPCエンドポイント
# イメージのメタデータを取得したり、イメージの認証トークンを取得するために使用される。
resource "aws_vpc_endpoint" "ecr_api" {
  count               = local.vpc_endpoint_count
  vpc_id              = aws_vpc.main.id
  service_name        = "com.amazonaws.ap-northeast-1.ecr.api"
  vpc_endpoint_type   = "Interface"
  subnet_ids          = [resource.aws_subnet.private1.id, resource.aws_subnet.private2.id]
  security_group_ids  = [resource.aws_security_group.vpc_endpoint.id]
  private_dns_enabled = true
}

# Dockerイメージのプッシュ/プルを行うためのVPCエンドポイント
resource "aws_vpc_endpoint" "ecr_dkr" {
  count               = local.vpc_endpoint_count
  vpc_id              = aws_vpc.main.id
  service_name        = "com.amazonaws.ap-northeast-1.ecr.dkr"
  vpc_endpoint_type   = "Interface"
  subnet_ids          = [resource.aws_subnet.private1.id, resource.aws_subnet.private2.id]
  security_group_ids  = [resource.aws_security_group.vpc_endpoint.id]
  private_dns_enabled = true
}

# S3用のVPCエンドポイント
# ECRのイメージをプッシュ/プルする際に、S3のバケットを使用するために必要。
resource "aws_vpc_endpoint" "s3" {
  count             = local.vpc_endpoint_count
  vpc_id            = aws_vpc.main.id
  service_name      = "com.amazonaws.ap-northeast-1.s3"
  vpc_endpoint_type = "Gateway"
  route_table_ids   = [aws_route_table.private1.id, aws_route_table.private2.id]
}

# CloudWatch Logs用のVPCエンドポイント
resource "aws_vpc_endpoint" "cloudwatch_logs" {
  count               = local.vpc_endpoint_count
  vpc_id              = aws_vpc.main.id
  service_name        = "com.amazonaws.ap-northeast-1.logs"
  vpc_endpoint_type   = "Interface"
  subnet_ids          = [resource.aws_subnet.private1.id, resource.aws_subnet.private2.id]
  security_group_ids  = [resource.aws_security_group.vpc_endpoint.id]
  private_dns_enabled = true
}
