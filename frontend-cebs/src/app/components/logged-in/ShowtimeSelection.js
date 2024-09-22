import Card from './Card';
import Showtime from './Showtime';

const ShowtimeSelection = (props) => {
    return (
        <Card className ="showtimes" key="showtimeList">
            <ul>
                {props.showtimeData.map((showtime) => (
                    <Showtime
                        key={showtime.id}
                        //_id={post._id}
                        //id={post.id}
                        movie={showtime.id}
                        time={showtime.time}
                        open-seats={showtime.open-seats}
                        booked-seats={showtime.booked-seats}
                    />
                ))}
            </ul>
        </Card>

    );
};

export default ShowtimeSelection;