resource "aws_ecr_repository" "this" {
  name                 = "tunetrail-${var.env}-${var.artifact_name}"
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }

  tags = {
    Name = "tunetrail-${var.env}-ecr-${var.artifact_name}"
  }
}
