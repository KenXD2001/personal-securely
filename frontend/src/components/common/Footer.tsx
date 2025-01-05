import React from 'react';

function Footer() {
    return (
        <footer className="fixed bottom-0 w-full p-6 bg-black/80 backdrop-blur-md text-white text-center shadow-lg">
            <p className="text-sm font-light">
                &copy; {new Date().getFullYear()} <span className="font-semibold">Securely</span>. All rights reserved.
            </p>
        </footer>
    );
}

export default Footer;
