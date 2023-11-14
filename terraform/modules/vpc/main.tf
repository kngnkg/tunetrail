locals {
  service = "foderee"
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

resource "aws_internet_gateway" "main" {
  vpc_id = aws_vpc.main.id

  tags = {
    Name = "${local.service}-${var.env}-igw"
  }
}

resource "aws_route_table" "main" {
  vpc_id = aws_vpc.main.id

  # IGW へのルートを追加
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.main.id
  }

  tags = {
    Name = "${local.service}-${var.env}-route-table"
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

resource "aws_route_table" "private" {
  vpc_id = aws_vpc.main.id
}

resource "aws_route_table_association" "private1" {
  subnet_id      = aws_subnet.private1.id
  route_table_id = aws_route_table.private.id
}

resource "aws_route_table_association" "private2" {
  subnet_id      = aws_subnet.private2.id
  route_table_id = aws_route_table.private.id
}
