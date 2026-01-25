'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';
import { productsApi } from '@/lib/api';
import { Product } from '@/types';
import ProductCard from '@/components/ProductCard';

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

  useEffect(() => {
    productsApi.getAll({ limit: 6 }).then((res) => {
      setFeaturedProducts(res.data.data || []);
    });
  }, []);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white" />
        
        <motion.div
          className="relative z-10 text-center px-6 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-6xl md:text-8xl font-bold mb-6 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Create Something
            <br />
            <span className="gradient-text">Extraordinary</span>
          </motion.h1>
          
          <motion.p
            className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Premium custom apparel, gifts, and more. 
            Designed for those who value quality and uniqueness.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <Link
              href="/products"
              className="group bg-black text-white px-8 py-4 rounded-full font-medium flex items-center justify-center gap-2 hover:bg-gray-900 smooth-transition"
            >
              Explore Products
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 smooth-transition" />
            </Link>
            <Link
              href="/custom"
              className="group border-2 border-black px-8 py-4 rounded-full font-medium flex items-center justify-center gap-2 hover:bg-black hover:text-white smooth-transition"
            >
              Custom Order
              <Sparkles className="w-5 h-5" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <motion.div
            className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <motion.div
              className="w-1 h-3 bg-gray-400 rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Featured Products
              </h2>
              <p className="text-gray-600 text-lg">
                Discover our most popular items
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>

            <motion.div
              className="text-center mt-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <Link
                href="/products"
                className="inline-flex items-center gap-2 text-black font-medium hover:gap-4 smooth-transition"
              >
                View All Products
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="py-24 px-6 bg-black text-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Why Choose Inkly
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                title: 'Premium Quality',
                description: 'Only the finest materials and craftsmanship',
              },
              {
                title: 'Custom Design',
                description: 'Make it uniquely yours with our design tools',
              },
              {
                title: 'Fast Shipping',
                description: 'Get your orders delivered quickly and safely',
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
              >
                <h3 className="text-2xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
