import { FC, InputHTMLAttributes } from "react";
import styles from './BlackInput.module.css';

interface BlackInputProps extends InputHTMLAttributes<HTMLInputElement> {

}

export const BlackInput: FC<BlackInputProps> = ({ ...props }) => {
    return <input { ...props } className={styles.input}  />
}