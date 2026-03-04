# KLOSET Admin System - Complete Documentation

## Overview
The KLOSET admin system provides comprehensive tools for managing your e-commerce store. This document details all available admin features.

---

## 🔐 Admin Access

**Login URL:** `/admin`  
**Default Password:** `admin123`

### How to Login:
1. Navigate to `http://yoursite.com/admin`
2. Enter the password: `admin123`
3. You'll be redirected to the Admin Dashboard

---

## 📊 Admin Dashboard (`/admin/dashboard`)

The central hub for store management with comprehensive metrics and shortcuts.

### Features:
- **Quick Stats:**
  - Total Products
  - Total Orders
  - Total Revenue
  - Average Order Value
  - Low Stock Items

- **Category Breakdown:** View products and revenue by category
- **Top Products:** See your best-selling products
- **Recent Orders:** View the latest 5 orders with details
- **Quick Links:** Fast navigation to all admin functions

---

## 📦 Product Management (`/admin/products`)

### View & Manage Products

**Access:** Admin Dashboard → Products

#### Features:
- **Search Products:** Find products by name or category
- **View All Products:** Table view with:
  - Product Image
  - Product Name
  - Category
  - Price
  - Stock Level
  - Status (Featured/On Sale)

- **Actions:**
  - ✏️ **Edit:** Modify product details, price, stock, images
  - 🗑️ **Delete:** Remove products from catalog
  - Status badges for quick identification

### Add New Product (`/admin/products/add`)

**Fields:**
- Product Name *
- Description
- Category *
- Price *
- Stock Quantity *
- Gender (Men/Women/Unisex) *
- Images (multiple)
- Featured (checkbox)
- On Sale (checkbox)
- Stock Thresholds (low stock alerts)

**Features:**
- Drag & drop image upload
- Multiple image support
- Real-time form validation
- Preview before publishing

### Edit Product (`/admin/products/edit/:id`)

- Modify all product details
- Update pricing and inventory
- Change product status (featured/on sale)
- Reorder product images
- View product sales data

---

## 📂 Collection Sections Management (`/admin/sections`)

Organize products into custom sections for Men and Women categories.

### What are Sections?

Sections group products thematically on your Men/Women pages. Default sections include:

#### Men's Sections:
1. **New Arrivals** - Latest men's products (sorted by date)
2. **Best Sellers** - Featured items with high ratings
3. **On Sale** - Discounted products

#### Women's Sections:
1. **New Arrivals** - Latest women's products (sorted by date)
2. **Best Sellers** - Featured items with high ratings
3. **On Sale** - Discounted products

### Section Management Features:

#### Create New Section
1. Click **"Add New Section"**
2. Enter **Section Title** (e.g., "Exclusive Collection")
3. Add **Description** (optional)
4. Products matching section criteria auto-load
5. Click **"Add Section"**

#### Edit Section
1. Click **"✏️ Edit"** on any section card
2. Modify title and description
3. Click **"Update Section"**

#### Delete Section
1. Click **"🗑️ Delete"** on any section
2. Confirm deletion
3. Section is removed permanently

#### Reorder Sections
1. Click **"▲ Up"** to move section up
2. Click **"▼ Down"** to move section down
3. Order determines display sequence on Men/Women pages

#### Activate/Deactivate Sections
1. Click **"○ Inactive"** or **"✓ Active"** button
2. Inactive sections hide from customer view but stay in database
3. Useful for seasonal sections

### How Products Appear in Sections

Products automatically populate sections based on:

- **New Arrivals Section:** Shows 8 newest products by `createdAt` date
- **Best Sellers Section:** Shows 8 featured products or products with rating ≥ 4
- **On Sale Section:** Shows 8 products where `onSale = true`

No manual assignment needed - sections filter products dynamically!

---

## 🎨 Hero Settings (`/admin/hero`)

Customize the homepage hero section.

### Editable Elements:

**Headline Text:**
- Headline 1 (default: "DESIGNED")
- Headline 2 (default: "TO")
- Headline 3 (default: "DISRUPT")

**Hero Images:**
- Left Image
- Right Image

**Additional Hero Content:**
- Subtext (description)
- CTA Text (button text)

**Mission & Vision Section:**
- Mission Image
- Vision Image

### Features:
- Image upload with preview
- Real-time updates
- Responsive hero design
- Animation controls

---

## 📋 Orders Management (`/admin/orders`)

