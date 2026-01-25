#!/bin/bash

# Single command to set up and start frontend in Docker
# Usage: ./setup-frontend.sh

set -e

echo "🎨 Setting up Frontend in Docker..."

# Check Docker
command -v docker >/dev/null 2>&1 || { echo "❌ Docker required. Install from https://docker.com/get-started/"; exit 1; }

# Determine docker-compose command
if command -v docker-compose &> /dev/null; then
  DOCKER_COMPOSE="docker-compose"
else
  DOCKER_COMPOSE="docker compose"
fi

# Ensure backend is running (frontend depends on it)
echo "📦 Ensuring backend is running..."
$DOCKER_COMPOSE up -d backend 2>/dev/null || {
  echo "⚠️  Backend not running. Starting backend first..."
  ./setup-backend.sh
}

# Build and start frontend
echo "🚀 Building and starting frontend..."
$DOCKER_COMPOSE up -d --build frontend

echo ""
echo "✅ Frontend is running!"
echo "📍 URL: http://localhost:3000"
echo ""
echo "View logs: $DOCKER_COMPOSE logs -f frontend"
echo "Stop: $DOCKER_COMPOSE stop frontend"
