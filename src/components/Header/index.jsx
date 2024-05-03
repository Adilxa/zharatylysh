"use client"
import React, { useEffect, useState, useCallback } from "react";
import scss from "./Header.module.scss";
import Link from "next/link";
import { HeaderLinks } from "../../constants/HeaderConsts";
import { useRouter } from "next/navigation";
import Image from "next/image";
import menu from '../../public/assets/svg/menu.svg';
import close from '../../public/assets/svg/close.svg';
import useUser from "@/hooks/useUser";
import useAuth from "@/hooks/useAuth";
import { usePathname } from "next/navigation";

const Header = ({ isMain = false }) => {
    const [isActive, setActive] = useState(false);
    const [open, setOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [user, setUser] = useState(null)

    const pathname = usePathname()

    const router = useRouter();
    const currentRoute = router.pathname;

    const { getMe, isLoading } = useUser();
    const { LogOut } = useAuth()

    const getUser = useCallback(async () => {
        setOpenModal(false)
        const res = await getMe();
        setUser(res)
    }, [isLoading])


    useEffect(() => {
        getUser();
    }, [pathname]);


    const handleScroll = useCallback(() => {
        if (window.scrollY > 50) {
            setActive(true);
        } else {
            setActive(false);
        }
    }, []);


    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);


    useEffect(() => {
        if (openModal) {
            document.body.style.height = '100vh';
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.height = 'auto';
            document.body.style.overflow = 'visible';
        }
    }, [openModal]);

    const click = () => setOpen(!open)

    const renderLinks = React.useMemo(
        () =>

            HeaderLinks.map((item) => (
                <Link
                    className={pathname == `/${item.link}` ? scss.activeLink : ""}
                    href={'/' + item.link}
                    key={item.id}
                >
                    {item.title}
                </Link>
            ))
        ,
        [pathname]
    );

    let HeaderStyles = isActive ? scss.active : scss.nonActive;

    if (!isMain) {
        HeaderStyles = isActive ? scss.renderActive : scss.renderNonActive;
    }

    return (
        <header id="header" className={HeaderStyles} style={{ paddingTop: "10px", paddingBottom: "10px" }}>
            <Link href="/">
                <h1 style={{ color: "#000" }}>Zharatylush</h1>
            </Link>
            <nav>{renderLinks}</nav>
            <div style={{ display: "flex", alignItems: "end", gap: "15px", fontSize: "15px" }}>
                <div className={scss.hideEmail}>
                    {user ? <Link href="/profile">{user.email}</Link> :
                        <div style={{ display: "flex", alignItems: "end", gap: "15px", fontSize: "15px" }}><Link href="/signup">Sign Up
                        </Link><Link href="/signin">Sign in</Link>
                        </div>}
                </div>
            </div>
            <div className={scss.dynamic_burger}>
                <div className={scss.menu_burger}>
                    <div onClick={click}>
                        <Image src={menu} alt={"burger_menu"} className={scss.menuBurger} onClick={() => setOpenModal(true)} />
                    </div>
                </div>
                <div className={!openModal ? scss.backNon : scss.back} onClick={() => setOpenModal(false)}>
                    <div className={`${openModal == true ? scss.modal : ""} ${openModal == false ? scss.modalNon : ""}`}
                        onClick={(e) => {
                            e.stopPropagation();
                        }}>
                        <div className={scss.burger_menu}>
                            <div className={scss.menuX}>
                                <Image src={close} alt={'close'} className={scss.menuBurger} onClick={() => setOpenModal(false)} />
                            </div>
                            <div className={scss.titleLink}>
                                <div className={scss.pagesMain}>
                                    {user ? <Link href="/profile">{user.email}</Link> :
                                        <div style={{ display: "flex", flexDirection: "column", fontSize: "14px", paddingLeft: "8px" }}><Link href="/signup">Sign Up
                                        </Link>
                                            <hr className={scss.border} />
                                            <Link href="/signin">Sign in</Link>
                                        </div>}
                                    <hr className={scss.border} />
                                    <Link href="/tours"><p>Tours</p></Link>
                                    <hr className={scss.border} />
                                    <Link href="/sights"><p>Sights</p></Link>
                                    <hr className={scss.border} />
                                    <Link href="/travel"><p>Travel stories</p></Link>
                                    <hr className={scss.border} />
                                    {
                                        user && <>
                                            <button onClick={() => { LogOut(); setOpenModal(false) }}>Logout</button>
                                            <hr className={scss.border} /></>
                                    }
                                </div>
                            </div>

                            <div className={scss.btnCreate}>
                                <p>Connect</p>
                            </div>
                            <div className={scss.dark_menu}>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header >
    );
};

export default Header;