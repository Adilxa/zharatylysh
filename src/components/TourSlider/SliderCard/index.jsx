import React, { useEffect } from "react";
import scss from "./SliderCard.module.scss";
import Link from "next/link";

const SliderCard = ({
    title,
    img,
    id,
    price
}) => {

    return (
        <Link href={`tours/` + id}>
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
                        style={{ minHeight: "300px" , maxHeight:"300px"}}
                    />
                    <div className={scss.bottomContent}>
                        <div className={scss.textContainer}>
                            <p className={scss.title}>{title}</p>
                            {/* <p className={scss.subtitle}>{categories}</p> */}
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default SliderCard;