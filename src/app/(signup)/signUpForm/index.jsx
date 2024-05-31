"use client"; 
import React, { useState, useEffect } from 'react'; 
import useAuth from '@/hooks/useAuth'; 
import Preloader from '@/components/Preloader'; 
import Link from 'next/link'; 
import scss from "../signup/SignUp.module.scss"; 
 
function SignUpForm() { 
    const [email, setEmail] = useState(""); 
    const [password, setPassword] = useState(""); 
    const [country, setCountry] = useState(""); 
    const [cardNumber, setCardNumber] = useState(""); 
    const [emailError, setEmailError] = useState(""); 
    const [formError, setFormError] = useState(""); 
 
    const { isLoading, SignUp } = useAuth(); 
 
    const ROLE = "user"; 
 
    const user = { 
        email, 
        password, 
        country: country, 
        cardNumber: cardNumber, 
        role: ROLE 
    }; 
 
    const validateEmail = (email) => { 
        const regex = /^[a-zA-Z0-9._%+-]+@gmail.com$/; 
        return regex.test(email); 
    }; 
 
    const onSubmit = async (e) => { 
        e.preventDefault(); 
        setFormError(""); 
 
        if (!validateEmail(email)) { 
            setEmailError("Please enter a valid Gmail address"); 
            return; 
        } 
 
        try { 
            const res = await SignUp(user); 
            console.log("Sign-up successful", res); 
        } catch (error) { 
            setFormError("Sign-up failed. Please try again."); 
            console.error("Error during sign-up", error); 
        } 
    }; 
 
    useEffect(() => { 
        const header = document.getElementById("header"); 
        if (header) header.style.display = "none"; 
 
        return () => { 
            if (header) header.style.display = "flex"; 
        }; 
    }, []); 
 
    if (isLoading) return <Preloader />; 
 
    return ( 
        <form onSubmit={onSubmit}> 
            <h1>Sign Up</h1> 
            <input 
                value={email} 
                onChange={(e) => { 
                    setEmail(e.target.value); 
                    setEmailError(""); 
                }} 
                type='email' 
                placeholder='email@' 
            /> 
            {emailError && <p className={scss.error}>{emailError}</p>} 
            <input 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                type="password" 
                placeholder='password' 
            /> 
            <input 
                value={country} 
                onChange={(e) => setCountry(e.target.value)} 
                placeholder='country, city' 
            /> 
            <input 
                value={cardNumber} 
                onChange={(e) => setCardNumber(e.target.value)} 
                placeholder='card number' 
            /> 
            {formError && <p className={scss.error}>{formError}</p>} 
            <button>Registration</button> 
            <p>Or if you have an account already click <span><Link href="/signin">here</Link></span></p> 
        </form> 
    ); 
} 
 
export default SignUpForm;