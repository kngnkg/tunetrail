variable "cloudflare" {
  type = object({
    token      = string
    zone_id    = string
    account_id = string
  })
}

variable "aws_region" {
  type    = string
  default = "ap-northeast-1"
}

variable "dev_alb" {
  type = object({
    dns_name = string
    zone_id  = string
  })
}
