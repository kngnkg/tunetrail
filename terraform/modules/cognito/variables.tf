variable "env" {
  type = string
}

variable "client_name" {
  type = string
}

variable "callback_urls" {
  type = list(string)
}

variable "google" {
  type = object({
    client_id     = string
    client_secret = string
  })
}
