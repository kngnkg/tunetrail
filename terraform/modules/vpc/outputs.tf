output "vpc_id" {
  value = aws_vpc.main.id
}

output "subnet" {
  value = {
    public1 = {
      id   = aws_subnet.public1.id
      cidr = aws_subnet.public1.cidr_block
    }

    public2 = {
      id   = aws_subnet.public2.id
      cidr = aws_subnet.public2.cidr_block
    }

    private1 = {
      id   = aws_subnet.private1.id
      cidr = aws_subnet.private1.cidr_block
    }

    private2 = {
      id   = aws_subnet.private2.id
      cidr = aws_subnet.private2.cidr_block
    }
  }
}

output "route_table" {
  value = {
    public_id  = aws_route_table.main.id
    private_id = aws_route_table.private.id
  }
}
