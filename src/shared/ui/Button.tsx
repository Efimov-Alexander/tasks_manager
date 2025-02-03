import s from './Button.module.scss'

interface IProps {
  children: string,
  className?: string,
}

export const Button = ({ children, className }: IProps) => {
  return <button className={`${s.button} ${className}`} >{children}</button>
}