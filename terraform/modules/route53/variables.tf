variable "env" {
  type = string
}

variable "domain" {
  type = string
}

variable "alb" {
  type = object({
    dns_name = string
    zone_id  = string
  })
}
