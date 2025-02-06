"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { PDFCard } from "@/components/pdf-card"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

interface PDF {
  id: string
  title: string
  category: string
}

export function PDFGrid({ initialPage }: { initialPage: number }) {
  const [pdfs, setPDFs] = useState<PDF[]>([])
  const [currentPage, setCurrentPage] = useState(initialPage)
  const [totalPages, setTotalPages] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    fetchPDFs(currentPage)
  }, [currentPage])

  useEffect(() => {
    router.push(`/page/${currentPage}`)
    window.scrollTo(0, 0)
  }, [currentPage, router])

  const fetchPDFs = async (page: number) => {
    setIsLoading(true)
    const response = await fetch(`/api/pdfs?page=${page}&limit=16`)
    const data = await response.json()
    setPDFs(data.pdfs)
    setTotalPages(data.totalPages)
    setIsLoading(false)
  }

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
        </Button>,
      )
    }

    return buttons
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Web Development PDFs</h1>
      <h2 className="text-3xl font-bold mb-8 text-center" id="pdf-grid">
        Page {currentPage}
      </h2>
      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-12 h-12 animate-spin text-gray-500" />
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {pdfs.map((pdf) => (
            <PDFCard key={pdf.id} title={pdf.title} fileId={pdf.id} category={pdf.category} />
          ))}
        </div>
      )}
      <div className="flex justify-center mt-8 gap-2">
        <Button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
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
    </div>
  )
}

