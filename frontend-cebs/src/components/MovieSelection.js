import Movie from './Movie';
import React, { useState } from 'react';
import TrailerModal from './TrailerModal';

//look at backend/backend/movie/models.py for the fields


const MovieSelection = (props) => {
    return (
        <div class="movie-selection">
            <h1>Select a Movie</h1>

                <ul>
                    {props.movieData && props.movieData.map((movie) => (
                        <Movie
                            key={movie.id}
                            title={movie.title}
                            rating={movie.mpaa_us_rating}
                            img={movie.picture_url}
                            showtimes={movie.show_dates_times}
                            trailer_url={movie.trailer_url}
                        />
                    ))}
                </ul>

        </div>
    );
};

export default MovieSelection;