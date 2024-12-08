import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';  // Import useNavigate for redirection
import './SeatAgeSelection.css';

const SeatAgeSelection = () => {
    const { showing_id } = useParams();  // Correctly destructure useParams
    const [showing, setShowing] = useState(null);
    const [selectedSeat, setSelectedSeat] = useState(null);  // Change to a single selected seat state
    const [seatInfo, setSeatInfo] = useState(null);
    const [bookedSeatId, setBookedSeatId] = useState(null);  // New state for booked seat id
    const navigate = useNavigate();  // Initialize useNavigate hook

    useEffect(() => {
        // Fetch showing data
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
            showroom: showing.showRoom, // Assuming correct field naming from showing data
        };
        console.log('Posting data:', postData);
    
        try {
            const response = await axios.post('http://localhost:8000/api/seats/', postData);  // Await the response
            navigate(`/order-confirm/${response.data.id}`);  // Redirect using response data
        }
        catch(error) {
            console.error('Error booking seat:', error);
        }
    };
    
    const seats = showing.seats || [];  // Use showing.seats instead of undefined `showings`

    const handleSeatClick = (seatIndex) => {
        // Adjust row and col to start at 1
        const row = Math.floor(seatIndex / 10) + 1; 
        const col = (seatIndex % 10) + 1;
    
        // If a seat is selected, deselect it by clearing selectedSeat
        if (selectedSeat === seatIndex) {
            setSelectedSeat(null);  // Deselect the seat if it's already selected
        } else {
            setSelectedSeat(seatIndex);  // Select the new seat
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
                            // Adjust seatIndex calculation
                            const seatIndex = rowIndex * 10 + colIndex; 
                            const rowNumber = rowIndex + 1;  // Row number starts at 1
                            const colNumber = colIndex + 1;  // Column number starts at 1
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
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default SeatAgeSelection;
