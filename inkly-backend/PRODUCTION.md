# Production Deployment

## Docker (recommended)

Use the root `docker-compose.prod.yml` with `.env.prod`:

```bash
# From project root
cp .env.prod.example .env.prod
# Edit .env.prod with real values

docker compose --env-file .env.prod -f docker-compose.prod.yml up -d --build
```

Backend and frontend use production Dockerfiles (multi-stage, healthchecks). Migrations run automatically (`prisma migrate deploy`).

## Environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | Yes | PostgreSQL connection string |
| `JWT_SECRET` | Yes | Secret for JWT signing |
| `FRONTEND_URL` | Yes (prod) | Allowed CORS origin(s), comma-separated |
| `NEXT_PUBLIC_API_URL` | Yes | API base URL (frontend build-time) |
| `POSTGRES_*` | Yes | Used by Postgres service |
| `SMTP_*` | No | If unset, emails are skipped |

## Security

- [ ] Set strong `JWT_SECRET` (e.g. `openssl rand -hex 32`)
- [ ] Use strong `POSTGRES_PASSWORD` and secure `DATABASE_URL`
- [ ] Set `FRONTEND_URL` to your production frontend domain(s)
- [ ] Use HTTPS (reverse proxy in front of Docker)
- [ ] Swagger is **disabled** in production (`NODE_ENV=production`)

## Database

- Migrations: `prisma/migrations/` — applied automatically on startup via `prisma migrate deploy`
- Do **not** use `prisma db push` in production

## Health

- `GET /api/health` — used by Docker healthcheck and load balancers

## Rate limiting

100 requests/minute per IP (Throttler). Adjust in `app.module.ts` if needed.
