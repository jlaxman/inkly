import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Handle 401 errors (unauthorized)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// API endpoints
export const productsApi = {
  getAll: (params?: any) => api.get('/products', { params }),
  getById: (id: string) => api.get(`/products/${id}`),
  getCategories: () => api.get('/products/categories'),
};

export const authApi = {
  register: (data: { email: string; password: string; name?: string }) =>
    api.post('/auth/register', data),
  login: (data: { email: string; password: string }) =>
    api.post('/auth/login', data),
};

export const cartApi = {
  get: () => api.get('/cart'),
  add: (data: { productId: string; quantity: number }) =>
    api.post('/cart', data),
  updateItem: (id: string, data: { quantity: number }) =>
    api.patch(`/cart/items/${id}`, data),
  removeItem: (id: string) => api.delete(`/cart/items/${id}`),
  clear: () => api.delete('/cart'),
};

export const ordersApi = {
  create: (data?: any) => api.post('/orders', data),
  getAll: () => api.get('/orders'),
  getById: (id: string) => api.get(`/orders/${id}`),
};

export const usersApi = {
  getProfile: () => api.get('/users/me'),
  updateProfile: (data: any) => api.patch('/users/me', data),
};
