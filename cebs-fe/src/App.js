import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

// Logged-Out Components
import Register from './components/logged-out/Register';
import RegisterConfirm from './components/logged-out/RegisterConfirm';

// Logged-In Components
import Login from './components/logged-in/Login';
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

// All User Components
import MovieSelection from './components/MovieSelection';


function App() {
  return (
    <Router>
        <Header token={userData.token} onLogOut={logOut}></Header>
        <Routes>
          {/* Logged-Out Routes */}
          <Route path='/register' element={<Register/>} />
          <Route path='/register-comfirm' element={<RegisterConfirm/>}/>

          {/* Logged-In Routes*/}
          <Route path='/login' element={<Login/>}/>
          <Route path='/edit-profile' element={<EditProfile/>}/>
          <Route path='/showtimes' element={<ShowtimeSelection/>}/>
          <Route path='/seats' element={<SeatAgeSelection/>}/>
          <Route path='/checkout' element={<OrderSummary/>}/>
          <Route path='/checkout-form' element={<CheckoutForm/>}/>
          <Route path='/order-confirm' element={<OrderConfirm/>}/>

          {/* Admin Routes */}
          <Route path="/admin" element={<Admin/>}/>
          <Route path="/manage-promos" element={<ManagePromos/>}/>
          <Route path="/manage-movies" element={<ManageMovies/>}/>
          <Route path="/manage-users" element={<ManageUsers/>}/>

          {/* All User Routes */}
          <Route exact path='/' element={<MovieSelection/>} />
        </Routes>
    </Router>
  )
}

export default App;