Track and manage customer orders.

### Order Overview:
- Order ID
- Customer Information
- Product List
- Order Date
- Total Amount
- Order Status (Pending/Completed/Cancelled)

### Features:
- View detailed order information
- Update order status
- Print order details
- Export order data

---

## 🔐 Admin Navigation Sidebar

All admin pages include a persistent sidebar with quick links:

- 📊 **Dashboard** - Main admin hub
- 📦 **Products** - View/manage all products
- ➕ **Add Product** - Create new product
- 📂 **Sections** - Manage collection sections
- 📋 **Orders** - View customer orders
- 🎨 **Hero Settings** - Customize homepage
- 🚪 **Logout** - Sign out of admin panel

---

## 💾 Data Storage

All admin data is stored in **localStorage** with the following keys:

```
nevermind_admin_auth      - Admin authentication state
nevermind_products        - All products
nevermind_hero            - Hero section content
nevermind_sections        - Collection sections structure
nevermind_orders          - Customer orders
nevermind_cart_items      - Shopping cart data
```

⚠️ **Note:** LocalStorage is cleared when browser cache is cleared. For production, integrate with a backend database.

---

## 🛡️ Security Features

### Authentication:
- Password-protected admin panel
- Session-based access control
- Protected routes (ProtectedRoute component)
- Logout functionality

### Data Protection:
- Password stored locally (development only)
- Implement proper backend authentication for production
- Add HTTPS and password hashing in production

---

## 📱 Responsive Design

All admin pages are fully responsive:
- **Desktop:** Full layout with sidebars
- **Tablet:** Optimized grid layouts
- **Mobile:** Collapsed navigation, stacked content

---

## 🎯 Use Cases & Workflows

### Workflow 1: Add New Product and Include in Section
1. Go to: Admin Dashboard → Add Product
2. Fill in product details (name, price, category, gender)
3. Choose gender (Men/Women) to filter by section
4. Check "Featured" or "On Sale" for automatic section inclusion
5. Save product
6. Section automatically displays new product

### Workflow 2: Create Seasonal Section
1. Go to: Admin Dashboard → Sections
2. Select category (Men or Women)
3. Click "Add New Section"
4. Enter title: "Winter Collection"
5. Reorder sections using ▲▼ buttons
6. Section appears on Men/Women page

### Workflow 3: Manage Low Stock Items
1. View Dashboard - check "Low Stock Items" count
2. Go to Products page
3. Look for items with stock ≤ 5 (highlighted)
4. Edit product and increase stock
5. Remove from "On Sale" if needed

### Workflow 4: Update Hero Banner
1. Go to: Admin Dashboard → Hero Settings
2. Edit headlines for marketing campaigns
3. Upload new hero images
4. Update CTA button text
5. Save - changes appear instantly on homepage

---

## 🔄 Product Categories & Attributes

### Categories:
- T-Shirts
- Hoodies
- Pants
- Jackets
- Accessories
- Custom categories

### Gender Options:
- **Men** - Filters to Men page
- **Women** - Filters to Women page
- **Unisex** - Appears on both pages

### Product Status:
- **Featured** - Appears in "Best Sellers" sections
- **On Sale** - Appears in "On Sale" sections
- **Regular** - Only in "New Arrivals"

---

## 🐛 Troubleshooting

### Issue: Can't login to admin panel
**Solution:** Clear browser cache and try password: `admin123`

### Issue: Products not appearing in sections
**Solution:** Ensure products have correct gender assigned and required fields filled

### Issue: Data lost after clearing cache
**Solution:** Implement backend database integration (localStorage is temporary)

### Issue: Images not uploading
**Solution:** Check file size (<2MB) and format (JPG, PNG)

---

## 🚀 Future Enhancements

Recommended additions for production:
- Backend database integration
- User account management
- Advanced analytics
- Inventory tracking
- Customer relationship management
- Automated reports
- Email notifications
- Multi-admin support
- Two-factor authentication
- API integration

---

## 📞 Support

For issues or feature requests, contact your development team.

**Current Version:** 1.0.0  
**Last Updated:** March 4, 2026

---

## Quick Admin Password

**Login:** `/admin`  
**Password:** `admin123`

⚠️ **Change this password in production!** Update in [AdminContext.jsx](src/context/AdminContext.jsx) line with `ADMIN_PASSWORD = 'admin123'`
