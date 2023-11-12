resource "aws_ecs_cluster" "this" {
  name = "tunetrail-${var.env}-cluster"

  configuration {
    execute_command_configuration {
      logging = "DEFAULT"
    }
  }

  tags = {
    Name = "tunetrail-${var.env}-cluster"
  }
}

# ECS タスク実行ロール
resource "aws_iam_role" "task_executer" {
  name        = "tunetrail${title(var.env)}EcsTaskExecutionRole"
  description = "Allows ECS tasks to call AWS services on your behalf."

  assume_role_policy = jsonencode(
    {
      Statement = [
        {
          Action = "sts:AssumeRole"
          Effect = "Allow"
          Principal = {
            Service = "ecs-tasks.amazonaws.com"
          }
          Sid = ""
        }
      ]
      Version = "2012-10-17"
    }
  )

  tags = {
    "Name" = "tunetrail-${var.env}-ecs-task-execution-role"
  }
}

# ECS タスク実行ロールにアタッチするポリシー
resource "aws_iam_role_policy_attachment" "allow_ecs_task_execution_role" {
  role       = aws_iam_role.task_executer.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}
