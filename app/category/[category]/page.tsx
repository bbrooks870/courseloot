"use client"

import { useState, useEffect } from "react"
import { useParams, useSearchParams } from "next/navigation"
import { videos } from "@/server/videos"
import { PDFCard } from "@/components/pdf-card"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import React from "react"
import { ChevronRight, Home } from "lucide-react"

interface SubCategory {
  name: string
  count: number
}

const ITEMS_PER_PAGE = 12

export default function CategoryPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const category = decodeURIComponent(params.category as string)
  const currentPage = Number(searchParams.get("page")) || 1
  const [subCategories, setSubCategories] = useState<SubCategory[]>([])
  const [pdfs, setPdfs] = useState<typeof videos>([])
  const [totalPages, setTotalPages] = useState(1)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    const filteredVideos = videos.filter((video) => video.Categories === category)
    const subCategoryMap = new Map<string, number>()

    // Collect both SubCategories1 and SubCategories2
    filteredVideos.forEach((video) => {
      if (video.SubCategories1) {
        const count = subCategoryMap.get(video.SubCategories1) || 0
        subCategoryMap.set(video.SubCategories1, count + 1)
      }
      if (video.SubCategories2) {
        const count = subCategoryMap.get(video.SubCategories2) || 0
        subCategoryMap.set(video.SubCategories2, count + 1)
      }
    })

    const subCategoryList = Array.from(subCategoryMap.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => a.name.localeCompare(b.name))

    setSubCategories(subCategoryList)

    // Get PDFs that are directly in the category (no subcategory)
    const directPDFs = filteredVideos.filter(
      (video) => !video.SubCategories1 && !video.SubCategories2
    )

    // Calculate total pages
    setTotalPages(Math.ceil(directPDFs.length / ITEMS_PER_PAGE))

    // Paginate PDFs
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const paginatedPDFs = directPDFs.slice(startIndex, startIndex + ITEMS_PER_PAGE)
    setPdfs(paginatedPDFs)
    setIsLoading(false)
  }, [category, currentPage])

  const breadcrumbs = (
    <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
      <Link href="/" className="flex items-center gap-1 hover:text-blue-600">
        <Home size={16} />
        <span>Home</span>
      </Link>
      <ChevronRight size={16} />
      <Link href="/categories" className="hover:text-blue-600">
        Categories
      </Link>
      <ChevronRight size={16} />
      <span className="font-medium text-gray-900">{category}</span>
    </div>
  )

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        {breadcrumbs}
        <h1 className="text-3xl font-bold mb-6">{category}</h1>
        <div className="animate-pulse">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-gray-200 rounded-lg h-48"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        {breadcrumbs}
        <h1 className="text-3xl font-bold mb-6">{category}</h1>
        
        {/* Show subcategories if they exist */}
        {subCategories.length > 0 && (
          <>
            <h2 className="text-2xl font-semibold mb-4">Subcategories</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
              {subCategories.map((subCategory) => (
                <Link
                  key={subCategory.name}
                  href={`/category/${encodeURIComponent(category)}/${encodeURIComponent(subCategory.name)}`}
                >
                  <Card className="hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-4">
                      <h3 className="text-lg font-semibold mb-2">{subCategory.name}</h3>
                      <p className="text-sm text-gray-600">{subCategory.count} PDFs</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </>
        )}

        {/* Show direct PDFs */}
        {pdfs.length > 0 && (
          <>
            <h2 className="text-2xl font-semibold mb-4">PDFs</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
              {pdfs.map((pdf) => (
                <PDFCard 
                  key={pdf.Link} 
                  title={pdf.Name} 
                  fileId={pdf.Link.split("id=")[1]} 
                  category={pdf.Categories} 
                />
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8">
                <Button
                  variant="outline"
                  disabled={currentPage === 1}
                  onClick={() => window.location.href = `?page=${currentPage - 1}`}
                >
                  Previous
                </Button>

                {/* Page Numbers */}
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter(pageNum => {
                    // Show first page, last page, and 2 pages before and after current page
                    return (
                      pageNum === 1 ||
                      pageNum === totalPages ||
                      (pageNum >= currentPage - 2 && pageNum <= currentPage + 2)
                    )
                  })
                  .map((pageNum, index, array) => (
                    <React.Fragment key={pageNum}>
                      {index > 0 && array[index - 1] !== pageNum - 1 && (
                        <span className="px-2">...</span>
                      )}
                      <Button
                        variant={currentPage === pageNum ? "default" : "outline"}
                        onClick={() => window.location.href = `?page=${pageNum}`}
                      >
                        {pageNum}
                      </Button>
                    </React.Fragment>
                  ))}

                <Button
                  variant="outline"
                  disabled={currentPage === totalPages}
                  onClick={() => window.location.href = `?page=${currentPage + 1}`}
                >
                  Next
                </Button>
              </div>
            )}
          </>
        )}

        {/* Show message if no content and not loading */}
        {!isLoading && subCategories.length === 0 && pdfs.length === 0 && (
          <p className="text-center text-gray-600">No content found in this category.</p>
        )}
      </div>
    </>
  )
}

