locals {
  service             = "foderee"
  attach_target_group = var.target_group_arn != "" ? true : false
}

# ECS サービスに適用するセキュリティグループ
resource "aws_security_group" "main" {
  name        = "${local.service}-${var.env}-${var.service_name}-sg"
  description = "Security Group for ${var.service_name}"
  vpc_id      = var.vpc.id

  dynamic "ingress" {
    for_each = var.tasks
    content {
      description = "Inbound traffic to access ${ingress.value.name}"
      cidr_blocks = [var.vpc.cidr_block]
      from_port   = ingress.value.port
      to_port     = ingress.value.port
      protocol    = "tcp"
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
      name  = task.name
      image = "${task.image.uri}:${task.image.tag}"

      portMappings = [
        {
          # Service Connect のポート名
          name          = "${task.name}"
          protocol      = "tcp"
          containerPort = task.port
          # ServiceConnect プロキシ用のプロトコル
          appProtocol = task.protocol
        }
      ]

      environmentFiles = [
        {
          "value" = var.env_file
          "type"  = "s3"
        }
      ]
      environment = null

      mountPoints = []
      ulimits     = []
      volumesFrom = []

      healthCheck = task.healthcheck_enabled ? {
        command = [
          "CMD-SHELL",
          task.protocol == "http" ?
          "curl -f http://localhost:${task.port}/health || exit 1"
          : "/bin/grpc_health_probe -addr=localhost:${task.port} || exit 1"
        ]
        interval    = 60
        timeout     = 5
        retries     = 3
        startPeriod = 0
      } : null

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

resource "aws_ecs_service" "this" {
  name                              = "${local.service}-${var.env}-${var.service_name}-service"
  cluster                           = var.cluster_id
  task_definition                   = aws_ecs_task_definition.this.arn
  desired_count                     = var.desired_count
  launch_type                       = "FARGATE"
  health_check_grace_period_seconds = local.attach_target_group ? 180 : null
  enable_execute_command            = true

  network_configuration {
    subnets = var.subnet_ids

    security_groups = [
      aws_security_group.main.id,
    ]

    assign_public_ip = false
  }

  service_connect_configuration {
    enabled   = true
    namespace = var.cloudmap_namespace_arn

    dynamic "service" {
      # サービス側の場合のみ設定する
      for_each = var.is_server_service ? [1] : []

      content {
        # ポート名
        port_name = var.tasks[0].name

        client_alias {
          # クライアントからはこの名前でアクセスする
          dns_name = "${var.tasks[0].name}.${local.service}-${var.env}-internal"
          # Service Connect のプロキシがリッスンするポート
          port = var.tasks[0].port
        }
      }
    }

    # Service Connect で作成される Envoy コンテナのログ設定
    log_configuration {
      log_driver = "awslogs"
      options = {
        "awslogs-group"         = "/ecs/${local.service}-${var.env}-${var.service_name}-service-connect"
        "awslogs-region"        = var.region
        "awslogs-stream-prefix" = "ecs-proxy"
        "awslogs-create-group"  = "true"
      }
    }
  }

  # ターゲットグループをアタッチする
  dynamic "load_balancer" {
    # ターゲットグループが指定されている場合のみロードバランサーを設定する
    for_each = local.attach_target_group ? {
      for task in var.tasks : task.name => task
    } : {}

    content {
      target_group_arn = var.target_group_arn
      container_name   = load_balancer.value.name
      container_port   = load_balancer.value.port
    }
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

# ECS EXEC 用のポリシー
resource "aws_iam_policy" "ecs_execer" {
  policy = jsonencode(
    {
      Version = "2012-10-17"
      Statement = [
        {
          Effect = "Allow"
          Action = [
            "ssmmessages:CreateControlChannel",
            "ssmmessages:CreateDataChannel",
            "ssmmessages:OpenControlChannel",
            "ssmmessages:OpenDataChannel"
          ]
          Resource = "*"
        }
      ]
    }
  )

  tags = {
    Name = "${local.service}-${var.env}-policy-ecs-exec-${var.service_name}"
  }
}

resource "aws_iam_role_policy_attachment" "ecs_execer" {
  role       = aws_iam_role.main.name
  policy_arn = aws_iam_policy.ecs_execer.arn
}
