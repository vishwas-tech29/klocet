# 🎬 Animations & Smooth Scrolling Guide

## Overview
This guide covers all the animation and smooth scrolling features added to enhance the user experience.

## 🎨 Features Implemented

### 1. Page Loader
**Component**: `src/components/PageLoader.jsx`

A beautiful loading screen that appears when the site first loads.

**Features:**
- Animated logo with gradient shimmer effect
- Progress bar with glow effect
- Percentage counter
- Smooth fade-out transition

**Customization:**
```jsx
// The loader automatically shows on page load
// Duration is controlled by the progress simulation
```

### 2. Scroll-Triggered Animations
**Component**: `src/components/ScrollReveal.jsx`
**Hook**: `src/hooks/useScrollAnimation.js`

Elements animate into view as you scroll down the page.

**Available Animations:**
- `fade-up` - Fades in from bottom
- `fade-down` - Fades in from top
- `fade-left` - Slides in from right
- `fade-right` - Slides in from left
- `scale-in` - Scales up from 90%
- `zoom-in` - Zooms in from 80%
- `rotate-in` - Rotates and scales in
- `blur-in` - Fades in with blur effect
- `slide-rotate` - Slides and rotates

**Usage:**
```jsx
import { ScrollReveal } from '../components/ScrollReveal';

<ScrollReveal animation="fade-up" delay={100} duration={800}>
  <YourComponent />
</ScrollReveal>
```

**Props:**
- `animation`: Animation type (default: 'fade-up')
- `delay`: Delay in milliseconds (default: 0)
- `duration`: Animation duration in ms (default: 800)
- `once`: Animate only once (default: true)

### 3. Smooth Scrolling
**Location**: `src/styles/globals.css`

Smooth scrolling behavior for the entire site.

**Features:**
- Native CSS smooth scroll
- Works with anchor links
- Smooth scroll-to-top button

**CSS:**
```css
html {
  scroll-behavior: smooth;
}
```

### 4. Scroll to Top Button
**Component**: `src/components/ScrollToTop.jsx`

A floating button that appears after scrolling down 300px.

**Features:**
- Smooth fade-in/out
- Bouncing arrow animation
- Hover scale effect
- Gold accent color
- Mobile responsive

**Behavior:**
- Appears after scrolling 300px
- Smooth scroll to top on click
- Positioned bottom-right corner

### 5. Custom Cursor (Desktop Only)
**Component**: `src/components/CustomCursor.jsx`

A custom cursor with smooth following effect.

**Features:**
- Outer ring cursor
- Inner dot cursor
- Expands on hover over clickable elements
- Mix-blend-mode for visual effect
- Desktop only (hidden on mobile)

**To Disable:**
Comment out in `src/App.jsx`:
```jsx
// <CustomCursor />
```

### 6. Parallax Images
**Component**: `src/components/ParallaxImage.jsx`

Images that move at different speeds while scrolling.

**Usage:**
```jsx
import { ParallaxImage } from '../components/ParallaxImage';

<ParallaxImage 
  src="image-url.jpg" 
  alt="Description"
  speed={0.5}
/>
```

**Props:**
- `src`: Image URL
- `alt`: Alt text
- `speed`: Parallax speed (0.5 = half speed)

### 7. Stagger Animations
**Location**: `src/styles/globals.css`

Animate multiple items with sequential delays.

**Usage:**
```jsx
<div className="grid">
  <div className="stagger-item">Item 1</div>
  <div className="stagger-item">Item 2</div>
  <div className="stagger-item">Item 3</div>
</div>
```

**Features:**
- Automatic delay calculation
- Up to 8 items supported
- 100ms delay between items

## 🎯 Implementation Examples

### Homepage Sections
```jsx
// Section with fade-up animation
<ScrollReveal animation="fade-up">
  <h2>SECTION TITLE</h2>
  <p>Section content</p>
</ScrollReveal>

// Product grid with staggered items
<div className="grid-4">
  {products.map((product, index) => (
    <ScrollReveal key={product.id} animation="scale-in" delay={index * 80}>
      <ProductCard product={product} />
    </ScrollReveal>
  ))}
</div>
```

