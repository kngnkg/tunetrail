output "vpc_id" {
  value = aws_vpc.main.id
}

output "subnet" {
  value = {
    public1_id  = aws_subnet.public1.id
    public2_id  = aws_subnet.public2.id
    private1_id = aws_subnet.private1.id
    private2_id = aws_subnet.private2.id
  }
}

output "route_table" {
  value = {
    public_id  = aws_route_table.main.id
    private_id = aws_route_table.private.id
  }
}
