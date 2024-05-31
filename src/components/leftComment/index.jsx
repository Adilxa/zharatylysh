"use client";

import $api from "@/api/http";
import React, { useState } from "react";
import styles from "./LeftComment.module.scss";
import { toast } from "react-toastify"

function LeftComment({ tourId, userId }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const notify = () => toast("Thank you!");

  const onLeftComment = async () => {
    try {
      await $api.post("review", {
        rating: rating,
        comment: comment,
        img: "",
        tourId: Number(tourId),
        userId: Number(userId)
      });
      notify()
      setRating(0);
      setComment("");
    } catch (e) {
      console.log(e);
      toast("You already reviewed!")
    }
  };

  return (
    <section className={`${styles.commentSection} container`}>
      <h2 className={styles.title}>Leave a Review</h2>
      <div className={styles.rating}>
        <label htmlFor="rating">Rating:</label>
        <input
          type="number"
          id="rating"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          min="0"
          max="5"
          className={styles.ratingInput}
        />
      </div>
      <div className={styles.comment}>
        <label htmlFor="comment">Comment:</label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows="5"
          className={styles.commentInput}
        ></textarea>
      </div>
      <button onClick={onLeftComment} className={styles.submitButton}>
        Submit
      </button>
    </section>
  );
}

export default LeftComment;
