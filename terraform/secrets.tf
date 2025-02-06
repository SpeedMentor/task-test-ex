# Store MySQL Password in Huawei Cloud Secrets Manager (CSMS)
resource "huaweicloud_csms_secret" "mysql_secret" {
  name        = "mysql-root-password-cce"
  description = "MySQL root password for RDS"
  secret_type = "COMMON"
  secret_text = ""
}
