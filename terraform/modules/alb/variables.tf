variable "env" {
  type = string
}

variable "region" {
  type = string
}

variable "vpc_id" {
  type = string
}

variable "web" {
  type = object({
    port              = number
    health_check_path = string
  })
}
