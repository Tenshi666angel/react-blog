import { ChangeEvent, FC, SyntheticEvent, useEffect, useState } from "react";
import styles from './LoginPage.module.css';
import { LogInput } from "../../components/UI/LogInput/LogInput";
import { LogButton } from "../../components/UI/LogButton/LogButton";
import { RxAvatar } from "react-icons/rx";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { Link, useNavigate } from "react-router-dom";
import { routes } from "../../utils/routes";
import { userSlice } from '../../redux/reducers/userSlice';

type UserFormData = {
    username: string
    password: string
}

export const LoginPage: FC = () => {

    const [userData, setUserData] = useState<UserFormData>({ username: '', password: '' });
    const [invalidData, setInvalidData] = useState<boolean>(false);
    const [emptyFields, setEmptyFields] = useState<boolean>(false);

    const dispatch = useAppDispatch();
    
    const { users } = useAppSelector(state => state.userReducer);
    const { setUserAuth, unAuthorizeAll } = userSlice.actions;
    
    useEffect(() => {
        dispatch(unAuthorizeAll());
    }, []);

    const navigate = useNavigate();

    const formSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(userData.username === '' || userData.password === '') {
            setInvalidData(false);
            setEmptyFields(true);
            return;
        }

        const user = users.find(u => u.name === userData.username &&
                                     u.password === userData.password);

        if(!user) {
            setEmptyFields(false);
            setInvalidData(true);
            return;
        }

        dispatch(setUserAuth(user));
        navigate(routes.feed);
    }

    const usernameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUserData({ ...userData, username: e.target.value });
    }

    const passwordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUserData({ ...userData, password: e.target.value });
    }

    return <div className={styles.wrapper}>
        <div className={styles.container}>
            <div className={styles.avatar}>
                <RxAvatar size={65} />
            </div>
            <form onSubmit={formSubmit} className={styles.form}>
                <h1>Log in</h1>
                <LogInput onChange={usernameChange} value={userData.username} placeholder="username" />
                <LogInput onChange={passwordChange} value={userData.password} type="password" placeholder="password" />
                <LogButton>Log in</LogButton>
                { invalidData && <span>Неверное имя пользователя или пароль</span> }
                { emptyFields && <span>Заполните все поля</span> }
            </form>
            <div className={styles.reg}>
                <span>Нет аккаунта?</span>
                <Link to={routes.register} className={styles.regLink}>Зарегистрироваться</Link>
            </div>
        </div>
    </div>
}