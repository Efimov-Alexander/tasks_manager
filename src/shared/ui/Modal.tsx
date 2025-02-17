import React from "react";

import s from "./Modal.module.scss";

interface IProps {
  children: React.ReactNode,

  onClose?: () => void,
}

export const Modal = ({ onClose, children }: IProps) => {
  return <>
    <div onClick={onClose} className={s.modal__darkBackground}/>
    <div className={s.modal__wrapper}>
      {children}
    </div>
  </>
}