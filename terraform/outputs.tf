output "artifact_registry_repository" {
  description = "Repositorio criado para armazenar a imagem."
  value       = google_artifact_registry_repository.app.id
}

output "cloud_run_service_name" {
  description = "Nome do servico Cloud Run."
  value       = google_cloud_run_v2_service.app.name
}

output "cloud_run_service_url" {
  description = "URL publica do servico Cloud Run."
  value       = google_cloud_run_v2_service.app.uri
}

output "runtime_service_account_email" {
  description = "Service account usada em runtime pelo Cloud Run."
  value       = google_service_account.cloud_run.email
}
