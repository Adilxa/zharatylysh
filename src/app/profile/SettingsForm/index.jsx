"use client"
import React, { useEffect, useState } from 'react';
import scss from '../UserSettings.module.scss';
import useUser from '@/hooks/useUser';
import Preloader from '@/components/Preloader';
import useAuth from '@/hooks/useAuth';

function SettingsForm() {
    const [email, setEmail] = useState('');
    const [country, setCountry] = useState('');
    const [cardNumber, setCardNumber] = useState('');

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

    console.log(user);

    const ROLE = 'user';

    const updatedUser = {
        email,
        password: user?.password,
        role: ROLE,
        country: country,
        cardNumber: cardNumber,
    };

    const handleSubmit = async (e, data) => {
        e.preventDefault();
        await updateMe(data);
    };

    if (isLoading) return <Preloader />;
    return (
        <div className={scss.wrapper}>
            <form
                style={{ display: 'flex', flexDirection: 'column', gap: '10px', justifyContent: 'center', alignItems: 'center' }}
                onSubmit={(e) => handleSubmit(e, updatedUser)}
            >
                <div className={scss.inputgroup}>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className={scss.inputgroup}>
                    <label htmlFor="country">Country:</label>
                    <input type="text" id="country" value={country} onChange={(e) => setCountry(e.target.value)} />
                </div>
                <div className={scss.inputgroup}>
                    <label htmlFor="cardNumber">Card Number:</label>
                    <input type="text" id="cardNumber" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} />
                </div>
                <button type="submit">Save Changes</button>
                <button className={scss.hideBlock} onClick={LogOut}>
                    Logout
                </button>
            </form>
        </div>
    );
}

export default SettingsForm;
