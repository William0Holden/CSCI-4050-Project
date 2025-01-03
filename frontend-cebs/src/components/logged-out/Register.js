import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Register.css';

const client = axios.create({
    baseURL: 'http://localhost:8000',
});

const Register = () => {
  const navigate = useNavigate();
  
  // State for form inputs
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phone: '',
    addAddress: false,
    street: '',
    city: '',
    state: '',
    zip: '',
    addPayment: false,
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure password and confirmPassword match
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    // Create data to send
    const dataToSend = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
      first_name: formData.firstName,
      last_name: formData.lastName,
      phone_num: formData.phone,
      home_street: formData.addAddress ? formData.street : '',
      home_city: formData.addAddress ? formData.city : '',
      home_state: formData.addAddress ? formData.state : '',
      zipcode: formData.addAddress ? formData.zip : '',
    };

    try {
      // Post request to the register API
      await client.post('/api/register', dataToSend);
      // Navigate to confirmation page
      navigate('/register/confirm');
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  return (
    <div className="register-container">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username <span>*</span></label>
        <input type="text" id="username" name="username" value={formData.username} onChange={handleInputChange} required />

        <label htmlFor="email">Email <span>*</span></label>
        <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required />

        <label htmlFor="password">Password <span>*</span></label>
        <input type="password" id="password" name="password" value={formData.password} onChange={handleInputChange} required />

        <label htmlFor="confirm-password">Confirm Password <span>*</span></label>
        <input type="password" id="confirm-password" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} required />

        <label htmlFor="first-name">First Name</label>
        <input type="text" id="first-name" name="firstName" value={formData.firstName} onChange={handleInputChange} />

        <label htmlFor="last-name">Last Name</label>
        <input type="text" id="last-name" name="lastName" value={formData.lastName} onChange={handleInputChange} />

        <label htmlFor="phone">Phone Number</label>
        <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} />

        <div className="row">
          <div className="column">
            <label> Register for Promo</label>
          </div>
          <div className="column">
            <input type="checkbox"/>
          </div>
        </div>

        <div className="row">
          <div className="column">
            <label htmlFor="add-address">Add Home Address</label>
          </div>
          <div className="column">
            <input type="checkbox" id="add-address" name="addAddress" checked={formData.addAddress} onChange={handleInputChange} />
          </div>
        </div>
        
        

        {formData.addAddress && (
          <div id="address-form">
            <label htmlFor="street">Street</label>
            <input type="text" id="street" name="street" value={formData.street} onChange={handleInputChange} />

            <label htmlFor="city">City</label>
            <input type="text" id="city" name="city" value={formData.city} onChange={handleInputChange} />

            <label htmlFor="state">State</label>
            <input type="text" id="state" name="state" value={formData.state} onChange={handleInputChange} />

            <label htmlFor="zip">Zip Code</label>
            <input type="text" id="zip" name="zip" value={formData.zip} onChange={handleInputChange} />
          </div>
        )}

        <button type="submit">Register</button>
      </form>
      
    </div>
  );
};

export default Register;
