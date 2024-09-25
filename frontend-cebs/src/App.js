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

import axios from 'axios';
import { Component } from 'react';

class App extends Component {

  constructor(props) {
    super(props);
    
    // add the props here
    this.state = {
    
      movieItem: {
        title: "",
        category: "",
        cast: "",
        director: "",
        producer: "",
        synopsis: "",
        reviews: "",
        picture_url: "",
        trailer_url: "",
        mpaaa_us_rating: "",
        show_dates_times: []
      },
      
      // this list stores all the movies
      movieList: []
    };
  };

  componentDidMount() {
    this.refreshList();
  }

  refreshList = () => {
    axios   //Axios to send and receive HTTP requests
      .get("http://localhost:8000/api/movies/")
      .then(res => this.setState({ movieList: res.data })) //movieList is updated with the data from the API
      .catch(err => console.log(err));
  };

  render() {

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