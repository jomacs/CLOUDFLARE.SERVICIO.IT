# Docker Deployment Guide

This project includes Docker support for both development and production environments.

## Prerequisites

- Docker Engine 20.10+ 
- Docker Compose 2.0+

## Quick Start

### Development Mode

Run the application in development mode with hot reload:

```bash
# Start development containers
docker-compose -f docker-compose.dev.yml up --build

# Run in detached mode
docker-compose -f docker-compose.dev.yml up -d --build

# View logs
docker-compose -f docker-compose.dev.yml logs -f

# Stop containers
docker-compose -f docker-compose.dev.yml down
```

Development URLs:
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001

### Production Mode

Run the application in production mode:

```bash
# Start production containers
docker-compose up --build -d

# View logs
docker-compose logs -f

# Stop containers
docker-compose down
```

Production URLs:
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001

### With Nginx Reverse Proxy

To use the included Nginx reverse proxy (production):

```bash
# Start with nginx profile
docker-compose --profile production up -d

# Access via Nginx
# http://localhost:80
```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
CLOUDFLARE_API_KEY=your_api_key_here
CLOUDFLARE_EMAIL=your_email@example.com
CLOUDFLARE_ACCOUNT_ID=your_account_id

NODE_ENV=production
JWT_SECRET=your_jwt_secret_here

ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_secure_password
```

## Docker Commands

### View Running Containers
```bash
docker-compose ps
```

### View Container Logs
```bash
# All containers
docker-compose logs -f

# Specific container
docker-compose logs -f backend
docker-compose logs -f frontend
```

### Restart Containers
```bash
# Restart all
docker-compose restart

# Restart specific service
docker-compose restart backend
```

### Execute Commands in Container
```bash
# Access backend shell
docker-compose exec backend sh

# Access frontend shell
docker-compose exec frontend sh
```

### Clean Up

```bash
# Stop and remove containers, networks
docker-compose down

# Stop and remove containers, networks, and volumes
docker-compose down -v

# Remove all unused Docker resources
docker system prune -a
```

## Building Individual Images

### Backend
```bash
docker build -f Dockerfile.backend -t cloudflare-backend .
docker run -p 3001:3001 --env-file .env cloudflare-backend
```

### Frontend
```bash
docker build -f Dockerfile.frontend -t cloudflare-frontend .
docker run -p 3000:80 cloudflare-frontend
```

## Development Features

The development setup includes:

- 🔄 Hot reload for both frontend and backend
- 📁 Volume mounts for live code updates
- 🐛 Full debugging support
- 📊 Real-time log streaming

## Production Features

The production setup includes:

- 🏗️ Multi-stage builds for smaller images
- 🔒 Security headers via Nginx
- 💨 Gzip compression
- 🚀 Optimized React build
- ❤️ Health checks
- 🔄 Automatic restarts

## Troubleshooting

### Port Already in Use
```bash
# Find process using port 3000 or 3001
sudo fuser -k 3000/tcp
sudo fuser -k 3001/tcp
```

### Permission Denied
```bash
# Add user to docker group
sudo usermod -aG docker $USER
newgrp docker
```

### Container Won't Start
```bash
# Check logs
docker-compose logs backend
docker-compose logs frontend

# Rebuild without cache
docker-compose build --no-cache
docker-compose up -d
```

### Network Issues
```bash
# Remove and recreate networks
docker-compose down
docker network prune
docker-compose up -d
```

## Performance Optimization

### Reduce Build Time
- Use `.dockerignore` to exclude unnecessary files
- Layer caching: change frequently modified files last
- Use `npm ci` instead of `npm install` in production

### Reduce Image Size
- Use Alpine Linux base images
- Multi-stage builds
- Remove dev dependencies in production
- Use `.dockerignore` effectively

## Security Best Practices

1. **Never commit `.env` file** - Use `.env.example` as template
2. **Use secrets management** - For production, use Docker secrets or env variables from orchestrator
3. **Run as non-root user** - Consider adding USER directive in Dockerfile
4. **Keep images updated** - Regularly rebuild with latest base images
5. **Scan for vulnerabilities** - Use `docker scan` or similar tools

## CI/CD Integration

Example GitHub Actions workflow:

```yaml
name: Docker Build and Push

on:
  push:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Build images
        run: docker-compose build
      
      - name: Run tests
        run: docker-compose run backend npm test
      
      - name: Push to registry
        run: |
          echo ${{ secrets.DOCKER_PASSWORD }} | docker login -u ${{ secrets.DOCKER_USERNAME }} --password-stdin
          docker-compose push
```

## Monitoring

Add monitoring tools:

```yaml
# In docker-compose.yml
  prometheus:
    image: prom/prometheus
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
    ports:
      - "9090:9090"
```

## Support

For issues or questions:
- Check container logs: `docker-compose logs`
- Verify environment variables: `docker-compose config`
- Ensure ports are available: `netstat -tulpn`
