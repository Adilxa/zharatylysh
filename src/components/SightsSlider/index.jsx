import React from "react";
import scss from "./SightsSlider.module.scss"
import { useMemo } from "react";
import Slider from "react-slick";
import SightsCard from "./SightsCard";
import Image from "next/image";

function SampleNextArrow({ onClick }) {
    return (
        <div className={scss.nextArrow_container} onClick={onClick}>
            <Image src="/arrowSlider.svg" alt="NextArrow" width="6" height="12" />
        </div>
    );
}

function SamplePrevArrow({ onClick }) {
    return (
        <div className={scss.prevArrow_container} onClick={onClick}>
            <Image src="/arrowSlider.svg" alt="PrevArrow" width="6" height="12" />
        </div>
    );
}

const SightsSlider = ({ sights, showArrows }) => {

    const settings = {
        className: "center",
        dots: false,
        arrows: showArrows ? true : showArrows,
        infinite: false,
        slidesToShow: 4,
        slidesToScroll: 1,
        speed: 500,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    dots: false,
                    arrows: false
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    dots: false,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    dots: false,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1.5,
                    slidesToScroll: 1,
                    dots: false,
                },
            },
            {
                breakpoint: 320,
                settings: {
                    slidesToShow: 1.2,
                    slidesToScroll: 1,
                    dots: false,
                },
            },
        ],
        nextArrow: (
            <SampleNextArrow
                onClick={function () {
                    throw new Error("Function not implemented.");
                }}
            />
        ),
        prevArrow: (
            <SamplePrevArrow
                onClick={function (
                    event
                ) {
                    throw new Error("Function not implemented.");
                }}
            />
        ),
        dotsClass: `slick-dots dots`,
    };
    const renderCards = useMemo(
        () => sights?.map((el, index) => <SightsCard {...el} key={index} />),
        [sights]
    );

    return (
        <div className={scss.Toursights}>
            <div className="container" style={{ position: "relative" }}>
                {/* <Divider title="Sights visited on this tour" variant="dark" /> */}
                <div className="mainSliders">
                    {
                        <Slider {...settings}>{renderCards}</Slider>
                    }
                </div>
            </div>
        </div>
    );
};

export default SightsSlider;