resource "aws_ecs_cluster" "this" {
  name = "tunetrail-${var.env}-cluster"

  configuration {
    execute_command_configuration {
      logging = "DEFAULT"
    }
  }

  tags = {
    Name = "tunetrail-${var.env}-cluster"
  }
}
