import React from 'react';
import './Movie.css';
import TrailerModal from './TrailerModal';
import { Link } from 'react-router-dom';

const Movie = (props) => {
    return (
        <div className="movie-container">
            <div className="movie-card">
                <img src={props.img} className="movie-card-img" alt="Movie Poster" />
                <div className="movie-card-body">
                    <h5 className="movie-card-title">{props.title}</h5>
                    <p className="movie-card-text">Rating: {props.rating}</p>
                    <p className="movie-card-text">Category: {props.category}</p>
                    <div className="movie-buttons">
                        <TrailerModal 
                            trailer_url={props.trailer_url} 
                            synopsis={props.synopsis} 
                        />
                        {props.isLoggedIn ? (
                            <Link to={`/showtime-selection/${props.movie_id}`} className="book-button">
                                Book Now
                            </Link>
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Movie;
