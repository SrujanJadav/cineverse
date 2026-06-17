# 🚀 CineVerse Deployment Guide

This guide will help you deploy CineVerse to production.

## Prerequisites Checklist

- [ ] GitHub account
- [ ] Docker Hub account (for container images)
- [ ] Domain name (optional but recommended)
- [ ] Hosting platform account (choose one below)

## Step-by-Step Deployment

### Step 1: Push Code to GitHub

**ACTION REQUIRED FROM YOU:**

1. Create a new repository on GitHub:
   - Go to https://github.com/new
   - Name it `cineverse` (or your preferred name)
   - Make it public or private
   - Don't initialize with README (we already have one)

2. Push your code:
   ```bash
   cd c:\Users\sruja\Downloads\Cineverse_website\Cineverse_website
   git init
   git add .
   git commit -m "Initial commit - CineVerse Platform"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/cineverse.git
   git push -u origin main
   ```

   **Replace `YOUR_USERNAME` with your actual GitHub username**

### Step 2: Configure GitHub Secrets

**ACTION REQUIRED FROM YOU:**

1. Go to your repository on GitHub
2. Click `Settings` → `Secrets and variables` → `Actions`
3. Add these secrets:

   ```
   DOCKERHUB_USERNAME = your-dockerhub-username
   DOCKERHUB_TOKEN = your-dockerhub-access-token
   API_URL = https://your-api-domain.com/api
   ```

   **To get Docker Hub token:**
   - Go to https://hub.docker.com/settings/security
   - Click "New Access Token"
   - Copy the token and add to GitHub secrets

### Step 3: Choose Deployment Platform

Pick ONE of these options based on your needs:

---

## Option A: Render.com (Easiest - FREE tier available)

**Best for:** Quick deployment, beginners, free hosting

**ACTION REQUIRED FROM YOU:**

1. **Sign up at https://render.com**

2. **Deploy Frontend:**
   - Click "New +" → "Static Site"
   - Connect your GitHub repo
   - Settings:
     ```
     Build Command: cd frontend && npm install && npm run build
     Publish Directory: frontend/dist
     ```

3. **Deploy Backend Services:**
   
   For each service (auth, movie, booking, gateway):
   - Click "New +" → "Web Service"
   - Connect GitHub repo
   - Settings:
     ```
     Root Directory: backend/auth-service (change for each)
     Build Command: mvn clean package -DskipTests
     Start Command: java -jar target/*.jar
     ```
   
   Set environment variables for each service (see section below)

4. **Deploy Databases:**
   - PostgreSQL: Click "New +" → "PostgreSQL"
   - MongoDB: Use MongoDB Atlas (free tier)
   - Redis: Click "New +" → "Redis"

5. **Get your URLs and update frontend:**
   - Copy the gateway URL
   - Add environment variable to frontend: `VITE_API_URL=https://your-gateway-url/api`

---

## Option B: Railway.app (Easy - $5/month)

**Best for:** Simple deployment with databases included

**ACTION REQUIRED FROM YOU:**

1. **Sign up at https://railway.app**

2. **Create new project:**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Connect your cineverse repository

3. **Add services:**
   - Add PostgreSQL (from template)
   - Add MongoDB (from template)
   - Add Redis (from template)

4. **Deploy each service:**
   - Frontend, Auth, Movie, Booking, Gateway
   - Railway auto-detects Dockerfiles
   - Set environment variables (see below)

5. **Configure domains:**
   - Each service gets a public URL
   - Update frontend with gateway URL

---

## Option C: DigitalOcean App Platform ($12-30/month)

**Best for:** Production-ready with good performance

**ACTION REQUIRED FROM YOU:**

1. **Sign up at https://www.digitalocean.com**

2. **Create app:**
   - Go to "Apps" → "Create App"
   - Connect GitHub repository
   - DigitalOcean detects services automatically

3. **Configure components:**
   - Detected: Frontend (Static Site)
   - Detected: 4 Backend services (Web Service)
   - Add: PostgreSQL database
   - Add: MongoDB database  
   - Add: Redis database

4. **Set environment variables** (see below)

5. **Deploy**
   - Review and click "Create Resources"
   - Wait 10-15 minutes for deployment

---

## Option D: AWS (Advanced - Variable cost)

**Best for:** Enterprise, scaling, full control

**ACTION REQUIRED FROM YOU:**

1. **Setup AWS Account**

2. **Push images to ECR:**
   ```bash
   aws ecr create-repository --repository-name cineverse-frontend
   docker build -t cineverse-frontend ./frontend
   docker tag cineverse-frontend:latest AWS_ACCOUNT.dkr.ecr.REGION.amazonaws.com/cineverse-frontend:latest
   docker push AWS_ACCOUNT.dkr.ecr.REGION.amazonaws.com/cineverse-frontend:latest
   ```

3. **Create ECS Cluster:**
   - Go to ECS → Create Cluster
   - Choose Fargate
   - Create task definitions for each service

