"use client"
// EditBookedCard.js
// EditBookedCard.js
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import $api from "@/api/http";
import Preloader from "@/components/Preloader";
import styles from "./EditBookedCard.module.scss";

function EditBookedCard() {
    const router = useRouter();
    const id = router.params;

    console.log(router.params);
    const [bookedTour, setBookedTour] = useState({});
    const [editedAmount, setEditedAmount] = useState(0);
    const [isLoading, setLoading] = useState(false);
    const [isUpdating, setUpdating] = useState(false);
    const [isDeleting, setDeleting] = useState(false);

    useEffect(() => {
            getBookedTour();
    }, []);

    const getBookedTour = async () => {
        setLoading(true);
        try {
            const res = await $api.get(`booked-tour/${id}`);
            if (res.data) {
                setBookedTour(res.data);
                setEditedAmount(res.data.amount);
            }
            setLoading(false);
        } catch (error) {
            console.error("Error fetching booked tour:", error);
            setLoading(false);
        }
    };

    const handleEditAmount = (e) => {
        setEditedAmount(e.target.value);
    };

    const handleUpdate = async () => {
        setUpdating(true);
        try {
            await $api.put(`booked-tour/${id}`, { amount: editedAmount });
            // Optionally update local state or perform other actions
            setUpdating(false);
        } catch (error) {
            console.error("Error updating booked tour:", error);
            setUpdating(false);
        }
    };

    const handleDelete = async () => {
        setDeleting(true);
        try {
            await $api.delete(`booked-tour/${id}`);
            router.push("/booked-tours"); // Redirect to booked tours page after deletion
        } catch (error) {
            console.error("Error deleting booked tour:", error);
            setDeleting(false);
        }
    };

    if (isLoading) return <Preloader />;

    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>Edit Booked Tour</h1>
            <div className={styles.formGroup}>
                <label htmlFor="amount" className={styles.label}>Amount:</label>
                <input
                    type="number"
                    id="amount"
                    value={editedAmount}
                    onChange={handleEditAmount}
                    className={styles.input}
                />
            </div>
            <div className={styles.actions}>
                <button onClick={handleUpdate} disabled={isUpdating} className={styles.button}>
                    {isUpdating ? "Updating..." : "Update"}
                </button>
                <button onClick={handleDelete} disabled={isDeleting} className={styles.button}>
                    {isDeleting ? "Deleting..." : "Delete"}
                </button>
            </div>
        </div>
    );
}

export default EditBookedCard;
