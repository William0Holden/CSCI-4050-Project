import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Components
import Register from './components/logged-out/Register';
import RegisterConfirm from './components/logged-out/RegistrationConfirmation';
import Login from './components/logged-out/Login';
import EditProfile from './components/logged-in/EditProfile';
import ShowtimeSelection from './components/logged-in/ShowtimeSelection';
import SeatAgeSelection from './components/logged-in/SeatAgeSelection';
import CheckoutForm from './components/logged-in/CheckoutForm';
import OrderConfirm from './components/logged-in/OrderConfirm';
import Admin from './components/admin/AdminHome';
import ManagePromos from './components/admin/ManagePromos';
import ManageMovies from './components/admin/ManageMovies';
import MovieSelection from './components/MovieSelection';
import NavBar from './components/NavBar';
import PasswordReset from './components/logged-out/PasswordReset';
import ResetPasswordForm from './components/logged-out/ResetPasswordForm';
import MyBookings from './components/logged-in/MyBookings'

import axios from 'axios';
import { Component } from 'react';

axios.defaults.withCredentials = true;
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
axios.defaults.withXSRFToken = true;

class App extends Component {

  constructor(props) {
    super(props);
    
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
        coming_soon: false,
        show_dates_times: []
      },
      movieList: [],
      isLoggedIn: false, // Add isLoggedIn state here
      user: null
    };
  }

  componentDidMount() {
    this.refreshList();
    this.checkLoginStatus();
  }

  refreshList = () => {
    axios.get("http://localhost:8000/api/movies/")
      .then(res => this.setState({ movieList: res.data }))
      .catch(err => console.log(err));
  }

  checkLoginStatus = () => {
    axios.get('http://localhost:8000/api/user', { withCredentials: true })
      .then(res => {
        this.setState({ 
          user: res.data,
          isLoggedIn: true
        });
      })
      .catch(err => {
        this.setState({
          user: null,
          isLoggedIn: false
        });
        console.log(err);
      });
  }

  // Add a method to update the login status
  setLoginStatus = (status) => {
    this.setState({ isLoggedIn: status });
  }

  render() {
    return (
      <Router>
      <NavBar isLoggedIn={this.state.isLoggedIn} setLoginStatus={this.setLoginStatus} />
      <Routes>
        <Route exact path='/' element={<MovieSelection movieData={this.state.movieList} isLoggedIn = {this.state.isLoggedIn} />} />
        <Route exact path='/login' element={<Login setLoginStatus={this.setLoginStatus} />} />
        <Route exact path='/register' element={<Register />} />
        <Route exact path='/register/confirm' element={<RegisterConfirm />} />
        
        {/* Pass user data to EditProfile component */}
        <Route 
        exact 
        path='/edit-profile' 
        element={<EditProfile />} 
        />
        
        <Route exact path='/showtime-selection' element={<ShowtimeSelection />} />
        <Route path="/showtime-selection/:movie_id" element={<ShowtimeSelection />} />
        <Route exact path='/seat-age-selection/:showing_id' element={<SeatAgeSelection />} />
        <Route exact path='/checkout' element={<CheckoutForm />} />
        <Route exact path='/order-confirm/:seat_id' element={<OrderConfirm />} />
        <Route exact path='/bookings' element={<MyBookings />} />
        <Route exact path='/admin' element={<Admin />} />
        <Route exact path='/admin/manage-promos' element={<ManagePromos />} />
        <Route exact path='/admin/manage-movies' element={<ManageMovies />} />
        <Route exact path='/forgot-password' element={<PasswordReset />} />
        <Route path="/reset-password-form/:token" element={<ResetPasswordForm />} />
      </Routes>
      </Router>
    )
  }
}

export default App;
