import { FC, InputHTMLAttributes } from "react";
import styles from './LogInput.module.css';

interface LogInputProps extends InputHTMLAttributes<HTMLInputElement> {

}

export const LogInput: FC<LogInputProps> = ({ ...props }) => {
    return <input { ...props } className={styles.input} />
}