"use client"
import React, { useState } from "react";
import scss from "./FeedBack.module.scss";

const FeedBack = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [number, setNumber] = useState("");
    const [peopleNumber, setPeopleNumber] = useState("");

    return (
        <div className={scss.wrapper}>
            <div className="container">
                <div className={scss.header}>
                    <div className={scss.title}>Send a request</div>
                </div>
                <div className={scss.form}>
                    <div className={scss.inputs}>
                        <input
                            className={scss.input}
                            type='text'
                            placeholder="Name"
                            onChange={(e) => setName(e.target.value)}
                            required
                            value={name}
                        />
                        <input
                            className={scss.input}
                            type='text'
                            placeholder="E-mail"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} />
                        <input
                            className={scss.input}
                            type="tel"
                            placeholder="WhatsApp number"
                            required
                            value={number}
                            onChange={(e) => setNumber(e.target.value)}
                        />
                        <input
                            className={scss.input}
                            type='text'
                            placeholder="Number of people"
                            onChange={(e) => setPeopleNumber(e.target.value)}
                            required
                            value={peopleNumber}
                        />

                    </div>
                    <button className={scss.button} >
                        <p className={scss.text}>Send now</p>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FeedBack;
