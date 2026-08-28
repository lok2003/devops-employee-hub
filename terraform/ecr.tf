resource "aws_ecr_repository" "employee_app" {
  name                 = "employee-app"
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }

  tags = {
    Name = "employee-app"
  }
}