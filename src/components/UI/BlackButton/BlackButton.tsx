import { ButtonHTMLAttributes, FC } from "react";
import styles from './BlackButton.module.css';

interface BlackButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children?: React.ReactNode
}

export const BlackButton: FC<BlackButtonProps> = ({ children, ...props }) => {
    return <button { ...props } className={styles.button}>{ children }</button>
}