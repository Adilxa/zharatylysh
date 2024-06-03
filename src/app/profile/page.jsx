import React from "react";
import scss from "./UserSettings.module.scss";
import SettingsForm from "./SettingsForm";
import MyTourList from "./MyToursList";
import $api from "@/api/http";

async function getMyBooked() {
    try {
        const res = await $api.get(`/booked-tour`)
        return res.data
    } catch (e) {
        return 0
    }
}



async function Profile() {

    const bookedList = await getMyBooked()

    return (

        <>
            <section className={`${scss.wrapper} container`}>
                <SettingsForm />
            </section>
            <section className="container">
                <MyTourList bookedList={bookedList} {...bookedList} />
            </section>


        </>

    )
}

export default Profile