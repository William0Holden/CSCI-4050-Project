import React from 'react';

import './CheckoutForm.css';

const CheckoutForm = (props) => {
  return (
    <div class="container">
    <h1>Checkout</h1>
    <img src="https://m.media-amazon.com/images/M/MV5BZTk5ODY0MmQtMzA3Ni00NGY1LThiYzItZThiNjFiNDM4MTM3XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg" alt="Movie Poster" class="movie-image"/>
    <form>
        <div class="form-group">
            <label for="movie-title">Movie Title</label>
            <input type="text" id="movie-title" name="movie-title" required/>
        </div>
        <div class="form-group">
            <label for="showtime">Showtime</label>
            <select id="showtime" name="showtime" required>
                <option value="1">1:00 PM</option>
                <option value="2">3:00 PM</option>
                <option value="3">5:00 PM</option>
                <option value="4">7:00 PM</option>
                <option value="5">9:00 PM</option>
            </select>
        </div>
        <div class="form-group">
            <label for="quantity">Quantity</label>
            <input type="number" id="quantity" name="quantity" min="1" max="10" required/>
        </div>
        <div class="form-group">
            <label for="name">Name</label>
            <input type="text" id="name" name="name" required/>
        </div>
        <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" name="email" required/>
        </div>
        <div class="form-group">
            <label for="payment-method">Payment Method</label>
            <select id="payment-method" name="payment-method" required>
                <option value="saved">Use Saved Payment Method</option>
                <option value="new">Add New Payment Method</option>
            </select>
        </div>
        <div id="new-payment-info">
            <div class="form-group">
                <label for="card-number">Card Number</label>
                <input type="text" id="card-number" name="card-number"/>
            </div>
            <div class="form-group">
                <label for="expiry-date">Expiry Date</label>
                <input type="text" id="expiry-date" name="expiry-date" placeholder="MM/YY"/>
            </div>
            <div class="form-group">
                <label for="cvv">CVV</label>
                <input type="text" id="cvv" name="cvv"/>
            </div>
        </div>
        </form>
    </div>
    );
};
export default CheckoutForm;