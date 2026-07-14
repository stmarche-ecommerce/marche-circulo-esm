region = "us-central1"

service_name                 = "marche-circulo-esm-prod"
artifact_registry_repository = "marche-circulo-esm"

cpu                = "1"
memory             = "512Mi"
min_instance_count = 1
max_instance_count = 4

base_runtime_environment_variables = {
  NODE_ENV = "production"
}

labels = {
  environment = "prod"
  managed_by  = "github-actions"
}
