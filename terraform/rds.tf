resource "huaweicloud_rds_instance" "mysql_db" {
  name              = "rds-db-test-cce"
  flavor            = "rds.mysql.n1.large.2"
  availability_zone = [var.availability_zone]
  vpc_id            = var.vpc_id
  subnet_id         = var.subnet_id
  security_group_id = var.secgroup_id
  region            = var.region

  charging_mode = "postPaid"

  db {
    type     = "MySQL"
    version  = "8"
    password = var.mysql_pw
  }

  volume {
    type = "CLOUDSSD"
    size = "100"
  }
  # Backup Strategy
  backup_strategy {
    start_time = "02:00-03:00"
    keep_days  = 1
  }

  # Enterprise Project Assignment
  enterprise_project_id = var.enterprise_project_id
}
