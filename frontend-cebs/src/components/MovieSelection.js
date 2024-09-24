import Movie from './Movie';
import React, { useState } from 'react';
import TrailerModal from './TrailerModal';



//look at backend/backend/movie/models.py for the fields


const MovieSelection = (props) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const Navbar = () => {
        return (
            <nav className="navbar">
                <ul>
                    <li><a href="/login">Log-In</a></li>
                    <li><a href="/register">Register</a></li>
                    <li><a href="/checkout">Checkout</a></li>
                    <li><a href="/admin">Admin</a></li>
                </ul>
            </nav>
        );
    };

    const filteredMovies = props.movieData.filter((movie) =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <Navbar />
            <div className="movie-selection">
                <h1>Select a Movie</h1>
                
                <input
                    type="text"
                    placeholder="Search for a movie..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                />

                <ul>
                    {filteredMovies && filteredMovies.map((movie) => (
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
        </div>
    );
};

export default MovieSelection;