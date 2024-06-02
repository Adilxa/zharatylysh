"use client"
// components/CheckoutForm.jsx
import { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async () => {
    setIsLoading(true);

    if (!stripe || !elements) {
      setErrorMessage('Stripe has not loaded yet.');
      setIsLoading(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);

    try {
      // Create a PaymentMethod
      const { error: paymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });

      if (paymentMethodError) {
        setErrorMessage(paymentMethodError.message);
        setIsLoading(false);
        return;
      }

      // Create a PaymentIntent
      const response = await axios.post("https://skihub-server-production.up.railway.app/api/booked-product/create", {
        currency: "usd",
        isRefund: false,
        endDate: "2024-10-12",
        amount: 5,
        product: 2
      }, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwicGhvbmVOdW1iZXIiOiIwNzA2NjY0ODA1IiwiaWF0IjoxNzE3MzQxMTU5LCJleHAiOjE3MTgyMDUxNTl9.fdko339tC_jG5amxCE_fUJGx4AtbJ3SJ_crtgqfdFw0`,
          'Content-Type': 'application/json' // Убедитесь, что тип содержимого установлен правильно
        }
      });

      const { paymentIntentClientSecret } = response.data;

      // Confirm the payment
      const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(paymentIntentClientSecret, {
        payment_method: paymentMethod.id
      });

      if (confirmError) {
        setErrorMessage(confirmError.message);
      } else {
        console.log('PaymentIntent:', paymentIntent);
        // Платеж успешно завершен
      }
    } catch (error) {
      setErrorMessage(error.message);
    }

    setIsLoading(false);
  };

  return (
    <>
      <form onSubmit={(e) => { e.preventDefault(); handlePayment(); }}>
        <CardElement />
        <button type="submit" disabled={!stripe || isLoading}>
          {isLoading ? 'Processing...' : 'Pay'}
        </button>
        {errorMessage && <div>{errorMessage}</div>}
      </form>
    </>
  );
};

export default CheckoutForm;
