
"use client";
import $api from '@/api/http';
import Preloader from '@/components/Preloader';
import React from 'react';


function PaymentTourUi({ tour }) {

//     sum: Стоимость брони 1500
// user_id: 1,
// tour_id: 1

    const getUser =async () => {
        const res = await $api.get("user/" + localStorage.getItem("key"))
        return res.data
    }

    const onPay =async () => 


        {
 
 
            const res = await $api.post("booked-tour", {
            sum:Number(tour.price + tour.price * 0.002),
            user:Number(localStorage.getItem("key")),
            tour:tour.id
           })

           .finally(() => {
            alert("Payment Success")
           })
           return res.data
        }

    if(!tour) return <Preloader/>
    return (
        <section style={{padding:"50px 0px"}}>
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
                    <p className="text-lg font-semibold">Amount day:</p>
                    <p className="text-lg font-semibold">{tour.amount} {tour.amount > 1 ? "days" : "day"}</p>
                </div>
                <div className="flex justify-between items-center mt-2">
                    <p className="text-lg font-semibold">Total Price:</p>
                    <p className="text-lg font-semibold">{tour.price + tour.price * 0.002}c</p>
                </div>
            </div>
            <div className="mt-5 flex justify-center">
                    <button onClick={onPay} className="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:ring-opacity-50">
                        Pay Now
                    </button>
                </div>
        </section>
        </section>
    );
}

export default PaymentTourUi;
