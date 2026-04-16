import { Home, Users, Settings, X } from "lucide-react";
import { NavLink } from "react-router-dom";


export default function SidebarApp({ isOpen, setSidebarOpen }: { isOpen: boolean; setSidebarOpen: (open: boolean) => void }) {

    const sidebars = [
        {
            id: 1,
            name: "Dashboard",
            url: "/app",
            icon: <Home size={18} />,
            active: true,
        },
        {
            id: 2,
            name: "Profile",
            url: "/app/profile",
            icon: <Users size={18} />,
            active: false,
        },
        // {
        //     id: 3,
        //     name: "Analytics",
        //     icon: <BarChart3 size={18} />,
        //     active: false,
        // },
        {
            id: 4,
            name: "Settings",
            url: "/app/settings",
            icon: <Settings size={18} />,
            active: false,
        }
    ]

    return (
        <>
            <div onClick={() => setSidebarOpen(false)} className={`fixed inset-0 bg-black/20 bg-opacity-50 z-15 transition-opacity ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}></div>
            <aside className={`fixed top-0 h-full w-64 bg-gray-950 text-white flex flex-col z-20 transition-all duration-300 ease-in-out ${isOpen ? "left-0" : "-left-64 lg:left-0"}`}>
                <div className="relative">
                    <button
                        className="absolute -right-3 top-1/2 transform -translate-y-1/2 mt-3 bg-gray-950 border border-gray-800 rounded-full p-1 focus:outline-none lg:hidden"
                        onClick={() => {
                            setSidebarOpen(false);
                        }}
                    >
                        <X size={18} />
                    </button>
                </div>
                <div className="h-16 flex items-center px-6 border-b border-gray-800">
                    <h1 className="text-xl font-bold text-emerald-500">Automate</h1>
                </div>

                <nav className="flex-1 px-4 py-6 space-y-2 relative">
                    {sidebars.map((sidebar) => (
                        <NavLink
                            key={sidebar.id}
                            to={sidebar.url}
                            className={({ isActive }) => `flex items-center gap-3 rounded-lg px-4 py-3 transition ${isActive
                                    ? "bg-emerald-600 text-white"
                                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                                }`}
                        >
                            {sidebar.icon}
                            {sidebar.name}
                        </NavLink>
                    ))}
                  <div className="absolute bottom-0 left-0 w-full p-4 border-t border-gray-800">
                    <button className="w-full bg-red-500/20 rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-500/30 transition-all mb-2">Logout</button>
                    <p className="text-sm text-gray-400 text-center">© 2024 Automate. All rights reserved.</p>
                  </div>
                </nav>
            </aside>
        </>
    )
}