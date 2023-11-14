locals {
  service = "foderee"
}

#AWSアカウントIDの取得
data "aws_caller_identity" "current" {}

#ELBアカウントIDの取得
data "aws_elb_service_account" "main" {}

# ALB に適用するセキュリティグループ
resource "aws_security_group" "main" {
  name        = "${local.service}-${var.env}-alb-sg"
  description = "Allow HTTP and HTTPS inbound traffic"
  vpc_id      = var.vpc_id

  ingress {
    description = "Allow HTTP inbound traffic"
    cidr_blocks = ["0.0.0.0/0"]
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
  }

  ingress {
    description = "Allow HTTPS inbound traffic"
    cidr_blocks = ["0.0.0.0/0"]
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
  }

  egress {
    description = "Allow all outbound traffic"
    cidr_blocks = ["0.0.0.0/0"]
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
  }

  tags = {
    "Name" = "${local.service}-${var.env}-alb-sg"
  }
}

resource "aws_lb" "this" {
  name               = "${local.service}-${var.env}-alb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.main.id]
  subnets            = var.public_subnet_ids

  access_logs {
    enabled = true
    bucket  = aws_s3_bucket.alb_logs.bucket
  }

  tags = {
    "Name" = "${local.service}-${var.env}-alb"
  }
}

# ログの設定
resource "aws_s3_bucket" "alb_logs" {
  bucket = "${local.service}-${var.env}-alb-logs"

  tags = {
    "Name" = "${local.service}-${var.env}-alb-logs"
  }
}

resource "aws_s3_bucket_policy" "alb_logs" {
  bucket = aws_s3_bucket.alb_logs.id
  policy = data.aws_iam_policy_document.alb_logs_policy_document.json
}

data "aws_iam_policy_document" "alb_logs_policy_document" {
  statement {
    effect = "Allow"
    principals {
      type        = "AWS"
      identifiers = [data.aws_elb_service_account.main.arn]
    }
    actions   = ["s3:PutObject"]
    resources = ["${aws_s3_bucket.alb_logs.arn}/AWSLogs/${data.aws_caller_identity.current.account_id}/*"]
  }
}

# リスナー

# web にフォワードするリスナー
resource "aws_lb_listener" "web" {
  load_balancer_arn = aws_lb.this.arn
  port              = 443
  protocol          = "HTTPS"
  certificate_arn   = var.acm_certificate_arn

  default_action {
    target_group_arn = aws_lb_target_group.web.arn
    type             = "forward"
  }

  tags = {
    "Name" = "${local.service}-${var.env}-alb-listener-web"
  }
}

# HTTPS にリダイレクトするリスナー
resource "aws_lb_listener" "http" {
  load_balancer_arn = aws_lb.this.arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    type = "redirect"

    redirect {
      port        = "443"
      protocol    = "HTTPS"
      status_code = "HTTP_301"
    }
  }

  tags = {
    "Name" = "${local.service}-${var.env}-alb-listener-http"
  }
}

# web ターゲットグループ
resource "aws_lb_target_group" "web" {
  name             = "${local.service}-${var.env}-web-tg"
  vpc_id           = var.vpc_id
  target_type      = "ip"
  protocol_version = "HTTP1"
  port             = var.web.port
  protocol         = "HTTP"

  health_check {
    enabled             = true
    healthy_threshold   = 2
    unhealthy_threshold = 5
    interval            = 60
    matcher             = "200"
    path                = var.web.health_check_path
    protocol            = "HTTP"
    timeout             = 5
  }

  tags = {
    "Name" = "${local.service}-${var.env}-web-tg"
  }
}
