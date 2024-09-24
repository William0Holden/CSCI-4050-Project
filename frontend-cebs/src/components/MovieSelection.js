import Card from './Card';
import Movie from './Movie';

//look at backend/backend/movie/models.py for the fields


const MovieSelection = (props) => {
    return (
        <div class="movie-selection">
            <h1>Select a Movie</h1>
            <Card className ="movies">
                <ul>
                    {props.movieData && props.movieData.map((movie) => (
                        <Movie
                            key={movie.id}
                            title={movie.title}
                            rating={movie.mpaa_us_rating}
                            img={movie.picture_url}
                            showtimes={movie.show_dates_times}
                        />
                    ))}
                </ul>
            </Card>
        </div>
    );
};

export default MovieSelection;