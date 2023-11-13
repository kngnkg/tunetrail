terraform {
  required_version = "= 1.5.7"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.0"
    }
  }

  backend "s3" {
    bucket  = "foderee-dev-tf-state" # TODO: バケット名を変更する
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
  source = "../../modules/alb"
  env    = var.env
  region = var.aws_region
  vpc_id = module.vpc.vpc_id

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

module "ecs_service_web" {
  source                  = "../../modules/service"
  env                     = var.env
  region                  = var.aws_region
  vpc_id                  = module.vpc.vpc_id
  service_name            = local.web.name
  cluster_id              = module.ecs_cluster.id
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
