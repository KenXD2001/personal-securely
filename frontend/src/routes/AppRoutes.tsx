import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';
import HomeLayout from '../layouts/HomeLayout';
import LoginPage from '../pages/Auth/LoginPage';
import RegisterPage from '../pages/Auth/RegisterPage';
import ResetPasswordPage from '../pages/Auth/ResetPasswordPage';
import HomePage from '../pages/Home/HomePage';

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Auth Routes */}
                <Route element={<AuthLayout />}>
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/reset-password" element={<ResetPasswordPage />} />
                </Route>

                {/* Home Route */}
                <Route element={<HomeLayout />}>
                    <Route path="/home" element={<HomePage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;
