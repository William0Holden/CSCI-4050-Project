import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';
import axios from 'axios';

const NavBar = ({ isLoggedIn, setLoginStatus }) => {
    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:8000/api/logout');
            // Update login status immediately
            setLoginStatus(false);
            console.log("Logged out successfully");
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    const renderNavItems = () => {
        if (isLoggedIn) {
            return (
                <>
                    <li className="navbar-item">
                        <Link to="/admin" className="navbar-link">Admin</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/edit-profile" className="navbar-link">Edit Profile</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/" className="navbar-link" onClick={handleLogout}>Logout</Link>
                    </li>
                </>
            );
        } else {
            return (
                <>
                    <li className="navbar-item">
                        <Link to="/login" className="navbar-link">Log-In</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/register" className="navbar-link">Register</Link>
                    </li>
                </>
            );
        }
    };

    return (
        <nav className="navbar">
            <ul className="navbar-list">
                <li className="navbar-item">
                    <Link to="/" className="navbar-link">Home</Link>
                </li>
                {renderNavItems()}
            </ul>
        </nav>
    );
};

export default NavBar;
