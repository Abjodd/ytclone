import { NextResponse } from "next/server";
import dbConnect from "../lib/mongodb";
import Video from "../models/video";

export async function GET() {
  console.log("Fetching videos from MongoDB...");
  await dbConnect();

  try {
    const videos = await Video.find().sort({ createdAt: -1 }); 
    return NextResponse.json(videos, { status: 200 });
  } catch (error) {
    console.error("Error fetching videos:", error);
    return NextResponse.json({ error: "Failed to fetch videos" }, { status: 500 });
  }
}
