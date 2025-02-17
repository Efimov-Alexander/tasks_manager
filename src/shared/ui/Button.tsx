import React from "react";
import {Link} from "react-router-dom";
import cn from "classnames";

import s from './Button.module.scss'

interface IProps {
  children: string,
  className?: string,
  onClick?: React.MouseEventHandler<HTMLButtonElement>,
  isRouterLink?: boolean,
  url?: string,
  disabled?: boolean,
}

export const Button = ({ children, className, onClick, disabled = false, isRouterLink = false, url = '' }: IProps) => {
  const classNames = cn(s.button, className, {
    [s.button__disabled]: disabled,
  })

  return <>
    { isRouterLink ?
      <Link className={`${s.button} ${className}`} to={url}>{children}</Link>
      :
      <button onClick={onClick} className={classNames}>{children}</button>
    }
  </>
}