### Men's Page
```jsx
// Category sections with animations
<ScrollReveal animation="fade-up">
  <div className="section-title">
    <h2>SWEATSHIRTS</h2>
  </div>
</ScrollReveal>

<div className="collection-grid">
  {products.map((product, index) => (
    <ScrollReveal key={product.id} animation="scale-in" delay={index * 80}>
      <ProductCard product={product} />
    </ScrollReveal>
  ))}
</div>
```

## 🎨 Animation Timing

### Recommended Durations
- **Fast**: 300ms - Small UI elements
- **Medium**: 600ms - Cards, buttons
- **Slow**: 800ms - Large sections, images
- **Very Slow**: 1200ms - Hero sections

### Recommended Delays
- **No delay**: 0ms - First item
- **Short**: 100ms - Sequential items
- **Medium**: 200-300ms - Grouped items
- **Long**: 500ms+ - Dramatic effect

## 🔧 Customization

### Change Animation Speed
Edit `src/styles/globals.css`:
```css
.scroll-reveal {
  transition: opacity 0.6s ease, transform 0.6s ease;
  /* Change 0.6s to your preferred duration */
}
```

### Add New Animation
1. Add keyframe in `src/components/ScrollReveal.css`:
```css
.scroll-reveal.my-animation {
  transform: translateX(-100px) rotate(45deg);
}

.scroll-reveal.my-animation.visible {
  transform: translateX(0) rotate(0);
}
```

2. Use it:
```jsx
<ScrollReveal animation="my-animation">
  <Content />
</ScrollReveal>
```

### Adjust Scroll Threshold
Edit `src/hooks/useScrollAnimation.js`:
```javascript
threshold: 0.1  // 10% of element visible
// Change to 0.5 for 50%, etc.
```

## 📱 Mobile Optimization

### Disabled on Mobile
- Custom cursor (automatically hidden)
- Heavy parallax effects (can be disabled)

### Optimized for Mobile
- Scroll animations (lighter effects)
- Touch-friendly scroll-to-top button
- Reduced animation complexity

### Disable Animations on Mobile
```css
@media (max-width: 768px) {
  .scroll-reveal {
    opacity: 1 !important;
    transform: none !important;
  }
}
```

## ⚡ Performance Tips

### Best Practices
1. Use `transform` and `opacity` for animations (GPU accelerated)
2. Avoid animating `width`, `height`, `top`, `left`
3. Use `will-change` sparingly
4. Set `once: true` for scroll animations
5. Limit number of animated elements per view

### Reduce Motion
Respect user preferences:
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

## 🎬 Animation Classes

### Quick Reference
```css
/* Fade Animations */
.fade-in          /* Simple fade in */
.slide-up         /* Slide up with fade */
.scale-in         /* Scale with fade */

/* Directional */
.slide-in-left    /* From left */
.slide-in-right   /* From right */

/* Special Effects */
.bounce-in        /* Bouncy entrance */
.rotate-in        /* Rotate entrance */
.smooth-reveal    /* Blur + scale + fade */

/* Stagger */
.stagger-item     /* Auto-staggered items */
```

## 🐛 Troubleshooting

### Animations Not Working
1. Check if ScrollReveal is imported
2. Verify element is in viewport
3. Check browser console for errors
4. Ensure CSS is loaded

### Scroll Not Smooth
1. Check `html { scroll-behavior: smooth; }`
2. Verify no JavaScript scroll overrides
3. Test in different browsers

### Performance Issues
1. Reduce number of animated elements
2. Increase threshold value
3. Disable custom cursor
4. Use simpler animations

## 📊 Browser Support

### Fully Supported
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Partial Support
- IE 11 (no smooth scroll, basic animations)
- Older mobile browsers (reduced effects)

## 🎉 Summary

All animations are:
- ✅ Smooth and performant
- ✅ Mobile optimized
- ✅ Customizable
- ✅ Accessible
- ✅ Easy to use

The site now has:
- Page loader with progress
- Scroll-triggered animations
- Smooth scrolling
- Scroll-to-top button
- Custom cursor (desktop)
- Parallax effects
- Stagger animations

Enjoy the smooth, luxurious experience! 🚀
