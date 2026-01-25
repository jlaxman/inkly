import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

// Comprehensive product data for all categories
// NOTE: Images are placeholders. Replace with actual product images showing:
// - Stylish American/white male model (30s-40s) with products
// - Clean backgrounds like Flipkart product pages
// - Custom logos visible on products
// - Realistic e-commerce photography

const products = [
  // ========== APPARELS ==========
  {
    name: 'Custom Round Neck T-Shirt - Premium Cotton',
    description: 'Premium quality 100% cotton round neck t-shirt with custom logo printing. Perfect for corporate branding, events, and team uniforms. Available in multiple colors and sizes.',
    price: 499.00,
    category: 'apparels',
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=800&h=800&fit=crop',
    ],
  },
  {
    name: 'Custom Polo T-Shirt - Classic Fit',
    description: 'Professional polo t-shirt with custom embroidery or printing. Ideal for corporate wear, sports teams, and branded merchandise. Premium fabric with collar design.',
    price: 899.00,
    category: 'apparels',
    images: [
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1603252109303-2751441dd157?w=800&h=800&fit=crop',
    ],
  },
  {
    name: 'Custom Hoodie - Premium Fleece',
    description: 'Comfortable and stylish hoodie with custom logo. Perfect for casual corporate wear, team building events, and promotional merchandise. Available in various colors.',
    price: 1299.00,
    category: 'apparels',
    images: [
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&h=800&fit=crop',
    ],
  },
  {
    name: 'Custom Cap - Adjustable',
    description: 'High-quality adjustable cap with custom embroidery. Perfect for outdoor events, sports teams, and corporate branding. Durable and comfortable design.',
    price: 399.00,
    category: 'apparels',
    images: [
      'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1514327605112-b887c0e61c0a?w=800&h=800&fit=crop',
    ],
  },

  // ========== DRINKWARE ==========
  {
    name: 'Premium Ceramic Mug - Custom Logo',
    description: 'High-quality ceramic mug with custom logo printing. Perfect for office use, corporate gifts, and promotional items. Dishwasher safe and durable.',
    price: 299.00,
    category: 'drinkware',
    images: [
      'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&h=800&fit=crop',
    ],
  },
  {
    name: 'Premium Stainless Steel Flask',
    description: 'Insulated stainless steel flask with custom engraving. Keeps drinks hot or cold for hours. Perfect for corporate gifts and outdoor activities.',
    price: 799.00,
    category: 'drinkware',
    images: [
      'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&h=800&fit=crop',
    ],
  },
  {
    name: 'Premium Sipper Bottle - BPA Free',
    description: 'Eco-friendly sipper bottle with custom logo. Leak-proof design, perfect for office, gym, or travel. Available in multiple colors and sizes.',
    price: 599.00,
    category: 'drinkware',
    images: [
      'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&h=800&fit=crop',
    ],
  },
  {
    name: 'Premium Coffee Mug Set - 2 Pieces',
    description: 'Set of 2 premium ceramic mugs with custom logo. Perfect for corporate gifts and office use. Elegant design with comfortable handle.',
    price: 549.00,
    category: 'drinkware',
    images: [
      'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&h=800&fit=crop',
    ],
  },

  // ========== BUSINESS STATIONERY ==========
  {
    name: 'Premium Business Cards - Matte Finish',
    description: 'High-quality business cards with custom design and logo. Available in various finishes: matte, glossy, or textured. Perfect for professional networking.',
    price: 199.00,
    category: 'business-stationery',
    images: [
      'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=800&h=800&fit=crop',
    ],
  },
  {
    name: 'Custom Letterheads - Premium Paper',
    description: 'Professional letterheads with your company logo and branding. Available in various paper qualities and finishes. Perfect for official correspondence.',
    price: 149.00,
    category: 'business-stationery',
    images: [
      'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&h=800&fit=crop',
    ],
  },
  {
    name: 'Custom Stamps - Self-Inking',
    description: 'Professional self-inking stamps with your logo or text. Perfect for official documents, invoices, and certificates. Durable and long-lasting.',
    price: 349.00,
    category: 'business-stationery',
    images: [
      'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=800&h=800&fit=crop',
    ],
  },
  {
    name: 'Custom Envelopes - Premium Quality',
    description: 'Branded envelopes with your company logo. Available in various sizes and paper qualities. Perfect for professional mailings and corporate communications.',
    price: 99.00,
    category: 'business-stationery',
    images: [
      'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&h=800&fit=crop',
    ],
  },
  {
    name: 'Custom Notebooks - Hard Cover',
    description: 'Premium hardcover notebooks with custom logo embossing. Perfect for corporate gifts, employee recognition, and branded merchandise. Available in various sizes.',
    price: 449.00,
    category: 'business-stationery',
    images: [
      'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=800&fit=crop',
    ],
  },
  {
    name: 'Booklets - Premium Printing',
    description: 'Professional booklets with custom design and high-quality printing. Perfect for product catalogs, event programs, and marketing materials.',
    price: 149.00,
    category: 'business-stationery',
    images: [
      'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=800&fit=crop',
    ],
  },
  {
    name: 'Labels - Premium Paper',
    description: 'High-quality labels with custom printing. Perfect for product labeling, branding, and packaging. Available in various sizes and finishes.',
    price: 39.00,
    category: 'business-stationery',
    images: [
      'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&h=800&fit=crop',
    ],
  },

  // ========== PHOTO GIFTS ==========
  {
    name: 'Photo Frame - Premium Wood',
    description: 'Elegant wooden photo frame with custom photo printing. Perfect for corporate awards, employee recognition, and personalized gifts. Available in various sizes.',
    price: 599.00,
    category: 'photo-gifts',
    images: [
      'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=800&fit=crop',
    ],
  },
  {
    name: 'Photo Print - Premium Quality',
    description: 'High-resolution photo prints on premium paper. Perfect for wall art, office decoration, and personalized gifts. Available in various sizes and finishes.',
    price: 249.00,
    category: 'photo-gifts',
    images: [
      'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=800&fit=crop',
    ],
  },
  {
    name: 'Acrylic Photo Print - Modern Design',
    description: 'Modern acrylic photo prints with vibrant colors. Perfect for contemporary office spaces, modern homes, and premium gifts. Durable and long-lasting.',
    price: 899.00,
    category: 'photo-gifts',
    images: [
      'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=800&fit=crop',
    ],
  },
  {
    name: 'Photo Book - Premium Binding',
    description: 'Custom photo book with premium binding and high-quality printing. Perfect for preserving memories, corporate events, and special occasions.',
    price: 1299.00,
    category: 'photo-gifts',
    images: [
      'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=800&fit=crop',
    ],
  },
  {
    name: 'Tote Bag - Photo Print',
    description: 'Eco-friendly canvas tote bag with custom photo printing. Perfect for shopping, events, and promotional merchandise. Durable and reusable.',
    price: 199.00,
    category: 'photo-gifts',
    images: [
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&h=800&fit=crop',
    ],
  },

  // ========== REWARDS AND RECOGNITION ==========
  {
    name: 'Crystal Award - Excellence',
    description: 'Premium crystal award with custom engraving. Perfect for employee recognition, achievements, and corporate awards. Elegant and prestigious design.',
    price: 2499.00,
    category: 'rewards-recognition',
    images: [
      'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=800&fit=crop',
    ],
  },
  {
    name: 'Acrylic Award - Modern Design',
    description: 'Contemporary acrylic award with laser engraving. Perfect for modern corporate recognition programs and achievement awards. Sleek and professional.',
    price: 1499.00,
    category: 'rewards-recognition',
    images: [
      'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=800&fit=crop',
    ],
  },
  {
    name: 'Wooden Trophy - Classic Design',
    description: 'Premium wooden trophy with custom engraving. Perfect for sports events, corporate achievements, and recognition programs. Timeless and elegant.',
    price: 999.00,
    category: 'rewards-recognition',
    images: [
      'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=800&fit=crop',
    ],
  },
  {
    name: 'Certificate - Premium Paper',
    description: 'Professional certificates with custom design and gold foil stamping. Perfect for achievements, completion certificates, and recognition awards.',
    price: 199.00,
    category: 'rewards-recognition',
    images: [
      'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&h=800&fit=crop',
    ],
  },
  {
    name: 'Medal - Custom Design',
    description: 'Premium medals with custom design and ribbon. Perfect for sports events, competitions, and achievement recognition. Available in various finishes.',
    price: 299.00,
    category: 'rewards-recognition',
    images: [
      'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=800&fit=crop',
    ],
  },

  // ========== PACKAGING ==========
  {
    name: 'Flat Mailer Box - Custom Printed',
    description: 'Eco-friendly flat mailer boxes with custom printing. Perfect for shipping, product packaging, and branded deliveries. Durable and protective.',
    price: 49.00,
    category: 'packaging',
    images: [
      'https://images.unsplash.com/photo-1607082349566-187342175e2f?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=800&h=800&fit=crop',
    ],
  },
  {
    name: 'Custom Stickers - Vinyl',
    description: 'Premium vinyl stickers with custom design. Weather-resistant and durable. Perfect for branding, promotions, and product labeling. Various sizes available.',
    price: 29.00,
    category: 'packaging',
    images: [
      'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&h=800&fit=crop',
    ],
  },
  {
    name: 'Custom Labels - Premium Paper',
    description: 'High-quality labels with custom printing. Perfect for product labeling, branding, and packaging. Available in various sizes and finishes.',
    price: 39.00,
    category: 'packaging',
    images: [
      'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&h=800&fit=crop',
    ],
  },
  {
    name: 'Tote Bag - Canvas',
    description: 'Eco-friendly canvas tote bag with custom printing. Perfect for shopping, events, and promotional merchandise. Durable and reusable.',
    price: 199.00,
    category: 'packaging',
    images: [
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&h=800&fit=crop',
    ],
  },
  {
    name: 'Flexible Pouches - Custom Printed',
    description: 'Durable flexible pouches with custom printing. Perfect for product packaging, retail, and branded merchandise. Available in various sizes.',
    price: 79.00,
    category: 'packaging',
    images: [
      'https://images.unsplash.com/photo-1607082349566-187342175e2f?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=800&h=800&fit=crop',
    ],
  },

  // ========== MARKETING & PROMO ==========
  {
    name: 'Banner - Vinyl',
    description: 'Premium vinyl banners with custom printing. Weather-resistant and durable. Perfect for events, promotions, and outdoor advertising. Various sizes available.',
    price: 799.00,
    category: 'marketing-promo',
    images: [
      'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&h=800&fit=crop',
    ],
  },
  {
    name: 'Booklet - Premium Printing',
    description: 'Professional booklets with custom design and high-quality printing. Perfect for product catalogs, event programs, and marketing materials.',
    price: 149.00,
    category: 'marketing-promo',
    images: [
      'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=800&fit=crop',
    ],
  },
  {
    name: 'Brochure - Tri-Fold',
    description: 'Premium tri-fold brochures with custom design. Perfect for marketing campaigns, product information, and promotional materials. High-quality printing.',
    price: 99.00,
    category: 'marketing-promo',
    images: [
      'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=800&fit=crop',
    ],
  },
  {
    name: 'Standee - Retractable',
    description: 'Professional retractable standee with custom printing. Perfect for events, exhibitions, and point-of-sale displays. Portable and easy to set up.',
    price: 1299.00,
    category: 'marketing-promo',
    images: [
      'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&h=800&fit=crop',
    ],
  },

  // ========== CALENDARS & DIARIES ==========
  {
    name: 'Desk Calendar - Spiral Bound',
    description: 'Premium desk calendar with custom design and logo. Perfect for office use, corporate gifts, and promotional items. Available in various sizes.',
    price: 399.00,
    category: 'calendars-diaries',
    images: [
      'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=800&fit=crop',
    ],
  },
  {
    name: 'Wall Calendar - Premium Paper',
    description: 'High-quality wall calendar with custom photos and branding. Perfect for corporate gifts, office decoration, and promotional merchandise.',
    price: 299.00,
    category: 'calendars-diaries',
    images: [
      'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=800&fit=crop',
    ],
  },
  {
    name: 'Diary - Leather Bound',
    description: 'Premium leather-bound diary with custom logo embossing. Perfect for corporate gifts, employee recognition, and professional use. Available in various sizes.',
    price: 599.00,
    category: 'calendars-diaries',
    images: [
      'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=800&fit=crop',
    ],
  },
  {
    name: 'Pocket Calendar - Mini',
    description: 'Compact pocket calendar with custom design. Perfect for on-the-go professionals and corporate gifts. Fits easily in wallet or pocket.',
    price: 149.00,
    category: 'calendars-diaries',
    images: [
      'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=800&fit=crop',
    ],
  },

  // ========== CORPORATE GIFTS ==========
  {
    name: 'Corporate Gift Hamper - Premium',
    description: 'Curated premium gift hamper with branded items. Perfect for client appreciation, employee recognition, and corporate gifting. Customizable contents.',
    price: 2499.00,
    category: 'corporate-gifts',
    images: [
      'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&h=800&fit=crop',
    ],
  },
  {
    name: 'Employee Engagement Kit',
    description: 'Comprehensive employee engagement kit with branded merchandise. Includes notebook, pen, mug, and other essentials. Perfect for onboarding and team building.',
    price: 899.00,
    category: 'corporate-gifts',
    images: [
      'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&h=800&fit=crop',
    ],
  },
  {
    name: 'Welcome Kit - New Employee',
    description: 'Professional welcome kit for new employees. Includes branded items, stationery, and company information. Perfect for onboarding and first impressions.',
    price: 699.00,
    category: 'corporate-gifts',
    images: [
      'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&h=800&fit=crop',
    ],
  },
  {
    name: 'Sustainable Gift Kit - Eco-Friendly',
    description: 'Eco-friendly corporate gift kit with sustainable products. Perfect for environmentally conscious companies. Includes reusable items and organic products.',
    price: 1199.00,
    category: 'corporate-gifts',
    images: [
      'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&h=800&fit=crop',
    ],
  },
  {
    name: 'Gift Hamper - Luxury Collection',
    description: 'Premium luxury gift hamper with curated items. Perfect for VIP clients, executive gifts, and special occasions. Elegant packaging included.',
    price: 3499.00,
    category: 'corporate-gifts',
    images: [
      'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&h=800&fit=crop',
    ],
  },

  // ========== PREMIUM PRODUCTS ==========
  {
    name: 'Business Card Holder - Premium Leather',
    description: 'Elegant leather business card holder with custom logo embossing. Perfect for professionals, executives, and corporate gifts. Premium quality and design.',
    price: 799.00,
    category: 'premium-products',
    images: [
      'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=800&h=800&fit=crop',
    ],
  },
  {
    name: 'Premium Pen Set - Engraved',
    description: 'Luxury pen set with custom engraving. Perfect for corporate gifts, executive presents, and special occasions. Premium quality and elegant design.',
    price: 1299.00,
    category: 'premium-products',
    images: [
      'https://images.unsplash.com/photo-1583484963886-cceace8a0d0e?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=800&h=800&fit=crop',
    ],
  },
  {
    name: 'Premium Backpack - Custom Logo',
    description: 'High-quality backpack with custom logo printing. Perfect for corporate gifts, employee merchandise, and promotional items. Durable and stylish.',
    price: 1499.00,
    category: 'premium-products',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=800&h=800&fit=crop',
    ],
  },
  {
    name: 'Button Badge - Custom Design',
    description: 'Premium button badges with custom design and printing. Perfect for events, promotions, and team identification. Durable and eye-catching.',
    price: 49.00,
    category: 'premium-products',
    images: [
      'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=800&h=800&fit=crop',
    ],
  },
  {
    name: 'Premium Portfolio - Leather',
    description: 'Elegant leather portfolio with custom logo embossing. Perfect for professionals, executives, and corporate presentations. Premium quality.',
    price: 1999.00,
    category: 'premium-products',
    images: [
      'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=800&h=800&fit=crop',
    ],
  },

  // ========== SAMPLE KIT ==========
  {
    name: 'Sample Kit - Product Showcase',
    description: 'Comprehensive sample kit showcasing various products. Perfect for clients, prospects, and marketing purposes. Includes samples of key product categories.',
    price: 999.00,
    category: 'sample-kit',
    images: [
      'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&h=800&fit=crop',
    ],
  },
];

