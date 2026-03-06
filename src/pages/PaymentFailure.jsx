import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PaymentFailure.css';

export const PaymentFailure = () => {
  const navigate = useNavigate();

  return (
    <div className="payment-result-page failure-page">
      <div className="result-container">
        <div className="result-icon failure-icon">
          <svg className="crossmark" viewBox="0 0 52 52">
            <circle className="crossmark-circle" cx="26" cy="26" r="25" fill="none"/>
            <path className="crossmark-line crossmark-line-left" fill="none" d="M16,16 l20,20"/>
            <path className="crossmark-line crossmark-line-right" fill="none" d="M36,16 l-20,20"/>
          </svg>
        </div>

        <h1 className="result-title">PAYMENT FAILED</h1>
        <p className="result-message">
          We couldn't process your payment. Please check your payment details and try again.
        </p>

        <div className="error-details">
          <h3 className="error-title">Common Issues:</h3>
          <ul className="error-list">
            <li>Insufficient funds</li>
            <li>Incorrect card details</li>
            <li>Card expired or blocked</li>
            <li>Network connection issues</li>
          </ul>
        </div>

        <p className="result-subtext">
          Your cart items are still saved. You can try again or contact support if the problem persists.
        </p>

        <div className="result-actions">
          <button className="btn-primary" onClick={() => navigate('/checkout')}>
            TRY AGAIN
          </button>
          <button className="btn-secondary" onClick={() => navigate('/cart')}>
            VIEW CART
          </button>
        </div>

        <div className="support-link">
          <p>Need help? <a href="/about">Contact Support</a></p>
        </div>
      </div>
    </div>
  );
};
