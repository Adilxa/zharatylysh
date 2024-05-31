"use client"
import React, { useState, useEffect } from "react";
import scss from "./SelectTour.module.scss";
import SelectFilter from "./filter";
import TourSlider from "../TourSlider";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import $api from "@/api/http";
import Preloader from "../Preloader";

const SelectTour = () => {

    const searchParams = useSearchParams();

    const params = searchParams.get("tour");

    const router = useRouter()

    const [tours, setTours] = useState([]);
    const [initialTours, setInitialTours] = useState([])
    const [isLoading, setLoading] = useState(false)

    const getTours = async () => {
        setLoading(true)
        $api.get("/tour").then((res) => {
            setTours(res.data?.filter((el) => el.isApprove == true))
            setInitialTours(res.data)
            setLoading(false)
        })
            .catch(() => {
                alert("Something went wrong");
                setLoading(false)
            })
    }

    const onClickFilterCriterias = (filter) => {

        if (filter !== "/") {
            router.replace(filter, { scroll: false })
            const newArr = tours.filter((el) => el.review.length >= 1)
            setTours(newArr)}

        else {
            router.replace("/", { scroll: false })
            setTours(initialTours)
        }
    }


    useEffect(() => {
        getTours()
    }, []);


    if (isLoading) return <Preloader />
    return (

        <section className={`${scss.container} container`}>
            <div className={scss.wrapper}>
                <h1>Select Tour</h1>
                <SelectFilter onClickFilterCriterias={onClickFilterCriterias} />
            </div>
            <TourSlider tours={tours} />
        </section>

    );
};

export default SelectTour;