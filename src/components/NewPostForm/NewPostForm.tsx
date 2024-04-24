import { ChangeEvent, FC, useState } from "react";
import styles from './NewPostForm.module.css';
import { BlackTextArea } from "../UI/BlackTextArea/BlackTextArea";
import { BlackInput } from "../UI/BlackInput/BlackInput";
import { BlackButton } from "../UI/BlackButton/BlackButton";
import { useField } from "../../hooks/fields";

export const NewPostForm: FC = () => {
    
    const maxLength = {
        title: 60,
        text: 950
    }

    const [title, titleChange] = useField();
    const [text, textChange] = useField();

    return <form className={styles.form}>
        <div className={styles.newPostInput}>
            <BlackInput maxLength={maxLength.title} 
                        onChange={titleChange} 
                        value={title} 
                        style={{width: 300, paddingRight: 52, boxSizing: 'border-box'}} placeholder="Название поста" />
            <span className={styles.inCount}>{ title.length + '/' + maxLength.title }</span>
        </div>
        <div className={styles.newPostArea}>
            <BlackTextArea maxLength={maxLength.text}
                           onChange={textChange} 
                           value={text} 
                           style={{width: 300, paddingRight: 64, boxSizing: 'border-box'}} placeholder="Текст поста" />
            <span className={styles.areaCount}>{ text.length + '/' + maxLength.text }</span>
        </div>
        <div style={{alignSelf: 'flex-end'}}>
            <BlackButton style={{width: 150}}>Отправить</BlackButton>
        </div>
    </form>
}