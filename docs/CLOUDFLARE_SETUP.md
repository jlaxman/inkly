# Cloudflare Tunnel Setup (Gamma & Prod)

Use **Cloudflare Tunnel** so **gamma.inkly.co.in** and **www.inkly.co.in** work over HTTPS with no open ports. Traffic goes: User → Cloudflare → Tunnel → Nginx → App.

---

## 1. Add domain to Cloudflare

1. Sign up at [Cloudflare](https://dash.cloudflare.com).
2. **Add a site** → enter `inkly.co.in` (or your root domain).
3. Choose **Free** plan, complete DNS migration if prompted.
4. Update your domain registrar nameservers to Cloudflare’s (shown in the dashboard).

---

## 2. Create tunnels (gamma + prod)

1. In Cloudflare: **Zero Trust** → **Networks** → **Tunnels** (or **Add a site** → **Tunnels**).
2. **Create a tunnel**:

### Tunnel 1: Gamma

- **Name:** `inkly-gamma`
- **Create tunnel** → copy the **Tunnel token** (one‑time; save it).
- **Public hostname** tab:
  - **Subdomain:** `gamma` (or **Custom hostname** `gamma.inkly.co.in`).
  - **Domain:** `inkly.co.in` → **gamma.inkly.co.in**.
  - **Service type:** HTTP.
  - **URL:** `http://localhost:8080`
- **Save** (DNS for `gamma.inkly.co.in` is created automatically).

### Tunnel 2: Prod

- **Create tunnel** again.
- **Name:** `inkly-prod`
- **Create tunnel** → copy the **Tunnel token**.
- **Public hostname** tab:
  - **Subdomain:** `www` (or **Custom** `www.inkly.co.in`).
  - **Domain:** `inkly.co.in` → **www.inkly.co.in**.
  - **Service type:** HTTP.
  - **URL:** `http://localhost:8080`
- **Save**.

(Optional: add **inkly.co.in** root → redirect to **www.inkly.co.in** via a Page Rule or redirect rule.)

---

## 3. GitHub Environment secrets

Add these to **gamma** and **prod** (each env has its own token):

| Secret | Gamma | Prod |
|--------|-------|------|
| `CLOUDFLARE_TUNNEL_TOKEN` | Token for **inkly-gamma** | Token for **inkly-prod** |

Also ensure per‑env secrets: `SSH_HOST`, `SSH_USER`, `SSH_KEY`, `DEPLOY_PATH`, `FRONTEND_URL`, `NEXT_PUBLIC_API_URL`, etc.  
See **`docs/DEPLOY_GITHUB.md`** for the full list.

**URLs:**

- **Gamma:** `FRONTEND_URL=https://gamma.inkly.co.in`, `NEXT_PUBLIC_API_URL=https://gamma.inkly.co.in/api`
- **Prod:** `FRONTEND_URL=https://www.inkly.co.in`, `NEXT_PUBLIC_API_URL=https://www.inkly.co.in/api`

---

## 4. Deploy flow (Gamma & Prod)

Deploy uses **docker-compose.prod** + **docker-compose.cloudflare**:

- Nginx listens on **8080**, proxies `/` → frontend, `/api` → backend.
- **cloudflared** runs with `CLOUDFLARE_TUNNEL_TOKEN`, connects to `http://localhost:8080`.

On each push to `main`, the workflow:

1. Deploys **gamma** (Gamma server) → `gamma.inkly.co.in` live.
2. Then **prod** (Prod server) → `www.inkly.co.in` live.

No need to open 80/443 on the servers; Cloudflare handles HTTPS.

---

## 5. Manual run on a server (optional)

From the deploy path on the **gamma** or **prod** server:

```bash
# Ensure .env.prod exists and contains CLOUDFLARE_TUNNEL_TOKEN
./start-cloudflare.sh
```

Or:

```bash
docker compose --env-file .env.prod \
  -f docker-compose.prod.yml -f docker-compose.cloudflare.yml \
  up -d --build
```

---

## 6. Checklist

- [ ] Domain **inkly.co.in** on Cloudflare, nameservers updated.
- [ ] Tunnels **inkly-gamma** and **inkly-prod** created, public hostnames **gamma.inkly.co.in** and **www.inkly.co.in** → `http://localhost:8080`.
- [ ] **CLOUDFLARE_TUNNEL_TOKEN** (and other secrets) set in GitHub **gamma** and **prod** environments.
- [ ] **FRONTEND_URL** / **NEXT_PUBLIC_API_URL** correct per env (gamma vs prod).
- [ ] Deploy runs **prod** + **cloudflare** compose on each target; **cloudflared** uses the token for that env.

---

## See also

- **Deploy (Gamma → Prod):** `docs/DEPLOY_GITHUB.md`
- **Public URLs (general):** `docs/PUBLIC_URLS.md`
