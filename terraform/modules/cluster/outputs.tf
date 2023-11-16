output "id" {
  value = aws_ecs_cluster.this.id
}

output "task_execution_role_arn" {
  value = aws_iam_role.task_executer.arn
}

output "cloudmap_namespace_arn" {
  value = aws_service_discovery_http_namespace.main.arn
}
