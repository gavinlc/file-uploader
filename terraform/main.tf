locals {
  region = "eu-west-1"
}

terraform {
  backend "s3" {
    profile = "default"
    bucket  = "gavinlc-tfstate"
    key     = "terraform/state/file-uploader"
    region  = "eu-west-1"
  }
}

provider "aws" {
  profile = "default"
  region  = local.region
  version = "~> 2.6"
}