import React from 'react';

import './Register.css';

const Register = (props) => {
  return (
    <div class="container">
        <h2>Register</h2>
        <form>
            <label for="username">Username <span>*</span></label>
            <input type="text" id="username" name="username" required/>

            <label for="email">Email <span>*</span></label>
            <input type="email" id="email" name="email" required/>

            <label for="password">Password <span>*</span></label>
            <input type="password" id="password" name="password" required/>

            <label for="confirm-password">Confirm Password <span>*</span></label>
            <input type="password" id="confirm-password" name="confirm-password" required/>

            <label for="first-name">First Name</label>
            <input type="text" id="first-name" name="first-name"/>

            <label for="last-name">Last Name</label>
            <input type="text" id="last-name" name="last-name"/>

            <label for="phone">Phone Number</label>
            <input type="tel" id="phone" name="phone"/>
            <label for="add-address">Add Home Address</label>
            <input type="checkbox" id="add-address" name="add-address" onclick="toggleAddressForm()"/>

            <div id="address-form">
                <label for="street">Street</label>
                <input type="text" id="street" name="street"/>

                <label for="city">City</label>
                <input type="text" id="city" name="city"/>

                <label for="state">State</label>
                <input type="text" id="state" name="state"/>

                <label for="zip">Zip Code</label>
                <input type="text" id="zip" name="zip"/>
            </div>
            <label for="add-payment">Add Payment Information</label>
            <input type="checkbox" id="add-payment" name="add-payment" onclick="togglePaymentForm()"/>

            <div id="payment-form">
                <label for="Register-number">Register Number</label>
                <input type="text" id="Register-number" name="Register-number"/>

                <label for="expiry-date">Expiry Date</label>
                <input type="text" id="expiry-date" name="expiry-date"/>

                <label for="cvv">CVV</label>
                <input type="text" id="cvv" name="cvv"/>
            </div>

            <button type="submit">Register</button>
        </form>
    </div>
    );
};

export default Register;