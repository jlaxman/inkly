'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';
import { formatPrice } from '@/lib/utils';
import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { useAuthStore } from '@/store/useAuthStore';
import { toast } from 'react-hot-toast';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addToCart = useCartStore((state) => state.addToCart);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isAuthenticated) {
      toast.error('Please sign in to add items to cart');
      return;
    }

    try {
      await addToCart(product.id, 1);
      toast.success('Added to cart!');
    } catch (error) {
      toast.error('Failed to add to cart');
    }
  };

  return (
    <Link href={`/products/${product.id}`}>
      <motion.div
        className="group relative bg-white rounded-2xl overflow-hidden premium-shadow hover:premium-shadow-lg smooth-transition"
        whileHover={{ y: -5 }}
        transition={{ duration: 0.3 }}
      >
        {/* Image */}
        <div className="relative aspect-square bg-gray-100 overflow-hidden">
          {product.images && product.images.length > 0 ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-110 smooth-transition"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
              <span className="text-gray-400 text-sm">No Image</span>
            </div>
          )}
          
          {/* Quick Add Button */}
          <motion.button
            className="absolute bottom-4 right-4 bg-black text-white p-3 rounded-full opacity-0 group-hover:opacity-100 smooth-transition"
            onClick={handleAddToCart}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ShoppingCart className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="font-semibold text-lg mb-2 group-hover:text-blue-600 smooth-transition">
            {product.name}
          </h3>
          {product.description && (
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
              {product.description}
            </p>
          )}
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold">{formatPrice(product.price)}</span>
            <span className="text-xs text-gray-500 uppercase">{product.category}</span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
