FROM node:24-alpine

WORKDIR /app

# Install Prisma dependencies and netcat for DB checking
RUN apk add --no-cache openssl netcat-openbsd

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies
RUN npm install

# Generate Prisma client (will be regenerated on start if DB changes)
RUN npm run prisma:generate || true

# Copy source code
COPY . .

# Create uploads directory
RUN mkdir -p uploads

# Expose port
EXPOSE 3001

# Start script will handle migrations
CMD ["sh", "-c", "npm run prisma:generate && npx prisma db push && npm run start:dev"]
