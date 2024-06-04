import React from "react";
import scss from "./Tours.module.scss"
import TourFIltering from "@/components/TourFIltering";
import Link from "next/link";

const ToursPage = () => {
    return (
        <>
            <div className={scss.main}>
                <h1 className={scss.title}>Tours</h1>
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
            <section className="container">
                <TourFIltering />
            </section>
        </>
    );
};

export default ToursPage;   