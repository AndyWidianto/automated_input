"use client";

import { useEffect, useState } from "react";
import Footer from "../components/Footer"
import HeaderApp from "../components/HeaderApp";
import SidebarApp from "../components/SidebarApp";


export default function LayoutApp({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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
