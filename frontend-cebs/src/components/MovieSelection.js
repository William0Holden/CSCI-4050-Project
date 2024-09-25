import Movie from './Movie';
import React, { useState } from 'react';
import TrailerModal from './TrailerModal';
import NavBar from './NavBar';
import './MovieSelection.css'; // Make sure to create and style this CSS file

// Look at backend/backend/movie/models.py for the fields

const MovieSelection = (props) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredMovies = props.movieData.filter((movie) =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <header>
                <h1>Cinema EBooking!</h1>
            </header>
            <nav>
                <NavBar />
            </nav>
            <h1>Select a Movie</h1> 
            <input
                type="text"
                placeholder="Search for a movie..."
                value={searchTerm}
                onChange={handleSearchChange}
            />
            <div className="limited-height-div"> 
                <div className="five-column-div">
                    {filteredMovies.map((movie) => (

                            <Movie
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
