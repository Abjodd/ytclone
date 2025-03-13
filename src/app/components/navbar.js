"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  FaHome, FaFire, FaVideo, FaHistory, 
  FaSearch, FaBars, FaCloudUploadAlt, FaUserCircle 
} from "react-icons/fa";

const Navbar = ({ toggleSidebar, toggleDarkMode, isDarkMode }) => (
  <div className={`w-full ${isDarkMode ? "bg-black-900 text-white" : "bg-white text-black"} flex items-center justify-between p-3 fixed top-0 left-0 z-50 shadow-md h-14`}>
    {/* Toggle Sidebar Button */}
    <button onClick={toggleSidebar} className="text-2xl p-2">
      <FaBars />
    </button>

    {/* Logo */}
    <div className="flex items-center gap-2 mr-auto">
      <Image src="/ytm.png" alt="YouTube Logo" width={100} height={40} />
    </div>

    <div className="flex items-center justify-center flex-grow">
      {/* Search Bar */}
      <div className="flex items-center border border-gray-400 rounded-full overflow-hidden w-1/2">
        <input
          type="text"
          placeholder="Search"
          className={`p-2 w-full ${isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"} focus:outline-none`}
        />
        <button className="p-2 px-4">
          <FaSearch className={isDarkMode ? "text-white" : "text-black"} />
        </button>
      </div>
    </div>
    <div className="flex items-center gap-4">
      <Link href="/upload">
        <FaCloudUploadAlt className="text-2xl cursor-pointer hover:text-gray-600 transition" />
      </Link>
      <FaUserCircle className="text-2xl cursor-pointer" />

      {/* Dark Mode Toggle Button */}
      <button onClick={toggleDarkMode} className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 mr-2">
        {isDarkMode ? "🌙" : "☀️"}
      </button>
    </div>
  </div>
);

export default Navbar;
