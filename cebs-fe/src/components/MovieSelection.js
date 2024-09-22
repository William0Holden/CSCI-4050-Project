import Card from './Card';
import Movie from './Movie';

const MovieSelection = (props) => {
    return (
        <Card className ="movies" key="movieList">
            <ul>
                {props.movieData.map((movie) => (
                    <Movie
                        key={movie.id}
                        //_id={movie._id}
                        //id={movie.id}
                        img={movie.img}
                        rating={movie.rating}
                        duration={movie.duration}
                        desc={movie.desc}
                        //token={props.token}
                    />
                ))}
            </ul>
        </Card>

    );
};

export default MovieSelection;