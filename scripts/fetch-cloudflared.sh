#!/bin/bash
# Download cloudflared into bin/ (macOS ARM64). Run from repo root.
# Usage: ./scripts/fetch-cloudflared.sh

set -e
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

ARCH=$(uname -m)
case "$(uname -s)" in
  Darwin)
    [ "$ARCH" = "arm64" ] && TGZ="cloudflared-darwin-arm64.tgz" || TGZ="cloudflared-darwin-amd64.tgz"
    ;;
  Linux)
    [ "$ARCH" = "aarch64" ] && TGZ="cloudflared-linux-arm64" || TGZ="cloudflared-linux-amd64"
    ;;
  *)
    echo "Unsupported OS. Install cloudflared manually: https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/install-and-setup/installation/"
    exit 1
    ;;
esac

mkdir -p bin
URL="https://github.com/cloudflare/cloudflared/releases/latest/download/$TGZ"

if [[ "$TGZ" == *.tgz ]]; then
  curl -sL -o bin/cloudflared.tgz "$URL"
  (cd bin && tar xzf cloudflared.tgz && rm -f cloudflared.tgz)
else
  curl -sL -o bin/cloudflared "$URL"
fi
chmod +x bin/cloudflared
echo "✅ bin/cloudflared ready. Run ./start-tunnel.sh"
