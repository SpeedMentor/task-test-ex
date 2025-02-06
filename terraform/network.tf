# VPC Configuration
#Resource "huaweicloud_vpc" "vpc" {
#  name                  = "vpc-aie-test"
#  cidr                  = "192.168.0.0/16"
#  enterprise_project_id = "ff463241-f63b-45f1-82d5-f8c57b0ee80f"
#}

# Subnet Configuration
#resource "huaweicloud_vpc_subnet" "subnet" {
#  vpc_id     = huaweicloud_vpc.vpc.id
#  name       = "subnet-nodes"
#  cidr       = "192.168.16.0/20"
#  gateway_ip = "192.168.16.1"
#}
