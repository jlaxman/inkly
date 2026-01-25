'use client';

import { motion } from 'framer-motion';
import { Sparkles, Award, Heart } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white pt-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
        {/* Hero */}
        <motion.div
          className="text-center mb-24"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6">About Inkly</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We&apos;re on a mission to help you create something extraordinary.
            Every product tells a story, and we&apos;re here to help you tell yours.
          </p>
        </motion.div>

        {/* Mission */}
        <motion.div
          className="mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Our Mission</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-4">
                At Inkly, we believe that every product should be as unique as the person who creates it.
                We provide premium custom apparel, gifts, and more that help you express yourself
                and celebrate life&apos;s special moments.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                With cutting-edge technology and a passion for quality, we&apos;re making it easier than ever
                to bring your vision to life.
              </p>
            </div>
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl aspect-square flex items-center justify-center">
              <Sparkles className="w-32 h-32 text-gray-400" />
            </div>
          </div>
        </motion.div>

        {/* Values */}
        <motion.div
          className="mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-4xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Award,
                title: 'Quality First',
                description: 'We never compromise on quality. Every product is crafted with care and attention to detail.',
              },
              {
                icon: Heart,
                title: 'Customer Focused',
                description: 'Your satisfaction is our priority. We&apos;re here to make your experience exceptional.',
              },
              {
                icon: Sparkles,
                title: 'Innovation',
                description: 'We constantly push boundaries to bring you the latest in customization technology.',
              },
            ].map((value, index) => {
              const IconComponent = value.icon;
              return (
                <motion.div
                  key={value.title}
                  className="text-center p-8"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                >
                  <IconComponent className="w-16 h-16 mx-auto mb-4 text-blue-600" />
                  <h3 className="text-2xl font-semibold mb-4">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center bg-black text-white rounded-2xl p-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-gray-300 text-lg mb-8">
            Join thousands of customers who trust Inkly for their custom products.
          </p>
          <a
            href="/products"
            className="inline-block bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-gray-100 smooth-transition"
          >
            Explore Products
          </a>
        </motion.div>
      </div>
    </div>
  );
}
