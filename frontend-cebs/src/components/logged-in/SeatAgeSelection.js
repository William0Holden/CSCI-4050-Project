import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './SeatAgeSelection.css';

const SeatAgeSelection = () => {
    const { showing_id } = useParams();
    const [showing, setShowing] = useState(null);
    const [selectedSeat, setSelectedSeat] = useState(null);
    const [seatInfo, setSeatInfo] = useState(null);
    const [user, setUser] = useState(null);
    const [ticketType, setTicketType] = useState('adult');
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch user data
        axios
            .get('http://localhost:8000/api/user')
            .then(response => {
                setUser(response.data);
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    }, []);

    useEffect(() => {
        // Fetch showing data
        axios
            .get(`http://localhost:8000/api/showings/${showing_id}/`)
            .then(response => {
                setShowing(response.data);
            })
            .catch(error => {
                console.error('Error fetching showing data:', error);
            });
    }, [showing_id]);

    if (!showing) {
        return <p>Loading...</p>;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const postData = {
            row: seatInfo.row,
            col: seatInfo.col,
            available: false,
            showing: showing.id,
            showroom: showing.showRoom,
        };

        try {
            // Post the seat
            let seatResponse;
            try {
                seatResponse = await axios.post('http://localhost:8000/api/seats/', postData);
            } catch (error) {
                if (error.response && error.response.status === 400) {
                    alert('The seat is already taken.');
                    return;
                } else {
                    throw error;
                }
            }

            const ticketData = {
                type: ticketType,
                price: ticketType === 'adult' ? 8.0 : ticketType === 'child' ? 6.0 : 7.0, // Price based on ticket type
                seat: seatResponse.data.id, // Link the seat ID
                user: user?.user?.user_id, // Attach the user ID
                isBooked: false, // Set as unbooked initially
            };

            // Post the ticket
            await axios.post('http://localhost:8000/api/tickets/', ticketData);

            // Redirect to confirmation page
            navigate(`/order-confirm/${seatResponse.data.id}`);
        } catch (error) {
            console.error('Error posting seat or ticket:', error);
        }
    };

    const seats = showing.seats || [];

    const handleSeatClick = (seatIndex) => {
        const row = Math.floor(seatIndex / 10) + 1;
        const col = (seatIndex % 10) + 1;

        if (selectedSeat === seatIndex) {
            setSelectedSeat(null);
        } else {
            setSelectedSeat(seatIndex);
        }

        setSeatInfo({ row, col });
    };

    return (
        <div className="seat-age-container">
            <h1>Select Your Seat</h1>
            <div className="screen">Screen</div>
            <div className="seats">
                {[...Array(10)].map((_, rowIndex) => (
                    <div key={`row-${rowIndex}`} className="seat-row">
                        {[...Array(10)].map((_, colIndex) => {
                            const seatIndex = rowIndex * 10 + colIndex;
                            const rowNumber = rowIndex + 1;
                            const colNumber = colIndex + 1;
                            const isUnavailable = seats[seatIndex]?.available === false;
                            return (
                                <div
                                    key={seatIndex}
                                    className={`seat ${selectedSeat === seatIndex ? 'selected' : ''} ${isUnavailable ? 'unavailable' : ''}`}
                                    onClick={() => !isUnavailable && handleSeatClick(seatIndex)}
                                >
                                    {String.fromCharCode(64 + rowNumber)}{colNumber}
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
            <form id="ageForm" onSubmit={handleSubmit}>
                <label>
                    Ticket Type:
                    <select value={ticketType} onChange={(e) => setTicketType(e.target.value)}>
                        <option value="adult">Adult</option>
                        <option value="child">Child</option>
                        <option value="senior">Senior</option>
                    </select>
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default SeatAgeSelection;