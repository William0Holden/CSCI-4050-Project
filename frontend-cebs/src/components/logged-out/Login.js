import React from 'react';

import './Login.css';

const Login = (props) => {
  return (
    <div class="login-container">
        <h2>Login</h2>
        <form action="/login" method="post">
            <input type="text" name="email" placeholder="Email" required/>
            <input type="password" name="password" placeholder="Password" required/>
            <button type="submit">Login</button>
        </form>
    </div>
    );

};

export default Login;