output "tasks" {
  value = [for task in var.tasks :
    {
      name     = task.name
      protocol = task.protocol
      port     = task.port
    }
  ]
}
