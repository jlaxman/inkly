#!/bin/bash

# Single command to set up and start backend in Docker
# Usage: ./setup-backend.sh

set -e

echo "🔧 Setting up Backend in Docker..."

# Check Docker
command -v docker >/dev/null 2>&1 || { echo "❌ Docker required. Install from https://docker.com/get-started/"; exit 1; }

# Determine docker-compose command
if command -v docker-compose &> /dev/null; then
  DOCKER_COMPOSE="docker-compose"
else
  DOCKER_COMPOSE="docker compose"
fi

# Ensure dependencies (postgres, redis) are running
echo "📦 Starting dependencies (PostgreSQL, Redis)..."
$DOCKER_COMPOSE up -d postgres redis

echo "⏳ Waiting for database to be ready..."
sleep 5

# Build and start backend
echo "🚀 Building and starting backend..."
$DOCKER_COMPOSE up -d --build backend

echo ""
echo "✅ Backend is running!"
echo "📍 API: http://localhost:3001/api"
echo "📍 Docs: http://localhost:3001/api/docs"
echo ""
echo "View logs: $DOCKER_COMPOSE logs -f backend"
echo "Stop: $DOCKER_COMPOSE stop backend"
