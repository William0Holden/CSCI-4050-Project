import axios from 'axios';
import React, { useState, useEffect } from 'react';

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
    <form onSubmit={handleSubmit}>
      <h2>Edit Profile</h2>

      <label>Email:</label>
      <input
        type="email"
        name="email"
        value={user.email}
        onChange={handleChange}
        maxLength="50"
        required
        disabled
      />

      <label>Username:</label>
      <input
        type="text"
        name="username"
        value={user.username}
        onChange={handleChange}
        maxLength="50"
        required
      />

      <label>Phone Number:</label>
      <input
        type="text"
        name="phone_num"
        value={user.phone_num}
        onChange={handleChange}
        maxLength="10"
        required
      />

      <label>First Name:</label>
      <input
        type="text"
        name="first_name"
        value={user.first_name}
        onChange={handleChange}
        maxLength="50"
        required
      />

      <label>Last Name:</label>
      <input
        type="text"
        name="last_name"
        value={user.last_name}
        onChange={handleChange}
        maxLength="50"
        required
      />

      {/* Password field */}
      <label>New Password:</label>
      <input
        type="password"
        name="password"
        value={user.password} // Accessing the password state
        onChange={handleChange}
        maxLength="100"
      />

      <h3>Card Information</h3>
      {/* Card information fields here... */}

      <h3>Address Information</h3>

      <label>Home Street:</label>
      <input
        type="text"
        name="home_street"
        value={user.home_street}
        onChange={handleChange}
        maxLength="100"
      />

      <label>Home City:</label>
      <input
        type="text"
        name="home_city"
        value={user.home_city}
        onChange={handleChange}
        maxLength="50"
      />

      <label>Home State:</label>
      <input
        type="text"
        name="home_state"
        value={user.home_state}
        onChange={handleChange}
        maxLength="2"
      />

      <label>Zip Code:</label>
      <input
        type="text"
        name="zipcode"
        value={user.zipcode}
        onChange={handleChange}
        maxLength="9"
      />

      <label>Receive Promotions:</label>
      <input
        type="checkbox"
        name="promotions"
        checked={user.promotions}
        onChange={handleChange}
      />

      <button type="submit">Save Changes</button>
    </form>
  );
};

export default EditProfile;
