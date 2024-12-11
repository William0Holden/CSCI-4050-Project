import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './OrderConfirm.css';
import axios from 'axios';
import Ticket from './Ticket';

const OrderConfirm = () => {
  const { seat_id } = useParams();
  const navigate = useNavigate();
  const [seat, setSeat] = React.useState(null);
  const [showing, setShowing] = React.useState(null);
  const [movie, setMovie] = React.useState(null);
  const [user, setUser] = React.useState(null); // Store user data

  // Fetch seat data
  React.useEffect(() => {
    axios
      .get(`http://localhost:8000/api/seats/${seat_id}/`)
      .then((response) => {
        setSeat(response.data);
      })
      .catch((error) => {
        console.error('There was an error fetching the seat data!', error);
      });
  }, [seat_id]);

  // Fetch showing data
  React.useEffect(() => {
    if (seat?.showing) {
      axios
        .get(`http://localhost:8000/api/showings/${seat.showing}/`)
        .then((response) => {
          setShowing(response.data);
        })
        .catch((error) => {
          console.error('There was an error fetching the showing data!', error);
        });
    }
  }, [seat]);

  // Fetch movie data
  React.useEffect(() => {
    if (showing?.movie) {
      axios
        .get(`http://localhost:8000/api/movies/${showing.movie}/`)
        .then((response) => {
          setMovie(response.data);
        })
        .catch((error) => {
          console.error('There was an error fetching the movie data!', error);
        });
    }
  }, [showing]);

  // Fetch user data
  React.useEffect(() => {
    axios
      .get('http://localhost:8000/api/user') // Adjust endpoint if necessary
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error('There was an error fetching the user data!', error);
      });
  }, []);

  // If data is still loading
  if (!seat || !showing || !movie || !user) {
    return <p>Loading order details...</p>;
  }

  return (
    <div className="order-container">
      <h1>Order Summary</h1>
      <div className="order-details">
      <Ticket
        title={movie.title}
        date={showing.date}
        time={showing.time}
        row={seat.row}
        col={seat.col}
        price={8.0}
        poster={movie.picture_url}
      />
      </div>
      {/* Button section */}
      <div className="button-container">
        <button className="confirm-button" onClick={() => navigate('/')}>
          Add more tickets
        </button>
        <button className="confirm-button" onClick={() => navigate('/checkout')}>
            Checkout
          </button>
      </div>
    </div>
  );
};

export default OrderConfirm;
