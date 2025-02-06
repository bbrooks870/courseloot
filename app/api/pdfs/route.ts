import { NextResponse } from "next/server"
import { videos } from "@/server/videos"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = parseInt(searchParams.get("page") || "1")
  const limit = parseInt(searchParams.get("limit") || "12")
  const category = searchParams.get("category")

  let filteredPdfs = videos

  if (category) {
    filteredPdfs = videos.filter(pdf => pdf.Categories.toLowerCase() === category.toLowerCase())
  }

  // Calculate pagination
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const totalPages = Math.ceil(filteredPdfs.length / limit)
  const paginatedPdfs = filteredPdfs.slice(startIndex, endIndex).map(pdf => ({
    id: pdf.Link.split("id=")[1],
    title: pdf.Name,
    category: pdf.Categories,
    subcategory1: pdf.SubCategories1,
    subcategory2: pdf.SubCategories2,
    link: pdf.Link
  }))

  return NextResponse.json({
    pdfs: paginatedPdfs,
    totalPages,
    currentPage: page,
    totalItems: filteredPdfs.length
  })
}

