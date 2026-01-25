#!/bin/bash

# Single command to set up and start everything in Docker
# This is the ONLY way to run Inkly - Docker is MANDATORY
# Usage: ./start-docker.sh

set -e

ROOT="$(cd "$(dirname "$0")" && pwd)"
cd "$ROOT"

echo "🐳 Setting up Inkly with Docker (MANDATORY)..."
echo ""

# Check Docker (REQUIRED)
command -v docker >/dev/null 2>&1 || { 
  echo "❌ Docker is REQUIRED but not found!"
  echo "   Install from: https://docker.com/get-started/"
  exit 1
}

command -v docker-compose >/dev/null 2>&1 || command -v docker compose >/dev/null 2>&1 || { 
  echo "❌ docker-compose is REQUIRED but not found!"
  echo "   Install Docker Desktop which includes docker-compose"
  exit 1
}

echo "✅ Docker found"
echo ""

# Determine docker-compose command
if command -v docker-compose &> /dev/null; then
  DOCKER_COMPOSE="docker-compose"
else
  DOCKER_COMPOSE="docker compose"
fi

# Environment variables are configured in docker-compose.yml
echo "📝 Environment configured in docker-compose.yml"
echo ""

# Build and start all services
echo "🚀 Building and starting all services..."
echo "   This will:"
echo "   - Build Docker images"
echo "   - Install dependencies"
echo "   - Set up database"
echo "   - Start all services"
echo ""

$DOCKER_COMPOSE up --build -d

echo ""
echo "⏳ Waiting for services to be ready..."
sleep 10

echo ""
echo "✅ Inkly is running in Docker!"
echo ""
echo "📍 Frontend: http://localhost:3000"
echo "📍 Backend API: http://localhost:3001/api"
echo "📍 API Docs: http://localhost:3001/api/docs"
echo ""
echo "📋 Useful commands:"
echo "   View logs:        $DOCKER_COMPOSE logs -f"
echo "   Stop services:    $DOCKER_COMPOSE down"
echo "   Restart:          $DOCKER_COMPOSE restart"
echo "   View status:      $DOCKER_COMPOSE ps"
echo ""
echo "🛑 To stop: $DOCKER_COMPOSE down"
echo ""
