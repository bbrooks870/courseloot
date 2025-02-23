"use client"

import { useState, useEffect } from "react"
import { PDFCard } from "@/components/pdf-card"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"

interface PDF {
  id: string
  title: string
  category: string
  subcategory1?: string
  subcategory2?: string
  link: string
}

export default function AllPDFsPage({ params }: { params: { page: string } }) {
  const [pdfs, setPDFs] = useState<PDF[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(parseInt(params.page))
  const [totalPages, setTotalPages] = useState(1)
  const router = useRouter()

  useEffect(() => {
    const fetchPDFs = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(`/api/pdfs?page=${currentPage}&limit=12`)
        const data = await response.json()
        setPDFs(data.pdfs)
        setTotalPages(data.totalPages)
      } catch (error) {
        console.error("Failed to fetch PDFs:", error)
      }
      setIsLoading(false)
    }

    fetchPDFs()
  }, [currentPage])

  useEffect(() => {
    router.push(`/page/${currentPage}`)
    window.scrollTo(0, 0)
  }, [currentPage, router])

  const renderPaginationButtons = () => {
    const buttons = []
    const maxButtons = 5
    let start = Math.max(1, currentPage - Math.floor(maxButtons / 2))
    const end = Math.min(totalPages, start + maxButtons - 1)

    if (end - start + 1 < maxButtons) {
      start = Math.max(1, end - maxButtons + 1)
    }

    for (let i = start; i <= end; i++) {
      buttons.push(
        <Button key={i} onClick={() => setCurrentPage(i)} variant={i === currentPage ? "default" : "outline"}>
          {i}
        </Button>
      )
    }

    return buttons
  }

  const breadcrumbs = (
    <div className="flex items-center gap-1 text-sm text-gray-600 mb-6">
      <Link href="/" className="hover:text-blue-600 flex items-center gap-1">
        <Home className="h-4 w-4" />
        Home
      </Link>
      <ChevronRight className="h-4 w-4" />
      <span className="text-gray-900">All Courses</span>
    </div>
  )

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        {breadcrumbs}
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-12 h-12 animate-spin text-gray-500" />
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {breadcrumbs}
      <h1 className="text-4xl font-bold mb-8 text-center">Courses At Cheap prices - Page {currentPage}</h1>
      <h2 className="text-2xl font-semibold mb-8 text-center text-gray-600">
        Showing Page {currentPage} of {totalPages}
      </h2>


      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        {pdfs.map((pdf) => (
          <PDFCard
            key={pdf.id}
            title={pdf.title}
            fileId={pdf.id}
            category={pdf.category}
            subcategory1={pdf.subcategory1}
            subcategory2={pdf.subcategory2}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center gap-2">
          <Button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          {renderPaginationButtons()}
          <Button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  )
}

