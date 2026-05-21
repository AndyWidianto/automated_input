import { MessageCircle } from "lucide-react";
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

            <div className="fixed right-0 bottom-0 m-8 mb-10">
                <a
                    href="https://wa.me/6281228895144"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative block w-fit rounded-full bg-[#25D366] p-3 text-white shadow-lg shadow-green-200 transition-all duration-300 hover:bg-[#20ba5a] hover:shadow-green-300 active:scale-95"
                    aria-label="Chat on WhatsApp"
                >
                    {/* Efek Denyut (Pulse Effect) di belakang logo */}
                    <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-20 group-hover:opacity-0"></span>

                    {/* Ikon WhatsApp - Menggunakan MessageCircle dengan prop yang disesuaikan */}
                    <div className="relative">
                        <MessageCircle
                            size={32}
                            fill="currentColor" // Mengisi bagian tengah agar terlihat solid seperti logo asli
                            strokeWidth={2.5}
                            className="drop-shadow-sm"
                        />
                    </div>
                </a>
            </div>

            {/* footer Section */}
            <Footer />
        </div>
    )
}