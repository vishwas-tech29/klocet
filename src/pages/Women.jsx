import React, { useState, useMemo } from 'react';
import { useProducts } from '../context/ProductContext';
import ProductCard from '../components/ProductCard';
import './Women.css';

const Women = () => {
  const { products } = useProducts();
  const [sortBy, setSortBy] = useState('newest');
  
  // Filter products for women category
  const womenProducts = useMemo(() => {
    return products.filter(p => p.gender === 'Women' || p.gender === 'Unisex');
  }, [products]);

  const sortedProducts = useMemo(() => {
    let sorted = [...womenProducts];
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
  }, [womenProducts, sortBy]);

  return (
    <div className="women-page">
      {/* Hero Section */}
      <div className="women-hero">
        <h1>WOMEN'S COLLECTION</h1>
        <p>Bold. Fearless. Unapologetically authentic.</p>
      </div>

      {/* Filters & Sorting */}
      <div className="women-controls">
        <div className="women-sort">
          <label>Sort By:</label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="newest">Newest</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
        <div className="women-count">
          {sortedProducts.length} products
        </div>
      </div>

      {/* Products Grid */}
      {sortedProducts.length > 0 ? (
        <div className="women-grid">
          {sortedProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="women-empty">
          <p>No women's products available yet.</p>
        </div>
      )}
    </div>
  );
};

export default Women;
