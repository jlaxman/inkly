# Production Setup

## Quick start

1. **Copy env template**

   ```bash
   cp .env.prod.example .env.prod
   ```

2. **Edit `.env.prod`** — set at least:
   - `POSTGRES_PASSWORD`, `DATABASE_URL`
   - `JWT_SECRET`
   - `FRONTEND_URL`, `NEXT_PUBLIC_API_URL` (your production URLs)

3. **Build and run**

   ```bash
   docker compose --env-file .env.prod -f docker-compose.prod.yml up -d --build
   ```

- **Frontend:** http://localhost:3000  
- **Backend API:** http://localhost:3001/api  
- **Health:** http://localhost:3001/api/health  

## What’s productionised

- **Backend:** Multi-stage Dockerfile, `prisma migrate deploy`, healthcheck, optional SMTP, Swagger disabled in prod, CORS from `FRONTEND_URL`
- **Frontend:** Next.js `standalone` output, multi-stage Dockerfile, non-root user, healthcheck
- **Compose:** Healthchecks, restarts, named volumes for DB/Redis/uploads
- **Migrations:** Initial migration in `inkly-backend/prisma/migrations/` — no `db push` in prod

## Optional

- **SMTP:** Leave `SMTP_USER` / `SMTP_PASS` unset to disable emails (e.g. welcome/order emails).
- **Reverse proxy:** Put nginx/traefik in front of ports 3000/3001, then set `FRONTEND_URL` and `NEXT_PUBLIC_API_URL` to your public URLs.

## CI/CD

The **`deploy`** workflow runs on every push to `main` and deploys in **2 sequential stages**: **Gamma** → **Prod**. Each stage runs only if the previous one succeeds. Each environment uses its own GitHub Environment (gamma, prod) and per-env secrets (SSH, DB, URLs, etc.). See **`docs/DEPLOY_GITHUB.md`** for setup (environments, secrets, deploy targets).

## Where to get a public URL

**Free:** Run **`./start-tunnel.sh`** (Docker + [cloudflared](https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/install-and-setup/installation/)) → instant `https://xxx.trycloudflare.com`. See **`docs/DEPLOY_FREE.md`**.

See **docs/DEPLOYMENT_OPTIONS.md** for other platforms:

- **Railway**, **Render**, **Fly.io** — deploy from GitHub; each gives you HTTPS URLs (e.g. `https://inkly.up.railway.app`)
- **VPS** (DigitalOcean, Linode) — run `docker compose` yourself; use the server IP or your domain
- **Cloudflare Tunnel** — free HTTPS URL to your local or server (e.g. `https://xxx.trycloudflare.com`)

Set `FRONTEND_URL` and `NEXT_PUBLIC_API_URL` to those public URLs.

## See also

- `docs/DEPLOYMENT_OPTIONS.md` — where to deploy & get a public URL
- `docs/PUBLIC_URLS.md` — www.inkly.co.in, gamma.inkly.co.in (DNS, nginx, SSL)
- `docs/DEPLOY_GITHUB.md` — 2-stage GitHub deploy (gamma → prod)
- `inkly-backend/PRODUCTION.md` — backend-specific production notes
- `.env.prod.example` — env template and comments
