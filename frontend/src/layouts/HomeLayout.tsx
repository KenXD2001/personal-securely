import { Outlet } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

function HomeLayout() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Header */}
            <Header />

            {/* Main Content */}
            <main className="flex-grow">
                <Outlet />
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
}

export default HomeLayout;
