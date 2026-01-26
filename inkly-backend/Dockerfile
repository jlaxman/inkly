# Backend - Production Dockerfile (multi-stage)
FROM node:24-alpine AS builder

WORKDIR /app
RUN apk add --no-cache openssl

COPY package*.json ./
COPY prisma ./prisma/
RUN npm install

COPY . .
RUN npm run prisma:generate
RUN npm run build

# Production stage
FROM node:24-alpine AS production

WORKDIR /app
RUN apk add --no-cache openssl curl

ENV NODE_ENV=production

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

RUN npm run prisma:generate

RUN mkdir -p uploads

EXPOSE 3001

# Migrations and start - override in compose if needed
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/main.js"]
