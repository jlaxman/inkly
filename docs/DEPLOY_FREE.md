# Deploy Inkly for Free (Public URL)

Two **free** options: **Cloudflare Tunnel** (instant, $0) and **Oracle Cloud Free Tier** (always-on VPS, $0).  
You get URLs like `https://xxx.trycloudflare.com` or `http://<VM-IP>:3000` — **not** a custom domain.

**Want www.inkly.co.in / gamma.inkly.co.in?** You must **buy inkly.co.in** first, then use Cloudflare Tunnel. See **`docs/DOMAIN_AND_DEPLOY.md`**.

---

## 1. Cloudflare Tunnel — free, instant public URL

**Cost:** $0 • **URL:** `https://xxx.trycloudflare.com` (random subdomain, new each run)

**Note:** Quick tunnels use **random subdomains** (e.g. `subject-presidential-pixel-reference.trycloudflare.com`). For a **custom subdomain** like `inkly.ml` or `www.inkly.co.in`, use a **named tunnel** with your own domain (see **`docs/CLOUDFLARE_SETUP.md`** or **`docs/DOMAIN_AND_DEPLOY.md`**).

Run Inkly locally in Docker and expose it via Cloudflare. No hosting, no sign-up for servers.

### 1. Install cloudflared

- **Option A (in-repo):** `./scripts/fetch-cloudflared.sh` → downloads `bin/cloudflared` (no brew)
- **macOS:** `brew install cloudflared`
- **Linux:** [Install](https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/install-and-setup/installation/) (e.g. package manager or binary)
- **Windows:** Download from [GitHub](https://github.com/cloudflare/cloudflared/releases)

### 2. Start Inkly + tunnel

```bash
./start-tunnel.sh
```

This will:

1. Start Docker (frontend, backend, Postgres, Redis) and an nginx proxy
2. Start a Cloudflare quick tunnel to the proxy
3. Print a URL like `https://xyz.trycloudflare.com`

**Visit that URL** — that’s your public Inkly site.

- Keep the terminal open while you want the tunnel active
- `Ctrl+C` stops the tunnel; Docker keeps running
- To stop everything: `docker compose -f docker-compose.yml -f docker-compose.tunnel.yml down`

### 3. Stop tunnel + Docker

```bash
docker compose -f docker-compose.yml -f docker-compose.tunnel.yml down
```

### 4. Troubleshooting

- **Docker "error getting credentials" (macOS):** Fix Docker login / Keychain: sign out of Docker Desktop → sign in again, or run `docker logout` then `docker login`. Then retry `./start-tunnel.sh`.
- **cloudflared not found:** Run `./scripts/fetch-cloudflared.sh` or `brew install cloudflared`. `start-tunnel.sh` uses `./bin/cloudflared` if present.

---

## 2. Oracle Cloud Free Tier — always-on free VPS

**Cost:** $0 • **URL:** `http://<your-vm-ip>:3000` (or your domain)

Oracle offers **always-free** VMs. Run Docker Compose there for a 24/7 public Inkly.

### 1. Create an Oracle Cloud account

- Go to [oracle.com/cloud/free](https://www.oracle.com/cloud/free/)
- Sign up (credit card may be required; free tier is not charged)

### 2. Create a free VM

1. **Create a VM instance**
   - Compute → Instances → Create instance
   - Name: `inkly`
   - Image: **Ubuntu 22.04**
   - Shape: **VM.Standard.E2.1.Micro** (always-free)
   - Add SSH keys (or generate; save the private key)
   - Create

2. **Open ports**
   - Instance → Subnet → Security List → Ingress rules
   - Add: **0.0.0.0/0**, TCP, **3000** (frontend)
   - Add: **0.0.0.0/0**, TCP, **3001** (API)

### 3. SSH in and deploy

```bash
ssh -i /path/to/your-key ubuntu@<VM-PUBLIC-IP>
```

Then:

```bash
# Install Docker
sudo apt update && sudo apt install -y docker.io docker-compose-v2 git
sudo usermod -aG docker $USER
# Log out and back in (or new SSH session)

# Clone and run
git clone https://github.com/jlaxman/inkly.git
cd inkly
cp .env.prod.example .env.prod
# Edit .env.prod: set POSTGRES_PASSWORD, JWT_SECRET, and:
#   FRONTEND_URL=http://<VM-PUBLIC-IP>:3000
#   NEXT_PUBLIC_API_URL=http://<VM-PUBLIC-IP>:3001/api

docker compose --env-file .env.prod -f docker-compose.prod.yml up -d --build
```

### 4. Use your public URL

- **Frontend:** `http://<VM-PUBLIC-IP>:3000`
- **API:** `http://<VM-PUBLIC-IP>:3001/api`

Optional: point a domain to the VM IP, then use nginx + Let’s Encrypt for HTTPS.

---

## Summary

| Option | Cost | URL | Best for |
|--------|------|-----|----------|
| **Cloudflare Tunnel** | Free | `https://xxx.trycloudflare.com` | Demos, quick share; PC must stay on |
| **Oracle Free Tier** | Free | `http://<VM-IP>:3000` | Always-on, real deployment |

For the **cheapest/free** path: use **Cloudflare Tunnel** with `./start-tunnel.sh`.
