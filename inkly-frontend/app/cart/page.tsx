'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useCartStore } from '@/store/useCartStore';
import { useAuthStore } from '@/store/useAuthStore';
import { formatPrice } from '@/lib/utils';
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const router = useRouter();
  const { cart, isLoading, fetchCart, updateItem, removeItem, getTotalPrice } = useCartStore();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    fetchCart();
  }, [isAuthenticated, fetchCart, router]);

  const handleUpdateQuantity = async (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      await handleRemove(itemId);
      return;
    }
    try {
      await updateItem(itemId, newQuantity);
    } catch (error) {
      toast.error('Failed to update quantity');
    }
  };

  const handleRemove = async (itemId: string) => {
    try {
      await removeItem(itemId);
      toast.success('Item removed from cart');
    } catch (error) {
      toast.error('Failed to remove item');
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading cart...</p>
        </div>
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-white pt-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24 text-center">
          <ShoppingBag className="w-24 h-24 mx-auto text-gray-300 mb-6" />
          <h1 className="text-4xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-8">Start adding products to your cart</p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 rounded-full font-semibold hover:bg-gray-900 smooth-transition"
          >
            Continue Shopping
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    );
  }

  const total = getTotalPrice();

  return (
    <div className="min-h-screen bg-white pt-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-12">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cart.items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex gap-6 p-6 border border-gray-200 rounded-2xl hover:shadow-lg smooth-transition"
              >
                {/* Product Image */}
                <Link href={`/products/${item.product.id}`} className="flex-shrink-0">
                  <div className="relative w-24 h-24 bg-gray-100 rounded-lg overflow-hidden">
                    {item.product.images && item.product.images.length > 0 ? (
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-gray-400 text-xs">No Image</span>
                      </div>
                    )}
                  </div>
                </Link>

                {/* Product Info */}
                <div className="flex-1">
                  <Link href={`/products/${item.product.id}`}>
                    <h3 className="font-semibold text-lg mb-2 hover:text-blue-600 smooth-transition">
                      {item.product.name}
                    </h3>
                  </Link>
                  <p className="text-gray-600 text-sm mb-4">{formatPrice(item.product.price)}</p>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 border border-gray-300 rounded-full">
                      <button
                        onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                        className="p-2 hover:bg-black hover:text-white smooth-transition rounded-l-full"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-4 font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                        className="p-2 hover:bg-black hover:text-white smooth-transition rounded-r-full"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    <button
                      onClick={() => handleRemove(item.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-full smooth-transition"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Subtotal */}
                <div className="text-right">
                  <p className="text-xl font-bold">
                    {formatPrice(item.product.price * item.quantity)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              className="sticky top-24 p-6 border border-gray-200 rounded-2xl bg-gray-50"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="border-t border-gray-300 pt-4 flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>

              <Link
                href="/checkout"
                className="block w-full bg-black text-white py-4 rounded-full font-semibold text-center hover:bg-gray-900 smooth-transition mb-4"
              >
                Proceed to Checkout
              </Link>

              <Link
                href="/products"
                className="block w-full text-center text-gray-600 hover:text-black smooth-transition"
              >
                Continue Shopping
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
