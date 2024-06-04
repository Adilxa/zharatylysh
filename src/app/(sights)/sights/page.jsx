import React from 'react'
import scss from "./sights.module.scss";
import AllSights from '@/components/AllSights';
import Link from 'next/link';

function Sights() {
    return (
        <>

            <div className={scss.main}>
                <h1 className={scss.title}>Sights</h1>
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
            <AllSights />

        </>
    )
}

export default Sights