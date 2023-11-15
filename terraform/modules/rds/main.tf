locals {
  service    = "foderee"
  subnet_ids = [for subnet in var.private_subnets : subnet.id]
  cidrs      = [for subnet in var.private_subnets : subnet.cidr_block]
}

# RDS用のセキュリティグループ
resource "aws_security_group" "main" {
  name        = "${local.service}-${var.env}-rds-sg"
  description = "Allow API to access"
  vpc_id      = var.vpc_id
  ingress {
    cidr_blocks = local.cidrs
    description = ""
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
  }

  egress {
    cidr_blocks = [
      "0.0.0.0/0",
    ]
    description = ""
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
  }

  tags = {
    "Name" = "${local.service}-${var.env}-rds-sg"
  }
}

resource "aws_db_instance" "this" {
  db_name               = "postgres"
  username              = var.username
  password              = var.password
  db_subnet_group_name  = aws_db_subnet_group.main.name
  allocated_storage     = 20
  engine                = "postgres"
  engine_version        = "15.2"
  instance_class        = "db.t3.micro"
  storage_type          = "gp2"
  max_allocated_storage = 1000
  publicly_accessible   = false
  storage_encrypted     = true
  multi_az              = false
  skip_final_snapshot   = true
  copy_tags_to_snapshot = true
  enabled_cloudwatch_logs_exports = [
    "postgresql",
    "upgrade",
  ]

  vpc_security_group_ids = [
    aws_security_group.main.id,
  ]

  performance_insights_enabled = true

  tags = {
    Name = "${local.service}-${var.env}-rds"
  }
}

# サブネットグループ
resource "aws_db_subnet_group" "main" {
  subnet_ids  = local.subnet_ids
  description = "foderee dev rds subnet group"

  tags = {
    Name = "${local.service}-${var.env}-rds-subg"
  }
}
