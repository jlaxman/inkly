# Inkly Backend API

Production-ready e-commerce backend API built with NestJS for custom apparel, gifts, and more.

## Features

✅ **Authentication & Authorization**
- JWT-based authentication
- Role-based access control (Admin/Customer)
- Password hashing with bcrypt
- Protected routes with guards

✅ **Products Management**
- CRUD operations for products
- Pagination, filtering, and search
- Category management
- Image upload support
- Redis caching for performance

✅ **Shopping Cart**
- Add/remove/update cart items
- Persistent cart per user
- Real-time cart synchronization

✅ **Order Management**
- Create orders from cart
- Order status tracking
- Admin order management
- Email notifications

✅ **User Management**
- User registration and login
- Profile management
- User statistics

✅ **Production Features**
- Swagger/OpenAPI documentation
- Rate limiting
- Request logging
- Error handling
- Security headers (Helmet)
- Response compression
- Redis caching
- Email notifications
- File upload support

## Quick Start

### Using Docker (Required)

All development happens in Docker containers. From the project root:

```bash
# Start all services
cd ..
./start-docker.sh

# Or setup backend only
cd ..
./start-docker.sh
```

The backend will automatically:
- Install dependencies
- Generate Prisma client
- Run database migrations
- Start the development server

### Accessing the Container

```bash
# Enter backend container
docker-compose exec backend sh

# Run commands inside container
docker-compose exec backend npm run prisma:studio
docker-compose exec backend npm test
```

## API Endpoints

### Base URL
- Development: `http://localhost:3001/api`
- Documentation: `http://localhost:3001/api/docs`

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Products
- `GET /api/products` - List products (public)
- `GET /api/products/categories` - Get categories (public)
- `GET /api/products/:id` - Get product details (public)
- `POST /api/products` - Create product (admin)
- `PATCH /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Cart
- `GET /api/cart` - Get user cart
- `POST /api/cart` - Add item to cart
- `PATCH /api/cart/items/:id` - Update cart item
- `DELETE /api/cart/items/:id` - Remove cart item
- `DELETE /api/cart` - Clear cart

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get order details
- `PATCH /api/orders/:id` - Update order status (admin)

### Users
- `GET /api/users/me` - Get current user profile
- `PATCH /api/users/me` - Update profile

## Database

### Seed Database

```bash
# From project root
docker-compose exec backend npx ts-node prisma/seed.ts

# Or use the script
cd ..
./seed-database.sh
```

See `docs/DATABASE_SEED.md` for details.

### Prisma Studio

```bash
docker-compose exec backend npx prisma studio
# Visit http://localhost:5555
```

## Documentation

- **Setup**: `docs/SETUP.md`
- **Testing**: `docs/TESTING.md`
- **Database Seed**: `docs/DATABASE_SEED.md`
- **Image Guidelines**: `docs/IMAGE_GUIDELINES.md`
- **Docker Setup**: `docs/DOCKER_SETUP.md`

## Development

### Run Tests

```bash
docker-compose exec backend npm test
```

### View Logs

```bash
docker-compose logs -f backend
```
