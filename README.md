# Marche Circulo ESM

Landing page em Next.js com build preparado para `standalone` e deploy em Google Cloud Run.

## Rodando localmente

```bash
npm run dev
```

Abra `http://localhost:3000`.

## Container

O projeto possui um `Dockerfile` pronto para Cloud Run usando a saida `standalone` do Next.js.

Importante: esta aplicacao usa variaveis `NEXT_PUBLIC_*` no frontend. Isso significa que esses valores precisam existir no momento do `docker build`, porque o bundle do cliente e gerado nessa etapa.

Exemplo de build:

```bash
docker build ^
  --build-arg NEXT_PUBLIC_API_USERS_V2=https://sua-api.run.app ^
  --build-arg NEXT_PUBLIC_USERS_V2_API_KEY=*** ^
  -t us-central1-docker.pkg.dev/SEU_PROJETO/marche-circulo-esm/marche-circulo-esm:latest .
```

## Terraform para Cloud Run

Os arquivos estao em `terraform/`.

Passos:

1. Copie `terraform/terraform.tfvars.example` para `terraform/terraform.tfvars`.
2. Ajuste `project_id`, `region` e principalmente `image`.
3. Execute:

```bash
cd terraform
terraform init
terraform plan
terraform apply
```

Essa stack cria:

- APIs necessarias do GCP
- Repositorio Docker no Artifact Registry
- Service account dedicada para runtime
- Servico publico no Cloud Run

## Pipeline de deploy

Foram adicionadas pipelines de GitHub Actions para `stg` e `prod`:

- `.github/workflows/deploy-stg.yml`
- `.github/workflows/deploy-prod.yml`

Cada pipeline faz:

1. Autentica no GCP usando Workload Identity Federation.
2. Faz build da imagem Docker com os `NEXT_PUBLIC_*`.
3. Publica a imagem no Artifact Registry.
4. Executa `terraform init` usando backend remoto em GCS.
5. Executa `terraform plan`.
6. Executa `terraform apply`.

### Arquivos por ambiente

- `terraform/environments/stg.tfvars`
- `terraform/environments/prod.tfvars`

Esses arquivos guardam as diferencas de escala, nome do servico e labels entre os ambientes.

### Setup no GitHub

Crie dois GitHub Environments:

- `stg`
- `prod`

Em cada environment, configure estas `Variables`:

- `GCP_PROJECT_ID`
- `GCP_REGION`
- `ARTIFACT_REGISTRY_REPOSITORY`
- `CLOUD_RUN_SERVICE_NAME`
- `TF_STATE_BUCKET`

Exemplo:

- `GCP_PROJECT_ID=meu-projeto-gcp`
- `GCP_REGION=us-central1`
- `ARTIFACT_REGISTRY_REPOSITORY=marche-circulo-esm`
- `CLOUD_RUN_SERVICE_NAME=marche-circulo-esm-stg` ou `marche-circulo-esm-prod`
- `TF_STATE_BUCKET=meu-bucket-tfstate`

Em cada environment, configure estes `Secrets`:

- `GCP_WORKLOAD_IDENTITY_PROVIDER`
- `GCP_SERVICE_ACCOUNT`
- `NEXT_PUBLIC_API_USERS_V2`
- `NEXT_PUBLIC_USERS_V2_API_KEY`

### Setup no GCP

1. Criar um bucket GCS para o state remoto do Terraform.
2. Criar uma service account para o GitHub Actions.
3. Configurar Workload Identity Federation ligando o repositório GitHub a essa service account.
4. Dar estas permissoes para a service account usada pelo workflow:

- `roles/artifactregistry.writer`
- `roles/run.admin`
- `roles/iam.serviceAccountUser`
- `roles/storage.objectAdmin` no bucket de state, ou permissao equivalente

### Estrategia de deploy

- `stg`: dispara em push para `develop` e `staging`
- `prod`: dispara em push para `main` e tambem aceita `workflow_dispatch`

Para `prod`, recomendo configurar `Required reviewers` no environment `prod` do GitHub. Segundo a documentacao do GitHub, jobs que usam environments podem exigir aprovadores antes de prosseguir.

## Fluxo sugerido de deploy

1. Criar a infraestrutura com Terraform.
2. Fazer o build da imagem com os `--build-arg` do frontend.
3. Publicar a imagem no Artifact Registry.
4. Atualizar a variavel `image` no Terraform se usar nova tag.
5. Aplicar `terraform apply` para apontar o Cloud Run para a nova imagem.
