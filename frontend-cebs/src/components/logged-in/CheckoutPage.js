import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import Ticket from "./Ticket";
import './CheckoutPage.css';

const stripePromise = loadStripe("pk_test_51QFgwMEs66IYT8coMzBUiE7OPfZmGUh7RopTR0XlihXCf2eRSaLxVA3CFT2RY64RcwiRxfnN5w4WATb7A96vjpdE00yRdWZZ7d");

function CheckoutPage() {
  const [user, setUser] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [seats, setSeats] = useState([]);
  const [movies, setMovies] = useState([]);
  const [bookingId, setBookingId] = useState(null);
  const [showings, setShowings] = useState([]);  // Renamed to `showings` for clarity

  // Fetch user, tickets, seats, and movies data when the page loads
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user data
        const userResponse = await axios.get("http://localhost:8000/api/user");
        setUser(userResponse.data);
        console.log("User data:", userResponse.data);

        // Fetch tickets data
        const ticketsResponse = await axios.get(
          `http://localhost:8000/api/tickets/user/${userResponse.data.user.user_id}/`
        );
        const ticketsData = ticketsResponse.data;
        setTickets(ticketsData);
        console.log("Tickets data:", ticketsData);

        // Fetch seat data for each ticket
        const seatPromises = ticketsData.map((ticket) =>
          axios.get(`http://localhost:8000/api/seats/${ticket.seat}/`)
        );
        const seatResponses = await Promise.all(seatPromises);
        const seatsData = seatResponses.map((response) => response.data);
        setSeats(seatsData);

        // Fetch showing data for each seat's showing reference
        const showingPromises = seatsData.map((seat) =>
          axios.get(`http://localhost:8000/api/showings/${seat.showing}/`)
        );
        const showingResponses = await Promise.all(showingPromises);
        const showingData = showingResponses.map((response) => response.data);
        setShowings(showingData);

        // Now fetch movie details based on movie ID from the showing data
        const moviePromises = showingData.map((showing) =>
          axios.get(`http://localhost:8000/api/movies/${showing.movie}/`)
        );
        const movieResponses = await Promise.all(moviePromises);
        const moviesData = movieResponses.map((response) => response.data);
        setMovies(moviesData);

        console.log("Seats data:", seatsData);
        console.log("Movies data:", moviesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Function to handle the entire checkout process
  const handleProceedToPayment = async () => {
    try {
      if (tickets.length === 0) {
        alert("No tickets available to book!");
        return;
      }

      // Create booking
      const bookingData = {
        user: user.user.user_id,
        cardUsed: "1234567890",
        tickets: tickets.map((ticket) => ticket.id),
        datePlaced: new Date().toISOString(),
      };
      const bookingResponse = await axios.post(
        "http://localhost:8000/api/bookings/",
        bookingData
      );
      setBookingId(bookingResponse.data.id);
      console.log("Booking ID:", bookingResponse.data.id);

      // Update tickets to mark them as booked
      for (const ticket of tickets) {
        await axios.put(`http://localhost:8000/api/tickets/${ticket.id}/`, {
          isBooked: true,
        });
        console.log(`Ticket ${ticket.id} marked as booked.`);
      }

      // Get user's stripe_id from user data
      const stripe_id = user.user.stripe_id;

      if (!stripe_id) {
        alert("Stripe ID is not available. Cannot proceed with payment.");
        return;
      }

      // Proceed to checkout
      const csrfTokenMatch = document.cookie.match(/csrftoken=([\w-]+)/);
      const csrfToken = csrfTokenMatch ? csrfTokenMatch[1] : "";

      const checkoutResponse = await fetch(
        `http://localhost:8000/api/create-checkout-session/${bookingResponse.data.id}/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrfToken,
          },
          credentials: "include",
          body: JSON.stringify({
            bookingId: bookingResponse.data.id,
            stripe_id: stripe_id,  // Send the stripe_id along with the bookingId
          }),
        }
      );

      if (!checkoutResponse.ok) {
        throw new Error(
          `Failed to create a checkout session. HTTP Status: ${checkoutResponse.status}`
        );
      }

      const checkoutData = await checkoutResponse.json();
      const stripe = await stripePromise;

      const { error } = await stripe.redirectToCheckout({
        sessionId: checkoutData.sessionid,
      });

      if (error) {
        console.error("Stripe error during redirect:", error);
        alert("Error redirecting to checkout. Please try again.");
      }
    } catch (error) {
      console.error("Error during the checkout process:", error);
      alert("An error occurred. Please check the console for details.");
    }
  };

  return (
    <div className="checkout-container">
      <h1>Checkout Page</h1>

      {/* Display all tickets using the Ticket component */}
      {tickets.length > 0 && seats.length > 0 && movies.length > 0 && showings.length > 0 ? (
        <div>
          <div>
            <h2>Your Tickets</h2>
            <div className="ticket-details">
              {tickets.map((ticket, index) => {
                const showing = showings[index];
                const movie = movies[index];
                const seat = seats[index];
                return (
                  <Ticket
                    key={ticket.id}
                    title={movie?.title || "Unknown Movie"}
                    date={showing?.date || "Unknown Date"}
                    time={showing?.time || "Unknown Time"}
                    row={seat?.row || "N/A"}
                    col={seat?.col || "N/A"}
                    price={ticket.price}
                    poster={movie?.picture_url || ""}
                  />
                );
              })}
            </div>
          </div>
          <div className="button-container">
            <button className="proceed-button" onClick={handleProceedToPayment}>
                Proceed to Payment
            </button>
          </div>
        </div>
      ) : (
        <p>No tickets to display.</p>
      )}
    </div>
  );
}

export default CheckoutPage;
