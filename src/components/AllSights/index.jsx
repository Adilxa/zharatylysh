"use client"
import React, { useEffect, useState } from 'react';
import scss from './AllSights.module.scss';
import $api from '@/api/http';
import Preloader from '../Preloader';
import SightCard from './SightCard';

function AllSights() {
    const [sights, setSights] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [limit, setLimit] = useState(3);

    const getSights = async () => {
        setLoading(true);
        try {
            const res = await $api.get("sights");
            setSights(res.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching sights:", error);
            alert("Something went wrong");
            setLoading(false);
        }
    };

    const showMoreSights = () => {
        setLimit(prevLimit => prevLimit + 3);
    };

    useEffect(() => {
        getSights();
    }, []);

    const renderCards = sights.slice(0, limit).map((item, index) => (
        <SightCard key={index} {...item} />
    ));

    if (isLoading) return <Preloader />;

    return (
        <section className={scss.sights}>
            <div className="container">
                <div className={scss.cards}>{renderCards}</div>
                <button className={limit >= sights.length ? scss.nonAcbutton : scss.button} onClick={showMoreSights}>
                    <p>Show More</p>
                </button>
            </div>
        </section>
    );
}

export default AllSights;
