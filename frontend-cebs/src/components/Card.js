import React from 'react';
import './Card.css'; // Assuming you will create some styles for the Card component

const Card = (props) => {
    // The "props.className" allows you to pass additional custom classes for styling
    const classes = 'card ' + props.className;

    return (
        <div className={classes}>
            {props.children} {/* This renders whatever is passed as children inside the Card */}
        </div>
    );
};

export default Card;
