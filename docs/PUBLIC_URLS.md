# Working Public URLs: www.inkly.co.in & gamma.inkly.co.in

Use **www.inkly.co.in** for production and **gamma.inkly.co.in** for gamma (staging). Each serves the app on a single domain: `/` = frontend, `/api` = backend.

---

## Recommended: Cloudflare Tunnel

**No open ports, HTTPS via Cloudflare.** Deploy uses **prod + cloudflare** compose; nginx :8080 + **cloudflared** with **CLOUDFLARE_TUNNEL_TOKEN**.  
→ **`docs/CLOUDFLARE_SETUP.md`** for gamma & prod.

---

## Target URLs

| Environment | Frontend | API (same origin) |
|-------------|----------|-------------------|
| **Prod**    | https://www.inkly.co.in | https://www.inkly.co.in/api |
| **Gamma**   | https://gamma.inkly.co.in | https://gamma.inkly.co.in/api |

---

## 1. DNS

Point each hostname to the **correct server** (gamma and prod usually on different hosts).

**Prod (www.inkly.co.in):**
- **A**: `www` → prod server IPv4  
  or **CNAME**: `www` → `prod.example.com` (if you use a hostname)
- Optional: **A** `@` (root) → same IP, then redirect `inkly.co.in` → `www.inkly.co.in` in nginx

**Gamma (gamma.inkly.co.in):**
- **A**: `gamma` → gamma server IPv4  
  or **CNAME**: `gamma` → `gamma.example.com`

Example (replace with your IPs):

```
www.inkly.co.in.     A      203.0.113.10
gamma.inkly.co.in.   A      203.0.113.20
```

---

## 2. Reverse proxy + SSL (per server)

Each deployment server runs Docker (frontend :3000, backend :3001). Put **nginx** (or Caddy) on the **host** in front, listening on 80/443, terminating HTTPS, and proxying:

- `https://<domain>/` → `http://127.0.0.1:3000`
- `https://<domain>/api/` → `http://127.0.0.1:3001/api/`
- `https://<domain>/uploads/` → `http://127.0.0.1:3001/uploads/`

### Option A: Nginx + Let’s Encrypt (certbot)

1. **Install** nginx and certbot on the server (e.g. `apt install nginx certbot python3-certbot-nginx`).
2. **Create ACME challenge dir**: `sudo mkdir -p /var/www/certbot`.
3. **Use the right config** on each server (copy from repo):
   - **Prod**: `cp nginx/prod-domain.conf /etc/nginx/sites-available/inkly-prod` → symlink to `sites-enabled`, then `nginx -t` and `systemctl reload nginx`.
   - **Gamma**: `cp nginx/gamma-domain.conf /etc/nginx/sites-available/inkly-gamma` → same.
4. **Get certs**:  
   `sudo certbot --nginx -d www.inkly.co.in` (prod) or `-d gamma.inkly.co.in` (gamma).  
   Certbot adds HTTPS and redirect.
5. **Reload nginx**: `sudo systemctl reload nginx`.

Configs: `nginx/prod-domain.conf` (www.inkly.co.in), `nginx/gamma-domain.conf` (gamma.inkly.co.in).

### Option B: Caddy

Caddy obtains and renews certs automatically. Example for prod:

```
www.inkly.co.in {
    reverse_proxy /api/*  localhost:3001
    reverse_proxy /uploads/* localhost:3001
    reverse_proxy *       localhost:3000
}
```

Gamma: same block with `gamma.inkly.co.in`.

### Option C: Cloudflare Proxy (no Tunnel)

- Add the domain in Cloudflare, set **DNS** (A/CNAME) with proxy **on** (orange cloud).
- **SSL/TLS** → Full (strict) if you use HTTPS to origin; otherwise Full.
- Origin: `http://<server-IP>:80` or run nginx on 80 and point Cloudflare to the server.

Cloudflare handles HTTPS for visitors. For **Cloudflare Tunnel** (no open ports), use **`docs/CLOUDFLARE_SETUP.md`** instead.

---

## 3. Environment variables per environment

Set these **per deploy** (GitHub env secrets or `.env.prod` on server).

**Prod (www.inkly.co.in):**
```bash
FRONTEND_URL=https://www.inkly.co.in
NEXT_PUBLIC_API_URL=https://www.inkly.co.in/api
```

**Gamma (gamma.inkly.co.in):**
```bash
FRONTEND_URL=https://gamma.inkly.co.in
NEXT_PUBLIC_API_URL=https://gamma.inkly.co.in/api
```

`NEXT_PUBLIC_API_URL` is **build-time**: the frontend Docker image must be built with the correct value for that environment. The deploy workflow uses these from GitHub env secrets when building.

---

## 4. Checklist

- [ ] DNS: `www.inkly.co.in` → prod server, `gamma.inkly.co.in` → gamma server.
- [ ] Nginx (or Caddy) on each host: 80/443 → frontend :3000, /api & /uploads → backend :3001.
- [ ] SSL in place (certbot, Caddy, or Cloudflare).
- [ ] Prod env: `FRONTEND_URL` / `NEXT_PUBLIC_API_URL` = `https://www.inkly.co.in` and `https://www.inkly.co.in/api`.
- [ ] Gamma env: same for `https://gamma.inkly.co.in` and `https://gamma.inkly.co.in/api`.
- [ ] Deploy: run `docker compose -f docker-compose.prod.yml` per environment; nginx runs on host.

---

## See also

- **Buy inkly.co.in & deploy**: `docs/DOMAIN_AND_DEPLOY.md`
- **Cloudflare Tunnel (gamma & prod)**: `docs/CLOUDFLARE_SETUP.md`
- **Deploy setup**: `docs/DEPLOY_GITHUB.md`
- **Deploy options / free hosting**: `docs/DEPLOYMENT_OPTIONS.md`, `docs/DEPLOY_FREE.md`
