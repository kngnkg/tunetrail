variable "env" {
  type = string
}

variable "create" {
  type = bool
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

variable "grpc_image_tag" {
  type = string
}

variable "rds" {
  type = object({
    port     = number
    password = string
    username = string
  })
}

variable "google" {
  type = object({
    client_id     = string
    client_secret = string
  })
}
