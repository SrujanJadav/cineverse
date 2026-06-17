# CineVerse Setup Script for Windows

Write-Host "🎬 CineVerse Setup Script" -ForegroundColor Cyan
Write-Host "==========================" -ForegroundColor Cyan
Write-Host ""

# Check prerequisites
Write-Host "Checking prerequisites..." -ForegroundColor Yellow

# Check Node.js
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js $nodeVersion found" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js not found. Please install Node.js 18+" -ForegroundColor Red
    exit 1
}

# Check Java
try {
    $javaVersion = java -version 2>&1 | Select-Object -First 1
    Write-Host "✅ Java found" -ForegroundColor Green
} catch {
    Write-Host "❌ Java not found. Please install Java 17+" -ForegroundColor Red
    exit 1
}

# Check Maven
try {
    $mvnVersion = mvn --version | Select-Object -First 1
    Write-Host "✅ Maven found" -ForegroundColor Green
} catch {
    Write-Host "❌ Maven not found. Please install Maven 3.6+" -ForegroundColor Red
    exit 1
}

# Check Docker
try {
    $dockerVersion = docker --version
    Write-Host "✅ Docker $dockerVersion found" -ForegroundColor Green
} catch {
    Write-Host "❌ Docker not found. Please install Docker Desktop" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "All prerequisites met!" -ForegroundColor Green
Write-Host ""

# Setup frontend
Write-Host "Setting up frontend..." -ForegroundColor Yellow
Set-Location frontend
Copy-Item .env.example .env
npm install
Write-Host "✅ Frontend setup complete" -ForegroundColor Green
Set-Location ..

Write-Host ""
Write-Host "🎉 Setup complete!" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Start services: docker-compose up -d"
Write-Host "2. Or run manually: See QUICK_START.md"
Write-Host "3. Access frontend: http://localhost:3000"
Write-Host ""
