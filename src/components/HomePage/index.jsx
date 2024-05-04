"use client"
import React, { useEffect } from "react";
import SelectTour from "@/components/SelectTour";
import Main from "@/components/Main";
import useAuth from "@/hooks/useAuth";
import Header from "../Header";
import SelectSights from "../SelectSights";
import FeedBack from "../FeedBack";


function HomePage() {

    return (
        <>
            <Main />
            <SelectTour />
            <SelectSights />
            <FeedBack />
        </>
    );
}

export default HomePage;