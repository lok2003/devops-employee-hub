resource "aws_vpc" "aws_eks_vpc" {
  cidr_block = var.aws_vpc.cidr_block
  tags = {
    Name = var.aws_vpc.name
  }
}

resource "aws_internet_gateway" "eks_igw" {
  vpc_id = aws_vpc.aws_eks_vpc.id
  tags = {
    Name = var.aws_igw.name
  }
}

resource "aws_route_table" "public_route_eks" {
  vpc_id = aws_vpc.aws_eks_vpc.id
  tags = {
    Name = "var.route_table_pub"
  }
}

resource "aws_route_table" "private_route_eks" {
  vpc_id = aws_vpc.aws_eks_vpc.id
  tags = {
    Name = "var.route_table_private"
  }
}

resource "aws_route" "igw_route_pub" {
  route_table_id         = aws_route_table.public_route_eks.id
  destination_cidr_block = "0.0.0.0/0"
  gateway_id             = aws_internet_gateway.eks_igw.id
  depends_on             = [aws_internet_gateway.eks_igw]
}

resource "aws_subnet" "eks_public" {
  count                   = length(var.public_subnet)
  vpc_id                  = aws_vpc.aws_eks_vpc.id
  cidr_block              = var.public_subnet[count.index].cidr_block
  availability_zone       = var.public_subnet[count.index].availability_zone
  map_public_ip_on_launch = var.public_subnet[count.index].map_public_ip_on_launch
  tags = {
    Name = var.public_subnet[count.index].name
  }
}

resource "aws_subnet" "eks_private" {
  count                   = length(var.private_subnet)
  vpc_id                  = aws_vpc.aws_eks_vpc.id
  cidr_block              = var.private_subnet[count.index].cidr_block
  availability_zone       = var.private_subnet[count.index].availability_zone
  map_public_ip_on_launch = var.private_subnet[count.index].map_public_ip_on_launch
  tags = {
    Name = var.private_subnet[count.index].name
  }
}


resource "aws_route_table_association" "public" {
  count          = length(var.public_subnet)
  subnet_id      = aws_subnet.eks_public[count.index].id
  route_table_id = aws_route_table.public_route_eks.id
}

resource "aws_route_table_association" "private" {
  count          = length(var.private_subnet)
  subnet_id      = aws_subnet.eks_private[count.index].id
  route_table_id = aws_route_table.private_route_eks.id
}

resource "aws_eip" "eks_eip" {
  domain = "vpc"
}

resource "aws_nat_gateway" "eks_nat" {
  allocation_id = aws_eip.eks_eip.id
  subnet_id     = aws_subnet.eks_public[0].id
  depends_on    = [aws_internet_gateway.eks_igw]
  tags = {
    Name = "eks-NAT"
  }
}

resource "aws_route" "nat_route" {
  route_table_id         = aws_route_table.private_route_eks.id
  destination_cidr_block = "0.0.0.0/0"
  nat_gateway_id         = aws_nat_gateway.eks_nat.id
}