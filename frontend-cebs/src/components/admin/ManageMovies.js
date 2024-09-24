import React from 'react';

import './ManageMovies.css';

const ManageMovies = (props) => {
  
  return (
    <div class="container">
        <h1>Manage Movies</h1>
        
        <form id="addMovieForm">
            <h2>Add Movie</h2>
            <label for="movieTitle">Movie Title:</label>
            <input type="text" id="movieTitle" name="movieTitle" required/>
            
            <label for="movieGenre">Genre:</label>
            <input type="text" id="movieGenre" name="movieGenre" required/>
            
            <label for="movieDuration">Duration (minutes):</label>
            <input type="number" id="movieDuration" name="movieDuration" required/>

            <label for="movieRating">Movie Rating:</label>
            <select id="movieRating" name="movieRating" required>
                <option value="G">G</option>
                <option value="PG">PG</option>
                <option value="PG-13">PG-13</option>
                <option value="R">R</option>
                <option value="NC-17">NC-17</option>
            </select>

            <label for="movieImageUrl">Movie Image URL:</label>
            <input type="text" id="movieImageUrl" name="movieImageUrl" required/>

            <label for="movieTrailerUrl">Movie Trailer URL:</label>
            <input type="text" id="movieTrailerUrl" name="movieTrailerUrl" required/>
            
            <input type="submit" value="Add Movie"/>
        </form>
        <form id="updateMovieForm">
            <h2>Update Movie Information</h2>
            <label for="updateMovieTitle">Movie Title:</label>
            <input type="text" id="updateMovieTitle" name="updateMovieTitle" required/>
            
            <label for="newMovieGenre">New Genre:</label>
            <input type="text" id="newMovieGenre" name="newMovieGenre"/>
            
            <label for="newMovieDuration">New Duration (minutes):</label>
            <input type="number" id="newMovieDuration" name="newMovieDuration"/>

            <label for="newMovieRating">New Rating:</label>
            <select id="newMovieRating" name="newMovieRating">
                <option value="G">G</option>
                <option value="PG">PG</option>
                <option value="PG-13">PG-13</option>
                <option value="R">R</option>
                <option value="NC-17">NC-17</option>
            </select>
           
            
            <label for="newMovieImageUrl">New Movie Image URL:</label>
            <input type="text" id="newMovieImageUrl" name="newMovieImageUrl"/>
            <label for="newMovieTrailerUrl">New Movie Trailer URL:</label>
            <input type="text" id="newMovieTrailerUrl" name="newMovieTrailerUrl"/>
            
            <input type="submit" value="Update Movie"/>
        </form>
        <form id="deleteMovieForm">
            <h2>Delete Movie</h2>
            <label for="deleteMovieTitle">Movie Title:</label>
            <input type="text" id="deleteMovieTitle" name="deleteMovieTitle" required/>
            
            <input type="submit" value="Delete Movie"/>
        </form>
    </div>

  );

};

export default ManageMovies;