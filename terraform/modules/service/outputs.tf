output "tasks" {
  value = [for task in var.tasks :
    {
      name     = task.name
      protocol = task.protocol
      port     = task.port
    }
  ]
}

output "security_group_id" {
  value = aws_security_group.main.id
}
