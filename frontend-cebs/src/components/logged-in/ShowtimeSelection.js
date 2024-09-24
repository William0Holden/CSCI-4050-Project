import React from 'react';

import './ShowtimeSelection.css';

const ShowtimeSelection = (props) => {
  
  return (
    <div class="container">
        <img src="https://m.media-amazon.com/images/M/MV5BZTk5ODY0MmQtMzA3Ni00NGY1LThiYzItZThiNjFiNDM4MTM3XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg" alt="Movie Poster" class="movie-image"/>

        <h1>Select a Time</h1>
        
        <div class="time-selection">
            <button class="time-button">10:00 AM</button>
            <button class="time-button">12:00 PM</button>
            <button class="time-button">2:00 PM</button>
            <button class="time-button">4:00 PM</button>
            <button class="time-button">6:00 PM</button>
            <button class="time-button">8:00 PM</button>
        </div>
    </div>
  );

};

export default ShowtimeSelection;
