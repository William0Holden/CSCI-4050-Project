import React from 'react';
import Ticket from './Ticket';
import { useParams, useNavigate } from 'react-router-dom';
import './OrderConfirm.css';
import axios from 'axios';

const OrderConfirm = () => {
  const { seat_id } = useParams();
  const navigate = useNavigate();
  const [seat, setSeat] = React.useState(null);
  const [showing, setShowing] = React.useState(null);
  const [movie, setMovie] = React.useState(null);
  const [user, setUser] = React.useState(null); // Store user data
  const [ticketType, setTicketType] = React.useState('adult'); // Default ticket type
  const [ticketId, setTicketId] = React.useState(null); // Store ticket ID after creation

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

  // Handle ticket posting and then booking
  const handleCreateOrder = async () => {
    if (!user) {
      alert('User data is not loaded. Please try again later.');
      return;
    }

    const ticketData = {
      type: ticketType,
      price: 8.0, // Default price
      seat: seat.id, // Pass the seat ID
    };

    try {
      // First, create the ticket
      const ticketResponse = await axios.post('http://localhost:8000/api/tickets/', ticketData);
      setTicketId(ticketResponse.data.id); // Save ticket ID for booking
      alert('Ticket successfully created!');

      // Then, create the booking
      const bookingData = {
        user: user.user.user_id, // Pass the user ID, not the full user object
        cardUsed: '1234567890',
        tickets: [ticketResponse.data.id], // Pass only the ticket ID
        datePlaced: new Date().toISOString(),
      };

      try {
        const bookingResponse = await axios.post('http://localhost:8000/api/bookings/', bookingData);
        alert('Booking successfully created!');
        navigate(`/create-checkout-session/${bookingResponse.data.id}`); // Redirect user after success
      } catch (error) {
        console.error('There was an error creating the booking!', error);
        alert('Failed to create booking.');
      }
    } catch (error) {
      console.error('There was an error creating the ticket!', error);
      alert('Failed to create ticket.');
    }
  };

  // If data is still loading
  if (!seat || !showing || !movie || !user) {
    return <p>Loading order details...</p>;
  }

  return (
    <div className="order-container">
      <h1>Order Summary</h1>
      <Ticket
        title={movie.title}
        date={showing.date}
        time={showing.time}
        row={seat.row}
        col={seat.col}
        price={8.0}
        poster={movie.picture_url}
      />

      {/* Ticket Type Selection */}
      <div className="ticket-type-selection">
        <label htmlFor="adultNum"># of Adults:</label>
        <input type="number" id="adultNum" name="adultNum" min="1" max="10"/>
        <label htmlFor="childNum">   # of Children:</label>
        <input type="number" id="childNum" name="childNum" min="1" max="10"/>
        <label htmlFor="seniorNum">   # of seniors:</label>
        <input type="number" id="seniorNum" name="seniorNum" min="1" max="10"/>
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>

      {/* Button section */}
      <div className="button-container">
        <button className="confirm-button" onClick={handleCreateOrder}>
          Create Ticket & Booking
        </button>
      </div>
    </div>
  );
};

export default OrderConfirm;
