import React from "react";
import scss from "./SelectTour.module.scss";
import SelectFilter from "./filter";
import TourSlider from "../TourSlider";

const SelectTour = () => {



    return (

        <section className={`${scss.container} container`}>
            <div className={scss.wrapper}>
                <h1>Select Tour</h1>
                <SelectFilter />
            </div>
            <TourSlider />
        </section>

    );
};

export default SelectTour;