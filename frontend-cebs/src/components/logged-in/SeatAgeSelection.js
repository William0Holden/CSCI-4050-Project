import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './SeatAgeSelection.css';

const SeatAgeSelection = () => {
    const { showing_id } = useParams();
    const [showing, setShowing] = useState(null);
    const [selectedSeat, setSelectedSeat] = useState(null);
    const [seatInfo, setSeatInfo] = useState(null);
    const [bookedSeats, setBookedSeats] = useState([]);
    const navigate = useNavigate();

    React.useEffect(() => {
        if (showing && showing.showRoom) {
            axios.get('http://localhost:8000/api/seats/')
                .then(response => {
                    const filteredSeats = response.data.filter(seat => seat.showing === showing.id);
                    setBookedSeats(filteredSeats);
                    console.log('Fetched booked seats:', filteredSeats);
                })
                .catch(error => {
                    console.error("There was an error fetching the seat data!", error);
                });
        }
    }, [showing]);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/showings/${showing_id}/`)
            .then(response => {
                setShowing(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the showing data!", error);
            });
    }, [showing_id]);

    if (!showing) {
        return <p>Loading...</p>;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.target;
        const data = new FormData(form);
        const age = data.get('age');

        const postData = {
            row: seatInfo.row,
            col: seatInfo.col,
            available: false,
            showing: showing.id,
            showroom: showing.showRoom,
        };

        try {
            const response = await axios.post('http://localhost:8000/api/seats/', postData);
            navigate(`/order-confirm/${response.data.id}`);
        } catch (error) {
            console.error('Error booking seat:', error);
        }
    };

    const seats = showing.seats || [];

    const handleSeatClick = (seatIndex) => {
        // Adjust row and col to start at 1
        const row = Math.floor(seatIndex / 10) + 1;
        const col = (seatIndex % 10) + 1;

        const isUnavailable = seats[seatIndex]?.available === false;

        // Don't allow selecting unavailable seats or deselecting selected ones
        if (isUnavailable) return;

        // If a seat is selected, deselect it by clearing selectedSeat
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

                    // Check if the seat is booked
                    const bookedSeat = bookedSeats.find(seat => seat.row === rowNumber && seat.col === colNumber);
                    const isUnavailable = bookedSeat?.available === false; // Seat is unavailable if it’s booked
                    const isSelected = selectedSeat === seatIndex || bookedSeat;  // Mark as selected if it's selected or booked

                    return (
                        <div
                            key={seatIndex}
                            className={`seat ${isSelected ? 'selected' : ''} ${isUnavailable ? 'unavailable' : ''}`}
                            onClick={() => !isUnavailable && !bookedSeat && handleSeatClick(seatIndex)} // Prevent click if booked
                        >
                            {String.fromCharCode(64 + rowNumber)}{colNumber}
                        </div>
                    );
                })}
            </div>
        ))}
    </div>
</div>

    );
};

export default SeatAgeSelection;
