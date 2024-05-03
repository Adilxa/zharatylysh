"use client"
import React from 'react'
import { useSearchParams } from "next/navigation";

import scss from "../SelectTour.module.scss"



function SelectFilter({ onClickFilterCriterias }) {

    const searchParams = useSearchParams();

    const pathname = searchParams.get("tour");

    const links = [
        { id: 0, title: "All Tours", to: "/" },
        { id: 1, title: "Most Popular", to: "?tour=mostpopular" },
        { id: 2, title: "Most Viewed", to: "?tour=mostviewed" },
        // { id: 3, title: "Most Liked", to: "mostliked" },
        // { id: 4, title: "Most Shared", to: "mostshared" },
        { id: 5, title: "Most Commented", to: "?tour=mostcommented" },
    ]


    return (
        <div className={scss.filterWrap}>
            {
                links.map((el) => (
                    <button key={el.id} className={`${scss.btn} ${"?tour=" + pathname == `${el.to}` ? scss.active : ""}`}
                        onClick={() => onClickFilterCriterias(el.to)}>{el.title}</button>
                ))
            }
        </div>
    )
}

export default SelectFilter