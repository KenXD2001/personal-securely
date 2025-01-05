// src/pages/Auth/LoginPage.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import * as yup from 'yup';
import { Icon } from '@iconify/react';
import 'react-toastify/dist/ReactToastify.css';

// Create the schema for form validation
const validationSchema = yup.object().shape({
    email: yup.string().email('Please enter a valid email').required('Email is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showForgotPassword, setShowForgotPassword] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            // Validate inputs using Yup
            await validationSchema.validate({ email, password });

            // API request for login
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email.trim(),
                    password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success('Login successful!');
                setShowForgotPassword(false); // Hide forgot password link on successful login

                // Save token to localStorage or state
                localStorage.setItem('authToken', data.token);

                // Redirect to the home/dashboard page
                setTimeout(() => {
                    navigate('/home');
                }, 1000);
            } else {
                toast.error(data.message || 'Invalid email or password.');
                setShowForgotPassword(true); // Show forgot password link for invalid credentials
            }
        } catch (error) {
            if (error instanceof yup.ValidationError) {
                toast.error(error.message);
            } else {
                toast.error('An error occurred. Please try again.');
            }
        }
    };

    const handleSignUpClick = () => navigate('/register');

    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    const handleForgotPasswordClick = () => navigate('/reset-password');

    return (
        <>
            <form
                onSubmit={handleSubmit}
                className="w-full mx-auto p-14 bg-white dark:bg-[#333] rounded-3xl backdrop-blur-sm bg-opacity-20 dark:bg-opacity-50 border border-black dark:border-white"
            >
                <h1 className="text-2xl font-bold mb-6 text-center text-[#212121] dark:text-[#f4f4f4]">Login</h1>
                <div className="flex flex-col gap-4">
                    {/* Email Input */}
                    <div className="flex flex-col gap-1">
                        <label htmlFor="email" className="block text-sm font-medium text-[#212121] dark:text-[#f4f4f4]">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            className="w-full border rounded-2xl h-12 px-4 py-2 focus:outline-none text-[#f4f4f4] dark:text-[#212121]"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    {/* Password Input */}
                    <div className="flex flex-col gap-1">
                        <label htmlFor="password" className="block text-sm font-medium text-[#212121] dark:text-[#f4f4f4]">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                placeholder="Enter your password"
                                className="w-full border text-[#f4f4f4] dark:text-[#212121] rounded-2xl h-12 px-4 py-2 focus:outline-none"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <span
                                onClick={togglePasswordVisibility}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-[#f4f4f4] dark:text-[#212121]"
                            >
                                <Icon icon={showPassword ? 'ph:eye-slash-duotone' : 'ph:eye-duotone'} width="20" height="20" />
                            </span>
                        </div>
                        {showForgotPassword && (
                            <div
                                className="text-sm font-bold cursor-pointer mt-2 hover:underline w-full text-end"
                                onClick={handleForgotPasswordClick}
                            >
                                Forgot password?
                            </div>
                        )}
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-2">
                        <button
                            type="button"
                            onClick={handleSignUpClick}
                            className="w-full bg-white text-[#2d2d2d] py-2 rounded-2xl"
                        >
                            Sign Up
                        </button>
                        <button
                            type="submit"
                            className="w-full bg-[#2d2d2d] text-white py-2 rounded-2xl"
                        >
                            Login
                        </button>
                    </div>
                </div>
            </form>
            <ToastContainer />
        </>
    );
};

export default LoginPage;
