#!/bin/bash
# Production deployment
# Usage: ./deploy.sh
# Requires: .env.prod (see .env.prod.example)

set -e

if [ ! -f ".env.prod" ]; then
  echo "❌ .env.prod not found. Copy .env.prod.example and set values."
  exit 1
fi

command -v docker >/dev/null 2>&1 || { echo "❌ Docker required."; exit 1; }
DOCKER_COMPOSE="docker compose"
command -v docker-compose >/dev/null 2>&1 && DOCKER_COMPOSE="docker-compose"

echo "🚀 Building and starting production stack..."
$DOCKER_COMPOSE --env-file .env.prod -f docker-compose.prod.yml build --no-cache
$DOCKER_COMPOSE --env-file .env.prod -f docker-compose.prod.yml up -d

echo ""
echo "⏳ Waiting for services..."
sleep 15
echo "✅ Done. Frontend: http://localhost:3000  Backend: http://localhost:3001/api"
echo "   Logs: $DOCKER_COMPOSE -f docker-compose.prod.yml logs -f"
echo "   Stop: $DOCKER_COMPOSE -f docker-compose.prod.yml down"
