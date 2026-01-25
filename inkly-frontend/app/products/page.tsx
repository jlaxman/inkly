'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { productsApi } from '@/lib/api';
import { Product } from '@/types';
import ProductCard from '@/components/ProductCard';
import { Search, Filter } from 'lucide-react';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [page, selectedCategory, search]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params: any = {
        page,
        limit: 12,
      };
      if (selectedCategory) params.category = selectedCategory;
      if (search) params.search = search;

      const response = await productsApi.getAll(params);
      setProducts(response.data.data || []);
      setTotalPages(response.data.meta?.totalPages || 1);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await productsApi.getCategories();
      // Handle both wrapped and unwrapped responses
      const categoriesData = response.data?.data || response.data || [];
      setCategories(Array.isArray(categoriesData) ? categoriesData : []);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
      setCategories([]); // Ensure it's always an array
    }
  };

  return (
    <div className="min-h-screen bg-white pt-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Our Products</h1>
          <p className="text-gray-600 text-lg">Discover our premium collection</p>
        </motion.div>

        {/* Filters */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setPage(1);
                }}
                className="pl-12 pr-8 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-black appearance-none bg-white"
              >
                <option value="">All Categories</option>
                {Array.isArray(categories) && categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-100 rounded-2xl aspect-square animate-pulse" />
            ))}
          </div>
        ) : products.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.6 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 border border-gray-300 rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-black hover:text-white smooth-transition"
                >
                  Previous
                </button>
                <span className="px-4 py-2">
                  Page {page} of {totalPages}
                </span>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-4 py-2 border border-gray-300 rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-black hover:text-white smooth-transition"
                >
                  Next
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-24">
            <p className="text-gray-600 text-lg">No products found</p>
          </div>
        )}
      </div>
    </div>
  );
}
