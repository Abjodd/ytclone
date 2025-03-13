import { NextResponse } from "next/server";
import cloudinary from "../../lib/cloudinary";
import dbConnect from "../../lib/mongodb";
import Video from "../../models/video";

export async function POST(req) {
  console.log("Connecting to MongoDB...");
  await dbConnect();
  console.log("MongoDB connected!");

  try {
    // Get form data
    const formData = await req.formData();
    const file = formData.get("file");
    const title = formData.get("title") || "Untitled";
    const description = formData.get("description") || "No description";

    if (!file) {
      console.error("No file uploaded");
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Convert file to Buffer
    const buffer = await file.arrayBuffer();
    const fileData = Buffer.from(buffer);

    console.log("Uploading to Cloudinary...");
    const uploadResponse = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ resource_type: "video" }, (error, result) => {
          if (error) reject(error);
          else resolve(result);
        })
        .end(fileData);
    });

    console.log("Cloudinary response:", uploadResponse);

    if (!uploadResponse.secure_url) {
      console.error("Cloudinary upload failed");
      return NextResponse.json({ error: "Upload failed" }, { status: 500 });
    }

    console.log("Saving video to MongoDB...");
    const video = await Video.create({
      title,
      description,
      videoUrl: uploadResponse.secure_url,
      createdAt: new Date(),
    });

    console.log("Video saved successfully:", video);

    return NextResponse.json(
      { message: "Video uploaded & saved!", video },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error uploading video:", error);
    return NextResponse.json({ error: error.message || "Upload failed" }, { status: 500 });
  }
}

export const config = {
  api: {
    bodyParser: false, // Disable default bodyParser
  },
};
