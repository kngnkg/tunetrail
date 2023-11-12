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
    "Name" = "tunetrail-${var.env}-alb"
  }
}
