import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import './PaymentForm.css';

export const PaymentForm = ({ amount, onSuccess, onBack, customerInfo }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);
    setError(null);

    const cardElement = elements.getElement(CardElement);

    try {
      // Create payment method
      const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: {
          name: `${customerInfo.firstName} ${customerInfo.lastName}`,
          email: customerInfo.email,
          address: {
            line1: customerInfo.address,
            city: customerInfo.city,
            postal_code: customerInfo.zip,
            country: customerInfo.country
          }
        }
      });

      if (stripeError) {
        setError(stripeError.message);
        setProcessing(false);
        return;
      }

      // In production, send paymentMethod.id to your backend
      // For demo purposes, we'll simulate success
      setTimeout(() => {
        onSuccess({
          paymentMethodId: paymentMethod.id,
          cardLast4: paymentMethod.card.last4,
          cardBrand: paymentMethod.card.brand
        });
        setProcessing(false);
      }, 1500);

    } catch (err) {
      setError('Payment failed. Please try again.');
      setProcessing(false);
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#000',
        fontFamily: '"Inter", sans-serif',
        '::placeholder': {
          color: '#999'
        }
      },
      invalid: {
        color: '#e74c3c'
      }
    },
    hidePostalCode: true
  };

  return (
    <form onSubmit={handleSubmit} className="payment-form">
      <fieldset>
        <legend>PAYMENT INFORMATION</legend>
        
        <div className="card-element-wrapper">
          <CardElement options={cardElementOptions} />
        </div>

        {error && <div className="payment-error">{error}</div>}

        <div className="payment-info">
          <p>🔒 Your payment information is secure and encrypted</p>
        </div>
      </fieldset>

      <div className="payment-actions">
        <button 
          type="button" 
          className="back-btn" 
          onClick={onBack}
          disabled={processing}
        >
          BACK TO SHIPPING
        </button>
        <button 
          type="submit" 
          className="place-order-btn"
          disabled={!stripe || processing}
        >
          {processing ? 'PROCESSING...' : `COMPLETE PURCHASE $${amount.toFixed(2)}`}
        </button>
      </div>
    </form>
  );
};
