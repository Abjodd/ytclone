"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaCloudUploadAlt, FaTimes, FaSpinner } from "react-icons/fa";

export default function Upload() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "my_unsigned_preset"); 

    try {
      console.log("Uploading to Cloudinary...");

      const cloudinaryResponse = await fetch(
        "https://api.cloudinary.com/v1_1/dkksk4pic/video/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const cloudinaryData = await cloudinaryResponse.json();
      console.log("Cloudinary response:", cloudinaryData);

      if (!cloudinaryData.secure_url) {
        throw new Error("Cloudinary upload failed.");
      }

      // Store the Cloudinary URL in MongoDB
      const dbResponse = await fetch("/api/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          videoUrl: cloudinaryData.secure_url,
        }),
      });

      const dbResult = await dbResponse.json();
      console.log("MongoDB Save Response:", dbResult);

      alert("Upload successful!");

      // Redirect to homepage
      setTimeout(() => {
        router.push("/");
      }, 1000);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Upload Video</h2>
          <FaTimes
            className="text-xl cursor-pointer hover:text-gray-400 transition"
            onClick={() => {
              setTitle("");
              setDescription("");
              setFile(null);
              setPreview(null);
            }}
          />
        </div>

        <label
          htmlFor="fileUpload"
          className="w-full flex flex-col items-center justify-center border-2 border-gray-600 border-dashed p-6 rounded-lg cursor-pointer hover:bg-gray-700 transition mt-4"
        >
          {preview ? (
            <video src={preview} className="w-full rounded-lg" controls />
          ) : (
            <div className="flex flex-col items-center">
              <FaCloudUploadAlt className="text-6xl text-gray-400 mb-3" />
              <p className="text-gray-400">Click or Drag a Video to Upload</p>
            </div>
          )}
          <input
            type="file"
            id="fileUpload"
            className="hidden"
            accept="video/*"
            onChange={handleFileChange}
          />
        </label>

        <form onSubmit={handleUpload} className="mt-4 space-y-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-blue-500"
            required
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-blue-500"
            rows="4"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-lg transition flex items-center justify-center"
            disabled={loading}
          >
            {loading ? (
              <>
                <FaSpinner className="animate-spin mr-2" /> Uploading...
              </>
            ) : (
              "Upload"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
