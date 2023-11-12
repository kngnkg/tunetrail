variable "env" {
  type = string
}

variable "aws_region" {
  type = string
}

variable "service_name" {
  type = string
}

variable "cluster_id" {
  type = string
}

variable "subnet_ids" {
  type = list(string)
}

variable "task" {
  type = object({
    name     = string
    protocol = string
    port     = number

    image = object({
      uri = string
      tag = string
    })
  })
}

variable "task_execution_role_arn" {
  type = string
}
