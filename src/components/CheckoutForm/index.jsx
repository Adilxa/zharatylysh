"use client"
// components/CheckoutForm.jsx
import { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import $api from '@/api/http';
import { toast } from 'react-toastify';

const CheckoutForm = ({ id, amount, tour }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [payBtn, setPayBtn] = useState(true)

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
      const response = await $api.post("/booked-tour", {
        // currency: "usd",
        // isRefund: false,
        // endDate: "2024-10-12",
        // amount: amount,
        // product: id,
        amount: amount,
        tour: id,
        user: Number(localStorage.getItem("key"))
      });

      const { paymentIntentClientSecret } = response.data;

      // Confirm the payment
      const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(paymentIntentClientSecret, {
        payment_method: paymentMethod.id
      });

      if (confirmError) {
        setErrorMessage(confirmError.message);
      } else {
        toast("Success payed!")
        setPayBtn(false)
        // Платеж успешно завершен
      }
    } catch (error) {
      setErrorMessage(error.message);
      setPayBtn(false)
      toast.error("This tour is already bougth")

    }

    setIsLoading(false);
  };

  const onPay = (e) => {
    e.preventDefault();
    handlePayment();
  }

  return (
    <>
      <form style={{ width: "250px", display: "flex", flexDirection: "column", gap: "10px" }} onSubmit={(e) => { payBtn ? onPay(e) : e.preventDefault() }}>
        <CardElement />
        <button
          className={payBtn ? "bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:ring-opacity-50" : "bg-gray-300 text-white px-4 py-2 rounded"}
          type="submit" disabled={!stripe || isLoading}>
          {isLoading ? 'Processing...' : 'Pay'}
        </button>
        {/* {errorMessage && <div>This tour is already bougth</div>} */}
      </form>
    </>
  );
};

export default CheckoutForm;
