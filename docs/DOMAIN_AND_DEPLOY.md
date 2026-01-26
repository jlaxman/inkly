# Buying inkly.co.in & Deploy Options

**inkly.co.in** is available. You can buy it and then use **www.inkly.co.in** (prod) and **gamma.inkly.co.in** (gamma) with Cloudflare Tunnel.

---

## 1. Purchase inkly.co.in (not free)

**.co.in** domains are **not free**. You must register through an accredited registrar.

### Where to buy

| Registrar | Link | Typical cost (.co.in) |
|-----------|------|------------------------|
| **GoDaddy India** | [godaddy.com/en-in](https://www.godaddy.com/en-in) | ~₹599–899/year |
| **Namecheap** | [namecheap.com](https://www.namecheap.com) | ~$10–15/year |
| **Hostinger India** | [hostinger.in](https://www.hostinger.in) | ~₹299–499/year |
| **BigRock** | [bigrock.in](https://www.bigrock.in) | ~₹399–599/year |
| **Dynadot** | [dynadot.com](https://www.dynadot.com) | ~$8–12/year |

.accredited .in registrars: [registry.in/registrars](https://registry.in/registrars)

### Steps to buy

1. Go to any registrar above → search **inkly.co.in**.
2. Add to cart, complete checkout (card/UPI etc.).
3. Confirm nameservers (you’ll point these to Cloudflare later).

After you own **inkly.co.in**, follow **`docs/CLOUDFLARE_SETUP.md`** to get **www.inkly.co.in** and **gamma.inkly.co.in** live.

---

## 2. Free domain options

You **can** get a **free domain** in a few ways, but each has limits.

### Option A: Freenom (.tk, .ml, .ga, .cf, .gq)

- **Site:** [freenom.com](https://www.freenom.com)
- **Free TLDs:** .tk, .ml, .ga, .cf, .gq (e.g. **inkly.tk**, **inkly.ml**)
- **Cost:** $0

**Caveats:** Freenom has had **reliability issues** (DNS outages, WHOIS down, unstable service). Try if you like, but don’t rely on it for production. You don’t truly “own” the domain; they can reclaim it.

**Steps:** Go to Freenom → search **inkly.tk** (or .ml, etc.) → register if available → use your own nameservers (e.g. Cloudflare) and follow **`docs/CLOUDFLARE_SETUP.md`** with **inkly.tk** instead of inkly.co.in.

### Option B: Free subdomains (platform URLs)

You get a **free URL**, but it’s a **subdomain** of the platform, not a domain you own:

| Platform | Free URL |
|----------|----------|
| **Cloudflare Tunnel** | `https://xxx.trycloudflare.com` |
| **Vercel** | `https://your-app.vercel.app` |
| **Netlify** | `https://your-app.netlify.app` |
| **Cloudflare Pages** | `https://your-project.pages.dev` |
| **Railway / Render** | `https://your-app.up.railway.app` etc. |

See **`docs/DEPLOY_FREE.md`**. You **cannot** get **inkly.co.in** or **inkly.tk** this way — only platform subdomains.

### Option C: Free domain with hosting (first year)

Some hosts (e.g. Hostinger, Bluehost) give a **free domain** (often .com) for the **first year** when you buy hosting. After year 1 you pay for the domain. Not free long‑term.

---

## 3. Deploy for free (no custom domain)

You can run Inkly and get a **free public URL** **without** buying any domain. You won’t get **inkly.co.in**; you’ll use **platform subdomains** instead.

| Option | Cost | URL you get |
|--------|------|-------------|
| **Cloudflare quick tunnel** | $0 | `https://xxx.trycloudflare.com` (new each run) |
| **Oracle Cloud free VM** | $0 | `http://<VM-IP>:3000` |
| **Railway** | Free tier | `https://your-app.up.railway.app` |
| **Render** | Free tier | `https://your-app.onrender.com` |

See **`docs/DEPLOY_FREE.md`** for Cloudflare quick tunnel and Oracle steps.

---

## 4. Summary

| Goal | What to do |
|------|------------|
| **Use www.inkly.co.in & gamma.inkly.co.in** | 1. Buy **inkly.co.in** (registrar above). 2. Follow **`docs/CLOUDFLARE_SETUP.md`**. 3. Deploy gamma/prod per **`docs/DEPLOY_GITHUB.md`**. |
| **Deploy only, no domain** | Use **`docs/DEPLOY_FREE.md`** (Cloudflare tunnel or Oracle). You get **trycloudflare.com** or **&lt;VM-IP&gt;:3000**, not inkly.co.in. |
| **Free domain (e.g. inkly.tk)** | Try **Freenom** (.tk, .ml, etc.) — see **§2 Free domain options**. Unreliable; use Cloudflare + tunnels as for inkly.co.in. |

---

## See also

- **Cloudflare (www + gamma):** `docs/CLOUDFLARE_SETUP.md`
- **Free deploy (no domain):** `docs/DEPLOY_FREE.md`
- **2‑stage deploy:** `docs/DEPLOY_GITHUB.md`
