import { ChangeEvent, FC } from "react";
import { RxAvatar } from "react-icons/rx";
import styles from './ChangeAvatar.module.css';
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { userSlice } from "../../../../redux/reducers/userSlice";

export const ChangeAvatar: FC = () => {

    const dispatch = useAppDispatch();

    const { users } = useAppSelector(state => state.userReducer);
    const { loadAvatar } = userSlice.actions;

    const user = users.find(u => u.isAuth);

    const avatarInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        
        if(!user) return;
        if(!e.target.files) return;

        dispatch(loadAvatar({ user, avatar: URL.createObjectURL(e.target.files[0]) }));

        console.log(user.avatar);
    }

    return <div className={styles.changeAvatar}>
        <h1>Сменить аватар</h1>
        <div className={styles.avatar}>
            { user?.avatar 
                ? <img src={user.avatar} alt="" />
                : <RxAvatar size={120} /> }
        </div>
        <div className={styles.input}>
            <label className={styles.upload}>
                <input onChange={avatarInputChange} type="file" />
                Выберите файл
            </label>
        </div>
    </div>
}