"use client"
import React, { useEffect } from "react";
import SelectTour from "@/components/SelectTour";
import Main from "@/components/Main";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";


function HomePage() {

    const { checkAuth } = useAuth();

    useEffect(() => {
        checkAuth()
    }, [])

    return (
        <>
            <Main />
            <SelectTour />
        </>
    );
}

export default HomePage;