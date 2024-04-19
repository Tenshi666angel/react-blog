import { FC } from "react";
import { NavBar } from "../../components/NavBar/NavBar";
import styles from './Profile.module.css';
import { RxAvatar } from "react-icons/rx";
import { useAppSelector } from "../../hooks/redux";
import { ChangeAvatar } from "./Settings/ChangeAvatar/ChangeAvatar";
import { Navigate } from "react-router-dom";
import { routes } from "../../utils/routes";

export const Profile: FC = () => {

    const { users } = useAppSelector(state => state.userReducer);

    const user = users.find(u => u.isAuth);

    return !user ? <Navigate to={routes.login} /> : <div>
        <NavBar />
        <div className={styles.container}>
            <ChangeAvatar />
        </div>
    </div>
}