import React, { useState, useMemo } from 'react';
import { useProducts } from '../context/ProductContext';
import { ProductCard } from '../components/ProductCard';
import './Catalog.css';

export const Catalog = () => {
  const { products } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('newest');

  const categories = ['All', ...new Set(products.map(p => p.category))];

  const filteredProducts = useMemo(() => {
    let filtered = selectedCategory === 'All'
      ? products
      : products.filter(p => p.category === selectedCategory);

    // Sort
    switch (sortBy) {
      case 'price-low':
        return filtered.sort((a, b) => a.price - b.price);
      case 'price-high':
        return filtered.sort((a, b) => b.price - a.price);
      case 'newest':
      default:
        return filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
  }, [products, selectedCategory, sortBy]);

  return (
    <div className="catalog-page" style={{ marginTop: '96px' }}>
      <div className="catalog-header">
        <h1>CATALOG</h1>
        <p>Explore our complete collection of streetwear essentials.</p>
      </div>

      <div className="container">
        <div className="catalog-controls">
          {/* Filter */}
          <div className="filter-group">
            <label>CATEGORY</label>
            <div className="filter-buttons">
              {categories.map(cat => (
                <button
                  key={cat}
                  className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Sort */}
          <div className="filter-group">
            <label>SORT</label>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>

          <div className="results-count">
            {filteredProducts.length} Product{filteredProducts.length !== 1 ? 's' : ''}
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid-4">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="no-products">
            <p>No products found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};
