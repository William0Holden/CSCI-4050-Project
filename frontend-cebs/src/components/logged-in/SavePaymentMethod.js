import React, { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

const SavePaymentMethod = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [userEmail, setUserEmail] = useState(null);

    useEffect(() => {
        // Fetch user information when the component mounts
        const fetchUser = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/user');
                setUserEmail(response.data.user.email); // Adjust the path if `email` is nested differently
            } catch (err) {
                console.error('Error fetching user:', err);
                setMessage('Unable to fetch user information. Please try again.');
            }
        };

        fetchUser();
    }, []);

    const handleSave = async () => {
        if (!userEmail) {
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
    
            // Attach payment method to customer
            const customerIdToPass = customerData.customer.id.toString();
            const paymentMethodIdToPass = paymentMethod.id.toString();
            console.log('Customer ID:', customerIdToPass);
            console.log('Payment Method ID:', paymentMethodIdToPass);
    
            const attachResponse = await fetch('http://localhost:8000/api/attach-payment-method/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    customerId: customerIdToPass,  // Adjusted to match backend expected key
                    paymentMethodId: paymentMethodIdToPass, // Adjusted to match backend expected key
                }),
            });
            const attachData = await attachResponse.json();
    
            if (attachData.error) {
                setMessage(attachData.error);
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
        <div>
            <h2>Save Payment Method</h2>
            <CardElement />
            <button onClick={handleSave} disabled={loading || !stripe}>
                {loading ? 'Saving...' : 'Save Card'}
            </button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default SavePaymentMethod;
