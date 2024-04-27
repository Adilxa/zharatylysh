import React from "react";
import css from "./Preloader.module.scss";

const Preloader = ({ full = true }) => {
    return (
        <div className={full ? css.wrapper : css.pad}>
            <div className={css.container}>
                <svg className={css.loader} viewBox="0 0 340 340">
                    <circle
                        className={css.circle}
                        cx="170"
                        cy="170"
                        r="160"
                        stroke="#C3C3C3"
                    />
                    <circle
                        className={css.circle}
                        cx="170"
                        cy="170"
                        r="135"
                        stroke="#3B636F"
                    />
                    <circle
                        className={css.circle}
                        cx="170"
                        cy="170"
                        r="110"
                        stroke="#C3C3C3"
                    />
                    <circle
                        className={css.circle}
                        cx="170"
                        cy="170"
                        r="85"
                        stroke="#3B636F"
                    />
                </svg>
            </div>
        </div>
    );
};

export default React.memo(Preloader);