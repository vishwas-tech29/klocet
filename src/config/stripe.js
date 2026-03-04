// Stripe Configuration
// Replace with your actual Stripe publishable key from https://dashboard.stripe.com/apikeys

export const STRIPE_CONFIG = {
  // Test mode key (starts with pk_test_)
  publishableKey: 'pk_test_51QwKLnP3aBCDEFGHIJKLMNOPQRSTUVWXYZ',
  
  // For production, use your live key (starts with pk_live_)
  // publishableKey: 'pk_live_YOUR_LIVE_KEY_HERE',
};

// Note: Never commit your secret key (sk_test_ or sk_live_) to version control
// Secret keys should only be used on your backend server
