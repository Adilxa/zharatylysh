"use client"
import React, { useEffect } from "react";
import SelectTour from "@/components/SelectTour";
import Main from "@/components/Main";
import useAuth from "@/hooks/useAuth";
import Header from "../Header";


function HomePage() {

    return (
        <>
            
            <Main />
            <SelectTour />
        </>
    );
}

export default HomePage;