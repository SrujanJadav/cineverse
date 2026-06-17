# ⚡ Quick Start Guide

Get CineVerse running in 5 minutes!

## For Local Development

### 1. Install Prerequisites

**Windows:**
```powershell
# Install Chocolatey first (if not installed)
# Then run:
choco install nodejs docker-desktop openjdk maven -y
```

**Mac:**
```bash
brew install node docker maven openjdk@17
```

**Linux:**
```bash
sudo apt update
sudo apt install nodejs npm docker.io maven openjdk-17-jdk -y
```

### 2. Clone and Setup

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/cineverse.git
cd cineverse

# Copy environment files
cp frontend/.env.example frontend/.env
```

### 3. Start with Docker Compose (Easiest!)

```bash
# Start everything
docker-compose up -d

# Wait 2-3 minutes for services to start
# Check status
docker-compose ps

# View logs
docker-compose logs -f
```

**Access the app:**
- Frontend: http://localhost:3000
- API Gateway: http://localhost:8080
- Auth API: http://localhost:8081
- Movies API: http://localhost:8082
- Booking API: http://localhost:8083

### 4. Stop Services

```bash
docker-compose down
```

---

## For Manual Development (Without Docker)

### 1. Start Databases

```bash
docker-compose up postgres mongodb redis rabbitmq -d
```

### 2. Start Backend Services

**Terminal 1 - Auth Service:**
```bash
cd backend/auth-service
mvn spring-boot:run
```

**Terminal 2 - Movie Service:**
```bash
cd backend/movie-service
mvn spring-boot:run
```

**Terminal 3 - Booking Service:**
```bash
cd backend/booking-service
mvn spring-boot:run
```

**Terminal 4 - Gateway:**
```bash
cd backend/gateway
mvn spring-boot:run
```

### 3. Start Frontend

**Terminal 5:**
```bash
cd frontend
npm install
npm run dev
```

**Open:** http://localhost:3000

---

## Test the Platform

1. **Register a user:**
   - Go to http://localhost:3000
   - Click "Sign Up"
   - Fill in details, select role (USER, THEATRE_OWNER, or ADMIN)
   - Submit

2. **Login:**
   - Use your email and password
   - You'll be redirected to dashboard

3. **Browse Movies:**
   - Click "Movies" in navigation
   - Browse available movies
   - Click on a movie to see details

4. **Book Tickets:**
   - Click "Book Tickets" on movie details
   - Select seats
   - Confirm booking

---

## Default Test Data

The platform starts with mock data. To add real movies, use the Admin panel:

1. Login as ADMIN role
2. Go to Admin Panel
3. Add movies, theatres, and shows

---

## Troubleshooting

**Port already in use:**
```bash
# Windows
netstat -ano | findstr :8080
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:8080 | xargs kill -9
```

**Docker issues:**
```bash
# Reset Docker
docker-compose down -v
docker system prune -a

# Restart Docker Desktop
```

**Maven build fails:**
```bash
# Clean and rebuild
mvn clean install -DskipTests
```

**NPM issues:**
```bash
# Clear cache
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

---

## Next Steps

- Read [README.md](README.md) for full documentation
- Check [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for deployment
- Review API documentation in individual service READMEs

**Happy Coding! 🚀**
