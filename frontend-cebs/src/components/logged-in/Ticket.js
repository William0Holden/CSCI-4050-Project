import React from 'react';
import './Ticket.css';

const Ticket = (props) => {

    return (
        <div>
            <div className="ticket-details">
                <h2>Ticket Details</h2>
                <p><strong>Movie:</strong> {props.title}</p>
                <p><strong>Date:</strong> {props.date}</p>
                <p><strong>Time:</strong> {props.time}</p>
                <p><strong>Seat:</strong> Row {props.row}, Seat {props.col}</p>
                <p><strong>Price:</strong> ${props.price?.toFixed(2)}</p>
                <p><strong>Quantity:</strong> 1</p>
                <p><strong>Order Total:</strong> ${props.price?.toFixed(2)}</p>
            </div>
            <div className="ticket-poster">
                <h2>Movie Poster</h2>
                <img
                src={props.poster || "https://via.placeholder.com/150"}
                alt={`${props.title} Poster`}
                />
            </div>
      </div>
    );
}

export default Ticket;
