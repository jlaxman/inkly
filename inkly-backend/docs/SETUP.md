# Setup Guide

Complete setup guide for new collaborators.

## 🚀 Quick Setup (5 minutes)

### Prerequisites

1. **Install Docker**
   - macOS: [Docker Desktop for Mac](https://www.docker.com/products/docker-desktop)
   - Linux: [Docker Engine](https://docs.docker.com/engine/install/)
   - Windows: [Docker Desktop for Windows](https://www.docker.com/products/docker-desktop)

2. **Verify Installation**
   ```bash
   docker --version
   docker-compose --version
   ```

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Inkly
   ```

2. **Start the application**
   ```bash
   ./start-docker.sh
   ```

3. **Wait for services to start** (about 30-60 seconds)

4. **Verify it's working**
   - Open http://localhost:3000 (Frontend)
   - Open http://localhost:3001/api/docs (API Documentation)

5. **Set up testing** (one-time)
   ```bash
   ./setup-tests.sh
   ```

That's it! You're ready to develop.

## 🔍 Verify Setup

### Check Services

```bash
docker-compose ps
```

You should see:
- `inkly-postgres` - Running (healthy)
- `inkly-redis` - Running (healthy)
- `inkly-backend` - Running
- `inkly-frontend` - Running

### Test Endpoints

```bash
# Backend health check
curl http://localhost:3001/api/health

# Frontend
curl http://localhost:3000
```

## 🧪 Run Tests

```bash
# All tests
npm test

# Backend only
npm run test:backend

# Frontend only
npm run test:frontend
```

## 🛠️ Development

### Access Containers

```bash
# Backend container
docker-compose exec backend sh

# Frontend container
docker-compose exec frontend sh
```

### View Logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
```

### Database Access

```bash
# Prisma Studio (GUI)
docker-compose exec backend npx prisma studio
# Visit http://localhost:5555

# PostgreSQL CLI
docker-compose exec postgres psql -U user -d inkly
```

## 🐛 Troubleshooting

### Docker not running

```bash
# Start Docker Desktop (macOS/Windows)
# Or start Docker service (Linux)
sudo systemctl start docker
```

### Port conflicts

If ports 3000 or 3001 are in use:
1. Stop the conflicting service
2. Or change ports in `docker-compose.yml`

### Services won't start

```bash
# Check logs
docker-compose logs

# Restart
docker-compose restart

# Fresh start
docker-compose down -v
./start-docker.sh
```

### Permission errors (Linux)

```bash
# Add user to docker group
sudo usermod -aG docker $USER
# Log out and back in
```

## 📚 Next Steps

- Read [CONTRIBUTING.md](./CONTRIBUTING.md) for contribution guidelines
- Read [TESTING.md](./TESTING.md) for testing information
- Read [DOCKER_SETUP.md](./DOCKER_SETUP.md) for detailed Docker guide

## ❓ Need Help?

1. Check the [Troubleshooting](#-troubleshooting) section
2. Review [DOCKER_SETUP.md](./DOCKER_SETUP.md)
3. Check existing GitHub issues
4. Create a new issue if needed
