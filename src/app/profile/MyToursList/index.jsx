"use client"
import React, { useEffect, useState } from "react";
import Bookedcard from "./BookedCard";


function MyTourList({ bookedList }) {


    const [myBookList, setMyBookList] = useState([])

    useEffect(() => {

        if (bookedList?.length > 0) {
            let temp = bookedList?.filter((el) => el?.user?.id == localStorage.getItem("key"))
            setMyBookList(temp)
        }else if(bookedList == 0) {
            //do something
        }


    }, [bookedList])


    console.log(myBookList);


    if(bookedList) 
    return (

        <>
        <h1>Your Booked tours</h1>
        <section style={{display:"grid" , gridTemplateColumns:"1fr 1fr 1fr", gap:"5px"}}>
            {
                myBookList.map((el , i) => (
                    <Bookedcard tour={el.tour} amount={el.amount} key={`${el.id }`}/>
                ))
            }
        </section>

        </>
    )
    else {
        return (
            <section>
                hello world
            </section>
        )
    }
}

export default MyTourList;