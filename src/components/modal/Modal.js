import React from 'react';
import css from "./../../style.module.css"

const Modal = (props) => (
    <div className={css.Overlay} onClick={props.closeModal}>
  <div className={css.Modal}>
    <img src={props.srcImg} alt="" />
  </div>
</div>
);

export default Modal;