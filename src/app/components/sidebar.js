import React from "react";
import { 
  FaHome, FaFire, FaVideo, FaHistory, FaMusic, FaGamepad, 
  FaFilm, FaNewspaper, FaTv, FaPodcast, FaHeart 
} from "react-icons/fa";
import Link from "next/link";

const Sidebar = ({ isOpen, isDarkMode }) => {
  return (
    <div
      className={`h-screen text-black shadow-lg transition-all duration-300 overflow-hidden 
        ${isOpen ? "w-56" : "w-16"} fixed left-0 top-14 
        ${isDarkMode ? "bg-black-900 text-white" : "bg-white text-black"}`}
    >
      <ul className="flex flex-col gap-2 p-3">
        {[
          { icon: <FaHome />, text: "Home" },
          { icon: <FaFire />, text: "Trending" },
          { icon: <FaVideo />, text: "Subscriptions" },
          { icon: <FaHistory />, text: "History" },
          { icon: <FaMusic />, text: "Music" },
          { icon: <FaGamepad />, text: "Gaming" },
          { icon: <FaFilm />, text: "Movies" },
          { icon: <FaNewspaper />, text: "News" },
          { icon: <FaTv />, text: "Live TV" },
          { icon: <FaPodcast />, text: "Podcasts" },
          { icon: <FaHeart />, text: "Favorites" },
        ].map((item, index) => (
          <li key={index}>
            <Link
              href="/"
              className={`flex items-center gap-3 p-3 cursor-pointer rounded-lg transition-all 
                ${isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-300"}`}
            >
              {item.icon} {isOpen && item.text}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
