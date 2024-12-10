import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

// Initialize Stripe outside of the component for better performance
const stripePromise = loadStripe("pk_test_51QFgwMEs66IYT8coMzBUiE7OPfZmGUh7RopTR0XlihXCf2eRSaLxVA3CFT2RY64RcwiRxfnN5w4WATb7A96vjpdE00yRdWZZ7d");

function CheckoutPage() {
  const [bookingId, setBookingId] = useState(""); // Default to an empty string

  // Function to get the CSRF token from cookies
  const getCsrfToken = () => {
    const csrfTokenMatch = document.cookie.match(/csrftoken=([\w-]+)/);
    console.log("csrfTokenMatch: ", csrfTokenMatch[1]);
    return csrfTokenMatch ? csrfTokenMatch[1] : ""; // Extract token from the match
  };

  const handleCheckout = async () => {
    if (!bookingId) {
      alert("Booking ID is required!");
      return;
    }

    try {
      const csrfToken = getCsrfToken(); // Get the CSRF token

      // Fetch the checkout session from the backend
      const response = await fetch(`http://localhost:8000/api/create-checkout-session/${bookingId}/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken, // Add CSRF token to the header
        },
        credentials: "include", // Include cookies in the request
        body: JSON.stringify({ bookingId: bookingId }),
      });

      if (!response.ok) {
        throw new Error(`Failed to create a checkout session. HTTP Status: ${response.status}`);
      }

      const data = await response.json();

      if (data.error) {
        alert(`Error: ${data.error}`);
        console.error("Backend error:", data.error); // Log detailed backend error
        return;
      }

      // Correct way to access sessionid from response
      const sessionId = data.sessionid;

      console.log("sessionId: ", sessionId);

      const stripe = await stripePromise; // Load the Stripe object

      // Redirect to Stripe Checkout using the session ID from the backend
      const { error } = await stripe.redirectToCheckout({ sessionId });

      if (error) {
        console.error("Stripe error during redirect:", error); // Log Stripe errors
        alert("Error redirecting to checkout. Please try again.");
      }
    } catch (error) {
      // Log detailed error with additional context
      console.error("Error during checkout process:", error.message, error.stack);
      alert("An error occurred. Please check the console for details.");
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Checkout Page</h1>
      <input
        type="number"
        placeholder="Enter Booking ID"
        value={bookingId}
        onChange={(e) => setBookingId(e.target.value.trim())} // Trim whitespace
        style={{
          padding: "10px",
          marginBottom: "10px",
          width: "200px",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
      />
      <br />
      <button
        onClick={handleCheckout}
        style={{
          padding: "10px 20px",
          backgroundColor: "#6772e5",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Proceed to Checkout
      </button>
    </div>
  );
}

export default CheckoutPage;
