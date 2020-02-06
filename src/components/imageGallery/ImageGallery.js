import React from 'react'
import css from "./../../style.module.css"
import ImageGalleryItem from './imageGalleryItem/ImageGalleryItem'
const uuidv1 = require('uuid/v1');
const ImageGallery = (props) => {
return(
    <>
        <ul className={css.ImageGallery}>
     { props.searchImage.map(el=>  <ImageGalleryItem el={el} key={uuidv1()} openModal={props.openModal}/>) }
</ul>
    </>
)

}
    


export default ImageGallery;