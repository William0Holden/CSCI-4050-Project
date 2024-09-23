import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

/*
// Logged-Out Components
import Register from './components/logged-out/Register';
import RegisterConfirm from './components/logged-out/RegisterConfirm';*/
import Login from './components/logged-out/Login';

/*
// Logged-In Components
import EditProfile from './components/logged-in/EditProfile';
import ShowtimeSelection from './components/logged-in/ShowtimeSelection';
import SeatAgeSelection from './components/logged-in/SeatAgeSelection';
import OrderSummary from './components/logged-in/OrderSummary';
import CheckoutForm from './components/logged-in/CheckoutForm';
import OrderConfirm from './components/logged-in/OrderConfirm';

// Admin Components
import Admin from './components/admin/AdminHome';
import ManagePromos from './components/admin/ManagePromos';
import ManageMovies from './components/admin/ManageMovies';
import ManageUsers from './components/admin/ManageUsers';
*/

// All User Components
import MovieSelection from './components/MovieSelection';


function App() {

  const movieData = [
    {
      id: 1,
      title: 'Deadpool and Wolverine',
      genre: 'Action',
      rating: 'R',
      img: 'https://m.media-amazon.com/images/M/MV5BZTk5ODY0MmQtMzA3Ni00NGY1LThiYzItZThiNjFiNDM4MTM3XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
      showtimes: []

    },
    {
      id:2,
      title: 'The Minecraft Movie',
      genre: 'Family',
      rating: 'PG',
      img: 'https://preview.redd.it/i-made-a-minecraft-movie-poster-if-it-wasnt-live-action-v0-dhotwttu5zod1.png?auto=webp&s=9e943a5c3a591e4756c2811044eadc130a1e33b7',
      showtimes: []
    },
    {
      id:2,
      title: 'Sonic the Hedgehog 45',
      genre: 'Family',
      rating: 'PG',
      img: 'https://upload.wikimedia.org/wikipedia/en/9/9d/Sonic_the_Hedgehog_3_poster.jpg',
      showtimes: []
    }
  ];

  return (
    <Router>
        <Routes>
          {/* All User Routes */}
          <Route exact path='/' element={<MovieSelection movieData={movieData}/>} />
          <Route exact path='login/' element={<Login/>}/>
        </Routes>
    </Router>
  )
}

export default App;