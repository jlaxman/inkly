# Inkly Frontend

Premium e-commerce frontend built with Next.js 14, inspired by Apple's design language.

## Features

✨ **Premium Design**
- Apple-inspired black and white aesthetic
- Smooth animations with Framer Motion
- Responsive design for all devices
- Custom Inkly logo with animated ink drop effect

🛍️ **E-commerce Features**
- Product browsing and search
- Category filtering
- Product detail pages
- Shopping cart management
- Checkout process
- Order tracking
- User authentication

🎨 **User Experience**
- Smooth page transitions
- Loading states
- Toast notifications
- Optimistic UI updates
- Error handling

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Zustand** - State management
- **Axios** - API client
- **React Hook Form** - Form handling
- **Lucide React** - Icons

## Getting Started

### Development (Docker)

All development happens in Docker containers. From the project root:

```bash
# Start all services
cd ..
./start-docker.sh
```

Visit [http://localhost:3000](http://localhost:3000)

### Accessing the Container

```bash
# Enter frontend container
docker-compose exec frontend sh

# Run commands inside container
docker-compose exec frontend npm test
docker-compose exec frontend npm run build
```

## Project Structure

```
app/
├── page.tsx              # Home page
├── products/
│   ├── page.tsx          # Products listing
│   └── [id]/page.tsx     # Product detail
├── cart/page.tsx         # Shopping cart
├── checkout/page.tsx     # Checkout
├── orders/page.tsx       # Order history
├── login/page.tsx        # Login
├── register/page.tsx     # Registration
├── profile/page.tsx      # User profile
├── categories/page.tsx   # Categories
└── about/page.tsx        # About page

components/
├── Logo.tsx              # Inkly logo component
├── Navbar.tsx            # Navigation bar
├── Footer.tsx            # Footer
└── ProductCard.tsx       # Product card component

store/
├── useAuthStore.ts       # Authentication state
└── useCartStore.ts       # Cart state

lib/
├── api.ts                # API client
└── utils.ts              # Utility functions
```

## Frontend-Backend Communication

✅ **Frontend is connected to backend!**

The frontend communicates with the backend API through:

1. **API Client** (`lib/api.ts`):
   - Base URL: `http://localhost:3001/api` (from `NEXT_PUBLIC_API_URL`)
   - Automatic token injection from localStorage
   - 401 error handling (redirects to login)

2. **Environment Configuration**:
   - Set in `docker-compose.yml`: `NEXT_PUBLIC_API_URL: http://localhost:3001/api`
   - Frontend reads this at build time

3. **API Endpoints Used**:
   - Products: `/api/products`
   - Auth: `/api/auth/login`, `/api/auth/register`
   - Cart: `/api/cart`
   - Orders: `/api/orders`
   - Users: `/api/users/me`

4. **State Management**:
   - `useAuthStore` - Manages authentication state
   - `useCartStore` - Manages cart state
   - Both integrate with backend API

## Documentation

- **Features**: `docs/FRONTEND_FEATURES.md`
- **Showcase**: `docs/FRONTEND_SHOWCASE.md`

## Development

### Run Tests

```bash
docker-compose exec frontend npm test
```

### View Logs

```bash
docker-compose logs -f frontend
```
