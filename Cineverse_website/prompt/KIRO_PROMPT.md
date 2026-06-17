You are building the remaining implementation for the CineVerse project.

Context:
CineVerse is a movie platform inspired by Netflix / IMDb style systems. The architecture is:
- React frontend
- Spring Boot microservices
- API Gateway
- PostgreSQL for auth and booking consistency
- MongoDB for movie catalog data
- Redis for caching and temporary seat locking
- RabbitMQ for async communication
- JWT authentication with RBAC
- Docker + CI/CD for deployment

Important requirements from the project notes:
- Frontend must have home page, auth pages, dashboard, movie catalog, movie details, booking flow, seat selection, profile, admin/theatre-owner views, and protected routes.
- Auth service must support register, login, logout, forgot password, reset password, JWT, BCrypt, RBAC.
- Movie service must support CRUD, search, pagination, sorting, reviews/ratings, and poster upload.
- Booking service must support theatre/screen models, seat layout, show scheduling, booking workflow, seat states, booking lifecycle, and double-booking prevention.
- Redis must be used for caching and for temporary seat locks with TTL.
- Gateway must centrally route and validate JWT.
- Deliver CI/CD using GitHub Actions with a `cicd.yml` file.
- Make the project ready for deployment to a web hosting platform and include a final live link placeholder.
- Keep the code modular and production-like.

Please generate the missing code and structure with the following outcome:

1. Create a clean monorepo structure:
   - /frontend
   - /backend/auth-service
   - /backend/movie-service
   - /backend/booking-service
   - /backend/gateway
   - /docs
   - /docker
   - /scripts

2. Frontend (React):
   - Use React Router.
   - Add a glass-style navbar with CineVerse branding.
   - Add pages/components for:
     - Landing/Home
     - Login / Signup
     - Dashboard
     - Movies listing
     - Movie details
     - Booking / seat selection
     - Profile
     - Admin panel
     - Theatre owner panel
   - Add protected routes based on role.
   - Use mock data first, then API-ready service files with Axios.
   - Make the UI modern and responsive.

3. Auth service (Spring Boot):
   - Endpoints: /auth/register, /auth/login, /auth/logout, /auth/forgot-password, /auth/reset-password
   - JWT creation and validation
   - BCrypt password hashing
   - Roles: USER, THEATRE_OWNER, ADMIN
   - DTOs, validation, exception handling, standardized responses

4. Movie service (Spring Boot + MongoDB):
   - Endpoints for CRUD, search, pagination, sorting, reviews, ratings, upload
   - Standardized API responses
   - MongoDB schema for movie data

5. Booking service (Spring Boot + PostgreSQL + Redis):
   - Theatre, screen, seat, show, booking entities
   - Seat layout modeling
   - Show scheduling
   - Booking lifecycle states: INITIATED, LOCKED, CONFIRMED, CANCELLED, EXPIRED
   - Redis temporary lock with TTL to prevent double booking
   - Real-time seat availability logic

6. Gateway (Spring Cloud Gateway):
   - Central route definitions
   - JWT validation
   - Logging/global filters
   - Security configuration

7. DevOps:
   - Add Dockerfiles where appropriate
   - Add a root `docker-compose.yml` if useful
   - Add GitHub Actions workflow in `.github/workflows/cicd.yml`
   - Include build, test, and deploy stages
   - Use environment variables for secrets

8. Documentation:
   - Update README with setup, run, and deployment instructions
   - Add API documentation notes
   - Add a section telling the user where to paste GitHub repo link and live deployment link

9. Output quality:
   - Ensure code compiles logically.
   - Use clear folder naming.
   - Keep naming consistent with CineVerse.
   - Prefer maintainable, readable code over over-engineered code.
   - Do not leave the structure half-baked; generate as much of the missing implementation as possible.

When finished, also provide:
- a short summary of what was created
- the GitHub repo link placeholder
- the live deployment link placeholder
- the `cicd.yml` workflow content
- the exact next steps to deploy the app
