import React from 'react';
import './Seat.css';

const Seat = (props) => {
    return (
        <div key={props.id} class="seat"></div>
    )
}

export default Seat;