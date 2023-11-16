locals {
  service = "foderee"
}

resource "aws_ecs_cluster" "this" {
  name = "${local.service}-${var.env}-cluster"

  service_connect_defaults {
    namespace = aws_service_discovery_http_namespace.main.arn
  }

  configuration {
    execute_command_configuration {
      logging = "DEFAULT"
    }
  }

  tags = {
    Name = "${local.service}-${var.env}-cluster"
  }
}

# Service Connect で使用する CloudMap の名前空間
resource "aws_service_discovery_http_namespace" "main" {
  name = "${local.service}-${var.env}-internal"

  tags = {
    Name = "${local.service}-${var.env}-namespace-internal"
  }
}

# ECS タスク実行ロール
resource "aws_iam_role" "task_executer" {
  name        = "${local.service}${title(var.env)}EcsTaskExecutionRole"
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
    "Name" = "${local.service}-${var.env}-ecs-task-execution-role"
  }
}

# ECS タスク実行ロールにアタッチするポリシー
resource "aws_iam_role_policy_attachment" "allow_ecs_task_execution_role" {
  role       = aws_iam_role.task_executer.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

# ECRからイメージをpullする際に必要
resource "aws_iam_role_policy_attachment" "s3_read_only" {
  role       = aws_iam_role.task_executer.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonS3ReadOnlyAccess"
}

# AmazonECSTaskExecutionRolePolicy はロググループの作成権限がないため
# TODO: logs:CreateLogGroup のみ許可するポリシーを作成する
resource "aws_iam_role_policy_attachment" "cloudwatch_logs_full_access" {
  role       = aws_iam_role.task_executer.name
  policy_arn = "arn:aws:iam::aws:policy/CloudWatchLogsFullAccess"
}
