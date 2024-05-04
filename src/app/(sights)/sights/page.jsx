import React from 'react'
import scss from "./sights.module.scss";
import AllSights from '@/components/AllSights';

function Sights() {
    return (
        <>

            <div className={scss.main}>
                <h1 className={scss.title}>Sights</h1>
                <div className={scss.container}>
                    <button>Create your tour</button>
                    <button>Watch video</button>
                    <button>Find tours</button>
                </div>
            </div>
            <AllSights />

        </>
    )
}

export default Sights