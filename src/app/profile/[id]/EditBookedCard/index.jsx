"use client"
import $api from "@/api/http";
import Preloader from "@/components/Preloader";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";


function EditBookedCard() {
    const params = useParams()

    const [bookedTour, setBookedTour] = useState({})
    const [isLoading, setLoading] = useState(false)

    const [tourAmount, setAmount] = useState(1)
    const [tourAmountLeft, setTourLeft] = useState(0)

    const getBookedTour = async () => {
        setLoading(true)
        try {
            const res = await $api.get("booked-tour")
            if (res.data) {
                setBookedTour(res.data.filter((el) => el.id == params.id)[0])
                setTourLeft(res.data.filter((el) => el.id == params.id)[0].tour.amount);
                setAmount(res.data.filter((el) => el.id == params.id)[0].amount)
            }
            setLoading(false)
        } catch (e) {
            console.log(e);
            setLoading(false)
        }
    }

    useEffect(() => {
        getBookedTour()
    }, [])

    useEffect(() => {
        if (tourAmountLeft <= 0) {
            setAmount(0)
            setTourLeft(0)
        }
    }, [])

    const onSave = async () => {
        try {
            await $api.put("booked-tour/" + params.id, { ...bookedTour, amount: tourAmount })
            await $api.put("tour/" + bookedTour.tour.id, { ...bookedTour.tour.id, amount: tourAmountLeft })
            toast("Good succes add places")
        } catch (e) {
            console.log(e);
        }
    }

    if (isLoading) return <Preloader />
    return (
        <section className={` container`} style={{ margin: "9% auto" }}>
            <img style={{ width: "100%", minHeight: "20%" }} src={bookedTour.tour.img} alt="" />
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
                <button
                    onClick={onSave}
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
                    Save
                </button>


            </div>
        </section>
    );
}

export default EditBookedCard;