async function main() {
  console.log('🌱 Starting database seed...');

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@inkly.com' },
    update: {},
    create: {
      email: 'admin@inkly.com',
      password: hashedPassword,
      name: 'Admin User',
      role: 'ADMIN',
    },
  });
  console.log('✅ Created admin user:', admin.email);

  // Create test customer
  const customerPassword = await bcrypt.hash('customer123', 10);
  const customer = await prisma.user.upsert({
    where: { email: 'customer@inkly.com' },
    update: {},
    create: {
      email: 'customer@inkly.com',
      password: customerPassword,
      name: 'Test Customer',
      role: 'CUSTOMER',
    },
  });
  console.log('✅ Created test customer:', customer.email);

  // Clear existing products
  await prisma.product.deleteMany({});
  console.log('✅ Cleared existing products');

  // Create products
  console.log(`📦 Creating ${products.length} products...`);
  for (const product of products) {
    await prisma.product.create({
      data: product,
    });
  }
  console.log(`✅ Created ${products.length} products`);

  console.log('');
  console.log('🎉 Database seeded successfully!');
  console.log('');
  console.log('Admin credentials:');
  console.log('  Email: admin@inkly.com');
  console.log('  Password: admin123');
  console.log('');
  console.log('Customer credentials:');
  console.log('  Email: customer@inkly.com');
  console.log('  Password: customer123');
  console.log('');
  console.log('📝 Note: Product images are placeholders from Unsplash.');
  console.log('   Replace with actual product images showing models with custom logos.');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
