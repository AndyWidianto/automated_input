import { Outlet } from "react-router-dom";
import HeaderApp from "./Header";
import SidebarApp from "./Sidebar";
import { useState } from "react";
import Footer from "../LayoutHome/Footer";

export default function LayoutApp() {
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
        <main className={`flex-1 p-6 transition-all py-17 ${isSidebarOpen ? "ml-0 lg:ml-64" : "ml-0 lg:ml-64"}`}>
          <Outlet />
          {/* Footer */}
          <Footer />
        </main>
      </div>
    </div>
  );
}
