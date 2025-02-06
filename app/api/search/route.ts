import { NextResponse } from "next/server"
import { videos } from "@/server/videos"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("q")?.toLowerCase() || ""
  const category = searchParams.get("category")?.toLowerCase() || ""
  const page = parseInt(searchParams.get("page") || "1")
  const limit = parseInt(searchParams.get("limit") || "12")

  if (!query) {
    return NextResponse.json({ results: [], totalPages: 0, currentPage: page })
  }

  const filteredResults = videos.filter((pdf) => {
    const titleMatch = pdf.Name.toLowerCase().includes(query)
    const categoryMatch = category ? pdf.Categories.toLowerCase() === category : true
    const subcategory1Match = pdf.SubCategories1?.toLowerCase().includes(query) || false
    const subcategory2Match = pdf.SubCategories2?.toLowerCase().includes(query) || false

    return (titleMatch || subcategory1Match || subcategory2Match) && categoryMatch
  }).map(pdf => ({
    id: pdf.Link.split("id=")[1],
    title: pdf.Name,
    category: pdf.Categories,
    subcategory1: pdf.SubCategories1,
    subcategory2: pdf.SubCategories2,
    link: pdf.Link
  }))

  // Calculate pagination
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const totalPages = Math.ceil(filteredResults.length / limit)
  const paginatedResults = filteredResults.slice(startIndex, endIndex)

  return NextResponse.json({
    results: paginatedResults,
    totalPages,
    currentPage: page
  })
}

