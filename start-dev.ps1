Param(
  [switch]$Rebuild,
  [switch]$NoFrontend,
  [switch]$NoCompose,
  [switch]$WithAI
)

$ErrorActionPreference = 'Stop'

Write-Host '=== HireAI Dev Environment Launcher ===' -ForegroundColor Cyan

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $root

if (-not $NoCompose) {
  Write-Host "[Compose] Starting base services (postgresql redis keycloak user-service gateway mongo mongo-express)" -ForegroundColor Yellow
  if ($Rebuild) {
    docker compose build user-service gateway | Write-Host
  }
  docker compose up -d postgresql redis keycloak mongo mongodb mongo-express user-service gateway | Write-Host
  if ($WithAI) {
    Write-Host '[Compose] Starting resume-ai service' -ForegroundColor Yellow
    docker compose up -d resume-ai | Write-Host
  }
  Write-Host '[Compose] Active containers:' -ForegroundColor Green
  docker compose ps
}

# Frontend env setup
if (-not $NoFrontend) {
  $frontendPath = Join-Path $root 'frontend'
  Set-Location $frontendPath
  Write-Host '[Frontend] Ensuring node modules installed' -ForegroundColor Yellow
  if (-not (Test-Path (Join-Path $frontendPath 'node_modules'))) {
    npm install | Write-Host
  }
  Write-Host '[Frontend] Exporting environment variables for session' -ForegroundColor Yellow
  $env:NEXT_PUBLIC_API_URL = 'http://localhost:8090'
  $env:NEXT_PUBLIC_KEYCLOAK_ISSUER = 'http://localhost:9080/realms/resume-platform'
  $env:NEXT_PUBLIC_KEYCLOAK_CLIENT_ID = 'user-service'
  $env:NEXTAUTH_URL = 'http://localhost:3000'
  if (-not $env:NEXTAUTH_SECRET) { $env:NEXTAUTH_SECRET = 'dev-secret-change-me-32chars-min-aaaaaaaaaaaa' }
  Write-Host '[Frontend] Starting Next.js dev server on :3000' -ForegroundColor Green
  npm run dev
}
