"use client"
// BookedCard.jsx
import React, { useState } from "react";
import scss from "./BookedCard.module.scss";
import Link from "next/link";

function BookedCard({ tour, amount, id }) {

  return (
    <div className={scss.card}>
      {amount > 1 && <div className={scss.amountBadge}>{amount}</div>}
      <img src={tour.img} alt={tour.title} className={scss.cardImage} />
      <div className={scss.cardContent}>
        <h2 className={scss.cardTitle}>{tour.title}</h2>
        <p className={scss.cardDescription}>{tour.description.substring(0, 20) + "..."}</p>
        <p className={scss.cardInfo}><strong>Location:</strong> {tour.location}</p>
        <p className={scss.cardInfo}><strong>Start Date:</strong> {tour.startDate}</p>
        <p className={scss.cardInfo}><strong>End Date:</strong> {tour.endDate}</p>
        <p className={scss.cardInfo}><strong>Price:</strong> {tour.price}c</p>
      </div>
    </div>
  );
}

export default BookedCard;


//here is doing you know