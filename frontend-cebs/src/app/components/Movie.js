import { Link } from 'react-router-dom'

const Movie = (props) => {
    //if (props.token) {
        return (
        <li key={props.id} className="movie-container">
            <div className="main-backdrop">
                <div className="header-backdrop">
                    <h1>{props.id}</h1>
                    <Link to={`/showtimes/${props._id}`} className="showtimes-link">
                        <button className='showtimes'>Showtimes</button>
                    </Link>
                </div>
                
                <img src={props.img} alt={props.name} className="movie-poster" />

                <div className="footer-backdrop">
                    <h2>{props.rating}</h2>
                    <p>{props.duration}</p>
                    <p>{props.desc}</p>
                </div>
            </div>            
        </li>
    )
/*} else {
    return (
        <li key={props.id} className="post-container">
            <div className="main-backdrop">
                <div className="header-backdrop">
                    <h1>{props.id}</h1>
                </div>
                
                <img src={props.img} alt={props.name} className="post-image" />

                <div className="footer-backdrop">
                    <h2>{props.location}</h2>
                    <p>{props.desc}</p>
                </div>
            </div>
        </li>
    );
}*/
}

export default Movie;
