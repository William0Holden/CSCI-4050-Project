import { Link } from 'react-router-dom'

import './Showtime.css';

const Showtime = (props) => {

    return (
        <li key={props.id} className="showtime-container">
            <div className="main-backdrop">
                <div class="row">
                    <div class="column">
                        <h1>{props.time}</h1>
                    </div>
                    <div class="column">
                        <Link to={`/seats/${props._id}`} className="seats-link">
                            <button className='seats'>Select</button>
                        </Link>
                    </div>
                </div>
            </div>            
        </li>
    )
}

export default Showtime;
