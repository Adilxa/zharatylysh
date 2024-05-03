import React, { useMemo, useEffect, useState } from "react";
import scss from "./TourSlider.module.scss";
import SliderCard from "./SliderCard/index";
import Slider from "react-slick";
import Image from "next/image";
import { useSearchParams } from "next/navigation";



const TourSlider = ({ tours }) => {

    const searchParams = useSearchParams();

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

    const settings = {
        className: "center",
        dots: false,
        arrows: true,
        infinite: false,
        slidesToShow: 4,
        slidesToScroll: 1,
        speed: 500,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    dots: false
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    dots: false
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    dots: false
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1.5,
                    slidesToScroll: 1,
                    dots: false
                }
            },
            {
                breakpoint: 320,
                settings: {
                    slidesToShow: 1.2,
                    slidesToScroll: 1,
                    dots: false
                }
            }
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
                onClick={function () {
                    throw new Error("Function not implemented.");
                }}
            />
        ),
        dotsClass: `slick-dots dots`,
    };



    // const render = useMemo(
    //     () =>
    //         tours?.map((el, index) => <SliderCard key={index} {...el} />
    //         ),
    //     [tour]
    // );

    const renderAllTours = useMemo(
        () =>

            tours.map((el, index) => <SliderCard key={index} {...el} />)
        ,
        [tours]
    );

    return (
        <div className={scss.wrapper}>
            <div className="">
                <div className="mainSliders">
                    {
                        <Slider {...settings}>{renderAllTours}</Slider>
                    }
                </div>
            </div>
        </div>
    );
};

export default TourSlider;