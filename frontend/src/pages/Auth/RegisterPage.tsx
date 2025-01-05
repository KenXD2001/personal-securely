// src/pages/Auth/RegisterPage.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';

function RegisterPage() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match.");
            return;
        }
        setErrorMessage("");
        setIsLoading(true);

        try {
            const response = await fetch("http://localhost:5000/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "sec-ch-ua-platform": '"Android"',
                    "Referer": "http://localhost:5173/",
                    "User-Agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Mobile Safari/537.36",
                    "sec-ch-ua": '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
                    "sec-ch-ua-mobile": "?1",
                },
                body: JSON.stringify({
                    name,
                    email,
                    phone,
                    password,
                    confirmPassword,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                // Registration successful, navigate to login page or dashboard
                navigate('/');
            } else {
                setErrorMessage(data.message || "Registration failed");
            }
        } catch (error) {
            setErrorMessage("Something went wrong, please try again later.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleLoginClick = () => {
        navigate('/');
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="w-full max-w-sm mx-auto p-14 bg-white dark:bg-[#333] rounded-3xl backdrop-blur-sm bg-opacity-20 dark:bg-opacity-50 border border-black dark:border-white"
        >
            <h1 className="text-2xl font-bold mb-6 text-center text-[#212121] dark:text-[#f4f4f4]">Register</h1>
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                    <label htmlFor="name" className="block text-sm font-medium text-[#212121] dark:text-[#f4f4f4]">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border border-[#ccc] dark:border-[#444] rounded-2xl h-12 px-4 py-2 bg-[#f9f9f9] dark:bg-[#333] text-[#212121] dark:text-[#f4f4f4] placeholder:text-[#888] dark:placeholder:text-[#bbb] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                        required
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="email" className="block text-sm font-medium text-[#212121] dark:text-[#f4f4f4]">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border border-[#ccc] dark:border-[#444] rounded-2xl h-12 px-4 py-2 bg-[#f9f9f9] dark:bg-[#333] text-[#212121] dark:text-[#f4f4f4] placeholder:text-[#888] dark:placeholder:text-[#bbb] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                        required
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="phone" className="block text-sm font-medium text-[#212121] dark:text-[#f4f4f4]">
                        Phone
                    </label>
                    <input
                        type="text"
                        id="phone"
                        placeholder="Enter your phone number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full border border-[#ccc] dark:border-[#444] rounded-2xl h-12 px-4 py-2 bg-[#f9f9f9] dark:bg-[#333] text-[#212121] dark:text-[#f4f4f4] placeholder:text-[#888] dark:placeholder:text-[#bbb] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                        required
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="password" className="block text-sm font-medium text-[#212121] dark:text-[#f4f4f4]">
                        Password
                    </label>
                    <div className="relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            className="w-full border border-[#ccc] dark:border-[#444] rounded-2xl h-12 px-4 py-2 bg-[#f9f9f9] dark:bg-[#333] text-[#212121] dark:text-[#f4f4f4] placeholder:text-[#888] dark:placeholder:text-[#bbb] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                            required
                        />
                        <span
                            onClick={togglePasswordVisibility}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                        >
                            <Icon icon={showPassword ? "ph:eye-slash-duotone" : "ph:eye-duotone"} width="20" height="20" />
                        </span>
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#212121] dark:text-[#f4f4f4]">
                        Confirm Password
                    </label>
                    <div className="relative">
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm your password"
                            className="w-full border border-[#ccc] dark:border-[#444] rounded-2xl h-12 px-4 py-2 bg-[#f9f9f9] dark:bg-[#333] text-[#212121] dark:text-[#f4f4f4] placeholder:text-[#888] dark:placeholder:text-[#bbb] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                            required
                        />
                        <span
                            onClick={toggleConfirmPasswordVisibility}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                        >
                            <Icon icon={showConfirmPassword ? "ph:eye-slash-duotone" : "ph:eye-duotone"} width="20" height="20" />
                        </span>
                    </div>
                </div>
                {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
                <div className="flex gap-2">
                    <button
                        type="button"
                        className="w-full bg-white text-[#2d2d2d] py-2 rounded-2xl h-12 hover:bg-[#f1f1f1] focus:outline-none focus:ring-2 focus:ring-[#2d2d2d] dark:bg-[#444] dark:text-[#f4f4f4] dark:hover:bg-[#555] dark:focus:ring-[#f4f4f4]"
                        onClick={handleLoginClick}
                    >
                        Login
                    </button>
                    <button
                        type="submit"
                        className="w-full bg-[#2d2d2d] text-white py-2 rounded-2xl h-12 hover:bg-[#444] focus:outline-none focus:ring-2 focus:ring-[#444] dark:bg-[#f4f4f4] dark:text-[#2d2d2d] dark:hover:bg-[#e0e0e0] dark:focus:ring-[#2d2d2d]"
                        disabled={isLoading}
                    >
                        {isLoading ? "Registering..." : "Register"}
                    </button>
                </div>
            </div>
        </form>
    );
}

export default RegisterPage;
