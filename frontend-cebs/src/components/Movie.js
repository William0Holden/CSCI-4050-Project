import React from 'react';
import './Movie.css';
import TrailerModal from './TrailerModal';

const Movie = (props) => {

    return (
        <li key={props.id} className="movie">
            <div className="main-backdrop">
                <img src={props.img} alt={props.title} className="movie-image" />
                <h2>{props.title}</h2>
                <div className="footer-backdrop">
                    <div className="columns">
                        <h2>{props.rating}</h2>
                        <p>{props.genre}</p>
                    </div>
                </div>
            </div>
                <TrailerModal trailer_url={props.trailer_url} />
        </li>
    );
}

export default Movie;