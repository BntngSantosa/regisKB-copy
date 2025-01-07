import React from "react";
import { useState } from "react";
import Sidebar from "../../fragments/Sidebar";
import AdminTable from "../../fragments/Tabel";

export default function index() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1 flex flex-col ml-64 md:ml-0">
        <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
          <button onClick={toggleSidebar} className="md:hidden">
            ☰ {/* Hamburger menu icon */}
          </button>
          <h1 className="text-lg font-bold">Admin Dashboard</h1>
        </header>
        <main className="p-4 overflow-x-scroll">
          <AdminTable />
        </main>
      </div>
    </div>
  );
}
