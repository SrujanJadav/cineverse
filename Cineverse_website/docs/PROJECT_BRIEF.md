# Project Brief

## Project name
CineVerse Website

## Goal
Build a scalable movie platform with a modern frontend and Spring Boot microservices backend.

## Core modules
### 1. Frontend
- React SPA
- Static UI first, then API integration
- Routing, protected routes, dashboard, movie catalog, booking flow

### 2. Authentication Service
- Register, login, logout, forgot password, reset password
- JWT generation and validation
- BCrypt password hashing
- RBAC roles: USER, THEATRE_OWNER, ADMIN

### 3. Movie Catalog Service
- MongoDB-based movie documents
- CRUD endpoints
- Search by title / genre / rating
- Pagination and sorting
- Reviews and ratings
- Poster upload and response standardization

### 4. Booking Service
- Theatre, screen, seat, and show models
- Seat layout and booking lifecycle
- Double-booking prevention
- Temporary seat locking

### 5. Redis Layer
- Cache movie/show data
- Temporary seat locks with TTL
- Distributed locking support

### 6. API Gateway
- Centralized routing
- JWT validation
- Logging and security filters
- Route all service traffic through gateway

### 7. DevOps
- Dockerize services
- Add GitHub Actions CI/CD
- Deploy frontend and backend services
