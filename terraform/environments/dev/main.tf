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

module "cluster" {
  source = "../../modules/cluster"
  env    = var.env
}
