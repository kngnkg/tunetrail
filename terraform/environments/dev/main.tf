terraform {
  required_version = "= 1.5.7"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  backend "s3" {
    bucket  = "foderee-dev-tf-state"
    region  = "ap-northeast-1"
    key     = "terraform.tfstate"
    encrypt = true
  }
}

provider "aws" {
  region = var.aws_region

  default_tags {
    tags = {
      service   = "foderee"
      env       = var.env
      terraform = "true"
    }
  }
}

locals {
  service            = "foderee"
  vpc_endpoint_count = var.create ? 1 : 0

  web = {
    name              = "web"
    port              = 3000
    health_check_path = "/"
    desired_count     = var.create ? 2 : 0
  }

  grpc = {
    name          = "grpc"
    port          = 50051
    desired_count = var.create ? 2 : 0
  }

}

# TODO: SMS の I AM ロールを作成する
# TODO: サービス名を変更する
module "cognito" {
  source      = "../../modules/cognito"
  env         = var.env
  client_name = "TuneTrail Dev"
}

module "vpc" {
  source = "../../modules/vpc"
  env    = var.env
}

module "alb" {
  source              = "../../modules/alb"
  env                 = var.env
  region              = var.aws_region
  vpc_id              = module.vpc.vpc.id
  acm_certificate_arn = var.acm_certificate_arn
  public_subnet_ids   = [module.vpc.subnet.public1.id, module.vpc.subnet.public2.id]

  web = {
    port              = local.web.port
    health_check_path = local.web.health_check_path
  }
}

module "ecs_cluster" {
  source = "../../modules/cluster"
  env    = var.env
}

# タスクに渡す環境変数ファイルを保存する S3 バケット
resource "aws_s3_bucket" "env" {
  bucket = "${local.service}-${var.env}-env"
}

resource "aws_s3_bucket_ownership_controls" "env" {
  bucket = aws_s3_bucket.env.id

  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

resource "aws_s3_bucket_acl" "env" {
  depends_on = [aws_s3_bucket_ownership_controls.env]
  bucket     = aws_s3_bucket.env.id
  acl        = "private"
}

module "ecs_service_web" {
  source                  = "../../modules/service"
  env                     = var.env
  region                  = var.aws_region
  vpc                     = module.vpc.vpc
  service_name            = local.web.name
  cluster_id              = module.ecs_cluster.id
  env_bucket_arn          = aws_s3_bucket.env.arn
  target_group_arn        = module.alb.target_group_arn
  task_execution_role_arn = module.ecs_cluster.task_execution_role_arn
  desired_count           = local.web.desired_count

  subnet_ids = [module.vpc.subnet.private1.id, module.vpc.subnet.private2.id]

  tasks = [
    {
      name     = local.web.name
      protocol = "http"
      port     = local.web.port

      image = {
        uri = module.ecr_web.repository_url
        tag = var.web_image_tag
      }
    }
  ]
}

module "ecr_web" {
  source        = "../../modules/ecr"
  env           = var.env
  artifact_name = local.web.name
}

module "ecr_grpc" {
  source        = "../../modules/ecr"
  env           = var.env
  artifact_name = local.grpc.name
}

# VPC Endpoint に適用するセキュリティグループ
resource "aws_security_group" "vpc_endpoint" {
  name        = "${local.service}-${var.env}-vpcep-sg"
  description = "Security Group for VPC Endpoint"
  vpc_id      = module.vpc.vpc.id

  ingress {
    description = "For VPC Endpoint"
    cidr_blocks = [module.vpc.vpc.cidr_block]
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
  vpc_id              = module.vpc.vpc.id
  service_name        = "com.amazonaws.ap-northeast-1.ecr.api"
  vpc_endpoint_type   = "Interface"
  subnet_ids          = [module.vpc.subnet.private1.id, module.vpc.subnet.private2.id]
  security_group_ids  = [resource.aws_security_group.vpc_endpoint.id]
  private_dns_enabled = true
}

# Dockerイメージのプッシュ/プルを行うためのVPCエンドポイント
resource "aws_vpc_endpoint" "ecr_dkr" {
  count               = local.vpc_endpoint_count
  vpc_id              = module.vpc.vpc.id
  service_name        = "com.amazonaws.ap-northeast-1.ecr.dkr"
  vpc_endpoint_type   = "Interface"
  subnet_ids          = [module.vpc.subnet.private1.id, module.vpc.subnet.private2.id]
  security_group_ids  = [resource.aws_security_group.vpc_endpoint.id]
  private_dns_enabled = true
}

# S3用のVPCエンドポイント
# ECRのイメージをプッシュ/プルする際に、S3のバケットを使用するために必要。
resource "aws_vpc_endpoint" "s3" {
  count             = local.vpc_endpoint_count
  vpc_id            = module.vpc.vpc.id
  service_name      = "com.amazonaws.ap-northeast-1.s3"
  vpc_endpoint_type = "Gateway"
  route_table_ids   = [module.vpc.route_table.private_id]
}

# CloudWatch Logs用のVPCエンドポイント
resource "aws_vpc_endpoint" "cloudwatch_logs" {
  count               = local.vpc_endpoint_count
  vpc_id              = module.vpc.vpc.id
  service_name        = "com.amazonaws.ap-northeast-1.logs"
  vpc_endpoint_type   = "Interface"
  subnet_ids          = [module.vpc.subnet.private1.id, module.vpc.subnet.private2.id]
  security_group_ids  = [resource.aws_security_group.vpc_endpoint.id]
  private_dns_enabled = true
}

# RDS
module "rds" {
  source   = "../../modules/rds"
  env      = var.env
  vpc_id   = module.vpc.vpc.id
  username = var.rds.username
  password = var.rds.password

  private_subnets = [
    module.vpc.subnet.private1,
    module.vpc.subnet.private2,
  ]
}
