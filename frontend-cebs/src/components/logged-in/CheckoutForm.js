import React from 'react';
import Ticket from './Ticket';
import { Link, useParams, useNavigate} from 'react-router-dom'; // Import Link from react-router-dom
import './CheckoutForm.css';
import axios from 'axios';

const CheckoutForm = (props) => {
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


    return (
      <div className="order-container">
        <h1>Order Summary</h1>
        <Ticket
          title={movie.title}
          date={showing.date}
          time={showing.time}
          row={seat.row}
          col={seat.col}
          type={null}
          poster={movie.picture_url}
        />
  
        {/* Ticket Type Selection */}
        <div className="ticket-type-selection">
          <label htmlFor="adultNum"> Adult Tickets($10):</label>
          <input type="number" id="adultNum" name="adultNum" min="1" max="10"/>
        </div>
        <div>
          <label htmlFor="childNum"> Children Tickets($8):</label>
          <input type="number" id="childNum" name="childNum" min="1" max="10"/>
        </div>
        <div>
          <label htmlFor="seniorNum"> Senior Tickets($8):</label>
          <input type="number" id="seniorNum" name="seniorNum" min="1" max="10"/>
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

export default CheckoutForm;
