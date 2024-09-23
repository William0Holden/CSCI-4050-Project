import Card from './Card';
import Movie from './Movie';

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
                            genre={movie.genre}
                            rating={movie.rating}
                            img={movie.img}
                            showtimes={movie.showtimes}
                        />
                    ))}
                </ul>
            </Card>
        </div>
    );
};

export default MovieSelection;