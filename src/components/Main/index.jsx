"use client"
import React from 'react'
import scss from './Main.module.scss'
import Header from "@/components/Header";

function Main() {

    return (
        <div className={scss.main}>

            <div className={scss.container}>
                <button>Create your tour</button>
                <button>Watch video</button>
                <button>Find tours</button>

            </div>
        </div>
    )
}

export default Main