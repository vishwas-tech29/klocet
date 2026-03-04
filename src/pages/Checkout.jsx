import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useCart } from '../context/CartContext';
import { PaymentForm } from '../components/PaymentForm';
import { STRIPE_CONFIG } from '../config/stripe';
import './Checkout.css';

const stripePromise = loadStripe(STRIPE_CONFIG.publishableKey);

export const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, cartTotal, clearCart } = useCart();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    zip: '',
    country: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
    cardName: ''
  });

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [paymentStep, setPaymentStep] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate shipping info
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.address || !formData.city || !formData.zip || !formData.country) {
      alert('Please fill in all shipping fields');
      return;
    }

    // Move to payment step
    setPaymentStep(true);
  };

  const handlePaymentSuccess = (paymentDetails) => {
    // Create order
    const order = {
      id: `ORD-${Date.now()}`,
      customer: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        address: formData.address,
        city: formData.city,
        zip: formData.zip,
        country: formData.country
      },
      items: cartItems,
      total: cartTotal,
      date: new Date().toISOString(),
      status: 'Pending',
      paymentMethod: 'Card',
      cardLast4: paymentDetails.cardLast4,
      cardBrand: paymentDetails.cardBrand
    };

    // Save to localStorage
    const existingOrders = JSON.parse(localStorage.getItem('nevermind_orders') || '[]');
    existingOrders.push(order);
    localStorage.setItem('nevermind_orders', JSON.stringify(existingOrders));

    // Clear cart and show success
    clearCart();
    setOrderPlaced(true);

    // Redirect to home after 3 seconds
    setTimeout(() => {
      navigate('/');
    }, 3000);
  };

  if (cartItems.length === 0 && !orderPlaced) {
    return (
      <div className="checkout-page" style={{ marginTop: '96px' }}>
        <div className="container">
          <p>Your cart is empty. Please add items before checkout.</p>
        </div>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="checkout-page" style={{ marginTop: '96px' }}>
        <div className="container">
          <div className="success-message scale-in">
            <div className="success-icon">✓</div>
            <h2>ORDER PLACED SUCCESSFULLY</h2>
            <p>Thank you for your purchase! Check your email for order confirmation.</p>
            <p className="redirect-text">Redirecting to home...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page" style={{ marginTop: '96px' }}>
      <div className="container">
        <h1>CHECKOUT</h1>

        <div className="checkout-layout">
          {/* Form Section */}
          <form className="checkout-form" onSubmit={handleSubmit}>
            {!paymentStep ? (
              <>
                <fieldset>
                  <legend>SHIPPING INFORMATION</legend>

                  <div className="form-row">
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />

                  <input
                    type="text"
                    name="address"
                    placeholder="Street Address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />

                  <div className="form-row">
                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      value={formData.city}
                      onChange={handleChange}
                      required
                    />
                    <input
                      type="text"
                      name="zip"
                      placeholder="ZIP Code"
                      value={formData.zip}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <input
                    type="text"
                    name="country"
                    placeholder="Country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                  />
                </fieldset>

                <button type="submit" className="place-order-btn">
                  PROCEED TO PAYMENT
                </button>
              </>
            ) : (
              <Elements stripe={stripePromise}>
                <PaymentForm
                  amount={cartTotal}
                  onSuccess={handlePaymentSuccess}
                  onBack={() => setPaymentStep(false)}
                  customerInfo={formData}
                />
              </Elements>
            )}
          </form>

          {/* Order Summary */}
          <aside className="order-summary">
            <h2>ORDER SUMMARY</h2>

            <div className="summary-items">
              {cartItems.map((item) => (
                <div key={`${item.id}-${item.size}`} className="summary-item">
                  {item.images && item.images[0] && (
                    <img src={item.images[0]} alt={item.name} />
                  )}
                  <div className="item-details">
                    <h4>{item.name}</h4>
                    <p>{item.size} × {item.quantity}</p>
                  </div>
                  <span className="item-price">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="summary-calc">
              <div className="calc-line">
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="calc-line">
                <span>Shipping</span>
                <span>FREE</span>
              </div>
              <div className="calc-line total">
                <span>TOTAL</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};
