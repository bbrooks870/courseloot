import { NextResponse } from "next/server"
import { videos } from "@/server/videos"

export async function GET() {
  const categories = Array.from(new Set(videos.map((video) => video.Categories)))
  return NextResponse.json({ categories })
}

