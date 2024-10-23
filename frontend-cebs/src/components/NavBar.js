import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css'; // Make sure to create and style this CSS file

const NavBar = () => {
    const handleLogout = () => {
      // Clear any user data or tokens once we have them
      // Redirect to the home page or login depending on what we want
      console.log("tests");
    };

    return (
        <nav className="navbar">
            <ul className="navbar-list">
                <li className="navbar-item">
                    <Link to="/login" className="navbar-link">Log-In</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/register" className="navbar-link">Register</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/checkout" className="navbar-link">Checkout</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/admin" className="navbar-link">Admin</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/edit-profile" className="navbar-link">Edit Profile</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/" className="navbar-link" onClick={handleLogout}>Logout</Link>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;