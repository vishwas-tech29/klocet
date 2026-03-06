# 🚀 Quick Reference Card

## Start Development
```bash
npm run dev
```

## 🎬 Animation Components

### ScrollReveal
```jsx
<ScrollReveal animation="fade-up" delay={100}>
  <YourComponent />
</ScrollReveal>
```

**Animations**: fade-up, fade-down, fade-left, fade-right, scale-in, zoom-in, rotate-in, blur-in, slide-rotate

### PageLoader
```jsx
<PageLoader />  // Auto-shows on load
```

### ScrollToTop
```jsx
<ScrollToTop />  // Add to any page
```

### ParallaxImage
```jsx
<ParallaxImage src="url" alt="text" speed={0.5} />
```

## 🎨 CSS Classes

### Animations
```css
.fade-in          /* Simple fade */
.slide-up         /* Slide up */
.scale-in         /* Scale up */
.bounce-in        /* Bounce */
.rotate-in        /* Rotate */
.stagger-item     /* Auto-stagger */
```

### Utilities
```css
.container        /* Max-width wrapper */
.grid-2           /* 2 column grid */
.grid-3           /* 3 column grid */
.grid-4           /* 4 column grid */
```

## 🎯 Key Files

### Components
- `src/components/ScrollReveal.jsx` - Scroll animations
- `src/components/PageLoader.jsx` - Loading screen
- `src/components/ScrollToTop.jsx` - Scroll button
- `src/components/CustomCursor.jsx` - Custom cursor
- `src/components/ModelSlider.jsx` - Carousel
- `src/components/CategoryGrid.jsx` - Category grid

### Pages
- `src/pages/Home.jsx` - Homepage
- `src/pages/Men.jsx` - Men's page
- `src/pages/PaymentSuccess.jsx` - Success page
- `src/pages/PaymentFailure.jsx` - Failure page

### Data
- `src/data/initialProducts.js` - Products (6 sweatshirts, 7 tees)

### Styles
- `src/styles/globals.css` - Global styles & animations

## 🎨 Color Palette

```css
--bg: #0a0a0a          /* Background */
--text: #f5f5f0        /* Text */
--gold: #c9a84c        /* Accent */
--accent: #ff4500      /* Secondary */
--muted: #888888       /* Muted text */
```

## 📱 Breakpoints

```css
@media (max-width: 768px)   /* Mobile */
@media (max-width: 1024px)  /* Tablet */
```

## 🔧 Common Tasks

### Add Product
Edit `src/data/initialProducts.js`:
```javascript
{
  id: "24",
  name: "Product Name",
  category: "Sweatshirts", // or "Tees"
  gender: "Men", // or "Unisex"
  price: 50,
  // ... rest of fields
}
```

### Add Animation to Section
```jsx
<ScrollReveal animation="fade-up">
  <section>Your content</section>
</ScrollReveal>
```

### Change Animation Speed
Edit `src/components/ScrollReveal.css`:
```css
.scroll-reveal {
  transition: opacity 0.6s ease, transform 0.6s ease;
}
```

### Disable Custom Cursor
Comment in `src/App.jsx`:
```jsx
// <CustomCursor />
```

## 🎯 Animation Timing

- **Fast**: 300ms
- **Medium**: 600ms
- **Slow**: 800ms
- **Delay**: 100ms per item

## 🐛 Troubleshooting

### Animations not working?
1. Check ScrollReveal import
2. Verify element in viewport
3. Check console for errors

### Scroll not smooth?
1. Check `html { scroll-behavior: smooth; }`
2. Clear browser cache

### Performance issues?
1. Reduce animated elements
2. Disable custom cursor
3. Use simpler animations

## 📚 Documentation

- **SETUP_GUIDE.md** - Setup instructions
- **ENHANCEMENTS.md** - Feature details
- **ANIMATIONS_GUIDE.md** - Animation reference
- **FINAL_ENHANCEMENTS.md** - Complete summary

## 🎉 Quick Tips

1. Use `once: true` for scroll animations
2. Stagger delays: `index * 80`
3. GPU animations: transform & opacity
4. Mobile: lighter effects
5. Test on real devices

## 🚀 Production Build

```bash
npm run build
```

Output: `dist/` folder

---

**Need Help?** Check the full documentation files!
