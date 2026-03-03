import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import { ProductCard } from '../components/ProductCard';
import './ProductDetail.css';

export const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProductById, getProductsByCategory } = useProducts();
  const { addToCart } = useCart();

  const product = getProductById(id);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);

  if (!product) {
    return (
      <div className="product-detail-page" style={{ marginTop: '96px' }}>
        <div className="container">
          <p>Product not found</p>
          <button onClick={() => navigate('/catalog')}>Back to Catalog</button>
        </div>
      </div>
    );
  }

  const relatedProducts = getProductsByCategory(product.category)
    .filter(p => p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    addToCart(product, selectedSize, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const images = product.images && product.images.length > 0
    ? product.images
    : Array(3).fill('');

  return (
    <div className="product-detail-page" style={{ marginTop: '96px' }}>
      <div className="container">
        <button className="back-btn" onClick={() => navigate('/catalog')}>
          ← Back to Catalog
        </button>

        <div className="product-grid">
          {/* Image Gallery */}
          <div className="gallery-section">
            <div className="main-image-container">
              {images[mainImage] ? (
                <img src={images[mainImage]} alt={product.name} />
              ) : (
                <div className="placeholder-image"></div>
              )}
            </div>

            {images.length > 1 && (
              <div className="thumbnail-row">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    className={`thumbnail ${idx === mainImage ? 'active' : ''}`}
                    onClick={() => setMainImage(idx)}
                  >
                    {img ? (
                      <img src={img} alt={`View ${idx + 1}`} />
                    ) : (
                      <div className="placeholder-thumb"></div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="info-section">
            <div className="product-header">
              <h1>{product.name}</h1>
              <p className="category">{product.category}</p>
            </div>

            <div className="price-section">
              {product.onSale && product.originalPrice ? (
                <>
                  <span className="original-price">${product.originalPrice}</span>
                  <span className="current-price">${product.price}</span>
                  <span className="sale-badge">ON SALE</span>
                </>
              ) : (
                <span className="current-price">${product.price}</span>
              )}
            </div>

            <p className="description">{product.description}</p>

            {/* Size Selection */}
            <div className="size-section">
              <label>SIZE</label>
              <div className="size-buttons">
                {product.sizes?.map(size => (
                  <button
                    key={size}
                    className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="quantity-section">
              <label>QUANTITY</label>
              <div className="quantity-control">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
                <input type="number" value={quantity} readOnly />
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>
            </div>

            {/* Stock */}
            <p className={`stock-info ${product.stock <= 5 ? 'low-stock' : ''}`}>
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
            </p>

            {/* Add to Cart */}
            <button
              className={`add-to-cart-large ${addedToCart ? 'success' : ''}`}
              onClick={handleAddToCart}
              disabled={product.stock <= 0}
            >
              {addedToCart ? '✓ ADDED TO CART' : 'ADD TO CART'}
            </button>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="related-section">
            <h2>RELATED PRODUCTS</h2>
            <div className="grid-4">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
