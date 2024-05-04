"use client"
import React, { useEffect, useState } from 'react'
import scss from "./Tour.module.scss"
import { useParams } from 'next/navigation'
import $api from '@/api/http';
import Image from 'next/image';
import Preloader from '@/components/Preloader';
import SightsSlider from '@/components/SightsSlider';

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
            <section className='container' style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <div className={scss.divider}> <h1>Tours / {tour?.location}</h1></div>
                <section className={scss.moreAboutTour}>
                    <div>
                        <h5>Start / End days</h5>
                        <p>{tour?.startDate} <br />{tour?.endDate}</p>

                    </div>
                    <div>
                        <h5>Location</h5>
                        <p>
                            {tour?.location}
                        </p>
                    </div>
                    <div>
                        <h5>Price</h5>
                        <p>
                            {tour?.price}c
                        </p>
                    </div>
                </section>
            </section>
            <div className={scss.tourDescription}>
                <div className='container'>
                    <div className={scss.DescDivider}> <h1>About Tour</h1></div>
                    <p>{tour?.description}</p>
                </div>
            </div>
            <div className={scss.sights}>
                <div className={`${scss.divider} container`}>
                    <h1>
                        Sights visited on this tour
                    </h1>
                </div>
                <SightsSlider sights={tour?.sights} />

            </div>
        </>
    )
}

export default TourUi