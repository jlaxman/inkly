# Production Deployment Guide

## Environment Variables

Create a `.env` file with the following variables:

```env
# Application
NODE_ENV=production
PORT=3001

# Database
DATABASE_URL="postgresql://user:password@postgres:5432/inkly?schema=public"

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379

# Email (SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=noreply@inkly.com

# Frontend URL (for CORS)
FRONTEND_URL=https://yourdomain.com

# AWS (Optional - for S3 file storage)
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_S3_BUCKET=inkly-media
```

## Security Checklist

- [ ] Change `JWT_SECRET` to a strong random string
- [ ] Use strong database passwords
- [ ] Enable HTTPS/SSL
- [ ] Configure CORS properly for production domains
- [ ] Set up rate limiting (already configured)
- [ ] Enable helmet security headers (already configured)
- [ ] Use environment variables for all secrets
- [ ] Set up proper logging and monitoring
- [ ] Configure email service with real SMTP credentials
- [ ] Set up file storage (S3 or similar) for production uploads

## Database Migrations

```bash
# Generate migration
npm run prisma:migrate

# In production, use:
npx prisma migrate deploy
```

## Building for Production

```bash
# Build the application
npm run build

# Start production server
npm run start:prod
```

## Docker Production

The Docker setup is already configured. For production:

1. Update `docker-compose.yml` with production environment variables
2. Use production database (not local)
3. Configure proper volumes for uploads
4. Set up reverse proxy (nginx/traefik)
5. Enable SSL/TLS

## Monitoring

- Set up application monitoring (e.g., Sentry, DataDog)
- Configure health check endpoints
- Set up log aggregation
- Monitor database connections
- Monitor Redis connections

## Performance Optimization

- Enable Redis caching (already integrated)
- Use CDN for static assets
- Optimize database queries
- Enable compression (already configured)
- Set up database connection pooling

## API Documentation

Swagger documentation is available at: `/api/docs`

## Rate Limiting

Currently set to 100 requests per minute per IP. Adjust in `app.module.ts` if needed.
