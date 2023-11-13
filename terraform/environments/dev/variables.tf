variable "env" {
  type = string
}

variable "aws_region" {
  type    = string
  default = "ap-northeast-1"
}

variable "acm_certificate_arn" {
  type = string
}

variable "web_image_tag" {
  type = string
}
