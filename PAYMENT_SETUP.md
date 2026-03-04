# Payment Integration Setup Guide

This project uses Stripe for secure payment processing.

## Setup Instructions

### 1. Get Your Stripe API Keys

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/register)
2. Create a free account or log in
3. Navigate to **Developers** → **API keys**
4. Copy your **Publishable key** (starts with `pk_test_` for test mode)

### 2. Configure Your Stripe Key

Open `src/config/stripe.js` and replace the placeholder key with your actual Stripe publishable key:

```javascript
export const STRIPE_CONFIG = {
  publishableKey: 'pk_test_YOUR_ACTUAL_KEY_HERE',
};
```

### 3. Test Cards

Use these test card numbers in test mode:

- **Success**: `4242 4242 4242 4242`
- **Decline**: `4000 0000 0000 0002`
- **3D Secure**: `4000 0025 0000 3155`

Use any future expiry date (e.g., 12/34) and any 3-digit CVC.

### 4. Backend Integration (Production)

For production, you need a backend server to:

1. Create payment intents
2. Handle webhooks
3. Process actual charges

Example backend endpoint structure:

```javascript
// POST /api/create-payment-intent
{
  amount: 5000, // Amount in cents
  currency: 'usd',
  customer: { email, name, address }
}
```

Update `src/components/PaymentForm.jsx` to call your backend instead of the demo simulation.

## Current Implementation

The current implementation:
- ✅ Collects card details securely using Stripe Elements
- ✅ Validates card information
- ✅ Creates payment method
- ⚠️ Simulates payment success (for demo purposes)

## Going Live

Before going live:

1. Replace test key with live key (`pk_live_...`)
2. Implement backend payment processing
3. Set up Stripe webhooks for order confirmation
4. Add proper error handling and logging
5. Test thoroughly with real cards in test mode

## Security Notes

- ✅ Card details never touch your server
- ✅ Stripe handles PCI compliance
- ✅ All data is encrypted in transit
- ⚠️ Never commit secret keys to version control
- ⚠️ Use environment variables for keys in production

## Support

- [Stripe Documentation](https://stripe.com/docs)
- [Stripe React Integration](https://stripe.com/docs/stripe-js/react)
- [Test Cards](https://stripe.com/docs/testing)
