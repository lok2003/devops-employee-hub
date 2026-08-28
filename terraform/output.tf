output "vpc_id" {
  description = "ID of the EKS VPC"
  value       = aws_vpc.aws_eks_vpc.id
}

output "vpc_cidr_block" {
  description = "CIDR block of the EKS VPC"
  value       = aws_vpc.aws_eks_vpc.cidr_block
}

output "public_subnet_ids" {
  description = "IDs of the public subnets"
  value       = aws_subnet.eks_public[*].id
}

output "private_subnet_ids" {
  description = "IDs of the private subnets"
  value       = aws_subnet.eks_private[*].id
}

output "public_route_table_id" {
  description = "ID of the public route table"
  value       = aws_route_table.public_route_eks.id
}

output "private_route_table_id" {
  description = "ID of the private route table"
  value       = aws_route_table.private_route_eks.id
}

output "internet_gateway_id" {
  description = "ID of the Internet Gateway"
  value       = aws_internet_gateway.eks_igw.id
}

output "nat_gateway_id" {
  description = "ID of the NAT Gateway"
  value       = aws_nat_gateway.eks_nat.id
}

output "elastic_ip_id" {
  description = "Allocation ID of the NAT Gateway EIP"
  value       = aws_eip.eks_eip.id
}



output "eks_cluster_name" {
  description = "Name of the EKS cluster"
  value       = aws_eks_cluster.eks_cluster.name
}


output "eks_cluster_arn" {
  description = "ARN of the EKS cluster"
  value       = aws_eks_cluster.eks_cluster.arn
}


output "eks_cluster_endpoint" {
  description = "API endpoint of the EKS cluster"
  value       = aws_eks_cluster.eks_cluster.endpoint
}


output "eks_cluster_version" {
  description = "Kubernetes version of the EKS cluster"
  value       = aws_eks_cluster.eks_cluster.version
}


output "eks_cluster_status" {
  description = "Current status of the EKS cluster"
  value       = aws_eks_cluster.eks_cluster.status
}


output "eks_cluster_certificate_authority" {
  description = "Certificate authority data of the EKS cluster"
  value       = aws_eks_cluster.eks_cluster.certificate_authority[0].data
  sensitive   = true
}


output "eks_cluster_role_arn" {
  description = "IAM role ARN used by the EKS control plane"
  value       = aws_iam_role.eks_cluster_role.arn
}


output "eks_node_group_name" {
  description = "Name of the EKS managed node group"
  value       = aws_eks_node_group.eks_nodes.node_group_name
}


output "eks_node_group_arn" {
  description = "ARN of the EKS managed node group"
  value       = aws_eks_node_group.eks_nodes.arn
}


output "eks_node_group_status" {
  description = "Current status of the EKS managed node group"
  value       = aws_eks_node_group.eks_nodes.status
}


output "eks_node_role_arn" {
  description = "IAM role ARN used by EKS worker nodes"
  value       = aws_iam_role.eks_node_role.arn
}


output "eks_node_subnet_ids" {
  description = "Private subnet IDs used by the EKS node group"
  value       = aws_eks_node_group.eks_nodes.subnet_ids
}

output "ecr_repository_name" {
  description = "Name of the ECR repository"
  value       = aws_ecr_repository.employee_app.name
}

output "ecr_repository_url" {
  description = "URL of the ECR repository"
  value       = aws_ecr_repository.employee_app.repository_url
}

output "ecr_repository_arn" {
  description = "ARN of the ECR repository"
  value       = aws_ecr_repository.employee_app.arn
}