import { NextResponse } from "next/server"
import { videos } from "@/server/videos"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = Number.parseInt(searchParams.get("page") || "1")
  const limit = 16 // 16 videos per page

  const start = (page - 1) * limit
  const end = start + limit

  const paginatedVideos = videos.slice(start, end)

  return NextResponse.json({
    videos: paginatedVideos,
    totalPages: Math.ceil(videos.length / limit),
    currentPage: page,
  })
}

