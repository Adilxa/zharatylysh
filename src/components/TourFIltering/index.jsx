"use client"
import React, { useState, useEffect } from 'react';
import scss from "./TourFiltering.module.scss";
import Preloader from '../Preloader';
import { useRouter, useSearchParams } from 'next/navigation';
import $api from '@/api/http';
import TourCard from './TourCard';
import { debounce } from '@/utils/debounce';

function TourFiltering() {
    const [tours, setTours] = useState([]);
    const [criterias, setCriterias] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [price, setPrice] = useState('');

    const router = useRouter();
    const searchParams = useSearchParams();
    const search = searchParams.get("filter");

    const handlePriceChange = (newValue) => {
        if (newValue === '' || (/^\d+$/.test(newValue) && parseInt(newValue, 10) >= 0)) {
            setPrice(newValue);
        }
    };

    const handlePriceChangeDebounced = debounce(handlePriceChange, 30);

    const getTours = async () => {
        setLoading(true);
        await $api.get("/tour")
            .then((res) => {
                setTours(res.data?.filter((el) => el.isApprove == true));
                const arrCriterias = res.data.filter((el) => el.isApprove == true)?.map((el) => el["location"]);
                setCriterias([...new Set(arrCriterias)]);
                setLoading(false);
            })
            .catch((e) => {
                alert("Something went wrong");
                router.push("/");
            });
    };

    const onClickCriteria = (criterial) => {
        router.replace("tours?filter=" + criterial, { scroll: false });
    };

    const showAllCriteria = () => {
        router.replace("tours", { scroll: false });
    };

    useEffect(() => {
        getTours();
    }, []);

    const filteredTours = tours.filter(tour => {
        const matchesLocation = !search || tour.location === search;
        const matchesPrice = !price || tour.price <= parseInt(price, 10);
        return matchesLocation && matchesPrice;
    });


    if (isLoading) return <Preloader />;
    return (
        <div>
            <h1 className={scss.title}>Filters</h1>
            <section className={scss.wrapper}>
                <div className={scss.filter}>
                    <input
                        value={price}
                        onChange={(e) => handlePriceChangeDebounced(e.target.value)}
                        type="text"
                        placeholder="Filter by price"
                    />
                    <p className={search == null ? scss.active_title : scss.inactive_title} onClick={() => showAllCriteria()}>All</p>
                    {criterias?.map((el, i) => (
                        <p
                            className={search == el ? scss.active_title : scss.inactive_title}
                            key={`${el + i}`}
                            onClick={() => onClickCriteria(el)}
                        >
                            {el}
                        </p>
                    ))}
                </div>
                <div className={scss.tours} style={filteredTours.length == 0 ? { gridTemplateColumns: "1fr" } : null}>
                    {filteredTours.map((el) => <TourCard key={el.title} {...el} />)}
                    {filteredTours.length == 0 &&
                        <div style={{ minHeight: "150px", display: "grid", placeItems: "center" }}>
                            <h1 style={{ fontSize: "large", fontWeight: 600 }}>Have No tours for this price {price}c</h1>
                        </div>
                    }
                </div>
            </section>
        </div>
    );
}

export default TourFiltering;
