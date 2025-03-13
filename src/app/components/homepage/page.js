"use client";
import { useEffect, useState } from "react";
import VideoCard from "../VideoCard";

export default function HomePage({ isSidebarOpen, isDarkMode }) {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    console.log("Fetching videos...");
    fetch("/videos") 
      .then((res) => res.json())
      .then(setVideos)
      .catch((err) => console.error("Error fetching videos:", err));
  }, []);

  return (
    <div
      className={`transition-all duration-300 min-h-screen p-6 mt-14 overflow-y-auto 
        ${isSidebarOpen ? "pl-64" : "pl-0"} 
        ${isDarkMode ? "bg-black-900 text-white" : "bg-white text-black"} 
        scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200`}
    >
      {/* Responsive Video Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10">
        {videos.length > 0 ? (
          videos.map((video, index) => (
            <VideoCard 
              key={video._id} 
              video={video} 
              className={index === 0 ? "ml-16" : ""} // Apply left margin only to the first video
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-400">
            No videos available.
          </p>
        )}
      </div>
    </div>
  );
}
