"use client";

import { useState } from "react";
import useAxios from "./Axios";
import { toast } from "sonner";
import { Home, Settings, Users } from "lucide-react";
import { useRouter } from "next/navigation";

export default function useLayoutApp() {
    const { apiPrivate } = useAxios();
    const [openProfile, setOpenProfile] = useState(false);
    const route = useRouter();

    const sidebars = [
        {
            id: 1,
            name: "Dashboard",
            url: "/store",
            icon: <Home size={18} />,
            active: true,
        },
        {
            id: 2,
            name: "Profile",
            url: "/store/profile",
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
            url: "/store/settings",
            icon: <Settings size={18} />,
            active: false,
        }
    ]


    const handleLogout = async () => {
        if (!confirm("Beneran mau logout nih? Nanti harus login lagi lho!")) return;
        try {
            await apiPrivate.post("/api/auth/logout", {}, { withCredentials: true });
            localStorage.removeItem("token");
            toast.success("Sip, berhasil keluar! Sampai jumpa lagi 👋")
            route.push("/login");
        } catch (err) {
            console.error(err);
            toast.error("Ups, gagal logout. Coba cek koneksinya bentar.")
        }
    }

    return {
        handleLogout,
        sidebars,
        openProfile,
        setOpenProfile
    }
}