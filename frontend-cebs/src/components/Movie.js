import React from 'react';
import './Movie.css';
import TrailerModal from './TrailerModal';
import { Link } from 'react-router-dom';

const Movie = (props) => {

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-4 movie-card">
                    <div className="card">
                    <Link to="/showtime-selection"> {/* Wrap Movie in Link */}
                        <img src={props.img} className="card-img-top" alt="Movie Poster" />
                        </Link>
                        <div className="card-body">
                            <h5 className="card-title">{props.title}</h5>
                            <p className="card-text">Rating: {props.rating}</p>
                            <p className="card-text">Category: {props.category}</p>
                        </div>
                    </div>
                </div>
                <TrailerModal trailer_url={props.trailer_url} />
            </div>
        </div>
    );
}

export default Movie;