import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const SavePaymentMethod = ({ userId }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleSave = async () => {
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
                setMessage(error.message);
                setLoading(false);
                return;
            }

            // Fetch or create customer
            const customerResponse = await fetch('http://localhost:8000/api/create-customer/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user_id: userId }),
            });
            const customerData = await customerResponse.json();

            if (customerData.error) {
                setMessage(customerData.error);
                setLoading(false);
                return;
            }

            // Attach payment method to customer
            const attachResponse = await fetch('http://localhost:8000/api/attach-payment-method/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    customer_id: customerData.customer_id,
                    payment_method_id: paymentMethod.id,
                }),
            });
            const attachData = await attachResponse.json();

            if (attachData.error) {
                setMessage(attachData.error);
            } else {
                setMessage('Payment method saved successfully!');
            }
        } catch (err) {
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