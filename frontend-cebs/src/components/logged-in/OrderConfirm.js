import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './OrderConfirm.css';
import axios from 'axios';

const OrderConfirm = () => {
  const { seat_id } = useParams();
  const navigate = useNavigate();
  const [seat, setSeat] = React.useState(null);
  const [showing, setShowing] = React.useState(null);
  const [movie, setMovie] = React.useState(null);

  React.useEffect(() => {
    // Fetch seat data
    axios
      .get(`http://localhost:8000/api/seats/${seat_id}/`)
      .then((response) => {
        setSeat(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the seat data!", error);
      });
  }, [seat_id]);

  React.useEffect(() => {
    if (seat?.showing) {
      // Fetch showing data based on seat's showing ID
      axios
        .get(`http://localhost:8000/api/showings/${seat.showing}/`)
        .then((response) => {
          setShowing(response.data);
        })
        .catch((error) => {
          console.error("There was an error fetching the showing data!", error);
        });
    }
  }, [seat]);

  React.useEffect(() => {
    if (showing?.movie) {
      // Fetch movie data based on showing's movie ID
      axios
        .get(`http://localhost:8000/api/movies/${showing.movie}/`)
        .then((response) => {
          setMovie(response.data);
        })
        .catch((error) => {
          console.error("There was an error fetching the movie data!", error);
        });
    }
  }, [showing]);

  // If data is still loading
  if (!seat || !showing || !movie) {
    return <p>Loading order details...</p>;
  }

  return (
    <div className="order-container">
      <div className="order-details">
        <h1>Order Summary</h1>
        <h2>Ticket Details</h2>
        <p><strong>Movie:</strong> {movie.title}</p>
        <p><strong>Date:</strong> {showing.date}</p>
        <p><strong>Time:</strong> {showing.time}</p>
        <p><strong>Seat:</strong> Row {seat.row}, Seat {seat.col}</p>
        <p><strong>Price:</strong> ${seat.price?.toFixed(2)}</p>
        <p><strong>Quantity:</strong> 1</p>
        <p><strong>Order Total:</strong> ${seat.price?.toFixed(2)}</p>
      </div>
      <div className="order-poster">
        <h2>Movie Poster</h2>
        <img
          src={movie.picture_url || "https://via.placeholder.com/150"}
          alt={`${movie.title} Poster`}
        />
      </div>

      {/* Button section */}
      <div className="button-container">
        <button className="confirm-button" onClick={() => navigate('/')}>
          Okay
        </button>
      </div>
    </div>
  );
};

export default OrderConfirm;
