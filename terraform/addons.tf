resource "aws_eks_addon" "vpc_cni" {
  cluster_name = aws_eks_cluster.eks_cluster.name

  addon_name = "vpc-cni"

  depends_on = [
    aws_eks_node_group.eks_nodes
  ]
}


resource "aws_eks_addon" "coredns" {
  cluster_name = aws_eks_cluster.eks_cluster.name

  addon_name = "coredns"

  depends_on = [
    aws_eks_node_group.eks_nodes
  ]
}


resource "aws_eks_addon" "kube_proxy" {
  cluster_name = aws_eks_cluster.eks_cluster.name

  addon_name = "kube-proxy"

  depends_on = [
    aws_eks_node_group.eks_nodes
  ]
}


resource "aws_eks_addon" "pod_identity" {
  cluster_name = aws_eks_cluster.eks_cluster.name

  addon_name = "eks-pod-identity-agent"

  depends_on = [
    aws_eks_node_group.eks_nodes
  ]
}