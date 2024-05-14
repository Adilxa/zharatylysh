"use client"
import React, { useState } from "react";
import scss from "./FeedBack.module.scss";
import emailjs from "@emailjs/browser"

const FeedBack = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [number, setNumber] = useState("");
    const [peopleNumber, setPeopleNumber] = useState("");

    const [isSend , setSend] = useState(false)


    const onSendMessage = async() => {
       try{
        await emailjs.send(
            "service_6rn0l09",
            "template_4oz2tjc",
            {
                email:email,
                name,
                number,
                peopleNumber
            },
            "In1BeNLlqF2cqsWpL"
          ).then(() => {
            setEmail("")
            setDate("")
            setName("")
            setNumber("") 
          })
          setSend(true)
          alert("Success!");
       }catch (error){
    console.log(error);
       }
      
    }


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
                    <button onClick={() => onSendMessage()} style={{backgroundColor:isSend && "gray"}} className={scss.button} >
                        <p className={scss.text}>Send now</p>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FeedBack;
