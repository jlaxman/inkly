# Build Verification Guide

This guide helps verify that the project can be built by anyone in their Docker environment.

## ✅ Pre-Build Verification

Run the verification script:

```bash
./verify-build.sh
```

This checks:
- ✅ Docker installation
- ✅ Required files exist
- ✅ No hardcoded paths
- ✅ Scripts are executable
- ✅ Docker daemon is running

## 🚀 Build Process

### Step 1: Clone Repository

```bash
git clone <repository-url>
cd Inkly
```

### Step 2: Verify Setup

```bash
./verify-build.sh
```

### Step 3: Build and Start

```bash
./start-docker.sh
```

## 🔍 What Gets Built

### Backend Container
1. Pulls `node:24-alpine` image
2. Installs system dependencies (openssl, netcat)
3. Copies `package.json` and installs npm dependencies
4. Generates Prisma client
5. Copies source code
6. Creates uploads directory
7. Starts NestJS development server

### Frontend Container
1. Pulls `node:24-alpine` image
2. Copies `package.json` and installs npm dependencies
3. Copies source code
4. Starts Next.js development server

### Database Services
- PostgreSQL: Pre-configured with database `inkly`
- Redis: Pre-configured cache service

## ✅ Build Verification Checklist

After running `./start-docker.sh`, verify:

- [ ] All containers are running: `docker-compose ps`
- [ ] Frontend accessible: http://localhost:3000
- [ ] Backend accessible: http://localhost:3001/api
- [ ] API docs accessible: http://localhost:3001/api/docs
- [ ] No errors in logs: `docker-compose logs`

## 🐛 Common Build Issues

### Issue: "Cannot connect to Docker daemon"

**Solution:**
- Start Docker Desktop (macOS/Windows)
- Or start Docker service: `sudo systemctl start docker` (Linux)

### Issue: "Port already in use"

**Solution:**
- Stop conflicting services
- Or change ports in `docker-compose.yml`

### Issue: "Build fails during npm install"

**Solution:**
- Check internet connection
- Clear Docker cache: `docker system prune -a`
- Rebuild: `docker-compose build --no-cache`

### Issue: "Database connection fails"

**Solution:**
- Wait for database to be healthy: `docker-compose ps`
- Check database logs: `docker-compose logs postgres`
- Restart: `docker-compose restart postgres`

## 🔄 Fresh Build (Clean Slate)

If you want to start completely fresh:

```bash
# Stop and remove everything
docker-compose down -v

# Remove all images
docker-compose down --rmi all

# Rebuild from scratch
./start-docker.sh
```

## 📊 Build Time Estimates

Typical build times:
- First build: 3-5 minutes (downloads images, installs dependencies)
- Subsequent builds: 30-60 seconds (uses cache)
- Rebuild without cache: 3-5 minutes

## ✅ Success Indicators

You'll know the build succeeded when:

1. **Containers are running:**
   ```bash
   docker-compose ps
   # Should show all 4 services: postgres, redis, backend, frontend
   ```

2. **Services respond:**
   ```bash
   curl http://localhost:3001/api/health
   curl http://localhost:3000
   ```

3. **No errors in logs:**
   ```bash
   docker-compose logs | grep -i error
   # Should return nothing
   ```

## 🎯 Build Requirements

- **Docker**: Version 20.10+
- **Docker Compose**: Version 2.0+
- **Disk Space**: ~2GB for images and dependencies
- **Memory**: 4GB+ RAM recommended
- **Network**: Internet connection for first build

## 📝 Notes

- All paths are relative - works from any directory
- No local Node.js installation needed
- All dependencies installed in containers
- Database automatically set up on first run
- Environment variables configured in `docker-compose.yml`

## ❓ Still Having Issues?

1. Run `./verify-build.sh` to check setup
2. Check `docker-compose logs` for errors
3. Verify Docker is running: `docker ps`
4. Try fresh build: `docker-compose down -v && ./start-docker.sh`
