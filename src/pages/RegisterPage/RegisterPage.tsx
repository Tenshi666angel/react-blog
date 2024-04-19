import { ChangeEvent, FC, SyntheticEvent, useEffect, useState } from "react";
import styles from './RegisterPage.module.css';
import { RxAvatar } from "react-icons/rx";
import { LogInput } from "../../components/UI/LogInput/LogInput";
import { LogButton } from "../../components/UI/LogButton/LogButton";
import { Link, useNavigate } from "react-router-dom";
import { routes } from "../../utils/routes";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { userSlice } from "../../redux/reducers/userSlice";
import uuid from "react-uuid";

type RegisterFormData = {
    username: string;
    password: string;
    passwordConfirm: string;
}

export const RegisterPage: FC = () => {

    const [registerData, setRegisterData] = useState<RegisterFormData>({
        username: '', password: '', passwordConfirm: ''
    });

    const [emptyFields, setEmptyFields] = useState<boolean>(false);
    const [noMatchPasswords, setNoMatchPasswords] = useState<boolean>(false);
    const [badUsername, setBadUsername] = useState<boolean>(false);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { unAuthorizeAll, createUser } = userSlice.actions;
    const { users } = useAppSelector(state => state.userReducer);

    useEffect(() => {
        unAuthorizeAll();
    }, []);

    const formSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        const user = users.find(u => u.name === registerData.username);

        if(registerData.username === '' || registerData.password === '' || registerData.passwordConfirm === '') {
            setBadUsername(false);
            setNoMatchPasswords(false);
            setEmptyFields(true);
            return;
        }

        if(registerData.password !== registerData.passwordConfirm) {
            setBadUsername(false);
            setEmptyFields(false);
            setNoMatchPasswords(true);
            return;
        }

        if(user) {
            setNoMatchPasswords(false);
            setEmptyFields(false);
            setBadUsername(true);
            return;
        }

        dispatch(createUser({
            id: uuid(),
            name: registerData.username,
            password: registerData.password,
            isAuth: true
        }));

        navigate(routes.feed);
    }

    const usernameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setRegisterData({ ...registerData, username: e.target.value });
    }

    const passwordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setRegisterData({ ...registerData, password: e.target.value });
    }

    const passwordConfirmChange = (e: ChangeEvent<HTMLInputElement>) => {
        setRegisterData({ ...registerData, passwordConfirm: e.target.value });
    }
    
    return <div className={styles.wrapper}>
        <div className={styles.container}>
            <div className={styles.avatar}>
                <RxAvatar size={65} />
            </div>
            <form onSubmit={formSubmit} className={styles.form}>
                <h1>Register</h1>
                <LogInput onChange={usernameChange} value={registerData.username} placeholder="username" />
                <LogInput onChange={passwordChange} value={registerData.password} placeholder="password" type="password" />
                <LogInput onChange={passwordConfirmChange} value={registerData.passwordConfirm} placeholder="password confirm" type="password" />
                <LogButton>Register</LogButton>
                { emptyFields && <span>Заполните все поля</span> }
                { noMatchPasswords && <span>Пароли не совпадают</span> }
                { badUsername && <span>Имя пользователя занято</span> }
            </form>
            <div className={styles.log}>
                <span>Уже есть аккаунт?</span>
                <Link to={routes.login} className={styles.logLink}>Войти</Link>
            </div>
        </div>
    </div>
}