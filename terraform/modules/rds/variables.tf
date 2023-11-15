variable "env" {
  description = "The environment for the infrastructure"
  type        = string
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

variable "username" {
  description = "The username for the database"
  type        = string
}

variable "password" {
  type = string
}
