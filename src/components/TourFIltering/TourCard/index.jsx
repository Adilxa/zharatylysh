import React, { useEffect } from "react";
import scss from "./TourCard.module.scss";
import Link from "next/link";

const TourCard = ({
    title,
    img,
    id,
    price,
    location,
    startDate,
    endDate
}) => {

    return (
        <Link style={{minWidth:"100%"}} href={`tours/` + id}>
            <div className={scss.card}>
                <div className={scss.days}>
                    <p className={scss.days_title}>{price}c</p>
                </div>
                <div className={scss.front}>
                    {/* eslint-disable-next-line no-use-before-define */}
                    <img
                        className={scss.img}
                        src={img}
                        alt="background-image"
                        height={280}
                        style={{ minHeight: "220px", maxHeight:"220px"  }}
                    />
                    <div className={scss.bottomContent}>
                        <div className={scss.textContainer}>
                            <p className={scss.title}>{title}</p>
                            {/* <p className={scss.subtitle}>{categories}</p> */}
                        </div>
                    </div>

                </div>
                <div className={scss.footerElement}>
                    <p>Location: {location}</p>
                    <p>Start Date: {startDate}</p>
                    <p>End Date: {endDate}</p>
                </div>
            </div>
        </Link>
    );
};

export default TourCard;