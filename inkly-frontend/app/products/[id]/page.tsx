'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { productsApi } from '@/lib/api';
import { Product } from '@/types';
import { formatPrice } from '@/lib/utils';
import { ShoppingCart, Minus, Plus } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { useAuthStore } from '@/store/useAuthStore';
import { toast } from 'react-hot-toast';

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const addToCart = useCartStore((state) => state.addToCart);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const response = await productsApi.getById(productId);
      setProduct(response.data);
    } catch (error) {
      console.error('Failed to fetch product:', error);
      toast.error('Product not found');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      toast.error('Please sign in to add items to cart');
      return;
    }

    if (!product) return;

    try {
      await addToCart(product.id, quantity);
      toast.success('Added to cart!');
    } catch (error) {
      toast.error('Failed to add to cart');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white pt-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
          <p className="text-gray-600">The product you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative aspect-square bg-gray-100 rounded-2xl overflow-hidden mb-4 premium-shadow">
              {product.images && product.images.length > 0 ? (
                <Image
                  src={product.images[selectedImage]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-gray-400">No Image</span>
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            {product.images && product.images.length > 1 && (
              <div className="flex gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 smooth-transition ${
                      selectedImage === index
                        ? 'border-black'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <div className="mb-6">
              <span className="text-sm text-gray-500 uppercase tracking-wide">
                {product.category}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-4">{product.name}</h1>
              <p className="text-3xl font-bold mb-6">{formatPrice(product.price)}</p>
            </div>

            {product.description && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-3">Description</h2>
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="mb-8">
              <label className="block text-sm font-medium mb-3">Quantity</label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-2 border border-gray-300 rounded-full hover:bg-black hover:text-white smooth-transition"
                >
                  <Minus className="w-5 h-5" />
                </button>
                <span className="text-2xl font-semibold w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="p-2 border border-gray-300 rounded-full hover:bg-black hover:text-white smooth-transition"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <motion.button
              onClick={handleAddToCart}
              className="w-full bg-black text-white py-4 rounded-full font-semibold flex items-center justify-center gap-2 hover:bg-gray-900 smooth-transition mb-4"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <ShoppingCart className="w-5 h-5" />
              Add to Cart
            </motion.button>

            {/* Product Details */}
            <div className="border-t border-gray-200 pt-6 mt-6">
              <h3 className="font-semibold mb-3">Product Details</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>Category: <span className="font-medium">{product.category}</span></li>
                <li>Price: <span className="font-medium">{formatPrice(product.price)}</span></li>
                <li>Status: <span className="font-medium">{product.isActive ? 'Available' : 'Out of Stock'}</span></li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
