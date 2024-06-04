"use client"
import React from 'react'
import scss from './Main.module.scss'
import Header from "@/components/Header";
import Link from 'next/link';

function Main() {

    return (
        <div className={scss.main}>

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
    )
}

export default Main