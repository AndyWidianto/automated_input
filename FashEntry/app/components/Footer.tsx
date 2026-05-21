import Link from "next/link";

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
                            <li><Link href="#features" className="hover:text-white transition">Features</Link></li>
                            <li><Link href="#pricing" className="hover:text-white transition">Pricing</Link></li>
                            <li><Link href="/home/faq" className="hover:text-white transition">FAQ</Link></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Company</h3>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/home/about" className="hover:text-white transition">About Us</Link></li>
                            <li><Link href="#contact" className="hover:text-white transition">Contact</Link></li>
                            <li><Link href="#privacy" className="hover:text-white transition">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    {/* CTA */}
                    {/* <div>
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
                    </div> */}

                </div>

                {/* Bottom */}
                <div className="mt-12 border-t border-gray-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-gray-500">
                        © {new Date().getFullYear()} Automate. All rights reserved.
                    </p>

                    <div className="flex gap-5 text-sm">
                        <Link href="/" className="hover:text-white transition">Terms</Link>
                        <Link href="/" className="hover:text-white transition">Privacy</Link>
                        <Link href="/" className="hover:text-white transition">Support</Link>
                    </div>
                </div>

            </div>
        </footer>
    )
}