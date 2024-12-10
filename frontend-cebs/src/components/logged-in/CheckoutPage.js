// src/CheckoutPage.js
import React from 'react';

function CheckoutPage() {
  const handleCheckout = async () => {
    try {
      const response = await fetch('http://localhost:8000/create-checkout-session/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await response.json();

      if (data.error) {
        alert(data.error);
        return;
      }

      const stripe = await import('@stripe/stripe-js').then((m) => m.loadStripe('your-publishable-key-here'));
      stripe.redirectToCheckout({ sessionId: data.id });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>Checkout Page</h1>
      <button onClick={handleCheckout}>Proceed to Checkout</button>
    </div>
  );
}

export default CheckoutPage;
