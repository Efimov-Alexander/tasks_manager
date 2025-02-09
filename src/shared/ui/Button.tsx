import React from "react";

import s from './Button.module.scss'
import {Link} from "react-router-dom";

interface IProps {
  children: string,
  className?: string,
  onClick?: React.MouseEventHandler<HTMLButtonElement>,
  isRouterLink?: boolean
  url?: string
}

export const Button = ({ children, className, onClick, isRouterLink = false, url = '' }: IProps) => {
  return <>
    { isRouterLink ?
      <Link className={`${s.button} ${className}`} to={url}>{children}</Link>
      :
      <button onClick={onClick} className={`${s.button} ${className}`}>{children}</button>
    }
  </>
}