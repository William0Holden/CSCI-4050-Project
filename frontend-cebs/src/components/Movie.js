import React from 'react';
import './Movie.css';
import TrailerModal from './TrailerModal';
import { Link } from 'react-router-dom';

const Movie = (props) => {

    return (
        <div className="movie-container">
            <div className="movie-card">
                <Link to="/showtime-selection"> {/* Wrap Movie in Link */}
                    <img src={props.img} className="movie-card-img" alt="Movie Poster" />
                    </Link>
                    <div className="movie-card-body">
                        <h5 className="movie-card-title">{props.title}</h5>
                        <p className="movie-card-text">Rating: {props.rating}</p>
                        <p className="movie-card-text">Category: {props.category}</p>
                        <TrailerModal trailer_url={props.trailer_url} />
                    </div>
                </div>
        </div>
    );
}

export default Movie;