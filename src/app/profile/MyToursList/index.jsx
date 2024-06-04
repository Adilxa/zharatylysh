"use client"
import React, { useEffect, useState } from "react";
import Bookedcard from "./BookedCard";
import { useParams } from "next/navigation";
import $api from "@/api/http";

function MyTourList() {

    const [myBookList, setMyBookList] = useState([])


    const getBookedTour = async () => {
        try {
            const res = await $api.get("/booked-tour")
            setMyBookList(res?.data)
            return res?.data
        } catch (e) {
            return e
        }
    }


    useEffect(() => {

        getBookedTour()

        if (myBookList?.length > 0) {
            setMyBookList(
                myBookList?.filter((el) => el?.user?.id == localStorage.getItem("key"))
            )
        } else if (myBookList == 0) {
            //do something
        }


    }, [])

    console.log(myBookList);


    if (myBookList)
        return (

            <>
                <h1
                    style={{
                        marginTop: "1rem",
                        marginBottom: "1rem",
                        gap: "1rem",
                        borderBottom: "1px solid black",
                        paddingBottom: "-5px",
                        fontSize: "1.5rem"
                    }}
                >Your Booked tours</h1>
                <section style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "5px", justifyContent: "space-evenly" }}>
                    {
                        myBookList.map((el, i) => (
                            <Bookedcard tour={el.tour} amount={el.amount} id={el.id} key={`${el.id}`} />
                        ))
                    }
                </section>

            </>
        )
    else {
        return (
            <section>

            </section>
        )
    }
}

export default MyTourList;