import { useState } from "react";
import { ChevronDown, Settings, User, LogOut } from "lucide-react";
import { apiPrivate } from "../../shared/axios.service";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function HeaderApp({ setSidebarOpen }: { setSidebarOpen: (open: boolean) => void }) {
    const [open, setOpen] = useState(false);
    const chrome = (window as any).chrome;
    const navigate = useNavigate();

    const handleLogout = async () => {
        if (!confirm("Beneran mau logout nih? Nanti harus login lagi lho!")) return;
        try {
            await apiPrivate.post("/auth/logout", {}, { withCredentials: true });
            chrome.storage.local.remove("token");
            chrome.storage.local.remove("refresh_token");
            toast.success("Sip, berhasil keluar! Sampai jumpa lagi 👋")
            navigate("/login");
        } catch (err) {
            console.error(err);
            toast.error("Ups, gagal logout. Coba cek koneksinya bentar.")
        }
    }

    return (
        <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between z-10">
            <div className="block lg:hidden">
                <button
                    onClick={() => setSidebarOpen(true)}
                    className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300 rounded-md"
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                    </svg>
                </button>
            </div>

            <div className="ml-auto bg-green-100 border border-green-200 rounded-lg px-3 py-1 text-sm text-green-800 mx-4">
                FREE
            </div>
            <div className="relative">
                <button
                    onClick={() => setOpen(!open)}
                    className="flex items-center gap-3 rounded-xl px-3 py-2 hover:bg-gray-100 transition-all"
                >
                    <img
                        src="https://i.pravatar.cc/40"
                        alt="Profile"
                        className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="text-left hidden sm:block">
                        <p className="text-sm font-medium text-gray-900">Andy Widianto</p>
                        <p className="text-xs text-gray-500">Administrator</p>
                    </div>
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                </button>

                {open && (
                    <div className="absolute right-0 mt-3 w-52 rounded-xl bg-white shadow-lg border border-gray-200 overflow-hidden z-50">
                        <a
                            href="#"
                            className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
                        >
                            <User className="w-4 h-4" />
                            Profile
                        </a>
                        <a
                            href="#"
                            className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
                        >
                            <Settings className="w-4 h-4" />
                            Settings
                        </a>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50"
                        >
                            <LogOut className="w-4 h-4" />
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
}