import React from "react";
import scss from "./SightsCard.module.scss";
import Link from "next/link";

const SightsCard = ({ img, title, id }) => {
    return (
        <Link href={`/sight/${id}`}>
            <div className={scss.card}>
                <div className={scss.front}>
                    <img src={img} alt={title} width={280} height={250} />
                    <div className={scss.btm}>
                        <p>{title}</p>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default SightsCard;