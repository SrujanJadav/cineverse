# Movie Service

Movie catalog service for CineVerse using MongoDB.

## Features
- CRUD operations for movies
- Search and filtering
- Pagination and sorting
- Reviews and ratings
- Poster image upload
- Redis caching

## API Endpoints

- GET /api/movies - List all movies
- GET /api/movies/{id} - Get movie by ID  
- POST /api/movies - Create movie (Admin)
- PUT /api/movies/{id} - Update movie (Admin)
- DELETE /api/movies/{id} - Delete movie (Admin)
- GET /api/movies/search - Search movies
- POST /api/movies/{id}/reviews - Add review
- GET /api/movies/{id}/reviews - Get reviews

## Setup

### Environment Variables
```
MONGO_URI=mongodb://localhost:27017/cineverse
REDIS_HOST=localhost
REDIS_PORT=6379
```

### Run
```bash
mvn spring-boot:run
```

## Implementation Notes

This service needs to be fully implemented. Use auth-service as reference.

Key components needed:
- Movie model (@Document)
- MovieRepository (MongoRepository)
- MovieService (business logic)
- MovieController (@RestController)
- Review model and endpoints
- Redis caching setup
