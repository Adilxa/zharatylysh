"use client"
import React from 'react'
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

import scss from "../SelectTour.module.scss"



function SelectFilter() {

    const router = useRouter();

    const searchParams = useSearchParams();

    const pathname = searchParams.get("tour");

    const links = [
        { id: 1, title: "Most Popular", to: "mostpopular" },
        { id: 2, title: "Most Viewed", to: "mostviewed" },
        { id: 3, title: "Most Liked", to: "mostliked" },
        { id: 4, title: "Most Shared", to: "mostshared" },
        { id: 5, title: "Most Commented", to: "mostcommented" },
    ]

    const handleClickBtn = (to) => {
        router.replace(`?tour=${to}`, { scroll: false });
    }

    return (
        <div className={scss.filterWrap}>
            {
                links.map((el) => (
                    <button key={el.id} className={`${scss.btn} ${pathname == `${el.to}` ? scss.active : ""}`}
                        onClick={() => handleClickBtn(el.to)}>{el.title}</button>
                ))
            }
        </div>
    )
}

export default SelectFilter