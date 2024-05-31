"use client"
import React, { useEffect, useState } from "react";
import Bookedcard from "./BookedCard";
import { useParams } from "next/navigation";

function MyTourList({ bookedList }) {


    const [myBookList, setMyBookList] = useState([])

    const params = useParams()

    useEffect(() => {

        if (bookedList?.length > 0) {
            setMyBookList(
                bookedList?.filter((el) => el?.user?.id == localStorage.getItem("key"))
            )
        } else if (bookedList == 0) {
            //do something
        }


    }, [params, bookedList])

console.log(myBookList);


    if (bookedList)
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