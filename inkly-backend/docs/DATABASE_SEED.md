# Database Seed Guide

## Overview

The database seed script populates the database with comprehensive dummy data including:
- **49 products** across **11 categories**
- **Admin user** for management
- **Test customer** for testing

## Categories Included

1. **Apparels** (4 products)
   - Round Neck T-Shirts
   - Polo T-Shirts
   - Hoodies
   - Caps

2. **Drinkware** (4 products)
   - Ceramic Mugs
   - Stainless Steel Flasks
   - Sipper Bottles
   - Coffee Mug Sets

3. **Business Stationery** (7 products)
   - Business Cards
   - Letterheads
   - Stamps
   - Envelopes
   - Notebooks
   - Booklets
   - Labels

4. **Photo Gifts** (5 products)
   - Photo Frames
   - Photo Prints
   - Acrylic Photo Prints
   - Photo Books
   - Photo Print Tote Bags

5. **Rewards & Recognition** (5 products)
   - Crystal Awards
   - Acrylic Awards
   - Wooden Trophies
   - Certificates
   - Medals

6. **Packaging** (5 products)
   - Flat Mailer Boxes
   - Vinyl Stickers
   - Labels
   - Canvas Tote Bags
   - Flexible Pouches

7. **Marketing & Promo** (4 products)
   - Vinyl Banners
   - Booklets
   - Tri-Fold Brochures
   - Retractable Standees

8. **Calendars & Diaries** (4 products)
   - Desk Calendars
   - Wall Calendars
   - Leather Diaries
   - Pocket Calendars

9. **Corporate Gifts** (5 products)
   - Premium Gift Hampers
   - Employee Engagement Kits
   - Welcome Kits
   - Sustainable Gift Kits
   - Luxury Gift Hampers

10. **Premium Products** (5 products)
    - Business Card Holders
    - Pen Sets
    - Backpacks
    - Button Badges
    - Leather Portfolios

11. **Sample Kit** (1 product)
    - Product Showcase Kit

## Running the Seed

### In Docker (Recommended)

```bash
# Seed the database
./seed-database.sh

# Or using npm
npm run seed
```

### Manual (Inside Container)

```bash
# Enter backend container
docker-compose exec backend sh

# Run seed
npm run prisma:seed
```

## What Gets Created

### Users
- **Admin**: admin@inkly.com / admin123
- **Customer**: customer@inkly.com / customer123

### Products
- 49 products with:
  - Names and descriptions
  - Prices (₹29 - ₹3,499)
  - Categories
  - Image URLs (placeholders from Unsplash)

## Image Notes

⚠️ **Important**: Current product images are placeholders from Unsplash.

You need to replace them with actual product images that show:
- Stylish American/white male model (30s-40s)
- Products with custom logos visible
- Clean backgrounds (like Flipkart product pages)
- Professional e-commerce photography

See [IMAGE_GUIDELINES.md](./IMAGE_GUIDELINES.md) for detailed image requirements.

## Updating Images

1. Generate or obtain product images
2. Upload to your image hosting/CDN
3. Update image URLs in `inkly-backend/prisma/seed.ts`
4. Re-run seed: `./seed-database.sh`

## Resetting Database

To clear and re-seed:

```bash
# Clear all data and re-seed
docker-compose exec backend npx prisma db push --force-reset
docker-compose exec backend npm run prisma:seed
```

Or:

```bash
# Stop containers, remove volumes, restart
docker-compose down -v
./start-docker.sh
./seed-database.sh
```

## Verification

After seeding, verify:

```bash
# Check products count
docker-compose exec backend npx prisma studio
# Visit http://localhost:5555

# Or via API
curl http://localhost:3001/api/products | jq '.data.meta.total'
# Should return 49
```

## Product Data Structure

Each product includes:
- `name`: Product name
- `description`: Detailed description
- `price`: Price in ₹ (INR)
- `category`: Category slug
- `images`: Array of image URLs (2 images per product)
- `isActive`: true (all products active)

## Next Steps

1. Run seed: `./seed-database.sh`
2. View products: http://localhost:3000/products
3. Generate actual product images
4. Update seed file with new image URLs
5. Re-seed database
