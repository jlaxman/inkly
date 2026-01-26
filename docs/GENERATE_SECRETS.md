# How to Generate GitHub Deployment Secrets

This guide shows you how to generate each secret required for the GitHub deployment workflow.

---

## 🔐 Required Secrets

### 1. **JWT_SECRET** (Required)

**What it is:** Secret key for signing JWT tokens (authentication)

**How to generate:**
```bash
openssl rand -hex 32
```

**Example output:**
```
a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456
```

**Copy the entire output** and use it as `JWT_SECRET`.

---

### 2. **POSTGRES_PASSWORD** (Required)

**What it is:** Password for PostgreSQL database

**How to generate:**
```bash
openssl rand -base64 32
```

**Or use a simpler method:**
```bash
openssl rand -hex 16
```

**Example output:**
```
f3a8b2c1d4e5f678901234567890abcd
```

**Copy the entire output** and use it as `POSTGRES_PASSWORD`.

---

### 3. **SSH_KEY** (Required)

**What it is:** Private SSH key for connecting to your deployment server

**How to generate:**

1. **On your local machine**, generate a new SSH key pair:
```bash
ssh-keygen -t ed25519 -C "github-deploy" -f ~/.ssh/inkly_deploy
```

2. **Copy the PRIVATE key** (this is your `SSH_KEY` secret):
```bash
cat ~/.ssh/inkly_deploy
```

**Important:** Copy the ENTIRE output including:
```
-----BEGIN OPENSSH PRIVATE KEY-----
... (all the content) ...
-----END OPENSSH PRIVATE KEY-----
```

3. **Add the PUBLIC key to your server:**
```bash
# Copy the public key
cat ~/.ssh/inkly_deploy.pub

# On your server, add it to authorized_keys
ssh user@your-server
mkdir -p ~/.ssh
echo "YOUR_PUBLIC_KEY_HERE" >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
chmod 700 ~/.ssh
```

**Alternative (if you already have a server):**
- If you already have SSH access to your server, you can use your existing private key
- Copy your existing `~/.ssh/id_rsa` or `~/.ssh/id_ed25519` (the private key, not the `.pub` file)

---

### 4. **SSH_HOST** (Required)

**What it is:** IP address or hostname of your deployment server

**How to get:**
- If you have a VPS: Use the IP address (e.g., `192.168.1.100`) or domain (e.g., `gamma.example.com`)
- If using a cloud provider: Check your instance's public IP

**Examples:**
- `192.168.1.100`
- `gamma.inkly.co.in`
- `your-server.example.com`

---

### 5. **SSH_USER** (Required)

**What it is:** Username for SSH login on your server

**Common values:**
- `root` (if you have root access)
- `ubuntu` (Ubuntu servers)
- `deploy` (if you created a dedicated deploy user)
- Your actual username on the server

**How to check:**
```bash
# On your server
whoami
```

---

### 6. **DEPLOY_PATH** (Required)

**What it is:** Directory path on the server where the app will be deployed

**Examples:**
- `/opt/inkly-gamma` (for gamma environment)
- `/opt/inkly` (for prod environment)
- `/home/deploy/inkly-gamma`
- `/var/www/inkly`

**How to set up:**
```bash
# On your server
sudo mkdir -p /opt/inkly-gamma
sudo chown $USER:$USER /opt/inkly-gamma
```

---

### 7. **DATABASE_URL** (Required)

**What it is:** Full PostgreSQL connection string

**Format:**
```
postgresql://USERNAME:PASSWORD@postgres:5432/DATABASE_NAME?schema=public
```

**Example:**
```
postgresql://inkly_user:my_secure_password@postgres:5432/inkly_gamma?schema=public
```

**Note:** 
- `USERNAME` = `POSTGRES_USER`
- `PASSWORD` = `POSTGRES_PASSWORD`
- `DATABASE_NAME` = `POSTGRES_DB`
- The host is `postgres` (Docker service name, not `localhost`)

---

### 8. **POSTGRES_USER** (Required)

**What it is:** PostgreSQL database username

**Examples:**
- `inkly_user`
- `inkly_gamma` (for gamma)
- `inkly_prod` (for prod)

**Just choose a name** - no generation needed.

---

### 9. **POSTGRES_DB** (Required)

**What it is:** PostgreSQL database name

**Examples:**
- `inkly_gamma` (for gamma environment)
- `inkly_prod` (for prod environment)
- `inkly`

**Just choose a name** - no generation needed.

---

### 10. **FRONTEND_URL** (Required)

**What it is:** Your frontend URL (for CORS)

**Examples:**
- **Gamma:** `https://gamma.inkly.co.in`
- **Prod:** `https://www.inkly.co.in`
- **Local testing:** `http://localhost:3000`

