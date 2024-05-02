import React from "react";
import scss from "./Tours.module.scss"
import TourFIltering from "@/components/TourFIltering";

const ToursPage = () => {
    return (
        <>
            <div className={scss.main}>
                <h1 className={scss.title}>Tours</h1>
                <div className={scss.container}>
                    <button>Create your tour</button>
                    <button>Watch video</button>
                    <button>Find tours</button>
                </div>
            </div>
            <section className="container">
                <TourFIltering />
            </section>
        </>
    );
};

export default ToursPage;   