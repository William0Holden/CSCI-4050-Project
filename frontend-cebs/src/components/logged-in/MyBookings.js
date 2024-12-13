import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MyBookings.css';
import Ticket from './Ticket';

const MyBookings = () => {
    const [user, setUser] = useState(null);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch user data
    useEffect(() => {
        axios
            .get('http://localhost:8000/api/user', { withCredentials: true })
            .then((res) => {
                if (res.data && res.data.user) {
                    setUser(res.data.user);
                    console.log('Fetched user data:', res.data.user);
                } else {
                    console.error('User data not found in response:', res.data);
                }
            })
            .catch((err) => {
                console.error('Error fetching user data:', err);
            });
    }, []);

    // Fetch bookings and enrich with full details
    useEffect(() => {
        const fetchFullBookingDetails = async () => {
            if (!user) return;

            try {
                // Fetch bookings for the user
                const bookingsResponse = await axios.get(
                    `http://localhost:8000/api/bookings/user/${user.user_id}/`
                );
                const bookingsData = bookingsResponse.data;

                // Fetch details for each ticket in each booking
                const detailedBookings = await Promise.all(
                    bookingsData.map(async (booking) => {
                        const ticketDetails = await Promise.all(
                            booking.tickets.map(async (ticketId) => {
                                const ticketResponse = await axios.get(
                                    `http://localhost:8000/api/tickets/${ticketId}/`
                                );
                                const ticket = ticketResponse.data;

                                // Fetch seat details
                                const seatResponse = await axios.get(
                                    `http://localhost:8000/api/seats/${ticket.seat}/`
                                );
                                const seat = seatResponse.data;

                                // Fetch showing details
                                const showingResponse = await axios.get(
                                    `http://localhost:8000/api/showings/${seat.showing}/`
                                );
                                const showing = showingResponse.data;

                                // Fetch movie details
                                const movieResponse = await axios.get(
                                    `http://localhost:8000/api/movies/${showing.movie}/`
                                );
                                const movie = movieResponse.data;

                                // Combine all details
                                return {
                                    ...ticket,
                                    seat,
                                    showing,
                                    movie,
                                };
                            })
                        );

                        return { ...booking, detailedTickets: ticketDetails };
                    })
                );

                setBookings(detailedBookings);
            } catch (error) {
                console.error('Error fetching detailed bookings:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchFullBookingDetails();
    }, [user]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!bookings || bookings.length === 0) {
        return <p>No bookings found.</p>;
    }

    return (
        <div className="my-bookings">
            <div className="limited-height-div">
                <div className="five-column-div">
                    {bookings.map((booking) => (
                        <div key={booking.id} className="booking-card">
                            {booking.detailedTickets.map((ticket) => (
                                <Ticket
                                    key={ticket.id} 
                                    title={ticket.movie.title}
                                    date={ticket.showing.date}
                                    time={ticket.showing.time}
                                    row={ticket.seat.row}
                                    col={ticket.seat.col}
                                    type={ticket.type}
                                    poster={ticket.movie.picture_url}
                                />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MyBookings;
