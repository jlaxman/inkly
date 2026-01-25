# Docker Setup Guide

**Docker is MANDATORY for this project.** Everything runs in containers - no local Node.js needed!

## 🚀 Single Command Setup

### Setup Everything

```bash
./start-docker.sh
```

This single command:
- ✅ Checks Docker installation
- ✅ Sets up environment files
- ✅ Builds all Docker images
- ✅ Starts all services (PostgreSQL, Redis, Backend, Frontend)
- ✅ Configures database
- ✅ Starts development servers

### Setup Backend Only

```bash
./setup-backend.sh
```

This single command:
- ✅ Starts dependencies (PostgreSQL, Redis)
- ✅ Builds backend Docker image
- ✅ Installs dependencies
- ✅ Generates Prisma client
- ✅ Runs database migrations
- ✅ Starts backend server

### Setup Frontend Only

```bash
./setup-frontend.sh
```

This single command:
- ✅ Ensures backend is running
- ✅ Builds frontend Docker image
- ✅ Installs dependencies
- ✅ Starts frontend development server

## 📋 What Each Service Does

### Backend Container
- Installs all npm dependencies
- Generates Prisma client
- Runs database migrations
- Starts NestJS development server
- Auto-reloads on code changes

### Frontend Container
- Installs all npm dependencies
- Starts Next.js development server
- Auto-reloads on code changes
- Hot module replacement enabled

### Database (PostgreSQL)
- Pre-configured database
- Persistent data storage
- Health checks enabled

### Cache (Redis)
- Pre-configured cache
- Persistent data storage
- Health checks enabled

## 🔧 Common Operations

### Start Services

```bash
# All services
docker-compose up -d

# Specific service
docker-compose up -d backend
docker-compose up -d frontend
```

### Stop Services

```bash
# All services
docker-compose down

# Specific service
docker-compose stop backend
docker-compose stop frontend
```

### View Logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
```

### Rebuild

```bash
# Rebuild all
docker-compose up -d --build

# Rebuild specific service
docker-compose up -d --build backend
docker-compose up -d --build frontend

# Fresh rebuild (no cache)
docker-compose build --no-cache
docker-compose up -d
```

## 🧪 Testing in Docker

All tests run inside containers:

```bash
# Run all tests
npm test

# Backend tests
docker-compose exec backend npm test

# Frontend tests
docker-compose exec frontend npm test
```

## 🗄️ Database Operations

### Access Database

```bash
# Prisma Studio (GUI)
docker-compose exec backend npx prisma studio
# Visit http://localhost:5555

# PostgreSQL CLI
docker-compose exec postgres psql -U user -d inkly
```

### Database Commands

```bash
# Generate Prisma client
docker-compose exec backend npm run prisma:generate

# Run migrations
docker-compose exec backend npx prisma migrate dev

# Push schema (development)
docker-compose exec backend npx prisma db push
```

## 🧹 Cleanup

```bash
# Stop and remove containers
docker-compose down

# Remove containers, volumes, and networks
docker-compose down -v

# Remove everything including images
docker-compose down -v --rmi all
```

## 🐛 Troubleshooting

### Container won't start

```bash
# Check logs
docker-compose logs [service-name]

# Check status
docker-compose ps

# Restart
docker-compose restart [service-name]
```

### Port conflicts

If ports are in use, edit `docker-compose.yml` to change:
- Frontend: `3000:3000` → `3002:3000`
- Backend: `3001:3001` → `3003:3001`

### Fresh start

```bash
# Complete cleanup
docker-compose down -v

# Rebuild everything
./start-docker.sh
```

### Dependencies not installing

```bash
# Rebuild without cache
docker-compose build --no-cache
docker-compose up -d
```

## 📝 Environment Variables

All environment variables are in `docker-compose.yml`. No local `.env` files needed!

To customize:
1. Edit `docker-compose.yml`
2. Rebuild: `docker-compose up -d --build`

## ✅ Verification

After setup, verify everything is running:

```bash
# Check all services
docker-compose ps

# Should show:
# - inkly-postgres (healthy)
# - inkly-redis (healthy)
# - inkly-backend (running)
# - inkly-frontend (running)

# Test endpoints
curl http://localhost:3001/api/health
curl http://localhost:3000
```

## 🎯 Quick Reference

| Task | Command |
|------|---------|
| Setup everything | `./start-docker.sh` |
| Setup backend | `./setup-backend.sh` |
| Setup frontend | `./setup-frontend.sh` |
| Stop all | `docker-compose down` |
| View logs | `docker-compose logs -f` |
| Rebuild | `docker-compose up -d --build` |
| Run tests | `npm test` |
