# Where to Deploy Inkly & Get a Public URL

You have a Docker-based stack (frontend, backend, Postgres, Redis). Here are practical options to deploy and get a **public URL**.

---

## Free options (recommended)

| Option | Cost | Public URL |
|--------|------|------------|
| **Cloudflare Tunnel** | **$0** | `https://xxx.trycloudflare.com` |
| **Oracle Cloud Free Tier** | **$0** | `http://<VM-IP>:3000` |

**Quickest free path:** run `./start-tunnel.sh` (needs Docker + [cloudflared](https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/install-and-setup/installation/)). You get an instant HTTPS public URL.

See **`docs/DEPLOY_FREE.md`** for step-by-step instructions.

---

---

## 1. **Railway** (easiest, good for side projects)

**Get a public URL:** Yes — e.g. `https://inkly-frontend.up.railway.app`, `https://inkly-backend.up.railway.app`

- [railway.app](https://railway.app) — deploy from GitHub
- Add **PostgreSQL** and **Redis** from the dashboard (managed)
- Deploy **backend** and **frontend** as separate services (each has a Dockerfile)
- Railway assigns HTTPS URLs automatically; you can add a custom domain
- **Cost:** Free tier (limited hours); then pay-as-you-go

**Rough steps:**
1. Sign up, connect GitHub, create project
2. Add Postgres + Redis (copy `DATABASE_URL`, Redis host/port from dashboard)
3. Add service → “Deploy from GitHub” → select repo, root `inkly-backend` (or use **Dockerfile** path)
4. Add another service for `inkly-frontend`
5. Set env vars (`DATABASE_URL`, `JWT_SECRET`, `FRONTEND_URL`, `NEXT_PUBLIC_API_URL`) using each service’s **public URL**
6. Redeploy; use the frontend URL as your public Inkly site

---

## 2. **Render**

**Get a public URL:** Yes — e.g. `https://inkly.onrender.com`

- [render.com](https://render.com) — Docker, Postgres, Redis
- **Free tier** for web services (sleeps after inactivity) and Postgres
- Create **PostgreSQL** and **Redis** instances, then **Web Services** from your repo (Dockerfile)
- Each service gets an HTTPS URL; use those for `FRONTEND_URL` and `NEXT_PUBLIC_API_URL`

**Rough steps:**
1. Connect GitHub, create **PostgreSQL** and **Redis**
2. Create **Web Service** → Docker, repo, Dockerfile path (e.g. `inkly-backend/Dockerfile`)
3. Env: `DATABASE_URL` (from Postgres), `JWT_SECRET`, `FRONTEND_URL`, etc.
4. Repeat for frontend (different Dockerfile path)
5. Use the frontend service URL as your public Inkly URL

---

## 3. **Fly.io**

**Get a public URL:** Yes — e.g. `https://inkly.fly.dev`

- [fly.io](https://fly.io) — Docker, global edge
- Add **Postgres** and **Upstash Redis** (or Fly Redis)
- Deploy app(s) with `fly launch` + Dockerfile; Fly assigns `*.fly.dev` URLs
- **Cost:** Free tier; paid for persistent Postgres and more traffic

**Rough steps:**
1. `fly auth signup` / `fly auth login`, then `fly launch` in project root (or per service)
2. Add Postgres: `fly postgres create`, attach to app
3. Add Redis (e.g. Upstash) and set `REDIS_HOST` / `REDIS_PORT`
4. Set secrets (env): `fly secrets set DATABASE_URL=... JWT_SECRET=... FRONTEND_URL=...`
5. `fly deploy`; use the app URL as your public Inkly URL

---

## 4. **VPS (DigitalOcean, Linode, etc.)** — run Docker Compose yourself

**Get a public URL:** Yes — your server IP (e.g. `http://123.45.67.89`) or a **domain** you point to the VPS (e.g. `https://inkly.yourdomain.com`)

- Rent a **Droplet** (DigitalOcean) or **Linode** (e.g. $6–12/mo)
- SSH in, install Docker, clone repo, run `docker compose -f docker-compose.prod.yml --env-file .env.prod up -d`
- **Public URL:** `http://<server-ip>:3000` (frontend) and `:3001` (API) — or use **nginx + Let’s Encrypt** for HTTPS and a domain

**Rough steps:**
1. Create VPS, SSH in, install Docker & Docker Compose
2. Clone repo, `cp .env.prod.example .env.prod`, edit with strong secrets
3. Point `DATABASE_URL` at `postgres:5432` (same compose network)
4. Set `FRONTEND_URL` and `NEXT_PUBLIC_API_URL` to `http://<your-server-ip>:3000` and `http://<your-server-ip>:3001/api` (or your domain)
5. `docker compose -f docker-compose.prod.yml --env-file .env.prod up -d --build`
6. **(Optional)** Install nginx, get SSL (e.g. certbot), reverse-proxy 80/443 → 3000 and 3001

---

## 5. **Cloudflare Tunnel** (free HTTPS + public URL, no open ports)

**Get a public URL:** Yes — e.g. `https://inkly.your-subdomain.trycloudflare.com` or a custom domain

- Run Inkly locally or on a VPS/PC
- Install [cloudflared](https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/) and run a **quick tunnel**
- Cloudflare gives you a public HTTPS URL that forwards to `localhost:3000` (or your frontend port)
- **Cost:** Free

**Rough steps:**
1. Run `docker compose -f docker-compose.prod.yml --env-file .env.prod up -d` (locally or on a server)
2. `cloudflared tunnel --url http://localhost:3000`
3. Use the printed `*.trycloudflare.com` URL as your public Inkly URL (frontend only; for API you’d expose 3001 too or run both behind one tunnel with a custom config)

---

## Summary: where to get the public URL

| Platform        | Public URL example                          | Best for                          |
|----------------|---------------------------------------------|-----------------------------------|
| **Railway**    | `https://inkly-frontend.up.railway.app`     | Easiest, GitHub deploy            |
| **Render**     | `https://inkly.onrender.com`                | Free tier, Docker                 |
| **Fly.io**     | `https://inkly.fly.dev`                     | Global edge, Docker               |
| **VPS**        | `http(s)://your-ip-or-domain`               | Full control, Docker Compose      |
| **Cloudflare Tunnel** | `https://xxx.trycloudflare.com`      | Quick local/public HTTPS, no VPS  |

---

## Env vars to set for *any* deployment

Use the **real public URLs** of your frontend and API:

- `FRONTEND_URL` = your frontend’s public URL (e.g. `https://inkly.onrender.com`)
- `NEXT_PUBLIC_API_URL` = your API’s public URL including `/api` (e.g. `https://inkly-api.onrender.com/api`)

CORS and frontend API calls depend on these.  

See **PRODUCTION.md** and **.env.prod.example** for the full list.
