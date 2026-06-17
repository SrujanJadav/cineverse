# Scripts

Utility scripts for CineVerse platform.

## Available Scripts

### setup.sh (Linux/Mac)
```bash
chmod +x scripts/setup.sh
./scripts/setup.sh
```

### setup.ps1 (Windows)
```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
.\scripts\setup.ps1
```

## What setup does:
1. Checks all prerequisites (Node, Java, Maven, Docker)
2. Sets up frontend environment
3. Installs frontend dependencies

## Manual Setup

If scripts don't work, follow these steps:

1. **Install prerequisites:**
   - Node.js 18+
   - Java 17+
   - Maven 3.6+
   - Docker Desktop

2. **Setup frontend:**
   ```bash
   cd frontend
   cp .env.example .env
   npm install
   ```

3. **Start services:**
   ```bash
   docker-compose up -d
   ```
