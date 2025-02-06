terraform {
  required_providers {
    huaweicloud = {
      source  = "huaweicloud/huaweicloud"
      version = "~> 1.72.1"
    }
  }
}

provider "huaweicloud" {
  region     = "tr-west-1"
  access_key = var.access_key
  secret_key = var.secret_key
}
