import React from "react";
import scss from "./UserSettings.module.scss";
import SettingsForm from "./SettingsForm";

const Profile = () => {
    return (
        <section className={`${scss.wrapper} container`}>
            <SettingsForm />
        </section>
    )
}

export default Profile