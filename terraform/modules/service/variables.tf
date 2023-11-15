variable "env" {
  type = string
}

variable "region" {
  type = string
}

variable "service_name" {
  type = string
}

variable "vpc" {
  type = object({
    id         = string
    cidr_block = string
  })
}

variable "subnet_ids" {
  type = list(string)
}

variable "cluster_id" {
  type = string
}

variable "desired_count" {
  type = number
}

variable "tasks" {
  type = list(object({
    name     = string
    protocol = string
    port     = number

    image = object({
      uri = string
      tag = string
    })
  }))
}

variable "target_group_arn" {
  type = string
}

variable "task_execution_role_arn" {
  type = string
}
