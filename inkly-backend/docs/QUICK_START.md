# Quick Start Guide

**Docker is MANDATORY** - Single commands to set up everything!

## 🚀 Single Commands

### Setup Everything

```bash
./start-docker.sh
```

This single command sets up and starts:
- ✅ PostgreSQL database
- ✅ Redis cache
- ✅ Backend API (NestJS)
- ✅ Frontend (Next.js)

**Result:** Full application running at:
- Frontend: http://localhost:3000
- Backend: http://localhost:3001/api
- API Docs: http://localhost:3001/api/docs

### Setup Backend Only

```bash
./setup-backend.sh
```

This single command:
- ✅ Starts PostgreSQL & Redis
- ✅ Builds backend Docker image
- ✅ Installs dependencies
- ✅ Sets up database
- ✅ Starts backend server

**Result:** Backend running at http://localhost:3001/api

### Setup Frontend Only

```bash
./setup-frontend.sh
```

This single command:
- ✅ Ensures backend is running
- ✅ Builds frontend Docker image
- ✅ Installs dependencies
- ✅ Starts frontend server

**Result:** Frontend running at http://localhost:3000

## 🛑 Stop Everything

```bash
docker-compose down
```

## 📊 View Status

```bash
docker-compose ps
```

## 📋 View Logs

```bash
docker-compose logs -f
```

## 🔄 Rebuild

```bash
docker-compose up -d --build
```

## ✅ That's It!

No local Node.js, npm, or any other dependencies needed. Everything runs in Docker!
