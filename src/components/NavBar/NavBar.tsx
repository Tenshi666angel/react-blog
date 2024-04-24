import { FC } from "react";
import styles from './NavBar.module.css';
import { NavLink } from "react-router-dom";
import { routes } from "../../utils/routes";
import { useAppSelector } from "../../hooks/redux";

export const NavBar: FC = () => {

    const getLinkClassName = ({ isActive }: { isActive: boolean }) => 
        isActive ? `${styles.activeLink} ${styles.link}` : styles.link;

    const { users } = useAppSelector(state => state.userReducer);

    const user = users.find(u => u.isAuth);

    return <nav className={styles.nav}>
        <div className={styles.links}>
            <NavLink to={routes.feed} className={getLinkClassName}>Главная</NavLink>
            <NavLink to={routes.profile} className={getLinkClassName}>Профиль</NavLink>
            <div className={styles.logout}>
                <NavLink to={routes.login} className={styles.link}>Выйти</NavLink>
            </div>
            <div className={styles.avatar}>
                <img src={user?.avatar}  alt="" /> 
            </div>
        </div>
    </nav>
}