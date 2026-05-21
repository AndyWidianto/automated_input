"use client";
import { X, LogOut } from "lucide-react";
import Link from "next/link";
import useLayoutApp from "../lib/hooks/LayoutApp";



export default function SidebarApp({ isOpen, setSidebarOpen }: { isOpen: boolean; setSidebarOpen: (open: boolean) => void }) {
    const { sidebars, handleLogout, handleSelect } = useLayoutApp();

    return (
        <>
            {/* Overlay - Lebih halus dengan backdrop blur */}
            <div
                onClick={() => setSidebarOpen(false)}
                className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-30 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
            ></div>

            <aside className={`fixed top-0 h-full w-72 bg-[#0a0a0b] border-r border-gray-900 text-white flex flex-col z-45 transition-all duration-300 ease-in-out ${isOpen ? "left-0" : "-left-72 lg:left-0"}`}>

                {/* Close Button Mobile - Didesain lebih menyatu */}
                <button
                    className="absolute -right-10 top-5 text-white lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                >
                    <X size={24} />
                </button>

                {/* Logo Section */}
                <div className="h-20 flex items-center px-8">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.4)]">
                            <span className="text-black font-black">A</span>
                        </div>
                        <h1 className="text-xl font-bold tracking-tight">Automate<span className="text-emerald-500">.</span></h1>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
                    <p className="px-4 text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-4">Main Menu</p>
                    {sidebars.map((sidebar, idx) => (
                        <Link
                            key={sidebar.id}
                            href={sidebar.url}
                            onClick={() => handleSelect(idx)}
                            className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 group ${sidebar.active
                                ? "bg-emerald-500/10 text-emerald-500 shadow-[inset_0_0_0_1px_rgba(16,185,129,0.2)]"
                                : "text-gray-400 hover:bg-white/5 hover:text-white"
                                }`}
                        >
                            <span className={`${sidebar.active ? "text-emerald-500" : "text-gray-500 group-hover:text-white"} transition-colors`}>
                                {sidebar.icon}
                            </span>
                            {sidebar.name}
                        </Link>
                    ))}
                </nav>

                {/* Upgrade Plan Card & Footer Section */}
                <div className="p-4 border-t border-gray-900 space-y-4 bg-[#0d0d0e]">

                    {/* Upgrade Card */}
                    {/* <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 p-4 shadow-lg">
                        <div className="relative z-10">
                            <p className="text-xs font-bold text-emerald-100 uppercase tracking-wider">Pro Plan</p>
                            <p className="text-[11px] text-emerald-50/80 mt-1 mb-3">Dapatkan fitur otomasi tanpa batas!</p>
                            <Link href="/store/payment" className="flex justify-center w-full bg-white text-black text-xs font-bold py-2 rounded-lg hover:bg-emerald-50 transition-colors shadow-sm">
                                Upgrade Now
                            </Link>
                        </div>
                        <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-white/10 rounded-full blur-2xl"></div>
                    </div> */}

                    <div className="space-y-1">
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-gray-400 hover:text-red-400 hover:bg-red-500/5 rounded-xl transition-all"
                        >
                            <LogOut size={18} />
                            Logout
                        </button>
                        <p className="text-[10px] text-gray-600 text-center pt-2 italic">v1.0.4 • © 2026 Automate</p>
                    </div>
                </div>
            </aside>
        </>
    )
}