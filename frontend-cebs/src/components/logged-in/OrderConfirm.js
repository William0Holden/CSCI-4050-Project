import React from 'react';
import './OrderConfirm.css';

const OrderConfirm = (props) => {
  return (
    <div className="order-container">
      <div className="order-details">
        <h1>Order Summary</h1>
        <h2>Ticket Details</h2>
        <p><strong>Movie:</strong> Movie Title</p>
        <p><strong>Date:</strong> Date of the Show</p>
        <p><strong>Time:</strong> Time of the Show</p>
        <p><strong>Seat:</strong> Seat Number</p>
        <p><strong>Price:</strong> $XX.XX</p>
        <p><strong>Quantity:</strong> X</p>
        <p><strong>Order Total:</strong> $XX.XX</p>
      </div>
      <div className="order-poster">
        <h2>Movie Poster</h2>
        <img 
          src="https://m.media-amazon.com/images/M/MV5BZTk5ODY0MmQtMzA3Ni00NGY1LThiYzItZThiNjFiNDM4MTM3XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg" 
          alt="Movie Poster" 
        />
      </div>
      
      {/* New button section */}
      <div className="button-container">
        <button className="confirm-button">Confirm</button>
        <button className="cancel-button">Cancel</button>
      </div>
    </div>
  );
};

export default OrderConfirm;
