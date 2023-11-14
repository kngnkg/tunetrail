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
  domain = "tune-trail.com"

  vpc_endpoint_count = 1

  web = {
    name              = "web"
    port              = 3000
    health_check_path = "/"
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
  vpc_id              = module.vpc.vpc_id
  acm_certificate_arn = var.acm_certificate_arn
  public_subnet_ids = [
    module.vpc.subnet.public1_id,
    module.vpc.subnet.public2_id,
  ]

  web = {
    port              = local.web.port
    health_check_path = local.web.health_check_path
  }
}

module "ecs_cluster" {
  source = "../../modules/cluster"
  env    = var.env
}

module "ecr_web" {
  source        = "../../modules/ecr"
  env           = var.env
  artifact_name = local.web.name
}

## TODO: VPC Endpoint のセキュリティグループを作成する
## TODO: importする

# ECRのAPIを呼び出すためのVPCエンドポイント
# イメージのメタデータを取得したり、イメージの認証トークンを取得するために使用される。
resource "aws_vpc_endpoint" "ecr_api" {
  count               = local.vpc_endpoint_count
  vpc_id              = module.vpc.vpc_id
  service_name        = "com.amazonaws.ap-northeast-1.ecr.api"
  vpc_endpoint_type   = "Interface"
  subnet_ids          = [module.vpc.subnet.private1_id, module.vpc.subnet.private2_id]
  security_group_ids  = [module.ecs_service_web.security_group_id]
  private_dns_enabled = true
}

# Dockerイメージのプッシュ/プルを行うためのVPCエンドポイント
resource "aws_vpc_endpoint" "ecr_dkr" {
  count               = local.vpc_endpoint_count
  vpc_id              = module.vpc.vpc_id
  service_name        = "com.amazonaws.ap-northeast-1.ecr.dkr"
  vpc_endpoint_type   = "Interface"
  subnet_ids          = [module.vpc.subnet.private1_id, module.vpc.subnet.private2_id]
  security_group_ids  = [module.ecs_service_web.security_group_id]
  private_dns_enabled = true
}

# S3用のVPCエンドポイント
# ECRのイメージをプッシュ/プルする際に、S3のバケットを使用するために必要。
resource "aws_vpc_endpoint" "s3" {
  count             = local.vpc_endpoint_count
  vpc_id            = module.vpc.vpc_id
  service_name      = "com.amazonaws.ap-northeast-1.s3"
  vpc_endpoint_type = "Gateway"
  route_table_ids   = [module.vpc.route_table.private_id]
}

# CloudWatch Logs用のVPCエンドポイント
resource "aws_vpc_endpoint" "cloudwatch_logs" {
  count               = local.vpc_endpoint_count
  vpc_id              = module.vpc.vpc_id
  service_name        = "com.amazonaws.ap-northeast-1.logs"
  vpc_endpoint_type   = "Interface"
  subnet_ids          = [module.vpc.subnet.private1_id, module.vpc.subnet.private2_id]
  security_group_ids  = [module.ecs_service_web.security_group_id]
  private_dns_enabled = true
}

module "ecs_service_web" {
  source                  = "../../modules/service"
  env                     = var.env
  region                  = var.aws_region
  vpc_id                  = module.vpc.vpc_id
  service_name            = local.web.name
  cluster_id              = module.ecs_cluster.id
  target_group_arn        = module.alb.target_group_arn
  task_execution_role_arn = module.ecs_cluster.task_execution_role_arn

  subnet_ids = [
    module.vpc.subnet.private1_id,
    module.vpc.subnet.private2_id,
  ]

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
