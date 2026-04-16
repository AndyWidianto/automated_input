import { useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from '../../assets/logo.png';
import { Menu, X } from "lucide-react";


interface NavItem {
    name: string;
    href: string;
}


const navItems: NavItem[] = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Blog', href: '/' },
];

export default function Header() {
    const [open, setOpen] = useState(false);
    return (
        <header className="bg-white sticky top-0 z-50 shadow-sm border-b border-gray-100">
            <nav className="mx-auto flex max-w-7xl items-center justify-between p-4">

                {/* Logo */}
                <div className="flex items-center gap-x-2">
                    <img src={Logo} alt="Logo" className="h-8 w-auto" />
                    <span className="text-xl font-bold text-gray-950">Automate</span>
                </div>

                {/* Desktop Menu */}
                <div className="hidden lg:flex gap-x-10">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.href}
                            className="text-sm font-semibold text-gray-950 hover:text-emerald-600"
                        >
                            {item.name}
                        </NavLink>
                    ))}
                </div>

                {/* Desktop Right */}
                <div className="hidden lg:flex items-center gap-x-4">
                    <NavLink
                        to="/login"
                        className="text-sm font-semibold text-gray-950 hover:text-emerald-600"
                    >
                        Log in
                    </NavLink>
                    <NavLink
                        to="/signup"
                        className="rounded-full bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
                    >
                        Get Started Free
                    </NavLink>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="lg:hidden"
                    onClick={() => setOpen(!open)}
                >
                    {open ? <X size={28} /> : <Menu size={28} />}
                </button>
            </nav>

            {/* Mobile Menu */}
            {open && (
                <div className="lg:hidden px-4 pb-4 space-y-4 bg-white border-t border-gray-100">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.href}
                            className="block text-sm font-semibold text-gray-950 hover:text-emerald-600"
                        >
                            {item.name}
                        </NavLink>
                    ))}

                    <div className="pt-4 border-t border-gray-100 space-y-2">
                        <NavLink
                            to="/login"
                            className="block text-sm text-center font-semibold text-gray-950 px-6 py-2.5 text-sm font-semibold hover:text-emerald-600"
                        >
                            Log in
                        </NavLink>
                        <NavLink
                            to="/signup"
                            className="block text-center rounded-full bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
                        >
                            Get Started Free
                        </NavLink>
                    </div>
                </div>
            )}
        </header>)
}