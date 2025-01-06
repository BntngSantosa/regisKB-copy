import React from "react";

export default function index({ isOpen, toogleSidebar }) {
  const handleLogout = () => {;
  window.location.href = "/admin/login";
  }
  return (
    <div
      className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white transition-transform transform z-50 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 md:static`}
    >
      <div className="p-4 font-bold text-xl">Admin Panel</div>
      <nav className="mt-4 flex flex-col justify-between h-[calc(100%-4rem)]">
        <ul className="px-4">
          <li>
            <a href="#" className="block p-2 bg-gray-700">
              Dashboard
            </a>
          </li>
        </ul>
        <div className="px-4 pb-4 mb-4">
          <button
            onClick={() => handleLogout()}
            className="w-full p-3 bg-gray-300 rounded-md text-gray-800 hover:bg-gray-400"
          >
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
}
