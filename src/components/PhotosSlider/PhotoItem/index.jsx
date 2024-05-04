import React from 'react'
import {  PhotoView } from "react-photo-view";
import scss from "./PhotoItem.module.scss";


function PhotoItem({ image }) {
    return (
        <PhotoView src={image}>
            <div className={scss.photoesItemsMain}>
                <img src={image} alt="image" height={280} />
            </div>
        </PhotoView>
    )
}

export default PhotoItem