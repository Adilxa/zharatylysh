import $api from '@/api/http';
import React, { useState, useEffect } from 'react'
import Preloader from '../Preloader';
import SightsSlider from '../SightsSlider';
import Link from 'next/link';
import scss from "./SelectSights.module.scss"

function SelectSights() {

    const [sights, setSights] = useState([]);
    const [isLoading, setLoading] = useState(false)

    const getSights = async () => {
        setLoading(true)
        await $api.get("sights")
            .then((res) => {
                setSights(res.data)
                setLoading(false)
            })
            .catch(() => {
                alert("something went wrong")
                setLoading(false)
            })
    }

    useEffect(() => {
        getSights()
    }, [])

    if (isLoading) return <Preloader />
    return (
        <section className={`${scss.wrapper} container`}>
            <div className={scss.title}>
                <h1>Sights </h1>
                <Link href="sights">More Sights</Link>
            </div>
            <SightsSlider sights={sights} showArrows={false} />
        </section>

    )
}

export default SelectSights