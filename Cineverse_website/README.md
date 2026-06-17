# 🎬 CineVerse - Movie Booking Platform

A full-stack movie booking platform with microservices architecture, featuring React frontend and Spring Boot backend services.

![CineVerse](https://img.shields.io/badge/CineVerse-v1.0.0-red)
![React](https://img.shields.io/badge/React-18-blue)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2-green)
![License](https://img.shields.io/badge/License-MIT-yellow)

## 📋 Table of Contents
- [Features](#features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Deployment](#deployment)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)

## ✨ Features

### User Features
- 🔐 User authentication (Register, Login, Password Reset)
- 🎬 Browse movies with search and filters
- 🎫 Book movie tickets with seat selection
- 💺 Real-time seat availability
- 📱 Responsive design for mobile and desktop
- 👤 User profile management
- 📊 Booking history and ticket management

### Admin Features
- 🎥 Movie management (CRUD operations)
- 📈 Platform analytics and statistics
- 👥 User management

### Theatre Owner Features
- 🏢 Theatre management
- 🎭 Screen and show scheduling
- 💰 Revenue tracking

## 🏗️ Architecture

```
┌─────────────┐
│   Frontend  │ (React + Vite)
│   Port 3000 │
└──────┬──────┘
       │
       ↓
┌──────────────────────────────────────────────┐
│           API Gateway (Port 8080)            │
│         (Spring Cloud Gateway + JWT)          │
└────┬─────────────┬──────────────┬────────────┘
     │             │              │
     ↓             ↓              ↓
┌─────────┐  ┌──────────┐  ┌──────────────┐
│  Auth   │  │  Movie   │  │   Booking    │
│ Service │  │ Service  │  │   Service    │
│ :8081   │  │  :8082   │  │    :8083     │
└────┬────┘  └────┬─────┘  └───┬────┬─────┘
     │            │            │    │
     ↓            ↓            ↓    ↓
┌──────────┐ ┌─────────┐ ┌───────┐ ┌────────┐
│PostgreSQL│ │ MongoDB │ │ Redis │ │RabbitMQ│
└──────────┘ └─────────┘ └───────┘ └────────┘
```

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **React Router** - Routing
- **Axios** - HTTP client
- **JWT Decode** - Token handling

### Backend
- **Spring Boot 3.2** - Framework
- **Spring Security** - Authentication & Authorization
- **Spring Cloud Gateway** - API Gateway
- **Spring Data JPA** - ORM
- **Spring Data MongoDB** - MongoDB integration
- **JWT (jjwt)** - Token generation

### Databases
- **PostgreSQL** - Auth & Booking data
- **MongoDB** - Movie catalog
- **Redis** - Caching & seat locking

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Local orchestration
- **GitHub Actions** - CI/CD
- **Nginx** - Frontend web server

## 📁 Project Structure

```
cineverse/
├── frontend/                 # React application
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API services
│   │   ├── context/         # React contexts
│   │   └── styles/          # CSS files
│   ├── Dockerfile
│   └── package.json
│
├── backend/
│   ├── auth-service/        # Authentication service
│   │   ├── src/main/java/com/cineverse/auth/
│   │   ├── Dockerfile
│   │   └── pom.xml
│   │
│   ├── movie-service/       # Movie catalog service
│   │   └── (similar structure)
│   │
│   ├── booking-service/     # Booking & theatre service
│   │   └── (similar structure)
│   │
│   └── gateway/             # API Gateway
│       └── (similar structure)
│
├── docs/                    # Documentation
├── docker/                  # Docker configs
├── scripts/                 # Utility scripts
├── .github/workflows/       # CI/CD workflows
└── docker-compose.yml       # Local development setup
```

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18+ and npm
- **Java** 17+
- **Maven** 3.6+
- **Docker** and Docker Compose
- **PostgreSQL** 15+
- **MongoDB** 7+
- **Redis** 7+

### Option 1: Run with Docker Compose (Recommended)

1. **Clone the repository**
   ```bash
   git clone [YOUR_GITHUB_REPO_URL]
   cd cineverse
   ```

2. **Start all services**
   ```bash
   docker-compose up -d
   ```

3. **Access the application**
   - Frontend: http://localhost:3000
   - API Gateway: http://localhost:8080
   - Auth Service: http://localhost:8081
   - Movie Service: http://localhost:8082
   - Booking Service: http://localhost:8083

### Option 2: Run Locally

#### Backend Services

1. **Start databases**
   ```bash
   docker-compose up postgres mongodb redis rabbitmq -d
   ```

2. **Run Auth Service**
   ```bash
   cd backend/auth-service
   mvn spring-boot:run
   ```

3. **Run Movie Service**
   ```bash
   cd backend/movie-service
   mvn spring-boot:run
   ```

4. **Run Booking Service**
   ```bash
   cd backend/booking-service
   mvn spring-boot:run
   ```

5. **Run Gateway**
   ```bash
   cd backend/gateway
   mvn spring-boot:run
   ```

#### Frontend

```bash
cd frontend
npm install
npm run dev
```

## 🌐 Deployment

### GitHub Repository Setup

1. **Create a new repository on GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin [YOUR_GITHUB_REPO_URL]
   git push -u origin main
   ```

2. **Configure GitHub Secrets**
   Go to Settings → Secrets and add:
   - `DOCKERHUB_USERNAME` - Your Docker Hub username
   - `DOCKERHUB_TOKEN` - Your Docker Hub access token
   - `API_URL` - Your production API URL

### Deployment Options

#### Option 1: AWS ECS

1. Push images to ECR
2. Create ECS cluster and task definitions
3. Configure load balancer and service discovery
4. Update GitHub Actions workflow

#### Option 2: Google Cloud Run

```bash
# Build and deploy
gcloud builds submit --tag gcr.io/PROJECT_ID/cineverse-frontend
gcloud run deploy cineverse-frontend --image gcr.io/PROJECT_ID/cineverse-frontend
```

#### Option 3: DigitalOcean App Platform

1. Connect GitHub repository
2. Configure app components (frontend, backend services)
3. Set environment variables
4. Deploy

#### Option 4: Heroku

```bash
heroku create cineverse-frontend
heroku create cineverse-gateway
# Deploy each service
git subtree push --prefix frontend heroku-frontend master
```

#### Option 5: Self-hosted VPS

```bash
# On your server
git clone [YOUR_REPO]
cd cineverse
docker-compose up -d
```

## 📚 API Documentation

### Auth Service (Port 8081)

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/auth/register` | POST | Register new user |
| `/api/auth/login` | POST | Login |
| `/api/auth/logout` | POST | Logout |
| `/api/auth/forgot-password` | POST | Request password reset |
| `/api/auth/reset-password` | POST | Reset password |

### Movie Service (Port 8082)

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/movies` | GET | Get all movies |
| `/api/movies/{id}` | GET | Get movie by ID |
| `/api/movies/search` | GET | Search movies |
| `/api/movies` | POST | Create movie (Admin) |
| `/api/movies/{id}/reviews` | POST | Add review |

### Booking Service (Port 8083)

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/bookings/shows` | GET | Get shows |
| `/api/bookings/shows/{id}/seats` | GET | Get seat layout |
| `/api/bookings` | POST | Create booking |
| `/api/bookings/{id}/confirm` | POST | Confirm booking |
| `/api/bookings/my-bookings` | GET | Get user bookings |

## 🔐 Environment Variables

### Frontend (.env)
```
VITE_API_URL=http://localhost:8080/api
```

### Auth Service
```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=cineverse
DB_USER=postgres
DB_PASSWORD=postgres
JWT_SECRET=your-secret-key
```

### Movie Service
```
MONGO_URI=mongodb://localhost:27017/cineverse
REDIS_HOST=localhost
REDIS_PORT=6379
```

### Booking Service
```
DB_HOST=localhost
REDIS_HOST=localhost
RABBITMQ_HOST=localhost
```

## 🧪 Testing

### Run Backend Tests
```bash
cd backend/auth-service && mvn test
cd backend/movie-service && mvn test
cd backend/booking-service && mvn test
```

### Run Frontend Tests
```bash
cd frontend
npm test
```

## 📝 License

This project is licensed under the MIT License.

## 🔗 Links

**GitHub Repository:** [YOUR_GITHUB_REPO_URL_HERE]

**Live Demo:** [YOUR_DEPLOYMENT_URL_HERE]

## 👥 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

For support, email support@cineverse.com or open an issue in the repository.

---

Built with ❤️ by the CineVerse Team
