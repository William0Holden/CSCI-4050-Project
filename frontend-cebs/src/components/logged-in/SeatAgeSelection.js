import React, { useState } from 'react';
import './SeatAgeSelection.css';

const SeatAgeSelection = () => {
    const [selectedSeats, setSelectedSeats] = useState([]);

    const handleSeatClick = (index) => {
        if (!selectedSeats.includes(index)) {
            setSelectedSeats([...selectedSeats, index]);
        } else {
            setSelectedSeats(selectedSeats.filter(seat => seat !== index));
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        
        window.location.href = '/order-confirm';
    };

    return (
        <div className="seat-age-container">
            <h1>Select Your Seat</h1>
            <div className="screen">Screen</div>
            <div className="seats">
                {[...Array(100)].map((_, index) => (
                    <div
                        key={index}
                        className={`seat ${selectedSeats.includes(index) ? 'selected' : ''}`}
                        onClick={() => handleSeatClick(index)}
                    ></div>
                ))}
            </div>
            <form id="ageForm" onSubmit={handleSubmit}>
                <label htmlFor="age">Enter your age:</label>
                <input type="number" id="age" name="age" min="1" max="120" required />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default SeatAgeSelection;
