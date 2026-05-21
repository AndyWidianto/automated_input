"use client";
import { useState } from "react";
import { ChevronRight, Menu, X } from "lucide-react";
import Link from "next/link";


interface NavItem {
    name: string;
    href: string;
}


const navItems: NavItem[] = [
    { name: 'Home', href: '/home' },
    { name: 'About', href: '/home/about' },
    { name: 'Blog', href: '/home/blog' },
];

export default function Header() {
    const [open, setOpen] = useState(false);
    return (
        <header className="sticky top-0 z-50 w-full border-b border-slate-200/60 bg-white/80 backdrop-blur-md transition-all duration-300">
            <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">

                {/* Logo Section */}
                <div className="flex items-center gap-x-3 group cursor-pointer">
                    <div className="relative">
                        <img src="logo.png" alt="Logo" className="h-9 w-auto transition-transform duration-300 group-hover:scale-110" />
                        <div className="absolute -inset-1 rounded-full bg-emerald-400/20 blur opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <span className="text-xl font-bold tracking-tight text-slate-900">
                        Automate<span className="text-emerald-600">.</span>
                    </span>
                </div>

                {/* Desktop Menu - Hover Underline Effect */}
                <div className="hidden lg:flex gap-x-8">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="relative text-sm font-medium text-slate-600 transition-colors hover:text-emerald-600 group"
                        >
                            {item.name}
                            <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-emerald-600 transition-all duration-300 group-hover:w-full" />
                        </Link>
                    ))}
                </div>

                {/* Desktop Right - Actions */}
                <div className="hidden lg:flex items-center gap-x-5">
                    <Link
                        href="/login"
                        className="text-sm font-semibold text-slate-700 hover:text-emerald-600 transition-colors"
                    >
                        Log in
                    </Link>
                    <Link
                        href="/signup"
                        className="group relative inline-flex items-center justify-center overflow-hidden rounded-xl bg-emerald-600 px-6 py-2.5 text-sm font-bold text-white shadow-md shadow-emerald-200 transition-all hover:bg-emerald-700 hover:shadow-lg active:scale-95"
                    >
                        <span>Get Started</span>
                        <div className="ml-2 transition-transform group-hover:translate-x-1">
                            <ChevronRight size={16} />
                        </div>
                    </Link>
                </div>

                {/* Mobile Menu Button - Minimalist */}
                <button
                    className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-900 transition-colors hover:bg-slate-100 lg:hidden"
                    onClick={() => setOpen(!open)}
                >
                    {open ? <X size={24} /> : <Menu size={24} />}
                </button>
            </nav>

            {/* Mobile Menu - Animated Slide Down */}
            {open && (
                <div className="absolute inset-x-0 top-full bg-white border-b border-slate-200 p-6 shadow-xl lg:hidden animate-in fade-in slide-in-from-top-5 duration-200">
                    <div className="space-y-4">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="block text-base font-medium text-slate-900 hover:text-emerald-600"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    <div className="mt-8 space-y-4 pt-6 border-t border-slate-100">
                        <Link
                            href="/login"
                            className="flex w-full justify-center rounded-xl border border-slate-200 px-6 py-3 text-sm font-bold text-slate-900 hover:bg-slate-50"
                        >
                            Log in
                        </Link>
                        <Link
                            href="/signup"
                            className="flex w-full justify-center rounded-xl bg-emerald-600 px-6 py-3 text-sm font-bold text-white shadow-emerald-200 hover:bg-emerald-700 shadow-lg"
                        >
                            Get Started Free
                        </Link>
                    </div>
                </div>
            )}
        </header>
    )
}