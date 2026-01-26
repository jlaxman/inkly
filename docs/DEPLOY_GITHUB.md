# GitHub 2-Stage Deploy (Gamma → Prod)

Every push to `main` triggers a **sequential** deploy:

1. **Deploy Gamma** → on success →
2. **Deploy Prod**

Each stage deploys to its own target (server or path). Prod runs only if Gamma succeeds.

---

## Setup

### 1. GitHub Environments

Create two **Environments** in your repo:

1. **Settings** → **Environments** → **New environment**
2. Add: `gamma`, `prod`

(Optional: add **Environment protection rules** for `prod`, e.g. required reviewers, to gate production.)

### 2. Secrets per environment

Each environment (gamma, prod) has its **own** set of secrets. Use the **same secret names** in both; the **values** differ per environment (different servers, DBs, URLs, etc.).

Add these secrets to **each** of `gamma` and `prod`:

| Secret | Description | Example |
|--------|-------------|---------|
| `SSH_HOST` | Deploy target hostname or IP | `gamma.example.com` or `1.2.3.4` |
| `SSH_USER` | SSH user on target | `deploy` |
| `SSH_KEY` | Private key (PEM) for SSH | `-----BEGIN ...` |
| `DEPLOY_PATH` | App root on server | `/opt/inkly-gamma`, `/opt/inkly` |
| `POSTGRES_USER` | Postgres user | `inkly_user` |
| `POSTGRES_PASSWORD` | Postgres password | *(secure)* |
| `POSTGRES_DB` | Postgres database | `inkly_prod` |
| `DATABASE_URL` | Full DB URL | `postgresql://user:pass@postgres:5432/inkly_prod?schema=public` |
| `JWT_SECRET` | JWT signing secret | `openssl rand -hex 32` |
| `JWT_EXPIRES_IN` | JWT expiry (optional) | `7d` |
| `FRONTEND_URL` | Allowed CORS / frontend URL | **Gamma:** `https://gamma.inkly.co.in` · **Prod:** `https://www.inkly.co.in` |
| `NEXT_PUBLIC_API_URL` | API base URL (build-time) | **Gamma:** `https://gamma.inkly.co.in/api` · **Prod:** `https://www.inkly.co.in/api` |
| `CLOUDFLARE_TUNNEL_TOKEN` | Cloudflare Tunnel token (per env) | From Zero Trust → Tunnels (see **`docs/CLOUDFLARE_SETUP.md`**) |
| `SMTP_HOST` | SMTP host (optional) | `smtp.gmail.com` |
| `SMTP_PORT` | SMTP port (optional) | `587` |
| `SMTP_USER` | SMTP user (optional) | |
| `SMTP_PASS` | SMTP password (optional) | |
| `SMTP_FROM` | From address (optional) | `noreply@inkly.co.in` |

- **Gamma / Prod** typically use different hosts or paths, and different DBs and URLs.
- **SMTP** is optional; if unset, emails are skipped.

### Public URLs (www.inkly.co.in, gamma.inkly.co.in)

Use **www.inkly.co.in** for prod and **gamma.inkly.co.in** for gamma. Each serves frontend + `/api` on the same host.

- **Cloudflare Tunnel (recommended):** No open ports, HTTPS via Cloudflare. Deploy uses **prod + cloudflare** compose; **`CLOUDFLARE_TUNNEL_TOKEN`** required per env. See **`docs/CLOUDFLARE_SETUP.md`**.
- **nginx + certbot:** See **`docs/PUBLIC_URLS.md`**.

### 3. Deploy targets

Each stage needs a **target** (VPS or path) with:

- Docker and Docker Compose
- SSH access (key-based)
- `DEPLOY_PATH` created (e.g. `mkdir -p /opt/inkly-gamma`)

You can use:

- **Same server, different paths**: e.g. `/opt/inkly-gamma`, `/opt/inkly` (separate Compose projects).
- **Different servers**: e.g. gamma on one VPS, prod on another.

See `DEPLOY_FREE.md` and `DEPLOYMENT_OPTIONS.md` for where to host (e.g. Oracle Cloud free tier, Railway, Render).

---

## Workflow summary

- **Trigger**: Push to `main`
- **Jobs**: `deploy-gamma` → `deploy-prod` (sequential via `needs`)
- **Per job**: Checkout → create `.env.prod` from env secrets → SSH setup → `rsync` code → `scp` `.env.prod` → `docker compose -f docker-compose.prod.yml -f docker-compose.cloudflare.yml up -d --build` on target (prod + Cloudflare Tunnel)

---

## Optional: approval for Prod

To require manual approval before deploying to prod:

1. **Settings** → **Environments** → **prod**
2. Add **Environment protection rule**: **Required reviewers** → add yourself/team
3. The **Deploy Prod** job will wait for approval before running (after Gamma succeeds).
