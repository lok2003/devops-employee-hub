variable "aws_region" {
  type = object({
    name = string
  })
}


variable "aws_vpc" {
  type = object({
    name       = string
    cidr_block = string
  })
}

variable "aws_igw" {
  type = object({
    name = string
  })
}

variable "route_table_pub" {
  type = object({
    name = string
  })
}

variable "route_table_private" {
  type = object({
    name = string
  })
}

variable "public_subnet" {
  type = list(object({
    name                    = string
    cidr_block              = string
    availability_zone       = string
    map_public_ip_on_launch = bool
  }))
}

variable "private_subnet" {
  type = list(object({
    name                    = string
    cidr_block              = string
    availability_zone       = string
    map_public_ip_on_launch = bool
  }))
}