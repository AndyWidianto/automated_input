"use client";

import { ChevronDown, Settings, User, LogOut } from "lucide-react";
import useLayoutApp from "../lib/hooks/LayoutApp";

export default function HeaderApp({ setSidebarOpen }: { setSidebarOpen: (open: boolean) => void }) {
    const { handleLogout, setOpenProfile, openProfile, user } = useLayoutApp();

    const planStyles = {
        FREE: "bg-slate-100 text-slate-600 border-slate-200",
        PRO: "bg-emerald-50 text-emerald-700 border-emerald-200",
        ENTERPRISE: "bg-blue-50 text-blue-700 border-blue-200",
    };

    const planLabels = {
        FREE: "Free Plan",
        PRO: "Pro Plan",
        ENTERPRISE: "Enterprise",
    };

    return (
        <header className="fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 sm:px-8 flex items-center justify-between z-40">
            {/* Left Section: Mobile Menu & Breadcrumbs/Title (Optional) */}
            <div className="flex items-center gap-4">
                <button
                    onClick={() => setSidebarOpen(true)}
                    className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 active:scale-95 transition-all focus:outline-none"
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8m-8 6h16" />
                    </svg>
                </button>
                <h1 className="hidden md:block text-sm font-semibold text-gray-400 tracking-wider uppercase">
                    Dashboard
                </h1>
            </div>

            {/* Right Section: Badges & Profile */}
            <div className="flex items-center gap-2 sm:gap-4">
                {/* Plan Badge - Dibuat lebih subtle & pill-shaped */}
                <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-100 rounded-full px-3 py-1 shadow-sm">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${planStyles[user?.plan as "FREE" | "PRO" | "ENTERPRISE"] || planStyles.FREE}`}>
                        {user && user.plan ? planLabels[user.plan as "FREE" | "PRO" | "ENTERPRISE"] || 'Unknown' : ''}
                    </span>
                </div>

                <div className="h-8 w-[1px] bg-gray-200 mx-2 hidden sm:block"></div>

                {/* Profile Dropdown */}
                <div className="relative">
                    <button
                        onClick={() => setOpenProfile(!openProfile)}
                        className={`flex items-center gap-3 rounded-full p-1 pr-3 transition-all duration-200 ${openProfile ? 'bg-gray-100 shadow-inner' : 'hover:bg-gray-50'
                            }`}
                    >
                        <div className="relative">
                            <img
                                src="/user.png"
                                alt="Profile"
                                className="w-9 h-9 rounded-full border-2 border-white shadow-sm object-cover"
                            />
                            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></div>
                        </div>

                        <div className="text-left hidden sm:block">
                            <p className="text-sm font-bold text-gray-800 leading-none">{user?.name}</p>
                            <p className="text-[10px] font-medium text-gray-400 uppercase mt-1">{user?.role}</p>
                        </div>
                        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${openProfile ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Dropdown Menu dengan Animasi */}
                    {openProfile && (
                        <div className="absolute right-0 mt-3 w-56 rounded-2xl bg-white shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden z-50 animate-in fade-in zoom-in duration-200 origin-top-right">
                            <div className="px-4 py-3 border-b border-gray-50 bg-gray-50/50">
                                <p className="text-xs text-gray-400 font-medium">Signed in as</p>
                                <p className="text-sm font-semibold text-gray-700 truncate">{user?.email}</p>
                            </div>

                            <div className="p-2">
                                <a
                                    href="/store/profile"
                                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                                >
                                    <User className="w-4 h-4" />
                                    Profile
                                </a>
                                <a
                                    href="/store/setting"
                                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                                >
                                    <Settings className="w-4 h-4" />
                                    Settings
                                </a>
                            </div>

                            <div className="p-2 border-t border-gray-50">
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-3 px-3 py-2.5 w-full rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
                                >
                                    <LogOut className="w-4 h-4" />
                                    Sign out
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}