import { FC } from "react";
import { useAppSelector } from "../../hooks/redux";
import { Navigate } from "react-router-dom";
import { routes } from "../../utils/routes";
import { NavBar } from "../../components/NavBar/NavBar";
import { NewPostForm } from "../../components/NewPostForm/NewPostForm";

export const Feed: FC = () => {

    const { users } = useAppSelector(state => state.userReducer);

    const user = users.find(u => u.isAuth);

    return !user ? <Navigate to={routes.login} /> : <div>
        <NavBar />
        <h1>Welcome, { user.name }!!!</h1>
        <NewPostForm />
    </div>
}