region = "us-central1"

service_name                 = "marche-circulo-esm-stg"
artifact_registry_repository = "marche-circulo-esm"

cpu                = "1"
memory             = "512Mi"
min_instance_count = 0
max_instance_count = 2

base_runtime_environment_variables = {
  NODE_ENV = "production"
}

labels = {
  environment = "stg"
  managed_by  = "github-actions"
}
