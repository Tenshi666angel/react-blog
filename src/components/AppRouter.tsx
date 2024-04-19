import { FC } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { routes } from "../utils/routes";
import { LoginPage } from "../pages/LoginPage/LoginPage";
import { RegisterPage } from "../pages/RegisterPage/RegisterPage";
import { Feed } from "../pages/Feed/Feed";
import { Profile } from "../pages/Profile/Profile";

export const AppRouter: FC = () => {
    return <BrowserRouter>
        <Routes>
            <Route path={routes.root} element={<Navigate to={routes.login} />} />
            <Route path={routes.login} element={<LoginPage />} />
            <Route path={routes.register} element={<RegisterPage />} />
            <Route path={routes.feed} element={<Feed />} />
            <Route path={routes.profile} element={<Profile />} />
        </Routes>
    </BrowserRouter>
}