import { NavLink } from "react-router-dom"

export default function Footer() {

    return (
        <footer className="bg-gray-950 text-gray-300">
            <div className="max-w-7xl mx-auto px-6 py-14">

                <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

                    {/* Brand */}
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-4">Automate</h2>
                        <p className="text-sm leading-6 text-gray-400">
                            Automate repetitive data entry from Excel to any website.
                            Save time, reduce errors, and streamline your workflow with ease.
                        </p>
                    </div>

                    {/* Product */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Product</h3>
                        <ul className="space-y-3 text-sm">
                            <li><NavLink to="#features" className="hover:text-white transition">Features</NavLink></li>
                            <li><NavLink to="#pricing" className="hover:text-white transition">Pricing</NavLink></li>
                            <li><NavLink to="#faq" className="hover:text-white transition">FAQ</NavLink></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Company</h3>
                        <ul className="space-y-3 text-sm">
                            <li><NavLink to="/about" className="hover:text-white transition">About Us</NavLink></li>
                            <li><NavLink to="#contact" className="hover:text-white transition">Contact</NavLink></li>
                            <li><NavLink to="#privacy" className="hover:text-white transition">Privacy Policy</NavLink></li>
                        </ul>
                    </div>

                    {/* CTA */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Get Started</h3>
                        <p className="text-sm text-gray-400 mb-4">
                            Start automating your workflow today and save hours of manual work.
                        </p>
                        <a
                            href="/signup"
                            className="inline-block rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 transition"
                        >
                            Get Started Free
                        </a>
                    </div>

                </div>

                {/* Bottom */}
                <div className="mt-12 border-t border-gray-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-gray-500">
                        © {new Date().getFullYear()} Automate. All rights reserved.
                    </p>

                    <div className="flex gap-5 text-sm">
                        <NavLink to="/" className="hover:text-white transition">Terms</NavLink>
                        <NavLink to="/" className="hover:text-white transition">Privacy</NavLink>
                        <NavLink to="/" className="hover:text-white transition">Support</NavLink>
                    </div>
                </div>

            </div>
        </footer>
    )
}