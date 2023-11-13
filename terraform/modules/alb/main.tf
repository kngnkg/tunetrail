locals {
  service = "foderee"
}

# ALB に適用するセキュリティグループ
resource "aws_security_group" "main" {
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
    "Name" = "${local.service}-${var.env}-alb"
  }
}

# web ターゲットグループ
resource "aws_lb_target_group" "web" {
  name             = "${local.service}-${var.env}-web-tg"
  vpc_id           = var.vpc_id
  target_type      = "ip"
  protocol_version = "HTTP2"
  port             = var.web.port
  protocol         = "HTTP"

  health_check {
    enabled             = true
    healthy_threshold   = 5
    interval            = 60
    matcher             = "200"
    path                = var.web.health_check_path
    protocol            = "HTTP"
    timeout             = 5
    unhealthy_threshold = 2
  }

  tags = {
    "Name" = "${local.service}-${var.env}-web-tg"
  }
}
