// src/pages/Home/HomePage.tsx

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
    const [user, setUser] = useState<{ name: string; email: string } | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('authToken');

        if (!token) {
            // If there's no token, redirect to login
            navigate('/login');
            return;
        }

        // Fetch user data from API using token
        const fetchUserData = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/auth/user-data', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                const data = await response.json();

                if (response.ok) {
                    setUser(data); // Set the user data in state
                } else {
                    setError(data.message || 'Failed to fetch user data');
                }
            } catch (error) {
                setError('An error occurred while fetching user data.');
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [navigate]);

    if (loading) {
        return (
            <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
                <p className="text-lg text-gray-300">Loading user data...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
                <p className="text-lg text-red-500">{error}</p>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
                <p className="text-lg text-red-500">No user data found.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
            <div className="max-w-xl w-full text-center">
                <h1 className="text-4xl font-extrabold mb-6 tracking-wide">
                    Welcome, <span className="text-gray-400">{user.name}</span>!
                </h1>
                <p className="text-lg mb-4">
                    <span className="font-medium text-gray-400">Email:</span> {user.email}
                </p>
                <p className="text-md text-gray-300 mb-8">
                    Here are some details about your account. Feel free to explore!
                </p>
            </div>
        </div>
    );
}

export default HomePage;

