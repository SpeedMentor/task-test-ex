resource "huaweicloud_cce_cluster" "cce_cluster" {
  name      = "cce-tf-test-cluster"
  flavor_id = "cce.s1.small"
  #cluster_type           = "VirtualMachine"
  vpc_id    = var.vpc_id
  subnet_id = var.subnet_id
  #container_network_type = "overlay_l2"
  enterprise_project_id  = var.enterprise_project_id
  container_network_type = "vpc-router" #For Ubuntu
  container_network_cidr = "10.30.0.0/16"
  cluster_version        = "v1.30"
  region                 = var.region
  masters {
    availability_zone = var.availability_zone
  }

  charging_mode = "postPaid"
}

resource "huaweicloud_cce_node_pool" "terraform_node_pool" {
  cluster_id         = huaweicloud_cce_cluster.cce_cluster.id
  name               = "terraform-node-pool"
  flavor_id          = "c7n.xlarge.4"
  initial_node_count = 1
  max_node_count     = 1
  min_node_count     = 1
  key_pair           = "my-k8s-key"

  charging_mode = "postPaid"

  label_policy_on_existing_nodes = "refresh"
  os                             = "Ubuntu 22.04"
  priority                       = 0
  region                         = var.region
  runtime                        = "containerd"
  scale_down_cooldown_time       = 0
  scall_enable                   = true
  subnet_id                      = var.subnet_id
  tag_policy_on_existing_nodes   = "ignore"

  hostname_config {
    type = "privateIp"
  }

  root_volume {
    hw_passthrough = false
    size           = 50
    volumetype     = "SAS"
  }

  taint_policy_on_existing_nodes = "refresh"
  type                           = "vm"
  data_volumes {
    hw_passthrough = false
    size           = 100
    volumetype     = "SAS"
  }

  availability_zone     = "tr-west-1b"
  enterprise_project_id = var.enterprise_project_id

  # Tags for Nodes
  tags = {
    time = "2025-02-10"
  }
}
