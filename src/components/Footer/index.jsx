"use client";
import React from "react";
import scss from "./Footer.module.scss";
import Image from "next/image";
import Link from "next/link";
import { footerConsts } from "../../constants/Footer";


const Footer = () => {
    const [isActive, setActive] = React.useState(true);
    const render = React.useMemo(
        () =>
            footerConsts.map((item) => (
                <div key={item.id} className={scss.card}>
                    <h1>{item.title}</h1>
                    {item.desc && (
                        <>
                            <p className={isActive ? scss.descAc : scss.desc}>
                                {item.desc && item.desc + " " && item.desc.length > 129
                                    ? `${item.desc.substring(0, 19)}...`
                                    : item.desc}
                            </p>
                        </>
                    )}

                    {item.email && (
                        <div className={scss.second}>
                            <div>
                                <p> Email: </p>
                                {item.email && item.email}
                            </div>
                            <div>
                                <p> Phone: </p>
                                {item.hotline && item.hotline}
                            </div>
                            <div>
                                <p>Contact form:</p>
                                {item.contact && item.contact}
                            </div>
                            <div>
                                <p>Address:</p>
                                Kyrgyzstan, Bishkek city
                            </div>
                        </div>
                    )}
                    {/* <div className={scss.thirth}>
                        {item.img
                            ? item.img.map((el) => (
                                <Link target="_blank" key={el.id} href={el.link}>
                                    <Image src={el.logo} width={20} height={20} alt="logo" />
                                </Link>
                            ))
                            : ""}
                    </div> */}
                </div>
            )),
        [isActive]
    );
    return (
        <>
            <footer className={`${scss.footer} container`}>{render}</footer >
            <div className={scss.underFooter}>
                <p className={scss.rights}>@ 2024 Zharatylysh Travel. All rights reserved</p>
                <p>Created by @Adilet</p>
            </div>
        </>
    );
};

export default Footer;