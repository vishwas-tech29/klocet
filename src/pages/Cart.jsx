import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Cart.css';

export const Cart = () => {
  const { cartItems, removeFromCart, updateQty, cartTotal } = useCart();

  return (
    <div className="cart-page" style={{ marginTop: '96px' }}>
      <div className="container">
        <h1>SHOPPING CART</h1>

        <div className="cart-layout">
          <div className="cart-items-section">
            {cartItems.length === 0 ? (
              <div className="cart-empty-message">
                <p>Your cart is empty</p>
                <Link to="/catalog" className="continue-shopping-btn">
                  CONTINUE SHOPPING
                </Link>
              </div>
            ) : (
              <>
                <div className="cart-table-header">
                  <div>PRODUCT</div>
                  <div>SIZE</div>
                  <div>PRICE</div>
                  <div>QUANTITY</div>
                  <div>TOTAL</div>
                  <div></div>
                </div>

                {cartItems.map((item) => (
                  <div key={`${item.id}-${item.size}`} className="cart-table-row">
                    <div className="product-col">
                      {item.images && item.images[0] && (
                        <img src={item.images[0]} alt={item.name} className="cart-item-img" />
                      )}
                      <div>
                        <h4>{item.name}</h4>
                        <p className="category">{item.category}</p>
                      </div>
                    </div>

                    <div className="size-col">{item.size}</div>

                    <div className="price-col">${item.price}</div>

                    <div className="qty-col">
                      <button onClick={() => updateQty(item.id, item.size, item.quantity - 1)}>−</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQty(item.id, item.size, item.quantity + 1)}>+</button>
                    </div>

                    <div className="total-col">${(item.price * item.quantity).toFixed(2)}</div>

                    <div className="remove-col">
                      <button
                        className="remove-btn"
                        onClick={() => removeFromCart(item.id, item.size)}
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>

          {cartItems.length > 0 && (
            <div className="cart-summary-section">
              <h2>ORDER SUMMARY</h2>

              <div className="summary-line">
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>

              <div className="summary-line">
                <span>Shipping</span>
                <span>FREE</span>
              </div>

              <div className="summary-divider"></div>

              <div className="summary-line total">
                <span>TOTAL</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>

              <Link to="/checkout" className="checkout-btn">
                PROCEED TO CHECKOUT
              </Link>

              <Link to="/catalog" className="continue-btn">
                CONTINUE SHOPPING
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
