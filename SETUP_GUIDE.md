# 🚀 Quick Setup Guide

## Prerequisites
- Node.js (v16 or higher)
- npm or yarn

## Installation

1. **Install Dependencies**
```bash
npm install
```

2. **Configure Stripe** (Optional for testing)
Create `src/config/stripe.js` if it doesn't exist:
```javascript
export const STRIPE_CONFIG = {
  publishableKey: 'pk_test_YOUR_KEY_HERE'
};
```

For testing without a real key, the app will work in demo mode.

3. **Start Development Server**
```bash
npm run dev
```

The app will open at `http://localhost:5173`

## 🎨 What's New

### Homepage
- **Model Slider**: Auto-playing carousel at the top
- **Enhanced Hero**: Cinematic text animations with gradient effects
- **Smooth Animations**: All sections have scroll-triggered effects

### Men's Page
- **Category Grid**: Shop by category with visual cards
- **Coming Soon**: Hoodies & Polo Shirts with locked state
- **Product Sections**: Organized by Sweatshirts and T-Shirts

### Checkout Flow
1. Fill shipping information
2. Enter payment details (Stripe)
3. Success page with order confirmation
4. Or failure page with retry option

## 🧪 Testing

### Test Payment Cards (Stripe Test Mode)
- **Success**: 4242 4242 4242 4242
- **Decline**: 4000 0000 0000 0002
- **Requires Auth**: 4000 0025 0000 3155

Use any future expiry date and any 3-digit CVC.

## 📁 Project Structure

```
src/
├── components/
│   ├── ModelSlider.jsx       # NEW: Auto photo carousel
│   ├── CategoryGrid.jsx      # NEW: Category grid
│   ├── ProductCard.jsx       # ENHANCED: Hover effects
│   └── PaymentForm.jsx       # ENHANCED: Failure handling
├── pages/
│   ├── Home.jsx              # ENHANCED: Slider + animations
│   ├── Men.jsx               # ENHANCED: Category grid
│   ├── Checkout.jsx          # ENHANCED: Redirects
│   ├── PaymentSuccess.jsx    # NEW: Success page
│   └── PaymentFailure.jsx    # NEW: Failure page
└── styles/
    └── globals.css           # ENHANCED: Design system
```

## 🎯 Key Features

### 1. Model Slider
- Auto-plays every 5 seconds
- Ken Burns zoom effect
- Pause on hover
- Dot navigation + arrows

### 2. Category Grid
- Active categories: Clickable, scroll to section
- Coming soon: Locked with "Notify Me" button
- Hover effects with image zoom

### 3. Payment Flow
- Stripe integration
- Success page with confetti animation
- Failure page with error details
- Order saved to localStorage

### 4. Animations
- Hero text: Staggered entrance
- Product cards: Hover lift + zoom
- Buttons: Ripple effect
- All transitions: Smooth cubic-bezier

## 🎨 Customization

### Colors
Edit `src/styles/globals.css`:
```css
:root {
  --bg: #0a0a0a;
  --gold: #c9a84c;
  --accent: #ff4500;
}
```

### Categories
Edit `src/pages/Men.jsx`:
```javascript
const categories = [
  {
    id: 'hoodies',
    name: 'Hoodies',
    active: false,  // Change to true to activate
    countdown: 'Launching March 2026'
  }
];
```

### Slider Images
Edit `src/components/ModelSlider.jsx`:
```javascript
const defaultSlides = [
  {
    id: 1,
    image: 'YOUR_IMAGE_URL',
    title: 'YOUR TITLE',
    subtitle: 'YOUR SUBTITLE'
  }
];
```

## 🐛 Troubleshooting

### Stripe Errors
- Make sure you have a valid publishable key
- Use test mode keys (pk_test_...)
- Check browser console for errors

### Images Not Loading
- Check image URLs are accessible
- Add images to `src/images/` folder
- Update product data with correct paths

### Animations Not Working
- Clear browser cache
- Check CSS is loading
- Verify no JavaScript errors

## 📱 Mobile Testing
- Open DevTools (F12)
- Toggle device toolbar
- Test on various screen sizes
- Check touch interactions

## 🚀 Production Build

```bash
npm run build
```

Output will be in `dist/` folder.

## 📝 Admin Access
- Navigate to `/admin`
- Default password: Check `AdminContext.jsx`
- Manage products, orders, hero content

## 🎉 You're All Set!

The app is now running with all enhancements:
- ✅ Payment integration
- ✅ Model slider
- ✅ Category grid
- ✅ Enhanced animations
- ✅ Success/failure pages
- ✅ Luxury dark theme

Enjoy building your fashion empire! 🛍️
