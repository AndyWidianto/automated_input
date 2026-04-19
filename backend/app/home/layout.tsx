import Footer from "../components/Footer";
import Header from "../components/Header";


export default function Layout({ children }: { children: React.ReactNode }) {

    return (
        <div className="min-h-screen flex flex-col">
            {/* Navbar */}
            <Header />

            {/* Main Content */}
            <main className="flex-grow">
                {children}
            </main>

            {/* footer Section */}
            <Footer />
        </div>
    )
}