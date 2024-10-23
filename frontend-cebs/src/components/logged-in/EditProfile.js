import React, { useEffect } from 'react';
import axios from 'axios';
import './EditProfile.css';

const EditProfile = ({ userData, setUserData }) => {

    // Fetch user data from the API
    useEffect(() => {
        axios.get('http://localhost:8000/api/user')
            .then((response) => {
                setUserData(response.data); // Set user data from the response
            })
            .catch((error) => {
                console.error("There was an error fetching the user data!", error);
            });
    }, []);

    return (
        <div className="edit-profile-container">
            <form className="edit-profile-form" action="/updateProfile" method="post">
                <h1>Edit Profile</h1>
                <div className="row">
                    <div className="column">
                        <div>
                            <label htmlFor="user_id">User ID:</label>
                            <input
                                className="input-field"
                                type="text"
                                id="user_id"
                                name="user_id"
                                value={userData.user_id}
                                readOnly
                            />
                        </div>
                        <div>
                            <label htmlFor="email">Email:</label>
                            <input
                                className="input-field"
                                type="email"
                                id="email"
                                name="email"
                                value={userData.email}
                                required
                                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                            />
                        </div>
                        <div>
                            <label htmlFor="username">Username:</label>
                            <input
                                className="input-field"
                                type="text"
                                id="username"
                                name="username"
                                value={userData.username}
                                required
                                onChange={(e) => setUserData({ ...userData, username: e.target.value })}
                            />
                        </div>
                        <div>
                            <label htmlFor="phone_num">Phone Number:</label>
                            <input
                                className="input-field"
                                type="text"
                                id="phone_num"
                                name="phone_num"
                                value={userData.phone_num}
                                required
                                onChange={(e) => setUserData({ ...userData, phone_num: e.target.value })}
                            />
                        </div>
                        <div>
                            <label htmlFor="first_name">First Name:</label>
                            <input
                                className="input-field"
                                type="text"
                                id="first_name"
                                name="first_name"
                                value={userData.first_name}
                                required
                                onChange={(e) => setUserData({ ...userData, first_name: e.target.value })}
                            />
                        </div>
                        <div>
                            <label htmlFor="last_name">Last Name:</label>
                            <input
                                className="input-field"
                                type="text"
                                id="last_name"
                                name="last_name"
                                value={userData.last_name}
                                required
                                onChange={(e) => setUserData({ ...userData, last_name: e.target.value })}
                            />
                        </div>
                        <div>
                            <input
                                type="checkbox"
                                id="promotions"
                                name="promotions"
                                checked={userData.promotions}
                                onChange={(e) => setUserData({ ...userData, promotions: e.target.checked })}
                            />
                            <label htmlFor="promotions"> Register for Promo</label>
                        </div>
                    </div>
                    <div className="column">
                        <div>
                            <div id="address-form">
                                <div>
                                    <label htmlFor="home_street">Street:</label>
                                    <input
                                        className="input-field"
                                        type="text"
                                        id="home_street"
                                        name="home_street"
                                        value={userData.home_street}
                                        onChange={(e) => setUserData({ ...userData, home_street: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="home_city">City:</label>
                                    <input
                                        className="input-field"
                                        type="text"
                                        id="home_city"
                                        name="home_city"
                                        value={userData.home_city}
                                        onChange={(e) => setUserData({ ...userData, home_city: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="home_state">State:</label>
                                    <input
                                        className="input-field"
                                        type="text"
                                        id="home_state"
                                        name="home_state"
                                        value={userData.home_state}
                                        onChange={(e) => setUserData({ ...userData, home_state: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="zipcode">Zip Code:</label>
                                    <input
                                        className="input-field"
                                        type="text"
                                        id="zipcode"
                                        name="zipcode"
                                        value={userData.zipcode}
                                        onChange={(e) => setUserData({ ...userData, zipcode: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div id="payment-form" className="forms">
                        <div>
                            <label htmlFor="card_number">Card Number:</label>
                            <input
                                className="input-field"
                                type="text"
                                id="card_number"
                                name="card_number"
                                value={userData.card_number}
                                onChange={(e) => setUserData({ ...userData, card_number: e.target.value })}
                            />
                        </div>
                        <div>
                            <label htmlFor="card_exp_date">Expiry Date:</label>
                            <input
                                className="input-field"
                                type="text"
                                id="card_exp_date"
                                name="card_exp_date"
                                value={userData.card_exp_date}
                                onChange={(e) => setUserData({ ...userData, card_exp_date: e.target.value })}
                            />
                        </div>
                        <div>
                            <label htmlFor="card_cvv">CVV:</label>
                            <input
                                className="input-field"
                                type="text"
                                id="card_cvv"
                                name="card_cvv"
                                value={userData.card_cvv}
                                onChange={(e) => setUserData({ ...userData, card_cvv: e.target.value })}
                            />
                        </div>
                        {/* Add more card fields as needed */}
                    </div>
                    <div>
                        <button className="green-button" type="submit">Save Changes</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default EditProfile;
