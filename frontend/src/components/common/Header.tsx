import React from 'react';
import ThemeToggle from './ThemeToggle';

function Header() {
    const handleSignOut = () => {
        // Add sign-out logic
        alert('Signed out successfully!');
    };

    return (
        <header className="sticky top-4 mx-4 z-50 bg-white/20 backdrop-blur-md shadow-lg rounded-2xl px-6 py-4 flex items-center justify-between border-b border-gray-700">
            <div className="text-2xl font-bold text-white tracking-wide">Securely</div>
            <nav>
                <ul className="flex space-x-6 text-gray-300">
                    <li>
                        <a
                            href="/home"
                            className="hover:text-white transition-colors"
                        >
                            Home
                        </a>
                    </li>
                    <li>
                        <a
                            href="#features"
                            className="hover:text-white transition-colors"
                        >
                            Features
                        </a>
                    </li>
                    <li>
                        <a
                            href="#contact"
                            className="hover:text-white transition-colors"
                        >
                            Contact
                        </a>
                    </li>
                </ul>
            </nav>
            <div className="flex items-center gap-4">
                <ThemeToggle />
                <button
                    onClick={handleSignOut}
                    className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-500 transition-all shadow-md"
                >
                    Sign Out
                </button>
            </div>
        </header>
    );
}

export default Header;
