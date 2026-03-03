import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './ProductCard.css';

export const ProductCard = ({ product }) => {
  const [showSizeSelect, setShowSizeSelect] = useState(false);
  const [selectedSize, setSelectedSize] = useState('');
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    if (product.sizes && product.sizes.length > 0) {
      setShowSizeSelect(true);
    }
  };

  const confirmAddToCart = () => {
    if (selectedSize) {
      addToCart(product, selectedSize, 1);
      setShowSizeSelect(false);
      setSelectedSize('');
    }
  };

  const imageUrl = product.images && product.images.length > 0 ? product.images[0] : '';

  return (
    <div className="product-card fade-in">
      <Link to={`/product/${product.id}`}>
        <div className="product-image-container">
          {imageUrl ? (
            <img src={imageUrl} alt={product.name} className="product-image" />
          ) : (
            <div className="placeholder-image"></div>
          )}
          {product.badge && (
            <div className={`product-badge badge-${product.badge.toLowerCase()}`}>
              {product.badge}
            </div>
          )}
        </div>
      </Link>

      {showSizeSelect && (
        <div className="size-select-modal">
          <div className="size-select-content">
            <h3>SELECT SIZE</h3>
            <div className="sizes-grid">
              {product.sizes.map(size => (
                <button
                  key={size}
                  className={`size-button ${selectedSize === size ? 'active' : ''}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
            <div className="size-buttons">
              <button className="btn-secondary" onClick={() => setShowSizeSelect(false)}>
                Cancel
              </button>
              <button className="btn-primary" onClick={confirmAddToCart} disabled={!selectedSize}>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="product-info">
        <h3 className="product-name">
          <Link to={`/product/${product.id}`}>
            {product.name}
          </Link>
        </h3>
        
        <div className="product-price">
          {product.onSale && product.originalPrice ? (
            <>
              <span className="original-price">${product.originalPrice}</span>
              <span className="current-price">${product.price}</span>
            </>
          ) : (
            <span className="current-price">${product.price}</span>
          )}
        </div>
      </div>

      <button className="add-to-cart-btn" onClick={handleAddToCart}>
        + ADD
      </button>
    </div>
  );
};
