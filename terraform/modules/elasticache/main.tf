locals {
  service    = "foderee"
  subnet_ids = [for subnet in var.private_subnets : subnet.id]
  cidrs      = [for subnet in var.private_subnets : subnet.cidr_block]
}

# 適用するセキュリティグループ
resource "aws_security_group" "main" {
  name        = "${local.service}-${var.env}-redis-sg"
  description = "${local.service}-${var.env} ElastiCache for Redis Security Group"
  vpc_id      = var.vpc_id
  ingress {
    cidr_blocks = local.cidrs
    description = ""
    from_port   = 6379
    to_port     = 6379
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
    "Name" = "${local.service}-${var.env}-redis-sg"
  }
}

resource "aws_elasticache_replication_group" "this" {
  replication_group_id        = "${local.service}-${var.env}-redis-cluster"
  security_group_ids          = [aws_security_group.main.id]
  num_cache_clusters          = var.replicate ? 2 : 1
  automatic_failover_enabled  = var.replicate ? true : false
  security_group_names        = null
  apply_immediately           = null
  at_rest_encryption_enabled  = false
  transit_encryption_enabled  = false
  auth_token                  = null
  auto_minor_version_upgrade  = "true"
  data_tiering_enabled        = false
  description                 = "${local.service} ${var.env} redis cluster"
  engine                      = "redis"
  engine_version              = "7.1"
  final_snapshot_identifier   = null
  global_replication_group_id = null
  ip_discovery                = "ipv4"
  kms_key_id                  = null
  maintenance_window          = "tue:19:30-tue:20:30"
  multi_az_enabled            = true
  network_type                = "ipv4"
  node_type                   = "cache.t2.micro"
  notification_topic_arn      = null
  parameter_group_name        = "default.redis7"
  port                        = 6379
  preferred_cache_cluster_azs = null
  snapshot_arns               = null
  snapshot_name               = null
  snapshot_retention_limit    = 0
  snapshot_window             = "14:00-15:00"
  subnet_group_name           = "${local.service}-${var.env}-redis-subg"
  user_group_ids              = []

  log_delivery_configuration {
    destination      = "/elasticache/${local.service}-${var.env}-redis-engine"
    destination_type = "cloudwatch-logs"
    log_format       = "json"
    log_type         = "engine-log"
  }

  log_delivery_configuration {
    destination      = "/elasticache/${local.service}-${var.env}-redis-slow"
    destination_type = "cloudwatch-logs"
    log_format       = "json"
    log_type         = "slow-log"
  }

  tags = {
    Name = "${local.service}-${var.env}-redis-cluster"
  }
}

# サブネットグループ
resource "aws_elasticache_subnet_group" "main" {
  subnet_ids  = local.subnet_ids
  name        = "${local.service}-${var.env}-redis-subg"
  description = "${local.service} ${var.env} ElastiCache for Redis Subnet Group"

  tags = {
    "Name" = "${local.service}-${var.env}-redis-subg"
  }
}

resource "aws_cloudwatch_log_group" "slow" {
  name              = "/elasticache/${local.service}-${var.env}-redis-slow"
  retention_in_days = 14
}

resource "aws_cloudwatch_log_group" "engine" {
  name              = "/elasticache/${local.service}-${var.env}-redis-engine"
  retention_in_days = 14
}
