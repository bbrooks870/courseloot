import { NextResponse } from "next/server"
import { pdfs } from "@/server/videos"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = Number.parseInt(searchParams.get("page") || "1")
  const limit = 16 // 16 PDFs per page

  const start = (page - 1) * limit
  const end = start + limit

  const paginatedPDFs = pdfs.slice(start, end)

  return NextResponse.json({
    pdfs: paginatedPDFs,
    totalPages: Math.ceil(pdfs.length / limit),
    currentPage: page,
  })
}

