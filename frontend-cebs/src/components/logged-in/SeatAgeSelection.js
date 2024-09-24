import Card from '../Card';
import Seat from './Seat';
import './SeatAgeSelection.css';

const SeatAgeSelection = (props) => {
    return (
        <div class="container">
            <h1>Select Your Seat</h1>

            <div class="screen">Screen</div>

            <Card className ="seats">
                {props.seatData && props.seatData.map((seat) => (
                    <Seat
                        key={seat.id}
                    />
                ))}
            </Card>

            <form id="ageForm">
                <label for="age">Enter your age:</label>
                <input type="number" id="age" name="age" min="1" max="120" required/>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default SeatAgeSelection;