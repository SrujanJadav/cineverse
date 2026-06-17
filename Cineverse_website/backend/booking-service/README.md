# Booking Service

Booking and theatre management service for CineVerse.

## Features
- Theatre and screen management
- Show scheduling
- Seat layout modeling
- Booking workflow with state machine
- Redis-based seat locking with TTL
- Double-booking prevention
- RabbitMQ event publishing

## API Endpoints

- GET /api/bookings/theatres - List theatres
- GET /api/bookings/shows - Get shows by movie/date
- GET /api/bookings/shows/{id}/seats - Get seat layout
- POST /api/bookings/shows/{id}/lock - Lock seats temporarily
- POST /api/bookings - Create booking
- POST /api/bookings/{id}/confirm - Confirm booking
- POST /api/bookings/{id}/cancel - Cancel booking
- GET /api/bookings/my-bookings - Get user bookings

## Booking States
- INITIATED - Booking created
- LOCKED - Seats temporarily reserved (10 min TTL)
- CONFIRMED - Payment successful, booking confirmed
- CANCELLED - User cancelled
- EXPIRED - Lock timeout expired

## Setup

### Environment Variables
```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=cineverse
DB_USER=postgres
DB_PASSWORD=postgres
REDIS_HOST=localhost
REDIS_PORT=6379
RABBITMQ_HOST=localhost
RABBITMQ_PORT=5672
```

### Run
```bash
mvn spring-boot:run
```

## Implementation Notes

This service needs to be fully implemented. Use auth-service as reference.

Key components needed:
- Models: Theatre, Screen, Seat, Show, Booking
- Repositories for all entities
- BookingService with Redis seat locking
- BookingController with all endpoints
- RabbitMQ configuration and publishers
