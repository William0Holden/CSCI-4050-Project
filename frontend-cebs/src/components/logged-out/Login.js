import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import axios from 'axios';

const Login = (props) => {
    const navigate = useNavigate(); // Initialize the navigate function

    const handleLogin = async (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;

        try {
            const response = await axios.post('http://localhost:8000/api/login', { email, password });
            console.log('Login successful:', response.data);
            // Handle successful login (e.g., store token, etc.)
            // Redirect to home page
            navigate('/'); // Redirect to home page (http://localhost:3000)
        } catch (error) {
            console.error('Login failed:', error);
            // Handle login failure (e.g., show error message)
        }
    };

    return (
        <div className="login-container">
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <input type="text" name="email" placeholder="Email" required />
                <input type="password" name="password" placeholder="Password" required />
                <button type="submit">Login</button>
                <button type="cancel">Forgot Password</button>
            </form>
        </div>
    );
};

export default Login;
