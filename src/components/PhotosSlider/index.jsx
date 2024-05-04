"use client"
import Image from "next/image";
import React, { FC, useMemo } from "react";
import Slider from "react-slick";
import scss from "./PhotosSlider.module.scss";
import { PhotoProvider } from "react-photo-view";
import PhotoItem from "./PhotoItem";
import 'react-photo-view/dist/react-photo-view.css';

const SampleNextArrow = ({ onClick }) => (
    <div className={scss.nextArrow_container} onClick={onClick}>
        <Image src="/arrowSlider.svg" alt="NextArrow" width={6} height={12} />
    </div>
);

const SamplePrevArrow = ({ onClick }) => (
    <div className={scss.prevArrow_container} onClick={onClick}>
        <Image src="/arrowSlider.svg" alt="PrevArrow" width={6} height={12} />
    </div>
);
const PhotosSlider = ({ photos }) => {

    const next = () => {
        SampleNextArrow;
    };

    const previous = () => {
        SamplePrevArrow
    };

    const settings = {
        className: "center",
        dots: false,
        arrows: true,
        infinite: false,
        slidesToShow: 3,
        slidesToScroll: 1,
        speed: 500,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    dots: true
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
        nextArrow: <SampleNextArrow onClick={next} />,
        prevArrow: <SamplePrevArrow onClick={previous} />,
        dotsClass: `slick-dots dots`,
    };

    const renderPhotoesItems = useMemo(
        () =>
            photos?.map((item) => (
                <PhotoItem image={item} key={item} />
            )),
        [photos]
    );

    return (
        <div className={scss.photoesMain}>
            <div className="container">
                {/* <Divider title="Pictures" /> */}
                <div className="mainSliders">
                    <PhotoProvider>
                        <Slider {...settings}>
                            {renderPhotoesItems}
                        </Slider>
                    </PhotoProvider>
                </div>
            </div>
        </div>
    );
};

export default PhotosSlider;