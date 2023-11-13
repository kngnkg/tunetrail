locals {
  service = "foderee"
}

resource "aws_ecr_repository" "this" {
  name                 = "${local.service}-${var.env}-${var.artifact_name}"
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }

  tags = {
    Name = "${local.service}-${var.env}-ecr-${var.artifact_name}"
  }
}
