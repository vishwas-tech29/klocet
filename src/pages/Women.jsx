import React, { useState, useMemo } from 'react';
import { useProducts } from '../context/ProductContext';
import { useAdmin } from '../context/AdminContext';
import { ProductCard } from '../components/ProductCard';
import './Women.css';

const Women = () => {
  const { products } = useProducts();
  const { getSectionsByCategory } = useAdmin();
  const [sortBy, setSortBy] = useState('newest');
  
  // Filter products for women category
  const womenProducts = useMemo(() => {
    return products.filter(p => p.gender === 'Women' || p.gender === 'Unisex');
  }, [products]);

  // Get sections for women category
  const sections = getSectionsByCategory('women').filter(s => s.active);

  // Sort products based on selected criteria
  const getSortedProducts = (productsToSort) => {
    let sorted = [...productsToSort];
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
  };

  // Get products for each section
  const getProductsForSection = (sectionTitle) => {
    let sectionProducts = [...womenProducts];
    
    switch (sectionTitle.toLowerCase()) {
      case 'new arrivals':
        sectionProducts = sectionProducts
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 8);
        break;
      case 'best sellers':
        sectionProducts = sectionProducts
          .filter(p => p.featured || p.rating >= 4)
          .slice(0, 8);
        break;
      case 'on sale':
        sectionProducts = sectionProducts
          .filter(p => p.onSale)
          .slice(0, 8);
        break;
      default:
        sectionProducts = getSortedProducts(sectionProducts).slice(0, 8);
    }
    
    return sectionProducts;
  };

  const allSortedProducts = useMemo(() => {
    return getSortedProducts(womenProducts);
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
          {allSortedProducts.length} products available
        </div>
      </div>

      {/* Collection Sections */}
      {sections.length > 0 ? (
        <div className="collections-sections">
          {sections.map((section) => {
            const sectionProducts = getProductsForSection(section.title);
            return (
              <section key={section.id} className="collection-section">
                <div className="section-header">
                  <div className="section-title">
                    <h2>{section.title}</h2>
                    {section.description && <p>{section.description}</p>}
                  </div>
                  <div className="section-meta">
                    <span className="product-count">{sectionProducts.length} items</span>
                  </div>
                </div>

                {sectionProducts.length > 0 ? (
                  <div className="collection-grid">
                    {sectionProducts.map(product => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                ) : (
                  <div className="section-empty">
                    <p>No products in this section yet.</p>
                  </div>
                )}
              </section>
            );
          })}
        </div>
      ) : (
        <>
          {/* Fallback: Display all products in grid if no sections */}
          {allSortedProducts.length > 0 ? (
            <div className="women-grid">
              {allSortedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="women-empty">
              <p>No women's products available yet.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Women;
