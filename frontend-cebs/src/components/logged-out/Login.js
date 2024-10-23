import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import axios from 'axios';

const Login = ({ setLoginStatus }) => {
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;

        try {
            const response = await axios.post('http://localhost:8000/api/login', { email, password });
            console.log('Login successful:', response.data);
            setLoginStatus(true); // Update login state in App.js
            navigate('/'); // Redirect to the home page
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <div className="login-container">
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <input type="text" name="email" placeholder="Email" required />
                <input type="password" name="password" placeholder="Password" required />
                <button type="submit">Login</button>
                <button type="button" onClick={() => navigate('/forgot-password')}>Forgot Password</button>
            </form>
        </div>
    );
};

export default Login;
