import React from 'react';
import { Link } from 'react-router-dom';

import './RegistrationConfirmation.css';

const RegistrationConfirmation = (props) => {
    return(
        <body>
            <div class="confirmation-container">
                <h1>Registration Successful!</h1>
                <p>Thank you for registering. Check you email to verify your account before logging in.</p>
                <a href="/login">Go to Login</a>
            </div>
        </body>
    );
};

export default RegistrationConfirmation;
