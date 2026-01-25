'use client';

import Link from 'next/link';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <Logo className="text-white mb-4" size="sm" />
            <p className="text-gray-400 text-sm">
              Premium custom apparel, gifts, and more platform.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h3 className="font-semibold mb-4">Shop</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/products" className="hover:text-white smooth-transition">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-white smooth-transition">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/custom" className="hover:text-white smooth-transition">
                  Custom Orders
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/help" className="hover:text-white smooth-transition">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-white smooth-transition">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-white smooth-transition">
                  Returns
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white smooth-transition">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/about" className="hover:text-white smooth-transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-white smooth-transition">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white smooth-transition">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Inkly. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-gray-400 text-sm hover:text-white smooth-transition">
              Privacy
            </Link>
            <Link href="/terms" className="text-gray-400 text-sm hover:text-white smooth-transition">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
