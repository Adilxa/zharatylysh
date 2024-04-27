"use client"
import React, { useState, useEffect } from 'react';
import useAuth from '@/hooks/useAuth';
import Preloader from '@/components/Preloader';
import Link from 'next/link';
import scss from "../signup/SignUp.module.scss"

function SignUpForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");

    const { isLoading, SignUp } = useAuth();

    const ROLE = "user";

    const user = {
        email,
        password,
        role: ROLE
    };

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

        await SignUp({ ...user });
    };

    useEffect(() => {
        const header = document.getElementById("header");
        header.style.display = "none";

        return () => {
            header.style.display = "flex";
        };
    }, []);

    if (isLoading) return <Preloader />;

    return (
        <form onSubmit={(e) => onSubmit(e, user)}>
            <h1>Sign Up</h1>
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
            <button>Registration</button>
            <p>Or if you have an account already click <span><Link href="/signin">here</Link></span></p>
        </form>
    );
}

export default SignUpForm;
