terraform {
  required_version = ">= 1.6.0"

  backend "gcs" {
    bucket = "marche-terraform"
    prefix = "marche-circulo-esm"
  }

  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 6.0"
    }
  }
}

provider "google" {
  project = var.project_id
  region  = var.region
}

locals {
  service_name  = var.service_name != "" ? var.service_name : "marche-circulo-esm"
  repository_id = var.artifact_registry_repository != "" ? var.artifact_registry_repository : "${local.service_name}-repo"
  labels = merge({
    application = local.service_name
    managed_by  = "terraform"
  }, var.labels)
}

resource "google_project_service" "required" {
  for_each = toset([
    "artifactregistry.googleapis.com",
    "cloudbuild.googleapis.com",
    "iam.googleapis.com",
    "run.googleapis.com",
  ])

  project            = var.project_id
  service            = each.value
  disable_on_destroy = false
}

resource "google_artifact_registry_repository" "app" {
  location      = var.region
  repository_id = local.repository_id
  description   = "Container repository for ${local.service_name}"
  format        = "DOCKER"
  labels        = local.labels

  depends_on = [google_project_service.required]
}

resource "google_service_account" "cloud_run" {
  account_id   = replace(substr("${local.service_name}-run", 0, 30), "_", "-")
  display_name = "${local.service_name} Cloud Run runtime"

  depends_on = [google_project_service.required]
}

resource "google_cloud_run_v2_service" "app" {
  name                = local.service_name
  location            = var.region
  ingress             = var.ingress
  deletion_protection = false
  labels              = local.labels

  template {
    service_account                  = google_service_account.cloud_run.email
    timeout                          = "${var.timeout_seconds}s"
    max_instance_request_concurrency = var.max_instance_request_concurrency

    scaling {
      min_instance_count = var.min_instance_count
      max_instance_count = var.max_instance_count
    }

    containers {
      image = var.image

      resources {
        limits = {
          cpu    = var.cpu
          memory = var.memory
        }
      }

      ports {
        container_port = var.container_port
      }

      dynamic "env" {
        for_each = var.runtime_environment_variables
        content {
          name  = env.key
          value = env.value
        }
      }
    }
  }

  depends_on = [
    google_project_service.required,
    google_service_account.cloud_run,
  ]
}

resource "google_cloud_run_v2_service_iam_member" "public" {
  count = var.allow_unauthenticated ? 1 : 0

  project  = var.project_id
  location = google_cloud_run_v2_service.app.location
  name     = google_cloud_run_v2_service.app.name
  role     = "roles/run.invoker"
  member   = "allUsers"
}
