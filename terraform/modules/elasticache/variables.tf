variable "env" {
  description = "The environment for the infrastructure"
  type        = string
}

variable "replicate" {
  type = bool
}

variable "vpc_id" {
  description = "The ID of the VPC"
  type        = string
}

variable "private_subnets" {
  type = list(object({
    id         = string
    cidr_block = string
  }))
}
