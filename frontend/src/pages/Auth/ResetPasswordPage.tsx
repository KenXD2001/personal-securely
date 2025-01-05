// src/pages/Auth/ResetPasswordPage.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import * as yup from 'yup';
import 'react-toastify/dist/ReactToastify.css';

// Validation schemas
const emailSchema = yup.object({
    email: yup.string().email('Invalid email address').required('Email is required'),
});

const otpSchema = yup.object({
    otp: yup.string().length(6, 'OTP must be 6 digits').required('OTP is required'),
});

const passwordSchema = yup.object({
    newPassword: yup.string().min(6, 'Password must be at least 6 characters').required('New password is required'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('newPassword')], 'Passwords must match')
        .required('Confirm password is required'),
});

function ResetPasswordPage() {
    const navigate = useNavigate();

    const [step, setStep] = useState<'email' | 'otp' | 'password'>('email');
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // Function to send OTP
    const handleEmailSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await emailSchema.validate({ email });
            const response = await fetch('http://localhost:5000/api/auth/send-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });
            const data = await response.json();
            if (response.ok) {
                toast.success(data.message || 'OTP sent to your email');
                setStep('otp');
            } else {
                toast.error(data.error || 'Failed to send OTP');
            }
        } catch (error: any) {
            toast.error(error.errors[0] || 'An error occurred');
        }
    };

    // Function to verify OTP
    const handleOtpSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await otpSchema.validate({ otp });
            const response = await fetch('http://localhost:5000/api/auth/verify-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, otp }),
            });
            const data = await response.json();
            if (response.ok) {
                toast.success(data.message || 'OTP verified successfully');
                setStep('password');
            } else {
                toast.error(data.error || 'Failed to verify OTP');
            }
        } catch (error: any) {
            toast.error(error.errors[0] || 'An error occurred');
        }
    };

    // Function to reset password
    const handlePasswordSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await passwordSchema.validate({ newPassword, confirmPassword });
            const response = await fetch('http://localhost:5000/api/auth/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, newPassword, confirmNewPassword: confirmPassword }),
            });
            const data = await response.json();
            if (response.ok) {
                toast.success(data.message || 'Password changed successfully');
                setTimeout(() => navigate('/'), 3000);
            } else {
                toast.error(data.error || 'Failed to reset password');
            }
        } catch (error: any) {
            toast.error(error.errors[0] || 'An error occurred');
        }
    };

    return (
        <form
            onSubmit={
                step === 'email'
                    ? handleEmailSubmit
                    : step === 'otp'
                        ? handleOtpSubmit
                        : handlePasswordSubmit
            }
            className="w-full max-w-sm mx-auto p-14 bg-white dark:bg-[#333] rounded-3xl backdrop-blur-sm bg-opacity-20 dark:bg-opacity-50 border border-black dark:border-white"
        >
            <h1 className="text-2xl font-bold mb-6 text-center text-[#212121] dark:text-[#f4f4f4]">
                {step === 'email' && 'Reset Password'}
                {step === 'otp' && 'Verify OTP'}
                {step === 'password' && 'Set New Password'}
            </h1>
            {step === 'email' && (
                <>
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
                    <button
                        type="submit"
                        className="w-full mt-4 bg-[#2d2d2d] text-white py-2 rounded-2xl h-12 hover:bg-[#444] focus:outline-none focus:ring-2 focus:ring-[#444] dark:bg-[#f4f4f4] dark:text-[#2d2d2d] dark:hover:bg-[#e0e0e0] dark:focus:ring-[#2d2d2d]"
                    >
                        Send OTP
                    </button>
                </>
            )}
            {step === 'otp' && (
                <>
                    <label htmlFor="otp" className="block text-sm font-medium text-[#212121] dark:text-[#f4f4f4]">
                        OTP
                    </label>
                    <input
                        type="text"
                        id="otp"
                        placeholder="Enter the OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className="w-full border border-[#ccc] dark:border-[#444] rounded-2xl h-12 px-4 py-2 bg-[#f9f9f9] dark:bg-[#333] text-[#212121] dark:text-[#f4f4f4] placeholder:text-[#888] dark:placeholder:text-[#bbb] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                        required
                    />
                    <button
                        type="submit"
                        className="w-full mt-4 bg-[#2d2d2d] text-white py-2 rounded-2xl h-12 hover:bg-[#444] focus:outline-none focus:ring-2 focus:ring-[#444] dark:bg-[#f4f4f4] dark:text-[#2d2d2d] dark:hover:bg-[#e0e0e0] dark:focus:ring-[#2d2d2d]"
                    >
                        Verify OTP
                    </button>
                </>
            )}
            {step === 'password' && (
                <>
                    <label htmlFor="newPassword" className="block text-sm font-medium text-[#212121] dark:text-[#f4f4f4]">
                        New Password
                    </label>
                    <input
                        type="password"
                        id="newPassword"
                        placeholder="Enter new password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full border border-[#ccc] dark:border-[#444] rounded-2xl h-12 px-4 py-2 bg-[#f9f9f9] dark:bg-[#333] text-[#212121] dark:text-[#f4f4f4] placeholder:text-[#888] dark:placeholder:text-[#bbb] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                        required
                    />
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#212121] dark:text-[#f4f4f4] mt-4">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        placeholder="Confirm new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full border border-[#ccc] dark:border-[#444] rounded-2xl h-12 px-4 py-2 bg-[#f9f9f9] dark:bg-[#333] text-[#212121] dark:text-[#f4f4f4] placeholder:text-[#888] dark:placeholder:text-[#bbb] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                        required
                    />
                    <button
                        type="submit"
                        className="w-full mt-4 bg-[#2d2d2d] text-white py-2 rounded-2xl h-12 hover:bg-[#444] focus:outline-none focus:ring-2 focus:ring-[#444] dark:bg-[#f4f4f4] dark:text-[#2d2d2d] dark:hover:bg-[#e0e0e0] dark:focus:ring-[#2d2d2d]"
                    >
                        Change Password
                    </button>
                </>
            )}
            <ToastContainer />
        </form>
    );
}

export default ResetPasswordPage;
