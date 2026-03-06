import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './PaymentSuccess.css';

export const PaymentSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Confetti or celebration animation trigger
    const timer = setTimeout(() => {
      // Auto redirect after 5 seconds
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="payment-result-page success-page">
      <div className="result-container">
        <div className="result-icon success-icon">
          <svg className="checkmark" viewBox="0 0 52 52">
            <circle className="checkmark-circle" cx="26" cy="26" r="25" fill="none"/>
            <path className="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
          </svg>
        </div>

        <h1 className="result-title">PAYMENT SUCCESSFUL!</h1>
        <p className="result-message">
          Your order has been confirmed. We're preparing your items for shipment.
        </p>

        <div className="order-details">
          <div className="detail-row">
            <span className="detail-label">Order Number:</span>
            <span className="detail-value">#{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Estimated Delivery:</span>
            <span className="detail-value">3-5 Business Days</span>
          </div>
        </div>

        <p className="result-subtext">
          A confirmation email has been sent to your inbox with order details and tracking information.
        </p>

        <div className="result-actions">
          <button className="btn-primary" onClick={() => navigate('/')}>
            CONTINUE SHOPPING
          </button>
          <button className="btn-secondary" onClick={() => navigate('/catalog')}>
            VIEW CATALOG
          </button>
        </div>

        <div className="celebration-particles">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="particle" style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}></div>
          ))}
        </div>
      </div>
    </div>
  );
};
