import React from 'react';

import './EditProfile.css';

const EditProfile = (props) => {
  
  return (
    <div className="edit-profile-container">
        <form className="edit-profile-form" action="/updateProfile" method="post">
        <h1>Edit Profile</h1>
            <div class="row">
                <div class="column">
                    <div>
                        <label for="email">Email:</label>
                        <input className="input-field" type="email" id="email" name="email" required/>
                    </div>
                    <div>
                        <label for="first-name">First Name:</label>
                        <input className="input-field" type="text" id="first-name" name="first-name" required/>
                    </div>
                    <div>
                        <label for="last-name">Last Name:</label>
                        <input className="input-field" type="text" id="last-name" name="last-name" required/>
                    </div>
                    <div>
                        <label for="password">Password:</label>
                        <input className="input-field" type="password" id="password" name="password" required/>
                    </div>
                    <div>
                        <label for="confirm-password">Confirm Password:</label>
                        <input className="input-field" type="password" id="confirm-password" name="confirm-password" required/>
                    </div>
                    <div>
                        <input type="checkbox"/>   
                        <label> Register for Promo</label>
                    </div>
                </div>
                <div class="column">
                    <div>
                        <div id="address-form">
                            <div>
                                <label for="street">Street:</label>
                                <input className="input-field" type="text" id="street" name="street"/>
                            </div>
                            <div>
                                <label for="city">City:</label>
                                <input className="input-field" type="text" id="city" name="city"/>
                            </div>
                            <div>
                                <label for="state">State:</label>
                                <input className="input-field" type="text" id="state" name="state"/>
                            </div>
                            <div>
                                <label for="zip">Zip Code:</label>
                                <input className="input-field" type="text" id="zip" name="zip"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div>
                    <button className="green-button">Add Payment Information</button>
                    <div id="payment-form" class="forms">
                        <div>
                            <label for="card-number">Card Number:</label>
                            <input className="input-field" type="text" id="card-number" name="card-number"/>
                        </div>
                        <div>
                            <label for="expiry-date">Expiry Date:</label>
                            <input className="input-field" type="text" id="expiry-date" name="expiry-date"/>
                        </div>
                        <div>
                            <label for="cvv">CVV:</label>
                            <input className="input-field" type="text" id="cvv" name="cvv"/>
                        </div>
                    </div>
                </div>
                <div>
                    <button className="green-button">Save Changes</button>
                </div>
                
            </div>
        </form>
    </div>
  );
};

export default EditProfile;