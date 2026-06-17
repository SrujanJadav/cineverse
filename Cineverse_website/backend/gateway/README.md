# API Gateway

Centralized API Gateway for CineVerse using Spring Cloud Gateway.

## Features
- Route management for all microservices
- JWT token validation
- CORS configuration
- Request/response logging
- Centralized security

## Routes

- /api/auth/** → Auth Service (8081)
- /api/movies/** → Movie Service (8082)
- /api/bookings/** → Booking Service (8083)

## Setup

### Environment Variables
```
AUTH_SERVICE_URL=http://localhost:8081
MOVIE_SERVICE_URL=http://localhost:8082
BOOKING_SERVICE_URL=http://localhost:8083
JWT_SECRET=your-secret-key
```

### Run
```bash
mvn spring-boot:run
```

## Implementation Notes

Gateway is configured with basic routes. JWT validation filter can be added for enhanced security.

Key components needed:
- JWT validation filter
- Request logging filter
- Rate limiting (optional)
- Circuit breaker (optional)
