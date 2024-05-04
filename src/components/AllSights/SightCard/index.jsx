import React from "react";
import scss from "./SightCard.module.scss";
import Link from "next/link";

const SightCard = ({
    img,
    title,
    tour,
    id
}) => {

    return (
        <div className={scss.card}>
            <Link href={`sights/${id}`}>
                <div className={scss.front}>
                    {/* eslint-disable-next-line no-use-before-define */}
                    <img src={img} alt="image" />
                    <div className={scss.btm}>
                        <p>{title}</p>
                    </div>
                </div>
            </Link>
        </div >

    );
};

export default SightCard;