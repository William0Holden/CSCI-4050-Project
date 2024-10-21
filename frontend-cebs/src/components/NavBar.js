import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css'; // Make sure to create and style this CSS file

const NavBar = () => {
    return (
        <nav class="navbar">
            <ul class="navbar-list">
                <li class="navbar-item">
                    <Link to="/login" className="navbar-link">Log-In</Link>
                </li>
                <li class="navbar-item">
                    <Link to="/register" className="navbar-link">Register</Link>
                </li>
                <li class="navbar-item">
                    <Link to="/checkout" className="navbar-link">Checkout</Link>
                </li>
                <li class="navbar-item">
                    <Link to="/admin" className="navbar-link">Admin</Link>
                </li>
                <li class="navbar-item">
                    <Link to="/edit-profile" className="navbar-link">Edit Profile</Link>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;