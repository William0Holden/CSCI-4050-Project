import React from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import './ShowtimeSelection.css';

const ShowtimeSelection = () => {
  const { movie_id } = useParams();
  const [movie, setMovie] = React.useState(null);

  React.useEffect(() => {
    axios.get(`http://localhost:8000/api/movies/${movie_id}/`)
      .then(response => {
        setMovie(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the movie data!", error);
      });
  }, [movie_id]);

  if (!movie) {
    return <p>Loading...</p>;
  }

  const showtimes = movie.showings.map((showing) => (
    <button key={showing.id} className="showtime-button">
      {showing.date} - {showing.time}
    </button>
  ));

  return (
    <div className="showtime-container">
      <h1>{movie.title} - Select a Time</h1>
      
      <img 
        src={movie.picture_url} 
        alt={`${movie.title} Poster`} 
        className="showtime-image" 
      />
      
      <div className="time-selection">
        {showtimes}
      </div>
    </div>
  );
};

export default ShowtimeSelection;
