import React from 'react';

import './RegistrationConfirmation.css';

const RegistrationConfirmation = (props) => {
    return(
        <body>
            <div class="confirmation-container">
                <h1>Registration Successful!</h1>
                <p>Thank you for registering. Your account has been successfully created.</p>
                <a href="loginPage.html">Go to Login</a>
            </div>
        </body>
    );
};

export default RegistrationConfirmation;