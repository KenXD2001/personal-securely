import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';

function ThemeToggle() {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") || "light";
        setDarkMode(savedTheme === "dark");
        document.documentElement.classList.toggle("dark", savedTheme === "dark");
    }, []);

    const toggleTheme = () => {
        const newTheme = darkMode ? "light" : "dark";
        setDarkMode(!darkMode);
        document.documentElement.classList.toggle("dark", !darkMode);
        localStorage.setItem("theme", newTheme);
    };

    return (
        <button
            onClick={toggleTheme}
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            className="bg-[#f4f4f4] dark:bg-[#333] text-[#212121] dark:text-[#f4f4f4] p-2 rounded-full border border-[#212121] dark:border-[#f4f4f4] shadow-lg"
        >
            {/* Using Iconify directly with the icon name */}
            <Icon icon={darkMode ? "ph:sun-duotone" : "ph:moon-duotone"} width="24" height="24" />
        </button>
    );
}

export default ThemeToggle;
