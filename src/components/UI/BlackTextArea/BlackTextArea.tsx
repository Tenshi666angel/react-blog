import { FC, TextareaHTMLAttributes } from "react";
import styles from './BlackTextArea.module.css';

interface BlackTextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {

}

export const BlackTextArea: FC<BlackTextAreaProps> = ({ ...props }) => {
    return <textarea { ...props } className={styles.area} />
}