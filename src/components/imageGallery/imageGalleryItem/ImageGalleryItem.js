import React from 'react';
import css from "./../../../style.module.css"


const ImageGalleryItem = (props) => {
    return(
        <li className={css.ImageGalleryItem} onClick={props.openModal} >
        <img src={props.el.largeImageURL} alt={props.el.tags} className={css.ImageGalleryItem_image} onClick={props.openModal}/>
      </li>
      
    )
}

export default ImageGalleryItem;