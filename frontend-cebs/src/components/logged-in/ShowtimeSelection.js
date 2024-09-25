import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './ShowtimeSelection.css';

const ShowtimeSelection = () => {
  return (
    <div className="container">
      <img 
        src="https://m.media-amazon.com/images/M/MV5BZTk5ODY0MmQtMzA3Ni00NGY1LThiYzItZThiNjFiNDM4MTM3XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg" 
        alt="Movie Poster" 
        className="movie-image" 
      />

      <h1>Select a Time</h1>
      
      <div className="time-selection">
        {/* Use Link to wrap the buttons */}
        <Link to="/seat-age-selection">
          <button className="time-button">10:00 AM</button>
        </Link>
        <Link to="/seat-age-selection">
          <button className="time-button">12:00 PM</button>
        </Link>
        <Link to="/seat-age-selection">
          <button className="time-button">2:00 PM</button>
        </Link>
        <Link to="/seat-age-selection">
          <button className="time-button">4:00 PM</button>
        </Link>
        <Link to="/seat-age-selection">
          <button className="time-button">6:00 PM</button>
        </Link>
        <Link to="/seat-age-selection">
          <button className="time-button">8:00 PM</button>
        </Link>
      </div>
    </div>
  );
};

export default ShowtimeSelection;
