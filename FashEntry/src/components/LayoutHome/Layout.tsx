import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import { useEffect } from "react";

export default function LayoutHome() {
    const chrome = (window as any).chrome;
    const navigate = useNavigate();

    const checkAuth = async () => {
        const state = await chrome.storage.local.get(['token']);
        const token = state.token;
        if (token) {
            navigate("/app");
        }
    }

    useEffect(() => {
        checkAuth();
    }, [])
    return (
        <div className="min-h-screen flex flex-col">
            {/* Navbar */}
            <Header />

            {/* Main Content */}
            <main className="flex-grow">
                <Outlet />
            </main>

            {/* footer Section */}
            <Footer />
        </div>
    )
}