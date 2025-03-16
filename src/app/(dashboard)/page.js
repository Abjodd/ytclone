"use client";
import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import HomePage from "../components/homepage/page";

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      setIsDarkMode(true);
    }
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  return (
    <div className={`flex w-full h-screen ${isDarkMode ? "dark-mode" : ""}`}>
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} isDarkMode={isDarkMode} />

      {/* Main Content */}
      <div
        className={`flex-1 transition-all duration-300 ml-16 ${
          isSidebarOpen ? "md:ml-56" : "ml-16"
        } flex flex-col h-screen`}
      >
        <Navbar
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          toggleDarkMode={() => setIsDarkMode(!isDarkMode)}
          isDarkMode={isDarkMode}
        />

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-4">
          <HomePage isSidebarOpen={isSidebarOpen} isDarkMode={isDarkMode} />
          
        </div>
      </div>
    </div>
  );
}
