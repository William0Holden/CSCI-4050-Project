import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

// All User Components
import MovieSelection from './components/MovieSelection';

// Logged-Out Components
import Register from './components/logged-out/Register';
import RegistrationConfirmation from './components/logged-out/RegistrationConfirmation';
import Login from './components/logged-out/Login';

// Logged-In Components
import EditProfile from './components/logged-in/EditProfile';
import ShowtimeSelection from './components/logged-in/ShowtimeSelection';
import SeatAgeSelection from './components/logged-in/SeatAgeSelection';
//import OrderSummary from './components/logged-in/OrderSummary';
import CheckoutForm from './components/logged-in/CheckoutForm';
import OrderConfirm from './components/logged-in/OrderConfirm';


// Admin Components
import AdminHome from './components/admin/AdminHome';
import ManagePromos from './components/admin/ManagePromos';

import ManageMovies from './components/admin/ManageMovies';
//import ManageUsers from './components/admin/ManageUsers';

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

  const seatData = [
    {id: 1},{id: 2},{id: 3},{id: 4},{id: 5},{id: 6},{id: 7},{id: 8},{id: 9},{id: 10},
    {id: 11},{id: 12},{id: 13},{id: 14},{id: 15},{id: 16},{id: 17},{id: 18},{id: 19},{id: 20},
    {id: 21},{id: 22},{id: 23},{id: 24},{id: 25},{id: 26},{id: 27},{id: 28},{id: 29},{id: 30},
    {id: 31},{id: 32},{id: 33},{id: 34},{id: 35},{id: 36},{id: 37},{id: 38},{id: 39},{id: 40},
    {id: 41},{id: 42},{id: 43},{id: 44},{id: 45},{id: 46},{id: 47},{id: 48},{id: 49},{id: 50},
    {id: 51},{id: 52},{id: 53},{id: 54},{id: 55},{id: 56},{id: 57},{id: 58},{id: 59},{id: 60},
    {id: 61},{id: 62},{id: 63},{id: 64},{id: 65},{id: 66},{id: 67},{id: 68},{id: 69},{id: 70},
    {id: 71},{id: 72},{id: 73},{id: 74},{id: 75},{id: 76},{id: 77},{id: 78},{id: 79},{id: 80},
    {id: 81},{id: 82},{id: 83},{id: 84},{id: 85},{id: 86},{id: 87},{id: 88},{id: 89},{id: 90},
    {id: 91},{id: 92},{id: 93},{id: 94},{id: 95},{id: 96},{id: 97},{id: 98},{id: 99},{id: 100}
  ]

  return (
    <Router>
        <Routes>
          {/* All User Routes */}
          <Route exact path='/' element={<MovieSelection movieData={movieData}/>} />

          {/* Logged-Out User Routes */}
          <Route exact path='/register' element={<Register/>} />
          <Route exact path='/reg-confirm' element={<RegistrationConfirmation/>} />
          <Route exact path='/login' element={<Login/>}/>

          {/* Logged-In User Routes */}       
          <Route exact path='/edit-profile' element={<EditProfile/>}/>
          <Route exact path='/select-showtime' element={<ShowtimeSelection/>}/>
          <Route exact path='/select-seat' element={<SeatAgeSelection seatData={seatData}/>}/>   
          <Route exact path='/checkout' element={<CheckoutForm/>} />
          <Route exact path='/order-confirm' element={<OrderConfirm/>} />

          {/* Admin User Routes */}    
          <Route exact path='/admin-home' element={<AdminHome/>} />
          <Route exact path='/manage-movies' element={<ManageMovies/>}/>
          <Route exact path='/manage-promos' element={<ManagePromos/>} />
        </Routes>
    </Router>
  )
}

export default App;