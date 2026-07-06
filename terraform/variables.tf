variable "project_id" {
  description = "ID do projeto GCP."
  type        = string
}

variable "region" {
  description = "Regiao para Artifact Registry e Cloud Run."
  type        = string
  default     = "us-central1"
}

variable "service_name" {
  description = "Nome do servico Cloud Run."
  type        = string
  default     = "marche-circulo-esm"
}

variable "artifact_registry_repository" {
  description = "Nome do repositorio Docker no Artifact Registry."
  type        = string
  default     = "marche-circulo-esm"
}

variable "image" {
  description = "Imagem completa a ser implantada no Cloud Run."
  type        = string
}

variable "container_port" {
  description = "Porta exposta pelo container."
  type        = number
  default     = 8080
}

variable "cpu" {
  description = "Limite de CPU do container."
  type        = string
  default     = "1"
}

variable "memory" {
  description = "Limite de memoria do container."
  type        = string
  default     = "512Mi"
}

variable "timeout_seconds" {
  description = "Timeout de requisicao no Cloud Run."
  type        = number
  default     = 300
}

variable "min_instance_count" {
  description = "Numero minimo de instancias."
  type        = number
  default     = 0
}

variable "max_instance_count" {
  description = "Numero maximo de instancias."
  type        = number
  default     = 2
}

variable "max_instance_request_concurrency" {
  description = "Numero maximo de requisicoes simultaneas por instancia."
  type        = number
  default     = 80
}

variable "ingress" {
  description = "Controle de ingresso do Cloud Run."
  type        = string
  default     = "INGRESS_TRAFFIC_ALL"
}

variable "allow_unauthenticated" {
  description = "Se verdadeiro, publica o servico para acesso anonimo."
  type        = bool
  default     = true
}

variable "runtime_environment_variables" {
  description = "Variaveis de ambiente injetadas em runtime no container."
  type        = map(string)
  default     = {}
}

variable "labels" {
  description = "Labels adicionais aplicadas aos recursos."
  type        = map(string)
  default     = {}
}
