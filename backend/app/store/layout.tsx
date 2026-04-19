"use client";

import { useEffect, useState } from "react";
import Footer from "../components/Footer"
import HeaderApp from "../components/HeaderApp";
import SidebarApp from "../components/SidebarApp";
import { jwtDecode } from "jwt-decode";
import { TokenPayload } from "../lib/types";
import { useRouter } from "next/navigation";
import useAxios from "../lib/hooks/Axios";


export default function LayoutApp({ children }: { children: React.ReactNode }) {
  const { apiPrivate } = useAxios();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();

  const handleRole = async () => {
    let token = localStorage.getItem("token");

    // Jika tidak ada token sama sekali, langsung tendang ke login
    if (!token) {
      try {
        const res = await apiPrivate.get("/api/auth/refreshToken", { withCredentials: true });
        const newToken = res.data.accessToken;
        console.log(newToken);
        if (newToken) {
          token = newToken as string;
        }

        localStorage.setItem("token", newToken);
      } catch (refreshError) {
        localStorage.removeItem("token");
        return router.push("/login");
      }
    };

    try {
      let decoded = jwtDecode(token as string) as TokenPayload;
      const currentTime = Math.floor(Date.now() / 1000);

      // 1. Cek Eksperasi & Refresh jika perlu
      if (decoded.exp && decoded.exp < currentTime) {
        console.warn("Sesi berakhir, mencoba memperbarui...");
        try {
          const res = await apiPrivate.get("/api/auth/refreshToken", { withCredentials: true });
          const newToken = res.data.accessToken;

          localStorage.setItem("token", newToken);
          decoded = jwtDecode(newToken) as TokenPayload; // Update data decoded dengan token baru
        } catch (refreshError) {
          // Jika refresh token juga gagal (expired/invalid), hapus semua dan login ulang
          localStorage.removeItem("token");
          return router.push("/login");
        }
      }

      if (decoded.role === "admin") {
        router.push("/dashboard");
      }

    } catch (error) {
      console.error("Format token rusak:", error);
      localStorage.removeItem("token");
      router.push("/login");
    }
  };

  useEffect(() => {
    handleRole();
  }, []);
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <SidebarApp isOpen={isSidebarOpen} setSidebarOpen={setIsSidebarOpen} />

      {/* Main Section */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <HeaderApp setSidebarOpen={setIsSidebarOpen} />

        {/* Main Content */}
        <div className={`flex-1 transition-all ${isSidebarOpen ? "ml-0 lg:ml-72" : "ml-0 lg:ml-72"}`}>
          <main className="p-1 py-17">
            {children}
          </main>
          {/* Footer */}
          <Footer />
        </div>
      </div>
    </div>
  );
}
