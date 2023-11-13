locals {
  service = "foderee"
}

# ECS サービスに適用するセキュリティグループ
resource "aws_security_group" "main" {
  name        = "${local.service}-${var.env}-${var.service_name}-sg"
  description = "Security Group for ${var.service_name}"
  vpc_id      = var.vpc_id

  ingress {
    description = "For VPC Endpoint"
    cidr_blocks = [
      var.env == "prod" ? "10.0.0.0/16" : "10.1.0.0/16",
    ]
    from_port = 443
    to_port   = 443
    protocol  = "tcp"
  }

  dynamic "ingress" {
    for_each = var.tasks
    content {
      description = "Inbound traffic to access ${ingress.value.name}"
      cidr_blocks = [
        var.env == "prod" ? "10.0.0.0/16" : "10.1.0.0/16",
      ]
      from_port = ingress.value.port
      to_port   = ingress.value.port
      protocol  = "tcp"
    }
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    "Name" = "${local.service}-${var.env}-${var.service_name}-sg"
  }
}

# ECS タスク定義
resource "aws_ecs_task_definition" "this" {
  container_definitions = jsonencode([for task in var.tasks :
    {
      name      = task.name
      image     = "${task.image.uri}:${task.image.tag}"
      cpu       = 0
      essential = true

      portMappings = [
        {
          appProtocol   = task.protocol
          containerPort = task.port
          hostPort      = task.port
          name          = "${task.name}-${task.port}-${task.protocol}"
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
          "awslogs-group"         = "/ecs/${local.service}-${task.name}-task"
          "awslogs-region"        = var.region
          "awslogs-stream-prefix" = "ecs"
        }
      }
    }
  ])

  family                   = "${local.service}-${var.env}-${var.service_name}-task"
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
    Name = "${local.service}-${var.env}-task-definition-${var.service_name}"
  }
}

# ECS タスクロール
resource "aws_iam_role" "main" {
  name        = "${local.service}${title(var.env)}EcsTaskRole${title(var.service_name)}"
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
    Name = "${local.service}-${var.env}-ecs-task-role-${var.service_name}"
  }
}