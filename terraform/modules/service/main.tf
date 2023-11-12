# ECS タスク定義
resource "aws_ecs_task_definition" "this" {
  container_definitions = jsonencode([
    {
      name      = var.task.name
      image     = "${var.task.image.uri}:${var.task.image.tag}"
      cpu       = 0
      essential = true

      portMappings = [
        {
          appProtocol   = var.task.protocol
          containerPort = var.task.port
          hostPort      = var.task.port
          name          = "${var.task.name}-${var.task.port}-${var.task.protocol}"
          protocol      = "tcp"
        }
      ]

      environment      = []
      environmentFiles = []

      mountPoints = []
      ulimits     = []
      volumesFrom = []

      logConfiguration = {
        logDriver     = "awslogs"
        secretOptions = []

        options = {
          "awslogs-create-group"  = "true"
          "awslogs-group"         = "/ecs/tunetrail-${var.task.name}-task"
          "awslogs-region"        = var.aws_region
          "awslogs-stream-prefix" = "ecs"
        }
      }
    }
  ])

  family                   = "tunetrail-${var.env}-${var.service_name}-task"
  requires_compatibilities = ["FARGATE"]
  cpu                      = "256"
  memory                   = "512"
  network_mode             = "awsvpc"
  task_role_arn            = aws_iam_role.main.arn
  execution_role_arn       = var.task_execution_role_arn

  runtime_platform {
    cpu_architecture        = "X86_64"
    operating_system_family = "LINUX"
  }

  tags = {
    Name = "tunetrail-${var.env}-task-definition-${var.service_name}"
  }
}

# ECS タスクロール
resource "aws_iam_role" "main" {
  name        = "tunetrail${title(var.env)}EcsTaskRole${title(var.service_name)}"
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
    Name = "tunetrail-${var.env}-ecs-task-role-${var.service_name}"
  }
}
