"use client"
import React from 'react'
import scss from "./Sight.module.scss";
import Preloader from '@/components/Preloader';
import PhotosSlider from '@/components/PhotosSlider';
import FeedBack from '@/components/FeedBack';
import Link from 'next/link';

function SightUi({ sight }) {

    if (!sight) return <Preloader />
    return (
        <>
            <div className={scss.main} style={{ backgroundImage: `url(${sight.img})` }}>
                <h1 className={scss.title}>{sight.title}</h1>
                <div className={scss.container}>
                    <button>
                        <a href="https://www.youtube.com/watch?v=Ywax-BGPJRw" target='_blank' rel='noreferrer'
                            style={{ display: "block", width: "100%", textAlign: "center" }}>Watch video</a>
                    </button>
                    <button>
                        <Link href="/tours" style={{ display: "block", width: "100%", textAlign: "center" }}>Find tours</Link>
                    </button>
                </div>
            </div>
            <section className='container' style={{ display: "flex", flexDirection: "column", gap: "20px", position: "relative" }}>
                <div className={scss.divider}> <h1>Tours / {sight?.title}</h1></div>
                <div className={scss.sightDescription}>
                    <p>{sight?.description}</p>

                </div>

                <PhotosSlider photos={sight.imgList} />

            </section>
            <FeedBack />
        </>
    )
}

export default SightUi