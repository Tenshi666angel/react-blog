import { ChangeEvent, FC, SyntheticEvent, useEffect, useState } from "react";
import styles from './LoginPage.module.css';
import { LogInput } from "../../components/UI/LogInput/LogInput";
import { LogButton } from "../../components/UI/LogButton/LogButton";
import { RxAvatar } from "react-icons/rx";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { Link, useNavigate } from "react-router-dom";
import { routes } from "../../utils/routes";
import { userSlice } from '../../redux/reducers/userSlice';
import { useField } from "../../hooks/fields";

export const LoginPage: FC = () => {

    const [username, usernameChange] = useField();
    const [password, passwordChange] = useField();

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

        if(username === '' || password === '') {
            setInvalidData(false);
            setEmptyFields(true);
            return;
        }

        const user = users.find(u => u.name === username &&
                                     u.password === password);

        if(!user) {
            setEmptyFields(false);
            setInvalidData(true);
            return;
        }

        dispatch(setUserAuth(user));
        navigate(routes.feed);
    }

    return <div className={styles.wrapper}>
        <div className={styles.container}>
            <div className={styles.avatar}>
                <RxAvatar size={65} />
            </div>
            <form onSubmit={formSubmit} className={styles.form}>
                <h1>Log in</h1>
                <LogInput onChange={usernameChange} value={username} placeholder="username" />
                <LogInput onChange={passwordChange} value={password} type="password" placeholder="password" />
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