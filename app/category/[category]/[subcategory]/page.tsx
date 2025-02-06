"use client"

import { useState, useEffect } from "react"
import { useParams, useSearchParams } from "next/navigation"
import { videos } from "@/server/videos"
import { PDFCard } from "@/components/pdf-card"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import React from "react"
import { ChevronRight, Home } from "lucide-react"
import { SEO } from "@/components/seo"

const ITEMS_PER_PAGE = 12

export default function SubCategoryPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const category = decodeURIComponent(params.category as string)
  const subcategory = decodeURIComponent(params.subcategory as string)
  const currentPage = Number(searchParams.get("page")) || 1
  const [pdfs, setPdfs] = useState<typeof videos>([])
  const [totalPages, setTotalPages] = useState(1)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    // First filter by category
    const categoryPDFs = videos.filter((video) => video.Categories === category)
    
    // Then filter by subcategory in either SubCategories1 or SubCategories2
    const filteredPDFs = categoryPDFs.filter(
      (video) => 
        video.SubCategories1 === subcategory || 
        video.SubCategories2 === subcategory
    )

    // Calculate total pages
    setTotalPages(Math.ceil(filteredPDFs.length / ITEMS_PER_PAGE))
    
    // Paginate PDFs
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const paginatedPDFs = filteredPDFs.slice(startIndex, startIndex + ITEMS_PER_PAGE)
    setPdfs(paginatedPDFs)
    setIsLoading(false)
  }, [category, subcategory, currentPage])

  const breadcrumbs = (
    <div className="container mx-auto px-4">
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
        <Link 
          href={`/category/${encodeURIComponent(category)}`}
          className="hover:text-blue-600"
        >
          {category}
        </Link>
        <ChevronRight size={16} />
        <span className="font-medium text-gray-900">{subcategory}</span>
      </div>
    </div>
  )

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        {breadcrumbs}
        <h1 className="text-3xl font-bold mb-2">{subcategory}</h1>
        <p className="text-gray-600 mb-6">Category: {category}</p>

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
      <SEO 
        title={`${subcategory} - ${category} Sacred Texts | Vedic Pustak`}
        description={`Explore ${subcategory} texts from the ${category} tradition. Access authentic Hindu scriptures and sacred texts at VedicPustak.com.`}
        ogDescription={`Browse our collection of ${subcategory} texts from ${category}. Read and download authentic Hindu scriptures at VedicPustak.com.`}
        twitterDescription={`Discover ${subcategory} texts from the ${category} tradition at VedicPustak.com.`}
        canonicalUrl={`https://vedicpustak.com/category/${encodeURIComponent(category)}/${encodeURIComponent(subcategory)}`}
        keywords={[
          subcategory,
          category,
          "Hindu Scriptures",
          "Sacred Texts",
          "Religious Literature",
          "Spiritual Texts",
          "Ancient Wisdom",
          "Sanskrit Texts",
          "Free Download",
          "Online Reading"
        ]}
      />
      <div className="container mx-auto px-4 py-8">
        {breadcrumbs}
        <h1 className="text-3xl font-bold mb-2">{subcategory}</h1>
        <p className="text-gray-600 mb-6">Category: {category}</p>
        
        {pdfs.length > 0 ? (
          <>
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
        ) : !isLoading && (
          <p className="text-center text-gray-600">No PDFs found in this subcategory.</p>
        )}
      </div>
    </>
  )
} 