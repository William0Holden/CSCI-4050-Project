import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css'; // Make sure to create and style this CSS file

const NavBar = () => {
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
            </ul>
        </nav>
    );
};

export default NavBar;