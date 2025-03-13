import Link from "next/link";
import Image from "next/image";

export default function VideoCard({ video }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 transition-all duration-300 hover:shadow-xl">
      {/* Video Player */}
      <div className="relative w-full rounded-lg overflow-hidden">
        <video controls className="w-full h-auto rounded-lg">
          <source src={video.videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Video Details */}
      <div className="mt-4 flex gap-3">
        {/* User Avatar */}
        <div className="flex-shrink-0">
          <Image
            src="/yt.png"
            alt="User Avatar"
            width={40}
            height={40}
            className="rounded-full"
          />
        </div>

        {/* Video Title & Description */}
        <div className="flex-1">
          <h3 className="font-bold text-lg text-gray-900 hover:text-red-600 transition duration-200 cursor-pointer">
            {video.title}
          </h3>
          <p className="text-gray-500 text-sm">{video.description}</p>
        </div>
      </div>
    </div>
  );
}
