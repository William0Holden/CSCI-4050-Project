import Movie from './Movie';
import React, { useState } from 'react';
import './MovieSelection.css'; // Make sure to create and style this CSS file

// Look at backend/backend/movie/models.py for the fields

const MovieSelection = (props) => {
    const [titleSearchTerm, setTitleSearchTerm] = useState('');

    const handleTitleSearchChange = (event) => {
        setTitleSearchTerm(event.target.value);
    };

    const [categorySearchTerm, setCategorySearchTerm] = useState('');

    const handleCategorySearchChange = (event) => {
        setCategorySearchTerm(event.target.value);
    };

    const filteredMovies = props.movieData.filter((movie) =>
        movie.title.toLowerCase().includes(titleSearchTerm.toLowerCase())
        && movie.category.toLowerCase().includes(categorySearchTerm.toLowerCase())
    );

    return (
        <div className="movie-selection">
            <h1>Select a Movie</h1>
            <div className="search-row">
                <input
                    className='search-bar'
                    type="text"
                    placeholder="Search movies by title..."
                    value={titleSearchTerm}
                    onChange={handleTitleSearchChange}
                />
                <input
                    className='search-bar'
                    type="text"
                    placeholder="Search movies by category..."
                    value={categorySearchTerm}
                    onChange={handleCategorySearchChange}
                />
            </div>
            <div className="limited-height-div"> 
                <div className="five-column-div">
                    {filteredMovies.map((movie) => (
                            <Movie
                                isLoggedIn={props.isLoggedIn}
                                movie_id={movie.id}
                                title={movie.title}
                                rating={movie.mpaa_us_rating}
                                img={movie.picture_url}
                                showtimes={movie.show_dates_times}
                                trailer_url={movie.trailer_url}
                                category={movie.category}
                            />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MovieSelection;
