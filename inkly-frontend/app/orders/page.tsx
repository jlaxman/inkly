'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useAuthStore } from '@/store/useAuthStore';
import { ordersApi } from '@/lib/api';
import { Order } from '@/types';
import { formatPrice } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { Package, ArrowRight } from 'lucide-react';

export default function OrdersPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    fetchOrders();
  }, [isAuthenticated, router]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await ordersApi.getAll();
      setOrders(response.data || []);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      PENDING: 'bg-yellow-100 text-yellow-800',
      PROCESSING: 'bg-blue-100 text-blue-800',
      SHIPPED: 'bg-purple-100 text-purple-800',
      DELIVERED: 'bg-green-100 text-green-800',
      CANCELLED: 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  if (!isAuthenticated) {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-12">My Orders</h1>

        {orders.length === 0 ? (
          <div className="text-center py-24">
            <Package className="w-24 h-24 mx-auto text-gray-300 mb-6" />
            <h2 className="text-2xl font-bold mb-4">No orders yet</h2>
            <p className="text-gray-600 mb-8">Start shopping to see your orders here</p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 rounded-full font-semibold hover:bg-gray-900 smooth-transition"
            >
              Browse Products
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border border-gray-200 rounded-2xl p-6 hover:shadow-lg smooth-transition"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Order #{order.id.slice(-8)}</h3>
                    <p className="text-gray-600 text-sm">
                      {new Date(order.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                    <span className="text-2xl font-bold">{formatPrice(order.total)}</span>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <p className="text-sm text-gray-600 mb-2">
                    {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                  </p>
                  <Link
                    href={`/orders/${order.id}`}
                    className="inline-flex items-center gap-2 text-black font-medium hover:gap-4 smooth-transition"
                  >
                    View Details
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
