
"use client";
import $api from '@/api/http';
import Preloader from '@/components/Preloader';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import CheckoutForm from '@/components/CheckoutForm';

function PaymentTourUi({ tour }) {

    //     sum: Стоимость брони 1500
    // user_id: 1,
    // tour_id: 1


    const [tourAmount, setAmount] = useState(1)
    const [tourAmountLeft, setTourLeft] = useState(tour.amount - 1)

    const onPay = async () => {
        try {
            if (tourAmount > 0) {
                const response = await $api.post("booked-tour", {
                    sum: Number(((tour.price + tour.price * 0.029) * tourAmount).toFixed(0)),
                    user: Number(localStorage.getItem("key")),
                    tour: tour.id,
                    amount: tourAmount
                });
                if (response.status === 201) {
                    toast("Success Payment")

                } else {
                    toast("Failed to process payment")

                    throw new Error("Failed to process payment");
                }
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                toast("This tour has already been bought")
            } else {
                toast("An error occurred during the payment process")
            }
        }
    };

    useEffect(() => {
        if (tourAmountLeft <= 0) {
            setAmount(0)
            setTourLeft(0)
        }
    }, [])


    if (!tour) return <Preloader />
    return (
        <section style={{ padding: "50px 0px" }}>
            <section className="container mx-auto bg-white rounded-lg shadow-md overflow-hidden  p-5">
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-bold">{tour.title}</h1>
                    <p className="text-gray-500">{tour.startDate} - {tour.endDate}</p>
                </div>
                <img className="w-full h-64 object-cover mt-5" src={tour.img} alt={tour.title} />
                <div className="mt-5">
                    <h2 className="text-lg font-semibold">Location: {tour.location}</h2>
                    <p className="mt-2 text-gray-700">{tour.description}</p>
                </div>
                <div className="mt-5">
                    <div className="flex justify-between items-center">
                        <p className="text-lg font-semibold">Price per unit:</p>
                        <p className="text-lg font-semibold">{tour.price}c</p>
                    </div>

                    <div className="flex justify-between items-center mt-2">
                        <p className="text-lg font-semibold">Total Price:</p>
                        <p className="text-lg font-semibold">{(tour.price + tour.price * 0.029).toFixed(2)}c</p>
                    </div>
                </div>
                <div className="mt-5 flex justify-between">
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <button
                            style={{
                                backgroundColor: "#f0f0f0",
                                border: "1px solid #ccc",
                                borderRadius: "5px",
                                padding: "10px 15px",
                                cursor: "pointer",
                                transition: "background-color 0.3s, color 0.3s",
                            }}
                            onClick={() => {
                                if (tourAmount > 0) {
                                    setAmount(tourAmount - 1);
                                    setTourLeft(tourAmountLeft + 1)
                                }
                            }}
                        >
                            -1
                        </button>
                        <h2 style={{ margin: "0 10px", fontSize: "20px" }}>{tourAmount} got</h2>
                        <h2 style={{ margin: "0 10px", fontSize: "20px" }}>{tourAmountLeft} left</h2>
                        <button
                            style={{
                                backgroundColor: "#f0f0f0",
                                border: "1px solid #ccc",
                                borderRadius: "5px",
                                padding: "10px 15px",
                                cursor: "pointer",
                                transition: "background-color 0.3s, color 0.3s",
                            }}
                            onClick={() => {
                                if (tourAmountLeft > 0) {
                                    setAmount(tourAmount + 1);
                                    setTourLeft(tourAmountLeft - 1)
                                }
                            }}
                        >
                            +1
                        </button>
                    </div>
                    {/* <button
                        onClick={onPay}
                        className={`bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:ring-opacity-50`}
                        style={{
                            marginLeft: "20px",
                            padding: "10px 20px",
                            backgroundColor: tourAmount <= 0 ? "gray" : "#1D4ED8",
                            color: "white",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                            transition: "background-color 0.3s",
                        }}
                    >
                        Pay Now
                    </button> */}

                    <main>
                        <CheckoutForm tour={tour} id={tour.id} amount={tourAmount} />
                    </main>
                </div>
            </section>
        </section>
    );
}

export default PaymentTourUi;
