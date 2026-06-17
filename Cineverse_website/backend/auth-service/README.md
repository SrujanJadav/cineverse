# Auth Service

Authentication and Authorization service for CineVerse platform.

## Features
- User registration with email/password
- JWT-based authentication
- BCrypt password hashing
- Role-based access control (USER, THEATRE_OWNER, ADMIN)
- Forgot password / Reset password functionality
- Token validation

## API Endpoints

### POST /api/auth/register
Register a new user

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "USER"
}
```

### POST /api/auth/login
Login with email and password

**Request:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGc...",
    "type": "Bearer",
    "userId": 1,
    "email": "john@example.com",
    "name": "John Doe",
    "role": "USER"
  }
}
```

### POST /api/auth/forgot-password
Request password reset

### POST /api/auth/reset-password
Reset password with token

### GET /api/auth/me
Get current user details (requires authentication)

## Setup

### Prerequisites
- Java 17+
- Maven 3.6+
- PostgreSQL

### Environment Variables
```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=cineverse_auth
DB_USER=postgres
DB_PASSWORD=postgres
JWT_SECRET=your-secret-key
```

### Run
```bash
mvn spring-boot:run
```

## Database Schema

**users** table:
- id (BIGINT, PK)
- name (VARCHAR)
- email (VARCHAR, UNIQUE)
- password (VARCHAR)
- role (VARCHAR)
- is_active (BOOLEAN)
- reset_token (VARCHAR)
- reset_token_expiry (TIMESTAMP)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
