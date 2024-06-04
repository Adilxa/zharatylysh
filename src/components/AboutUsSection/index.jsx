import React, { useMemo } from 'react'
import scss from "./AboutUs.module.scss";
import { AboutUsText } from "../../constants/AboutUs";
import Link from 'next/link';

function AboutUsSection() {

    const renderText = React.useMemo(
        () =>
            AboutUsText.map((item) => (
                <div className={item.bold ? scss.boldParagraph : scss.paragraph} key={item.id}>
                    {item.text}
                </div>
            )),
        [AboutUsText]
    );

    return (

        <>
            <div className={scss.main}>
                <h1 className={scss.title}>About Us</h1>
                <div className={scss.container}>
                    {/* <button>Create your tour</button> */}
                    <button>
                        <a href="https://www.youtube.com/watch?v=Ywax-BGPJRw" target='_blank' rel='noreferrer'
                            style={{ display: "block", width: "100%", textAlign: "center" }}>Watch video</a>
                    </button>
                    <button>
                        <Link href="/tours" style={{ display: "block", width: "100%", textAlign: "center" }}>Find tours</Link>
                    </button>
                </div>
            </div>

            <div className={scss.title_block}>
                <div className="container">

                    <div className={scss.title}>
                        <h1>About Us</h1>
                    </div>
                    <div className={scss.text}>
                        {renderText}
                    </div>
                </div>
            </div>
        </>
    )
}

export default AboutUsSection