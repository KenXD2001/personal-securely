// src/pages/Home/HomePage.tsx

import React from 'react';

function HomePage() {
    const user = { name: 'John Doe', email: 'john.doe@example.com' }; // Replace with actual user data

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
