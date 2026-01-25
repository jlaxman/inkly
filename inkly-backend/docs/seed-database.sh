#!/bin/bash

# Seed the database with dummy data
# This script runs the Prisma seed command inside the Docker container

set -e

echo "🌱 Seeding database with dummy data..."
echo ""

# Check if Docker containers are running
if ! docker-compose ps | grep -q "inkly-backend.*Up"; then
  echo "❌ Backend container is not running."
  echo "   Start containers first: ./start-docker.sh"
  exit 1
fi

# Wait for database to be ready
echo "⏳ Waiting for database to be ready..."
sleep 5

# Run seed command in backend container
echo "📦 Running seed script..."
docker-compose exec -T backend npx ts-node prisma/seed.ts

echo ""
echo "✅ Database seeded successfully!"
echo ""
echo "📊 Created:"
echo "  - Admin user (admin@inkly.com / admin123)"
echo "  - Test customer (customer@inkly.com / customer123)"
echo "  - 40+ products across all categories"
echo ""
echo "You can now:"
echo "  - View products at: http://localhost:3000/products"
echo "  - Browse categories at: http://localhost:3000/categories"
echo "  - Login as admin: admin@inkly.com / admin123"
echo "  - Login as customer: customer@inkly.com / customer123"
echo ""
echo "📝 Note: Product images are placeholders. Replace with actual product images."
