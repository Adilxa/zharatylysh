"use client"
import React, { useState } from 'react';
import scss from "./TourFiltering.module.scss";
import { useEffect } from 'react';
import Preloader from '../Preloader';
import { useRouter, useSearchParams } from 'next/navigation';
import $api from '@/api/http';
import TourCard from './TourCard';


function TourFIltering() {

    const [tours, setTours] = useState([])
    const [criterias, setCriterias] = useState([])
    const [isLoading, setLoading] = useState(false)

    const router = useRouter()
    const searchParams = useSearchParams();
    const search = searchParams.get("filter")


    const getTours = async () => {
        setLoading(true)
        await $api.get("/tour")
            .then((res) => {
                setTours(res.data)
                const arrCriterias = res.data.map((el) => el["location"])

                setCriterias([...new Set(arrCriterias)])
                setLoading(false)
            })
            .catch((e) => {
                alert("somethin went wrong");
                router.push("/")
            })
    }


    const onClickCriteria = (criterial) => {
        router.replace("tours?filter=" + criterial, { scroll: false })
    }

    const showAllCriteria = () => {
        router.replace("tours", { scroll: false })
    }

    useEffect(() => {
        getTours()
    }, [])

    console.log(search);

    if (isLoading) return <Preloader />
    return (
        <div>
            <h1 className={scss.title}>Filters</h1>
            <section className={scss.wrapper}>
                <div className={scss.filter}>
                    <p className={search == null ? scss.active_title : scss.inactive_title} onClick={() => showAllCriteria()}>All</p>
                    {criterias?.map((el, i) => (
                        <>
                            <p
                                className={search == el ? scss.active_title : scss.inactive_title}
                                key={el.id}
                                onClick={() => {
                                    onClickCriteria(el)
                                }}
                            >
                                {el}
                            </p>
                        </>
                    ))}
                </div>
                <div className={scss.tours}>
                    {!search && tours?.map((el) => <TourCard key={el.title} {...el} />)}
                    {search &&
                        tours?.filter((el) => el.location == search).map((el) => <TourCard key={el.title} {...el} />)
                    }
                </div>
            </section >
        </div >

    )
}

export default TourFIltering