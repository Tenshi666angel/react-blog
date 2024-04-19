import React, { ButtonHTMLAttributes, FC } from "react";
import styles from './LogButton.module.css';

interface LogButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children?: React.ReactNode
}

export const LogButton: FC<LogButtonProps> = ({ children, ...props }) => {
    return <button { ...props } className={styles.button}>{ children }</button>
}