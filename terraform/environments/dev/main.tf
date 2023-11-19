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
  service         = "foderee"
  replicate       = true
  create_jumphost = true

  web = {
    name              = "web"
    port              = 3000
    health_check_path = "/health"
    desired_count     = var.create ? 2 : 0
  }

  grpc = {
    name          = "grpc"
    port          = 50051
    desired_count = var.create ? 2 : 0
  }

  jumphost = {
    name          = "jumphost"
    image_tag     = "sample3"
    desired_count = var.create && local.create_jumphost ? 1 : 0
  }
}

# TODO: SMS の I AM ロールを作成する
# TODO: サービス名を変更する
module "cognito" {
  source      = "../../modules/cognito"
  env         = var.env
  client_name = "TuneTrail Dev"
  callback_urls = [
    "http://localhost:3000/api/auth/callback/cognito",
    "https://dev.foderee.com/api/auth/callback/cognito",
  ]
}

module "vpc" {
  source = "../../modules/vpc"
  env    = var.env
  create = var.create
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
  vpc_id = module.vpc.vpc.id
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
  is_server_service       = false
  cluster_id              = module.ecs_cluster.id
  cloudmap_namespace_arn  = module.ecs_cluster.cloudmap_namespace_arn
  env_file                = "${aws_s3_bucket.env.arn}/${local.web.name}/.env"
  target_group_arn        = module.alb.target_group_arn
  task_execution_role_arn = module.ecs_cluster.task_execution_role_arn
  desired_count           = local.web.desired_count

  subnet_ids = [module.vpc.subnet.private1.id, module.vpc.subnet.private2.id]

  tasks = [
    {
      name                = local.web.name
      protocol            = "http"
      port                = local.web.port
      healthcheck_enabled = true

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

module "ecs_service_grpc" {
  source                  = "../../modules/service"
  env                     = var.env
  region                  = var.aws_region
  vpc                     = module.vpc.vpc
  service_name            = local.grpc.name
  is_server_service       = true
  cluster_id              = module.ecs_cluster.id
  cloudmap_namespace_arn  = module.ecs_cluster.cloudmap_namespace_arn
  env_file                = "${aws_s3_bucket.env.arn}/${local.grpc.name}/.env"
  task_execution_role_arn = module.ecs_cluster.task_execution_role_arn
  desired_count           = local.grpc.desired_count

  subnet_ids = [module.vpc.subnet.private1.id, module.vpc.subnet.private2.id]

  tasks = [
    {
      name                = local.grpc.name
      protocol            = "grpc"
      port                = local.grpc.port
      healthcheck_enabled = true

      image = {
        uri = module.ecr_grpc.repository_url
        tag = var.grpc_image_tag
      }
    }
  ]
}

module "ecr_grpc" {
  source        = "../../modules/ecr"
  env           = var.env
  artifact_name = local.grpc.name
}

module "ecs_service_jumphost" {
  source                  = "../../modules/service"
  env                     = var.env
  region                  = var.aws_region
  vpc                     = module.vpc.vpc
  service_name            = local.jumphost.name
  is_server_service       = false
  cluster_id              = module.ecs_cluster.id
  cloudmap_namespace_arn  = module.ecs_cluster.cloudmap_namespace_arn
  env_file                = "${aws_s3_bucket.env.arn}/${local.grpc.name}/.env"
  task_execution_role_arn = module.ecs_cluster.task_execution_role_arn
  desired_count           = local.grpc.desired_count

  subnet_ids = [module.vpc.subnet.private1.id]

  tasks = [
    {
      name                = local.jumphost.name
      protocol            = "http"
      port                = 80
      healthcheck_enabled = false

      image = {
        uri = module.ecr_jumphost.repository_url
        tag = local.jumphost.image_tag
      }
    }
  ]
}

module "ecr_jumphost" {
  source        = "../../modules/ecr"
  env           = var.env
  artifact_name = local.jumphost.name
}

# ElastiCache for Redis
module "elasticache" {
  source    = "../../modules/elasticache"
  env       = var.env
  replicate = local.replicate
  vpc_id    = module.vpc.vpc.id

  private_subnets = [
    module.vpc.subnet.private1,
    module.vpc.subnet.private2,
  ]
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
