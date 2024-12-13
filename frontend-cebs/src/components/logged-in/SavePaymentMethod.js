import React, { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import './SavePaymentMethod.css';
import axios from 'axios';

const SavePaymentMethod = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [userEmail, setUserEmail] = useState(null);
    const [userId, setUserId] = useState(null);
    const [stripeId, setStripeId] = useState(null); // Track the user's existing stripe_id

    useEffect(() => {
        // Fetch user information when the component mounts
        const fetchUser = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/user');
                setUserEmail(response.data.user.email); // Adjust the path if `email` is nested differently
                setUserId(response.data.user.user_id); // Assuming user object has an id field
                setStripeId(response.data.user.stripe_id); // Get existing stripe_id if available
            } catch (err) {
                console.error('Error fetching user:', err);
                setMessage('Unable to fetch user information. Please try again.');
            }
        };

        fetchUser();
    }, []);

    const handleSave = async () => {
        if (!userEmail || !userId) {
            setMessage('User information not available. Cannot save payment method.');
            return;
        }

        setLoading(true);
        setMessage('');
        const cardElement = elements.getElement(CardElement);

        try {
            // Create a payment method
            const { paymentMethod, error } = await stripe.createPaymentMethod({
                type: 'card',
                card: cardElement,
            });

            if (error) {
                console.error(error);
                setMessage(error.message);
                setLoading(false);
                return;
            }

            console.log('Payment method:', paymentMethod.id);

            let customerIdToUse = stripeId;

            // If the user doesn't have a stripe_id, create a new customer
            if (!customerIdToUse) {
                // Fetch or create customer using email
                const customerResponse = await fetch('http://localhost:8000/api/create-customer/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: userEmail }),
                });
                const customerData = await customerResponse.json();

                if (customerData.error) {
                    setMessage(customerData.error);
                    setLoading(false);
                    return;
                }

                customerIdToUse = customerData.customer.id.toString();
                console.log('Created Customer ID:', customerIdToUse);
            }

            // Attach payment method to customer
            const paymentMethodIdToPass = paymentMethod.id.toString();
            console.log('Payment Method ID:', paymentMethodIdToPass);

            const attachResponse = await fetch('http://localhost:8000/api/attach-payment-method/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    customerId: customerIdToUse,  // Use existing or newly created customer ID
                    paymentMethodId: paymentMethodIdToPass, // Pass payment method ID
                }),
            });
            const attachData = await attachResponse.json();

            if (attachData.error) {
                setMessage(attachData.error);
                setLoading(false);
                return;
            }

            // If the user did not have a stripe_id, update the user object with the newly created Stripe customer ID
            if (!stripeId) {
                const updateUserResponse = await axios.put(`http://localhost:8000/api/update-stripe-id/${userId}`, {
                    stripe_id: customerIdToUse,  // Update with the customer ID from Stripe
                });

                if (updateUserResponse.status === 200) {
                    setMessage('Payment method saved and Stripe ID updated successfully!');
                } else {
                    setMessage('Failed to update Stripe ID.');
                }
            } else {
                setMessage('Payment method saved successfully!');
            }

        } catch (err) {
            console.error('Error saving payment method:', err);
            setMessage('An error occurred. Please try again.');
        }

        setLoading(false);
    };

    return (
        <div className="save-payment-container">
            <div className="save-payment-form">
                <h1>Save Payment Method</h1>
                <CardElement />
                <div><p></p></div>
                <button className="green-button" onClick={handleSave} disabled={loading || !stripe}>
                    {loading ? 'Saving...' : 'Save Card'}
                </button>
                {message && <p>{message}</p>}
            </div>
        </div>
    );
};

export default SavePaymentMethod;
