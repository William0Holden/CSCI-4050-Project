import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./EditProfile.css";

const EditProfile = () => {
  const [user, setUser] = useState({
    email: '',
    username: '',
    phone_num: '',
    first_name: '',
    last_name: '',
    home_street: '',
    home_city: '',
    home_state: '',
    zipcode: '',
    promotions: false,
    password: '', // Password state
  });

  const navigate = useNavigate(); // useNavigate hook for navigation

  useEffect(() => {
    // Fetch user data
    axios.get('http://localhost:8000/api/user', { withCredentials: true })
      .then(res => {
        if (res.data && res.data.user) {
          setUser(res.data.user);
          console.log('Fetched user data:', res.data.user);
        } else {
          console.error('User data not found in response:', res.data);
        }
      })
      .catch(err => {
        console.error('Error fetching user data:', err);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare the user data to send, including the password
    const updatedUser = { ...user };

    // Check if the password field is not empty before sending
    if (user.password) {
      updatedUser.password = user.password; // Append password to the user object
    }

    // Send form data to API using Axios
    console.log('Submitting user data:', updatedUser);
    axios.put(`http://localhost:8000/api/edit/${user.user_id}`, updatedUser, { withCredentials: true })
      .then((response) => {
        console.log('Profile updated:', response.data);
      })
      .catch((error) => {
        console.error('Error updating user:', error);
      });
  };

  return (
    <div className="edit-profile-container">
      <form className="edit-profile-form" action="/updateProfile" method="post">
        <h1>Edit Profile</h1>
        <div className="row">
          <div className="column">
            <div>
              <label htmlFor="email">Email:</label>
              <input
                className="input-field"
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                maxLength="50"
                required
                disabled
              />
            </div>
            <div>
              <label htmlFor="username">Username:</label>
              <input
                className="input-field"
                type="text"
                name="username"
                value={user.username}
                onChange={handleChange}
                maxLength="50"
                required
              />
            </div>
            <div>
              <label htmlFor="phone_num">Phone Number:</label>
              <input
                className="input-field"
                type="text"
                name="phone_num"
                value={user.phone_num}
                onChange={handleChange}
                maxLength="10"
                required
              />
            </div>
            <div>
              <label htmlFor="first_name">First Name:</label>
              <input
                className="input-field"
                type="text"
                name="first_name"
                value={user.first_name}
                onChange={handleChange}
                maxLength="50"
                required
              />
            </div>
            <div>
              <label htmlFor="last_name">Last Name:</label>
              <input
                className="input-field"
                type="text"
                name="last_name"
                value={user.last_name}
                onChange={handleChange}
                maxLength="50"
                required
              />
            </div>
            <div>
              <label htmlFor="">New Password:</label>
              <p>Must enter your existing password or a new password to submit changes.</p>
              <input
                className="input-field"
                type="password"
                name="password"
                value={user.password} // Accessing the password state
                onChange={handleChange}
                maxLength="100"
              />
            </div>
          </div>

          <div className="column">
            <div>
              <label htmlFor="home_street">Home Street:</label>
              <input
                className="input-field"
                type="text"
                name="home_street"
                value={user.home_street}
                onChange={handleChange}
                maxLength="100"
              />
            </div>
            <div>
              <label htmlFor="home_city">Home City:</label>
              <input
                className="input-field"
                type="text"
                name="home_city"
                value={user.home_city}
                onChange={handleChange}
                maxLength="50"
              />
            </div>
            <div>
              <label htmlFor="home_state">Home State:</label>
              <input
                className="input-field"
                type="text"
                name="home_state"
                value={user.home_state}
                onChange={handleChange}
                maxLength="2"
              />
            </div>
            <div>
              <label htmlFor="zipcode">Zip Code:</label>
              <input
                className="input-field"
                type="text"
                name="zipcode"
                value={user.zipcode}
                onChange={handleChange}
                maxLength="9"
              />
            </div>
            <div><p></p></div>
            {/* Button to navigate to /save-payment-method */}
            <div>
              <button className="green-button" onClick={() => navigate('/save-payment-method')}>
                Go to Save Payment Method
              </button>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="column">
            <label>Receive Promotions</label>
          </div>
          <div className="column">
            <input
              type="checkbox"
              name="promotions"
              checked={user.promotions}
              onChange={handleChange}
            />
          </div>
        </div>

        <button className="green-button" type="submit" onClick={handleSubmit}>Save Changes</button>
      </form>
    </div>
  );
};

export default EditProfile;
