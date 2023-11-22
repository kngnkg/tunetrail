locals {
  service = "foderee"
}

resource "aws_cognito_user_pool" "this" {
  name                     = "${local.service}-${var.env}"
  auto_verified_attributes = ["email"]
  username_attributes      = ["email"]
  deletion_protection      = "INACTIVE"

  account_recovery_setting {
    recovery_mechanism {
      name     = "admin_only"
      priority = 1
    }
  }

  admin_create_user_config {
    allow_admin_create_user_only = true
  }

  email_configuration {
    email_sending_account = "COGNITO_DEFAULT"
  }

  password_policy {
    minimum_length                   = 8
    require_lowercase                = true
    require_numbers                  = true
    require_symbols                  = true
    require_uppercase                = true
    temporary_password_validity_days = 7
  }

  username_configuration {
    case_sensitive = false
  }

  verification_message_template {
    default_email_option = "CONFIRM_WITH_CODE"
  }

  user_attribute_update_settings {
    attributes_require_verification_before_update = [
      "email",
    ]
  }

  tags = {
    "Name" = "${local.service}-${var.env}-cognito-userpool"
  }
}

resource "aws_cognito_identity_provider" "google" {
  user_pool_id  = aws_cognito_user_pool.this.id
  provider_name = "Google"
  provider_type = "Google"

  provider_details = {
    authorize_scopes = "profile email openid"
    client_id        = var.google.client_id
    client_secret    = var.google.client_secret
  }

  attribute_mapping = {
    email    = "email"
    username = "sub"
  }
}

resource "aws_cognito_user_pool_domain" "this" {
  domain       = var.env == "prod" ? "${local.service}" : "${local.service}-${var.env}"
  user_pool_id = aws_cognito_user_pool.this.id
}

resource "aws_cognito_user_pool_client" "app" {
  user_pool_id                         = aws_cognito_user_pool.this.id
  name                                 = var.client_name
  generate_secret                      = true
  callback_urls                        = var.callback_urls
  allowed_oauth_flows_user_pool_client = true
  explicit_auth_flows = [
    "ALLOW_REFRESH_TOKEN_AUTH",
  ]

  access_token_validity = 60
  id_token_validity     = 60

  token_validity_units {
    access_token  = "minutes"
    id_token      = "minutes"
    refresh_token = "days"
  }

  supported_identity_providers = ["Google"]
  allowed_oauth_flows          = ["code"]
  allowed_oauth_scopes = [
    "email",
    "openid",
    "profile"
  ]

  read_attributes = [
    # "address",
    # "birthdate",
    "email",
    "email_verified",
    # "family_name",
    # "gender",
    # "given_name",
    # "locale",
    # "middle_name",
    # "name",
    # "nickname",
    "phone_number",
    "phone_number_verified",
    "picture",
    # "preferred_username",
    # "profile",
    "updated_at",
    # "website",
    # "zoneinfo"
  ]

  write_attributes = [
    # "address",
    # "birthdate",
    "email",
    # "family_name",
    # "gender",
    # "given_name",
    # "locale",
    # "middle_name",
    # "name",
    # "nickname",
    "phone_number",
    "picture",
    # "preferred_username",
    # "profile",
    "updated_at",
    # "website",
    # "zoneinfo"
  ]
}
