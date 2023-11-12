terraform {
  required_version = "= 1.5.7"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.0"
    }
  }

  backend "s3" {
    bucket  = "tunetrail-dev-tf-state"
    region  = "ap-northeast-1"
    key     = "terraform.tfstate"
    encrypt = true
  }
}

provider "aws" {
  region = var.aws_region

  default_tags {
    tags = {
      service   = "tunetrail"
      env       = var.env
      terraform = "true"
    }
  }
}

# TODO: SMS の I AM ロールを作成する
module "cognito" {
  source      = "../../modules/cognito"
  env         = var.env
  client_name = "TuneTrail Dev"
}

module "vpc" {
  source = "../../modules/vpc"
  env    = var.env
}

module "ecr_web" {
  source        = "../../modules/ecr"
  env           = var.env
  artifact_name = "web"
}

module "ecs_cluster" {
  source = "../../modules/cluster"
  env    = var.env
}

module "ecs_service_web" {
  source                  = "../../modules/service"
  env                     = var.env
  aws_region              = var.aws_region
  service_name            = "web"
  cluster_id              = module.ecs_cluster.id
  task_execution_role_arn = module.ecs_cluster.task_execution_role_arn

  subnet_ids = [
    module.vpc.subnet.private1_id,
    module.vpc.subnet.private2_id,
  ]

  task = {
    name     = "web"
    protocol = "http"
    port     = 3000

    image = {
      uri = module.ecr_web.repository_url
      tag = var.web_image_tag
    }
  }
}
