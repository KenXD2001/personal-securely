import { Outlet } from 'react-router-dom';
import ThemeToggle from '../components/common/ThemeToggle';
import { BackgroundGradientAnimation } from '../components/ui/background-gradient-animation';

function AuthLayout() {
    return (
        <BackgroundGradientAnimation >
            <div className="absolute z-10 inset-0 flex items-center justify-center">
                <div className="flex flex-col h-screen text-[#212121] dark:text-[#f4f4f4]">
                    {/* Main Content */}
                    <div className="flex flex-1 justify-center items-center">
                        {/* Left Section */}
                        <div className="w-full">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
            {/* Theme Toggle */}
            <div className='absolute top-0 right-0 p-4'>
                <ThemeToggle />
            </div>
        </BackgroundGradientAnimation>
    );
}

export default AuthLayout;
