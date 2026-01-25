#!/bin/bash

# Production deployment script
# Usage: ./deploy.sh

set -e

echo "🚀 Deploying Inkly to production..."
echo ""

# Check for .env.prod file
if [ ! -f ".env.prod" ]; then
  echo "❌ .env.prod file not found!"
  echo "   Create .env.prod with production environment variables"
  exit 1
fi

# Load production environment variables
export $(cat .env.prod | grep -v '^#' | xargs)

# Check Docker
command -v docker >/dev/null 2>&1 || { 
  echo "❌ Docker is required!"
  exit 1
}

# Determine docker-compose command
if command -v docker-compose &> /dev/null; then
  DOCKER_COMPOSE="docker-compose"
else
  DOCKER_COMPOSE="docker compose"
fi

echo "📦 Building production images..."
$DOCKER_COMPOSE -f docker-compose.prod.yml build --no-cache

echo ""
echo "🛑 Stopping existing containers..."
$DOCKER_COMPOSE -f docker-compose.prod.yml down

echo ""
echo "🚀 Starting production services..."
$DOCKER_COMPOSE -f docker-compose.prod.yml up -d

echo ""
echo "⏳ Waiting for services to be ready..."
sleep 15

echo ""
echo "✅ Deployment complete!"
echo ""
echo "📍 Services:"
echo "   Frontend: ${FRONTEND_URL:-http://localhost:3000}"
echo "   Backend API: ${NEXT_PUBLIC_API_URL:-http://localhost:3001/api}"
echo ""
echo "📋 Useful commands:"
echo "   View logs: $DOCKER_COMPOSE -f docker-compose.prod.yml logs -f"
echo "   Stop: $DOCKER_COMPOSE -f docker-compose.prod.yml down"
echo "   Status: $DOCKER_COMPOSE -f docker-compose.prod.yml ps"
echo ""
