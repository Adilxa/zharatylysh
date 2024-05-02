"use client"
import React, { useState } from 'react';
import scss from "./TourFiltering.module.scss";
import useTours from "../../hooks/useTours"
import { useEffect } from 'react';
import Preloader from '../Preloader';
import { useRouter, useSearchParams } from 'next/navigation';


function TourFIltering() {
    const router = useRouter()
    const { tours, getTours, criteries, isLoading, getByCriteries, filteredTours, setFilteredTours } = useTours()
    const [search, setSearch] = useState('');

    useEffect(() => {
        getTours()
    }, [])

    useEffect(() => {
        getByCriteries(search)
    }, [search])

    const onClickToFilter = async (el) => {
        router.replace("tours?filter=" + el, { scroll: false });
        setSearch(el);
    }

    if (isLoading) return <Preloader />
    return (
        <div>
            <h1 className={scss.title}>Filters</h1>
            <section className={scss.wrapper}>
                <div className={scss.filter}>
                    <div onClick={() => setFilteredTours(null)}>all</div>
                    {criteries.map((el, i) => (
                        <div onClick={() => onClickToFilter(el)} key={el + i}>{el}</div>
                    ))}
                </div>
                <div className={scss.tours}>
                    {filteredTours ? <div>
                        {filteredTours?.map((el) => <div key={el.title}>{el.title}</div>)}
                    </div> : <div>{tours?.map((el) => <div key={el.title}>{el.title}</div>)}</div>}
                </div>
            </section>
        </div>

    )
}

export default TourFIltering