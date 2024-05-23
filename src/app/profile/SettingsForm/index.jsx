"use client";
import React, { useEffect, useState } from 'react';
import scss from '../UserSettings.module.scss';
import useUser from '@/hooks/useUser';
import Preloader from '@/components/Preloader';
import useAuth from '@/hooks/useAuth';

function SettingsForm() {
    const [email, setEmail] = useState('');
    const [country, setCountry] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const { user, getMe, isLoading, updateMe } = useUser();
    const { LogOut } = useAuth();

    useEffect(() => {
        getMe();
    }, []);

    useEffect(() => {
        if (user) {
            setEmail(user.email || '');
            setCountry(user.country || '');
            setCardNumber(user.cardNumber || '');
        }
    }, [user]);

    const validate = () => {
        const newErrors = {};
        if (!email) newErrors.email = 'Email is required';
        if (!country) newErrors.country = 'Country is required';
        if (!cardNumber) newErrors.cardNumber = 'Card Number is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        setIsSubmitting(true);
        try {
            await updateMe({ email, country, cardNumber });
            setSuccessMessage('Your settings have been updated successfully.');
        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) return <Preloader />;
    return (
        <div className={scss.wrapper}>
            <form className={scss.form} onSubmit={handleSubmit}>
                <h2>User Settings</h2>
                {successMessage && <p className={scss.successMessage}>{successMessage}</p>}
                <div className={scss.inputgroup}>
                    <label htmlFor="email">Email:</label>
                    <input 
                        type="email" 
                        id="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        aria-invalid={errors.email ? "true" : "false"}
                    />
                    {errors.email && <span className={scss.error}>{errors.email}</span>}
                </div>
                <div className={scss.inputgroup}>
                    <label htmlFor="country">Country:</label>
                    <input 
                        type="text" 
                        id="country" 
                        value={country} 
                        onChange={(e) => setCountry(e.target.value)} 
                        aria-invalid={errors.country ? "true" : "false"}
                    />
                    {errors.country && <span className={scss.error}>{errors.country}</span>}
                </div>
                <div className={scss.inputgroup}>
                    <label htmlFor="cardNumber">Card Number:</label>
                    <input 
                        type="text" 
                        id="cardNumber" 
                        value={cardNumber} 
                        onChange={(e) => setCardNumber(e.target.value)} 
                        aria-invalid={errors.cardNumber ? "true" : "false"}
                    />
                    {errors.cardNumber && <span className={scss.error}>{errors.cardNumber}</span>}
                </div>
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Saving...' : 'Save Changes'}
                </button>
                <button type="button" className={scss.hideBlock} onClick={LogOut}>
                    Logout
                </button>
            </form>
        </div>
    );
}

export default SettingsForm;
