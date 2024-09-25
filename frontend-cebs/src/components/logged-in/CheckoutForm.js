import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './CheckoutForm.css';

const CheckoutForm = (props) => {
  return (
    <div className="container">
      <h1>Checkout</h1>
      <img 
        src="https://m.media-amazon.com/images/M/MV5BZTk5ODY0MmQtMzA3Ni00NGY1LThiYzItZThiNjFiNDM4MTM3XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg" 
        alt="Movie Poster" 
        className="movie-image"
      />
      <form>
        <div className="form-group">
          <label htmlFor="movie-title">Movie Title</label>
          <input type="text" id="movie-title" name="movie-title" required />
        </div>
        <div className="form-group">
          <label htmlFor="quantity">Quantity</label>
          <input type="number" id="quantity" name="quantity" min="1" max="10" required />
        </div>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div className="form-group">
          <label htmlFor="payment-method">Payment Method</label>
          <select id="payment-method" name="payment-method" required>
            <option value="saved">Use Saved Payment Method</option>
            <option value="new">Add New Payment Method</option>
          </select>
        </div>
        <div id="new-payment-info">
          <div className="form-group">
            <label htmlFor="card-number">Card Number</label>
            <input type="text" id="card-number" name="card-number" />
          </div>
          <div className="form-group">
            <label htmlFor="expiry-date">Expiry Date</label>
            <input type="text" id="expiry-date" name="expiry-date" placeholder="MM/YY" />
          </div>
          <div className="form-group">
            <label htmlFor="cvv">CVV</label>
            <input type="text" id="cvv" name="cvv" />
          </div>
        </div>
      </form>
      
      {/* New Checkout Button */}
      <div className="button-container">
        <Link to="/order-confirm">
          <button className="checkout-button">Checkout</button>
        </Link>
      </div>
    </div>
  );
};

export default CheckoutForm;
