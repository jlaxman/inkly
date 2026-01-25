# Inkly API Documentation

Base URL: `http://localhost:3001`

## Authentication

### Register
```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe" // optional
}
```

### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "user": {
    "id": "clx...",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "CUSTOMER"
  },
  "token": "eyJhbGc..."
}
```

## Products

### Get All Products
```http
GET /products?page=1&limit=20&category=tshirts&search=blue&sortBy=price&sortOrder=asc
```

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 20, max: 100)
- `category` (optional): Filter by category
- `search` (optional): Search in name and description
- `sortBy` (optional): Field to sort by (default: createdAt)
- `sortOrder` (optional): asc or desc (default: desc)

**Response:**
```json
{
  "data": [
    {
      "id": "clx...",
      "name": "Custom T-Shirt",
      "description": "Premium cotton t-shirt",
      "price": 29.99,
      "category": "tshirts",
      "images": ["https://..."],
      "isActive": true,
      "createdAt": "2026-01-25T...",
      "updatedAt": "2026-01-25T..."
    }
  ],
  "meta": {
    "total": 50,
    "page": 1,
    "limit": 20,
    "totalPages": 3
  }
}
```

### Get Product by ID
```http
GET /products/:id
```

### Get Categories
```http
GET /products/categories
```

**Response:**
```json
["tshirts", "hoodies", "mugs", "posters"]
```

### Create Product (Admin)
```http
POST /products
Content-Type: application/json

{
  "name": "Custom T-Shirt",
  "description": "Premium cotton t-shirt",
  "price": 29.99,
  "category": "tshirts",
  "images": ["https://example.com/image.jpg"],
  "isActive": true
}
```

### Update Product (Admin)
```http
PATCH /products/:id
Content-Type: application/json

{
  "price": 24.99
}
```

### Delete Product (Admin)
```http
DELETE /products/:id
```

## Cart

### Get Cart
```http
GET /cart
```

**Response:**
```json
{
  "id": "clx...",
  "userId": "clx...",
  "items": [
    {
      "id": "clx...",
      "quantity": 2,
      "product": {
        "id": "clx...",
        "name": "Custom T-Shirt",
        "price": 29.99,
        ...
      }
    }
  ],
  "createdAt": "2026-01-25T...",
  "updatedAt": "2026-01-25T..."
}
```

### Add to Cart
```http
POST /cart
Content-Type: application/json

{
  "productId": "clx...",
  "quantity": 2
}
```

### Update Cart Item
```http
PATCH /cart/items/:id
Content-Type: application/json

{
  "quantity": 3
}
```

### Remove from Cart
```http
DELETE /cart/items/:id
```

### Clear Cart
```http
DELETE /cart
```

## Orders

### Create Order
```http
POST /orders
Content-Type: application/json

{
  "shippingAddress": "123 Main St, City, State 12345",
  "shippingInfo": {
    "phone": "+1234567890",
    "notes": "Leave at door"
  }
}
```

**Response:**
```json
{
  "id": "clx...",
  "userId": "clx...",
  "status": "PENDING",
  "total": 59.98,
  "items": [
    {
      "id": "clx...",
      "quantity": 2,
      "price": 29.99,
      "product": {
        "id": "clx...",
        "name": "Custom T-Shirt",
        ...
      }
    }
  ],
  "createdAt": "2026-01-25T...",
  "updatedAt": "2026-01-25T..."
}
```

### Get All Orders
```http
GET /orders
```

### Get Order by ID
```http
GET /orders/:id
```

### Update Order Status (Admin)
```http
PATCH /orders/:id
Content-Type: application/json

{
  "status": "PROCESSING" // PENDING, PROCESSING, SHIPPED, DELIVERED, CANCELLED
}
```

## Health Check

```http
GET /health
```

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2026-01-25T16:00:00.000Z",
  "service": "inkly-backend"
}
```
