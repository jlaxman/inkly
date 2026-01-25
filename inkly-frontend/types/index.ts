export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  category: string;
  images: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  product: Product;
  createdAt: string;
  updatedAt: string;
}

export interface Cart {
  id: string;
  userId: string;
  items: CartItem[];
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  id: string;
  userId: string;
  status: 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  total: number;
  items: OrderItem[];
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  price: number;
  product: Product;
  createdAt: string;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  role: 'CUSTOMER' | 'ADMIN';
  createdAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}
