variable "env" {
  type = string
}

variable "region" {
  type = string
}

variable "service_name" {
  type = string
}

variable "is_server_service" {
  type = bool
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

variable "cloudmap_namespace_arn" {
  type = string
}

variable "env_bucket_arn" {
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
  type    = string
  default = ""
}

variable "task_execution_role_arn" {
  type = string
}
