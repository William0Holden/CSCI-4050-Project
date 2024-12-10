// src/CheckoutPage.js
import React, { useState } from 'react';

function CheckoutPage() {
  const [bookingId, setBookingId] = useState(null); // Track booking ID dynamically

  const handleCheckout = async () => {
    if (!bookingId) {
      alert('Booking ID is required!');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/create-checkout-session/${bookingId}/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await response.json();

      if (data.error) {
        alert(data.error);
        return;
      }

      const stripe = await import('@stripe/stripe-js').then((m) =>
        m.loadStripe('pk_test_51QFgwMEs66IYT8coMzBUiE7OPfZmGUh7RopTR0XlihXCf2eRSaLxVA3CFT2RY64RcwiRxfnN5w4WATb7A96vjpdE00yRdWZZ7d')
      );
      stripe.redirectToCheckout({ sessionId: data.id });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>Checkout Page</h1>
      <input
        type="number"
        placeholder="Enter Booking ID"
        onChange={(e) => setBookingId(e.target.value)}
      />
      <button onClick={handleCheckout}>Proceed to Checkout</button>
    </div>
  );
}

export default CheckoutPage;
