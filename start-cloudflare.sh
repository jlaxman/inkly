#!/bin/bash
# Run prod stack + Cloudflare Tunnel (gamma / prod servers)
# Usage: ./start-cloudflare.sh
# Requires: .env.prod with CLOUDFLARE_TUNNEL_TOKEN (see docs/CLOUDFLARE_SETUP.md)

set -e
ROOT="$(cd "$(dirname "$0")" && pwd)"
cd "$ROOT"

if [ ! -f ".env.prod" ]; then
  echo "❌ .env.prod not found. Copy .env.prod.example and set values."
  exit 1
fi

if ! grep -q "CLOUDFLARE_TUNNEL_TOKEN=.\+" .env.prod 2>/dev/null; then
  echo "❌ CLOUDFLARE_TUNNEL_TOKEN missing in .env.prod. See docs/CLOUDFLARE_SETUP.md"
  exit 1
fi

command -v docker >/dev/null 2>&1 || { echo "❌ Docker required."; exit 1; }
DC="docker compose"
command -v docker-compose >/dev/null 2>&1 && DC="docker-compose"

echo "🚀 Starting Inkly (prod + Cloudflare Tunnel)..."
$DC --env-file .env.prod -f docker-compose.prod.yml -f docker-compose.cloudflare.yml up -d --build

echo ""
echo "⏳ Waiting for services..."
sleep 20
echo "✅ Done. Tunnel connects Cloudflare → nginx:8080 → app."
echo "   gamma.inkly.co.in or www.inkly.co.in (depending on tunnel config)"
echo "   Logs: $DC -f docker-compose.prod.yml -f docker-compose.cloudflare.yml logs -f"
echo "   Stop: $DC -f docker-compose.prod.yml -f docker-compose.cloudflare.yml down"
