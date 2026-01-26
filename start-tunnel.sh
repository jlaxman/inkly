#!/bin/bash
# Free public URL via Cloudflare Tunnel (no hosting cost)
# Usage: ./start-tunnel.sh
# Requires: Docker, cloudflared (use ./bin/cloudflared or brew install cloudflared)

set -e
ROOT="$(cd "$(dirname "$0")" && pwd)"
cd "$ROOT"

command -v docker >/dev/null 2>&1 || { echo "❌ Docker required. Install: https://docker.com/get-started"; exit 1; }

CLOUDFLARED=""
[ -x "./bin/cloudflared" ] && CLOUDFLARED="./bin/cloudflared"
[ -z "$CLOUDFLARED" ] && command -v cloudflared >/dev/null 2>&1 && CLOUDFLARED="cloudflared"
[ -z "$CLOUDFLARED" ] && { echo "❌ cloudflared required. Run: ./scripts/fetch-cloudflared.sh or brew install cloudflared"; exit 1; }

DC="docker compose"
command -v docker-compose >/dev/null 2>&1 && DC="docker-compose"

echo "🐳 Starting Inkly + tunnel proxy..."
$DC -f docker-compose.yml -f docker-compose.tunnel.yml up -d --build

echo ""
echo "⏳ Waiting for services (about 30s)..."
sleep 30

echo ""
echo "🌐 Starting Cloudflare Tunnel (free public URL)..."
echo "   Keep this terminal open. Visit the URL below to share Inkly."
echo "   Ctrl+C to stop the tunnel (Docker keeps running)."
echo ""
$CLOUDFLARED tunnel --url http://localhost:8080
