import React from 'react';

import './EditProfile.css';

const EditProfile = (props) => {
  
  return (
    <div>
        <header>
            <h1>Edit Profile</h1>
        </header>

        <main>
            <form action="/updateProfile" method="post">
                <div>
                    <label for="username">Username:</label>
                    <input type="text" id="username" name="username" required/>
                </div>
                <div>
                    <label for="first-name">First Name:</label>
                    <input type="text" id="first-name" name="first-name" required/>
                </div>
                <div>
                    <label for="last-name">Last Name:</label>
                    <input type="text" id="last-name" name="last-name" required/>
                </div>
                <div>
                    <label for="phone-number">Phone Number:</label>
                    <input type="text" id="phone-number" name="phone-number" required/>
                </div>
                <div>
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" required/>
                </div>
                <div>
                    <label for="password">Password:</label>
                    <input type="password" id="password" name="password" required/>
                </div>
                <div>
                    <label for="confirm-password">Confirm Password:</label>
                    <input type="password" id="confirm-password" name="confirm-password" required/>
                </div>
                <div>
                    <button type="button">Add Home Address</button>
                    <div id="address-form" class="forms">
                        <div>
                            <label for="street">Street:</label>
                            <input type="text" id="street" name="street"/>
                        </div>
                        <div>
                            <label for="city">City:</label>
                            <input type="text" id="city" name="city"/>
                        </div>
                        <div>
                            <label for="state">State:</label>
                            <input type="text" id="state" name="state"/>
                        </div>
                        <div>
                            <label for="zip">Zip Code:</label>
                            <input type="text" id="zip" name="zip"/>
                        </div>
                    </div>
                </div>
                <div>
                    <button type="button">Add Payment Information</button>
                    <div id="payment-form" class="forms">
                        <div>
                            <label for="card-number">Card Number:</label>
                            <input type="text" id="card-number" name="card-number"/>
                        </div>
                        <div>
                            <label for="expiry-date">Expiry Date:</label>
                            <input type="text" id="expiry-date" name="expiry-date"/>
                        </div>
                        <div>
                            <label for="cvv">CVV:</label>
                            <input type="text" id="cvv" name="cvv"/>
                        </div>
                    </div>
                </div>
                <div>
                    <button type="submit">Save Changes</button>
                </div>
                
            </form>
        </main>
    </div>
  );
};

export default EditProfile;