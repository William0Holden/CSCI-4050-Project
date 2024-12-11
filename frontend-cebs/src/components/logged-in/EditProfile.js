import axios from 'axios';
import React, { useState, useEffect } from 'react';
import "./EditProfile.css";

const EditProfile = () => {
  const [user, setUser] = useState({
    email: '',
    username: '',
    phone_num: '',
    first_name: '',
    last_name: '',
    card_number: '',
    card_exp_date: '',
    card_cvv: '',
    card_number2: '',
    card_exp_date2: '',
    card_cvv2: '',
    card_number3: '',
    card_exp_date3: '',
    card_cvv3: '',
    home_street: '',
    home_city: '',
    home_state: '',
    zipcode: '',
    promotions: false,
    password: '', // Password state
  });

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

  const handleCardSave = (e) => {

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
        <div class="row">
          <div class="column">
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
                <label htmlFor ="phone_num">Phone Number:</label>
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
              {/* Password field */}
              <label htmlFor ="">New Password:</label>
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
              <label  htmlFor="home_state">Home State:</label>
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
          </div>
        </div>

        <div className="row">
          <div className="column">
            <label htmlFor="add-payment">Add primary payment method</label>
          </div>
          <div className="column">
            <input type="checkbox" id="add-payment" name="addPayment" checked={user.addPayment} onChange={handleChange} />
          </div>
        </div>

          {user.addPayment && (
            <div className="column">
              <div>
                <label htmlFor="card_number">Card Number:</label>
                <input
                  className="input-field"
                  type="text"
                  name="card_number"
                  value={user.card_number}
                  onChange={handleChange}
                  maxLength="19"
                />
              </div>
              <div>
                <label htmlFor="card_exp_date">Card Expiration Date:</label>
                <input
                  className="input-field"
                  type="text"
                  name="card_exp_date"
                  value={user.card_exp_date}
                  onChange={handleChange}
                  maxLength="5"
                />
              </div>
              <div>
                <label htmlFor="card_cvv">Card CVV:</label>
                <input
                  className="input-field"
                  type="text"
                  name="card_cvv"
                  value={user.card_cvv}
                  onChange={handleChange}
                  maxLength="4"
                />
              </div>
              <button className="green-button" type="submit" onClick={handleCardSave}>Save Card</button>
          </div>)}

          <div className="column">
          <div className="row">
          <div className="column">
            <label htmlFor="add-payment">Add additional payment</label>
          </div>
          <div className="column">
            <input type="checkbox" id="add-payment" name="morePayment" checked={user.morePayment} onChange={handleChange} />
          </div>
          </div>
            
          {user.morePayment && (
            <div>
              <div>
                <label htmlFor="card_number_2">Card Number 2:</label>
                <input
                  className="input-field"
                  type="text"
                  name="card_number2"
                  value={user.card_number2}
                  onChange={handleChange}
                  maxLength="19"
                />
              </div>
              <div>
                <label htmlFor="card_exp_date_2">Card Expiration Date 2:</label>
                <input
                  className="input-field"
                  type="text"
                  name="card_exp_date2"
                  value={user.card_exp_date2}
                  onChange={handleChange}
                  maxLength="5"
                />
              </div>
              <div>
                <label htmlFor="card_cvv_2">Card CVV 2:</label>
                <input
                  className="input-field"
                  type="text"
                  name="card_cvv2"
                  value={user.card_cvv2}
                  onChange={handleChange}
                  maxLength="4"
                />
              </div>
              <div>
                <label htmlFor="card_number_3">Card Number 3:</label>
                <input
                  className="input-field"
                  type="text"
                  name="card_number3"
                  value={user.card_number3}
                  onChange={handleChange}
                  maxLength="19"
                />
              </div>
              <div>
                <label htmlFor="card_exp_date_3">Card Expiration Date 3:</label>
                <input
                  className="input-field"
                  type="text"
                  name="card_exp_date3"
                  value={user.card_exp_date3}
                  onChange={handleChange}
                  maxLength="5"
                />
              </div>
              <div>
                <label htmlFor="card_cvv_3">Card CVV 3:</label>
                <input
                  className="input-field"
                  type="text"
                  name="card_cvv3"
                  value={user.card_cvv3}
                  onChange={handleChange}
                  maxLength="4"
                />
              </div>
              <button className="green-button" type="submit" onClick={handleCardSave}>Save Card</button>
          </div>)}
          </div>

          <div className="row">
            <div className="column">
              <label> Receive Promotions</label>
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
        </form>
      <button className="green-button" type="submit" onClick={handleSubmit}>Save Changes</button>
    </div>
  );
};

export default EditProfile;
