import React, { useState, useMemo } from 'react';
import { useProducts } from '../context/ProductContext';
import { useAdmin } from '../context/AdminContext';
import { ProductCard } from '../components/ProductCard';
import './Men.css';

const Men = () => {
  const { products } = useProducts();
  const { getSectionsByCategory } = useAdmin();
  const [sortBy, setSortBy] = useState('newest');
  
  // Filter products for men category
  const menProducts = useMemo(() => {
    return products.filter(p => p.gender === 'Men' || p.gender === 'Unisex');
  }, [products]);

  // Get sections for men category
  const sections = getSectionsByCategory('men').filter(s => s.active);

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
    let sectionProducts = [...menProducts];
    
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
    return getSortedProducts(menProducts);
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
            <div className="men-grid">
              {allSortedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="men-empty">
              <p>No men's products available yet.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Men;
