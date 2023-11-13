terraform {
  required_version = "= 1.5.7"

  required_providers {
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 4.0"
    }

    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  backend "s3" {
    bucket  = "foderee-route53-tf-state" # TODO: 名前を変更する
    region  = "ap-northeast-1"
    key     = "terraform.tfstate"
    encrypt = true
  }
}

provider "cloudflare" {
  api_token = var.cloudflare.token
}

provider "aws" {
  region = var.aws_region

  default_tags {
    tags = {
      service   = "foderee"
      terraform = "true"
    }
  }
}

locals {
  service = "foderee"
  domain  = "foderee.com"
}

resource "cloudflare_zone" "main" {
  zone       = local.domain
  account_id = var.cloudflare.account_id
}

resource "aws_acm_certificate" "dev" {
  domain_name       = "dev.${local.domain}"
  validation_method = "DNS"

  tags = {
    "Name" = "${local.service}-cert"
  }
}

# ACM にドメインの所有権を証明するためのドメイン検証レコード
resource "cloudflare_record" "dev_cert_validation" {
  for_each = { for dvo in aws_acm_certificate.dev.domain_validation_options : dvo.domain_name => dvo }

  zone_id         = cloudflare_zone.main.id
  name            = each.value.resource_record_name
  value           = each.value.resource_record_value
  type            = each.value.resource_record_type
  ttl             = 300
  allow_overwrite = true
}

# ACM証明書のドメイン検証
# 検証が完了するまで待機する
resource "aws_acm_certificate_validation" "dev" {
  certificate_arn = aws_acm_certificate.dev.arn
  # ドメイン検証レコードをすべて指定する
  validation_record_fqdns = [for record in cloudflare_record.dev_cert_validation : record.name]
}

# 検証環境の ALB の DNS 名を CNAME レコードに設定する
resource "cloudflare_record" "cname_dev" {
  zone_id = cloudflare_zone.main.id
  name    = "dev.${local.domain}"
  value   = var.dev_alb.dns_name
  type    = "CNAME"
  ttl     = 300
}
