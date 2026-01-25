'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/useCartStore';
import { useAuthStore } from '@/store/useAuthStore';
import { ordersApi } from '@/lib/api';
import { formatPrice } from '@/lib/utils';
import { toast } from 'react-hot-toast';
import { CreditCard, Package } from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, getTotalPrice, fetchCart } = useCartStore();
  const { isAuthenticated } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    shippingAddress: '',
    phone: '',
    notes: '',
  });

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    if (!cart || cart.items.length === 0) {
      router.push('/cart');
      return;
    }
  }, [isAuthenticated, cart, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await ordersApi.create({
        shippingAddress: formData.shippingAddress,
        shippingInfo: {
          phone: formData.phone,
          notes: formData.notes,
        },
      });
      toast.success('Order placed successfully!');
      await fetchCart();
      router.push('/orders');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  if (!cart || cart.items.length === 0) {
    return null;
  }

  const total = getTotalPrice();

  return (
    <div className="min-h-screen bg-white pt-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-12">Checkout</h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Shipping Information */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 border border-gray-200 rounded-2xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <Package className="w-6 h-6" />
                <h2 className="text-2xl font-semibold">Shipping Information</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Shipping Address *
                  </label>
                  <textarea
                    value={formData.shippingAddress}
                    onChange={(e) => setFormData({ ...formData, shippingAddress: e.target.value })}
                    required
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="123 Main St, City, State 12345"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Notes (Optional)</label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="Special delivery instructions..."
                  />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="p-6 border border-gray-200 rounded-2xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <CreditCard className="w-6 h-6" />
                <h2 className="text-2xl font-semibold">Payment</h2>
              </div>
              <p className="text-gray-600">
                Payment integration will be added in the next phase. For now, orders will be processed manually.
              </p>
            </motion.div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="sticky top-24 p-6 border border-gray-200 rounded-2xl bg-gray-50"
            >
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                {cart.items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      {item.product.name} × {item.quantity}
                    </span>
                    <span>{formatPrice(item.product.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-300 pt-4 mb-6">
                <div className="flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-black text-white py-4 rounded-full font-semibold hover:bg-gray-900 smooth-transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Placing Order...' : 'Place Order'}
              </button>
            </motion.div>
          </div>
        </form>
      </div>
    </div>
  );
}
