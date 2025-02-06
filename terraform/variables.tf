variable "access_key" {
  type = string
}
variable "secret_key" {
  type = string
}
variable "region" {
  type    = string
  default = "tr-west-1"
}
variable "vpc_id" {
  type = string
}
variable "subnet_id" {
  type = string
}
variable "secgroup_id" {
  type = string
}
variable "availability_zone" {
  type = string
}
variable "enterprise_project_id" {
  type = string
}
variable "mysql_pw" {
  type        = string
  sensitive   = true
  description = "MySQL root password"
}
