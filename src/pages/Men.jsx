import React, { useState, useMemo } from 'react';
import { useProducts } from '../context/ProductContext';
import ProductCard from '../components/ProductCard';
import './Men.css';

const Men = () => {
  const { products } = useProducts();
  const [sortBy, setSortBy] = useState('newest');
  
  // Filter products for men category
  const menProducts = useMemo(() => {
    return products.filter(p => p.gender === 'Men' || p.gender === 'Unisex');
  }, [products]);

  const sortedProducts = useMemo(() => {
    let sorted = [...menProducts];
    switch (sortBy) {
      case 'newest':
        sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'price-low':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        sorted.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }
    return sorted;
  }, [menProducts, sortBy]);

  return (
    <div className="men-page">
      {/* Hero Section */}
      <div className="men-hero">
        <h1>MEN'S COLLECTION</h1>
        <p>Designed for the modern man. Uncompromising style, unmatched quality.</p>
      </div>

      {/* Filters & Sorting */}
      <div className="men-controls">
        <div className="men-sort">
          <label>Sort By:</label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="newest">Newest</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
        <div className="men-count">
          {sortedProducts.length} products
        </div>
      </div>

      {/* Products Grid */}
      {sortedProducts.length > 0 ? (
        <div className="men-grid">
          {sortedProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="men-empty">
          <p>No men's products available yet.</p>
        </div>
      )}
    </div>
  );
};

export default Men;
