locals {
  service = "foderee"
}

resource "aws_route53_zone" "this" {
  name    = var.domain
  comment = "Route53 zone for ${local.service}-${var.env}"

  tags = {
    "Name" = "${local.service}-${var.env}-hz"
  }
}

resource "aws_acm_certificate" "main" {
  domain_name               = var.domain
  subject_alternative_names = ["*.${var.domain}"]
  validation_method         = "DNS"

  tags = {
    "Name" = "${local.service}-${var.env}-cert"
  }
}

# CNAME レコード
resource "aws_route53_record" "cname_main" {
  # 各ドメイン名をキーとし、対応するレコード情報を値とするマップを作成
  for_each = {
    for dvo in aws_acm_certificate.main.domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      record = dvo.resource_record_value
      type   = dvo.resource_record_type
    }
  }

  allow_overwrite = true
  name            = each.value.name
  records         = [each.value.record]
  ttl             = 300
  type            = each.value.type
  zone_id         = aws_route53_zone.this.zone_id
}

# A レコード
resource "aws_route53_record" "alias_root" {
  zone_id = aws_route53_zone.this.zone_id
  name    = var.domain
  type    = "A"

  alias {
    name                   = var.alb.dns_name
    zone_id                = var.alb.zone_id
    evaluate_target_health = true
  }
}
