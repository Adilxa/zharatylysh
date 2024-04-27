"use client"
import React, { useState, useEffect } from 'react';
import useAuth from '@/hooks/useAuth';
import Preloader from '@/components/Preloader';
import scss from "../SignIn.module.scss"
import Link from 'next/link';

function SignInForm() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");

    const { isLoading, SignIn } = useAuth()

    const ROLE = "user";

    const user = {
        email,
        password,
        role: ROLE
    }

    const validateEmail = (email) => {
        const regex = /^[a-zA-Z0-9._%+-]+@gmail.com$/;
        return regex.test(email);
    };


    const onSubmit = async (e, user) => {
        e.preventDefault();

        if (!validateEmail(email)) {
            setEmailError("Please enter a valid Gmail address");
            return;
        }

        await SignIn({ ...user });
    };

    useEffect(() => {
        const header = document.getElementById("header");
        header.style.display = "none";

        return () => {
            header.style.display = "flex";
        };
    }, []);

    if (isLoading) return <Preloader />
    return (
        <form onSubmit={(e) => onSubmit(e, user)}>
            <h1>Sign In</h1>
            <input
                value={email}
                onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailError("");
                }}
            />
            {emailError && <p className={scss.error}>{emailError}</p>}
            <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
            />
            <button>Login</button>
            <p>Or if you have no account click <span><Link href="/signup">here</Link></span></p>
        </form>
    )
}

export default SignInForm