4. **Setup RDS, DocumentDB, ElastiCache:**
   - PostgreSQL: RDS
   - MongoDB: DocumentDB
   - Redis: ElastiCache

5. **Configure Application Load Balancer**

6. **Update GitHub Actions:**
   - Add AWS credentials to secrets
   - Uncomment AWS deployment section in `.github/workflows/cicd.yml`

---

## Option E: Docker VPS (Self-hosted - $5-20/month)

**Best for:** Full control, cost-effective

**ACTION REQUIRED FROM YOU:**

1. **Get a VPS:**
   - DigitalOcean Droplet
   - Linode
   - Vultr
   - AWS EC2

2. **SSH into server:**
   ```bash
   ssh root@your-server-ip
   ```

3. **Install Docker:**
   ```bash
   curl -fsSL https://get.docker.com -o get-docker.sh
   sh get-docker.sh
   ```

4. **Clone and deploy:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/cineverse.git
   cd cineverse
   docker-compose up -d
   ```

5. **Setup Nginx reverse proxy:**
   ```bash
   apt install nginx
   # Configure nginx to point to localhost:3000
   ```

6. **Setup SSL with Let's Encrypt:**
   ```bash
   apt install certbot python3-certbot-nginx
   certbot --nginx -d yourdomain.com
   ```

---

## Environment Variables Reference

### Frontend
```
VITE_API_URL=https://your-gateway-url/api
```

### Auth Service
```
DB_HOST=your-postgres-host
DB_PORT=5432
DB_NAME=cineverse
DB_USER=your-db-user
DB_PASSWORD=your-db-password
JWT_SECRET=generate-a-long-random-secret-key-here
```

### Movie Service
```
MONGO_URI=mongodb://user:pass@your-mongo-host:27017/cineverse
REDIS_HOST=your-redis-host
REDIS_PORT=6379
```

### Booking Service
```
DB_HOST=your-postgres-host
DB_PORT=5432
DB_NAME=cineverse
DB_USER=your-db-user
DB_PASSWORD=your-db-password
REDIS_HOST=your-redis-host
REDIS_PORT=6379
RABBITMQ_HOST=your-rabbitmq-host
RABBITMQ_PORT=5672
```

### Gateway
```
AUTH_SERVICE_URL=http://auth-service:8081
MOVIE_SERVICE_URL=http://movie-service:8082
BOOKING_SERVICE_URL=http://booking-service:8083
JWT_SECRET=same-as-auth-service-secret
```

---

## Post-Deployment Steps

**ACTION REQUIRED FROM YOU:**

1. **Test the deployment:**
   - Visit your frontend URL
   - Try registering a user
   - Try logging in
   - Browse movies
   - Test booking flow

2. **Update README with your URLs:**
   - Edit `README.md`
   - Replace `[YOUR_GITHUB_REPO_URL_HERE]` with your GitHub URL
   - Replace `[YOUR_DEPLOYMENT_URL_HERE]` with your live site URL

3. **Setup monitoring (optional):**
   - Add application monitoring (Sentry, DataDog, New Relic)
   - Setup uptime monitoring (UptimeRobot, Pingdom)
   - Configure log aggregation

4. **Setup CI/CD:**
   - GitHub Actions workflow is already configured
   - On every push to `main` branch, it will:
     - Build and test
     - Create Docker images
     - Push to Docker Hub
     - Deploy (if configured)

---

## Troubleshooting

### Build Fails
- Check Java version (needs 17+)
- Check Node version (needs 18+)
- Review build logs for specific errors

### Database Connection Issues
- Verify connection strings
- Check if database is running
- Verify firewall rules allow connections

### CORS Errors
- Update CORS configuration in Gateway
- Ensure frontend URL is whitelisted

### 502 Bad Gateway
- Check if backend services are running
- Verify service URLs in Gateway configuration
- Check logs: `docker-compose logs service-name`

---

## Quick Start (After Deployment)

Your platform will be live at:
- **Frontend:** `https://your-frontend-url.com`
- **API:** `https://your-api-url.com/api`

Default test account (you can create via signup):
- Email: admin@cineverse.com
- Password: admin123
- Role: ADMIN

---

## Need Help?

- **GitHub Issues:** Open an issue in your repository
- **Documentation:** Check README.md and service-specific READMEs
- **Logs:** Use `docker-compose logs` or platform-specific log viewers

---

## Estimated Costs

| Platform | Monthly Cost | Notes |
|----------|-------------|-------|
| Render.com | $0-25 | Free tier available, upgrade for production |
| Railway.app | $5-20 | $5 minimum, scales with usage |
| DigitalOcean | $12-30 | Predictable pricing |
| AWS | $20-100+ | Pay per use, can optimize |
| VPS Self-hosted | $5-20 | Best value, requires setup |

---

**🎉 Congratulations! Your CineVerse platform is now live!**
