import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './CartDrawer.css';

export const CartDrawer = ({ isOpen, onClose }) => {
  const { cartItems, removeFromCart, updateQty, cartTotal } = useCart();

  useEffect(() => {
    // Close drawer on escape key
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
      return () => window.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="cart-drawer-overlay" onClick={onClose}>
      <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="cart-drawer-header">
          <h2>YOUR CART</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        {cartItems.length === 0 ? (
          <div className="cart-empty">
            <p>Your cart is empty</p>
            <Link to="/catalog" className="cart-link" onClick={onClose}>
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="cart-items-list">
              {cartItems.map((item) => (
                <div key={`${item.id}-${item.size}`} className="cart-item">
                  {item.images && item.images[0] && (
                    <img src={item.images[0]} alt={item.name} className="cart-item-image" />
                  )}
                  <div className="cart-item-info">
                    <h4>{item.name}</h4>
                    <p>Size: {item.size}</p>
                    <p className="cart-item-price">${item.price}</p>
                  </div>
                  <div className="cart-item-qty">
                    <button onClick={() => updateQty(item.id, item.size, item.quantity - 1)}>−</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQty(item.id, item.size, item.quantity + 1)}>+</button>
                  </div>
                  <button
                    className="cart-remove-btn"
                    onClick={() => removeFromCart(item.id, item.size)}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-footer">
              <div className="cart-summary">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Shipping</span>
                  <span>FREE</span>
                </div>
                <div className="summary-row total">
                  <span>Total</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
              </div>

              <Link to="/cart" className="cart-button" onClick={onClose}>
                VIEW CART
              </Link>
              <Link to="/checkout" className="cart-button primary" onClick={onClose}>
                CHECKOUT
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
