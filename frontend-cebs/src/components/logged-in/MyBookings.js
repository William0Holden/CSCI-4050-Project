import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MyBookings.css';
import Ticket from './Ticket'

const MyBookings = () => {
    const [user, setUser] = useState({
       user_id: ''
      });
    

    useEffect(() => {
        // Fetch user data
        axios.get('http://localhost:8000/api/user', { withCredentials: true })
          .then(res => {
            if (res.data && res.data.user) {
              setUser(res.data.user);
              console.log('Fetched user data:', res.data.user);
            } else {
              console.error('User data not found in response:', res.data);
            }
          })
          .catch(err => {
            console.error('Error fetching user data:', err);
          });
      }, []);

    const [bookings, setBookings] = useState(null);

    useEffect(() => {
        // Fetch booking data
        axios.get(`http://localhost:8000/api/bookings/user/${user.user_id}/`)
            .then(response => {
                setBookings(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the booking data!", error);
            });
    }, [user.user_id]);

    if (!bookings) {
        return <p>Loading...</p>;
    }
    return (
        <div className="my-bookings">
            <div className="limited-height-div"> 
                <div className="five-column-div">
                    {bookings.map((booking) => (
                            <Ticket
                            title={booking.title} 
                            date={booking.date} 
                            time={booking.time}
                            row={booking.row}
                            col={booking.col}
                            price={booking.price}
                            poster={booking.picture_url}
                            />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MyBookings;
