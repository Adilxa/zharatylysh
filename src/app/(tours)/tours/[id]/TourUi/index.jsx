"use client"
import React, { useEffect, useState } from 'react'
import scss from "./Tour.module.scss"
import { useParams } from 'next/navigation'
import $api from '@/api/http';
import Image from 'next/image';
import Preloader from '@/components/Preloader';

function TourUi() {

    const params = useParams();

    const [tour, setTour] = useState(null)
    const [isLoading, setLoading] = useState(false)

    console.log(params.id);

    const getTour = async () => {
        setLoading(true)
        await $api.get("tour/" + params.id)
            .then((res) => {
                setTour(res.data);
                setLoading(false)
            })
            .catch(() => {
                alert("Something went wrong")
                setLoading(false)
            })
    }


    useEffect(() => {
        getTour()
    }, [])


    console.log(tour);


    if (isLoading) return <Preloader />
    return (
        <>
            <div style={{ backgroundImage: `url(${tour?.img})` }} className={scss.main}>
                <h1 className={scss.title}>{tour?.title}</h1>
                <div className={scss.container}>
                    <button>Create your tour</button>
                    <button>Watch video</button>
                    <button>Find tours</button>
                </div>
            </div>
            <section className='container'>
                
            </section>
        </>
    )
}

export default TourUi