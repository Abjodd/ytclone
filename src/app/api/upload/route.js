import { NextResponse } from "next/server";
import dbConnect from "../../lib/mongodb";
import Video from "../../models/video";

export async function POST(req) {
  console.log("Connecting to MongoDB...");
  await dbConnect();
  console.log("MongoDB connected!");

  try {
    const { title, description, videoUrl } = await req.json();

    if (!videoUrl) {
      return NextResponse.json({ error: "Video URL is required" }, { status: 400 });
    }

    console.log("Saving video details to MongoDB...");
    const video = await Video.create({
      title,
      description,
      videoUrl,
      createdAt: new Date(),
    });

    console.log("Video saved successfully:", video);
    return NextResponse.json(
      { message: "Video details saved!", video },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving video:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