---

### 11. **NEXT_PUBLIC_API_URL** (Required)

**What it is:** API base URL (used at build time)

**Examples:**
- **Gamma:** `https://gamma.inkly.co.in/api`
- **Prod:** `https://www.inkly.co.in/api`
- **Local testing:** `http://localhost:3001/api`

---

### 12. **CLOUDFLARE_TUNNEL_TOKEN** (Optional but recommended)

**What it is:** Cloudflare Tunnel token for public access

**How to get:**
1. Go to [Cloudflare Zero Trust Dashboard](https://one.dash.cloudflare.com/)
2. **Networks** → **Tunnels** → **Create a tunnel**
3. Choose **Cloudflared**
4. Name it (e.g., `inkly-gamma`)
5. Copy the **token** shown (starts with something like `eyJ...`)

**See:** `docs/CLOUDFLARE_SETUP.md` for detailed steps.

**Note:** If you don't have this yet, you can leave it empty and the workflow will use standard production setup (no Cloudflare Tunnel).

---

### 13. **JWT_EXPIRES_IN** (Optional)

**What it is:** JWT token expiration time

**Default:** `7d` (7 days)

**Examples:**
- `7d` (7 days)
- `24h` (24 hours)
- `30d` (30 days)

**No generation needed** - just set a value.

---

### 14. **SMTP_*** (Optional)

**What they are:** Email configuration (for sending emails)

**If you want emails to work:**

1. **SMTP_HOST:** Your email provider's SMTP server
   - Gmail: `smtp.gmail.com`
   - Outlook: `smtp-mail.outlook.com`
   - Custom: Your domain's SMTP server

2. **SMTP_PORT:** Usually `587` (TLS) or `465` (SSL)

3. **SMTP_USER:** Your email address

4. **SMTP_PASS:** Your email password or app-specific password

5. **SMTP_FROM:** Sender email address (e.g., `noreply@inkly.co.in`)

**If you don't set these:** Emails will be skipped (no welcome emails, order confirmations, etc.)

---

## 📋 Quick Generation Script

Run this to generate all random secrets at once:

```bash
#!/bin/bash
echo "=== Generate GitHub Secrets ==="
echo ""
echo "JWT_SECRET:"
openssl rand -hex 32
echo ""
echo "POSTGRES_PASSWORD:"
openssl rand -hex 16
echo ""
echo "=== SSH Key Generation ==="
echo "Run: ssh-keygen -t ed25519 -C 'github-deploy' -f ~/.ssh/inkly_deploy"
echo "Then copy: cat ~/.ssh/inkly_deploy"
```

---

## 🔧 Setting Secrets in GitHub

1. Go to your GitHub repo
2. **Settings** → **Environments**
3. Click **New environment** → Create `gamma`
4. Click **Add secret** for each secret above
5. Repeat for `prod` environment

**Important:** 
- Each environment (`gamma`, `prod`) needs its own set of secrets
- Use the same secret names, but different values (different servers, URLs, etc.)

---

## ✅ Checklist

Before deploying, make sure you have:

- [ ] `JWT_SECRET` (generated with `openssl rand -hex 32`)
- [ ] `POSTGRES_PASSWORD` (generated with `openssl rand -hex 16`)
- [ ] `SSH_KEY` (private key from `ssh-keygen`)
- [ ] `SSH_HOST` (your server IP/hostname)
- [ ] `SSH_USER` (your server username)
- [ ] `DEPLOY_PATH` (directory path on server)
- [ ] `POSTGRES_USER` (chosen name)
- [ ] `POSTGRES_DB` (chosen name)
- [ ] `DATABASE_URL` (constructed from above)
- [ ] `FRONTEND_URL` (your frontend URL)
- [ ] `NEXT_PUBLIC_API_URL` (your API URL)
- [ ] `CLOUDFLARE_TUNNEL_TOKEN` (optional, from Cloudflare)
- [ ] `JWT_EXPIRES_IN` (optional, default: `7d`)
- [ ] `SMTP_*` (optional, for emails)

---

## 🚨 Security Notes

- **Never commit secrets** to git
- **Never share secrets** publicly
- **Use different secrets** for gamma and prod
- **Rotate secrets** periodically (especially `JWT_SECRET` and `POSTGRES_PASSWORD`)
- **Use strong passwords** (at least 32 characters for JWT_SECRET)

---

## 📚 See Also

- `docs/DEPLOY_GITHUB.md` - Full deployment setup guide
- `docs/CLOUDFLARE_SETUP.md` - Cloudflare Tunnel setup
- `.env.prod.example` - Example environment file
