'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { productsApi } from '@/lib/api';
import { ArrowRight } from 'lucide-react';

export default function CategoriesPage() {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await productsApi.getCategories();
      // Handle both wrapped and unwrapped responses
      const categoriesData = response.data?.data || response.data || [];
      setCategories(Array.isArray(categoriesData) ? categoriesData : []);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
      setCategories([]); // Ensure it's always an array
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white pt-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Categories</h1>
          <p className="text-gray-600 text-lg">Explore our product categories</p>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-100 rounded-2xl aspect-[4/3] animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.isArray(categories) && categories.map((category, index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <Link href={`/products?category=${category}`}>
                  <div className="group relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-12 hover:shadow-xl smooth-transition overflow-hidden">
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-5 smooth-transition" />
                    <h2 className="text-3xl font-bold mb-4 capitalize">{category}</h2>
                    <div className="flex items-center gap-2 text-gray-600 group-hover:text-black smooth-transition">
                      <span>Explore</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 smooth-transition" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
