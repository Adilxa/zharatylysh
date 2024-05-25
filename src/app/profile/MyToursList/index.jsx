"use client"
import React, { useEffect, useState } from "react";
import Bookedcard from "./BookedCard";
import { useParams } from "next/navigation";

function MyTourList({ bookedList }) {

    console.log(bookedList);

    const [myBookList, setMyBookList] = useState([])

    const params = useParams()

    useEffect(() => {

        if (bookedList?.length > 0) {
            let temp = bookedList?.filter((el) => el?.user?.id == localStorage.getItem("key"))
            setMyBookList(temp)
        } else if (bookedList == 0) {
            //do something
        }


    }, [params , bookedList])


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
                <section style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "5px" , justifyContent:"space-evenly" }}>
                    {
                        myBookList.map((el, i) => (
                            <Bookedcard tour={el.tour} amount={el.amount} key={`${el.id}`} />
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