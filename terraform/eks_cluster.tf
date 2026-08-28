resource "aws_eks_cluster" "eks_cluster" {
  name     = "EKS-cluster"
  role_arn = aws_iam_role.eks_cluster_role.arn
  vpc_config {
    subnet_ids = aws_subnet.eks_private[*].id
  }
  depends_on = [aws_iam_role_policy_attachment.eks_cluster_policy]
  tags = {
    Name = "EKS-cluster"
  }
}

