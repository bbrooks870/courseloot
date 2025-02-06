"use client"

import { useState, useEffect } from "react"
import { PDFCard } from "@/components/pdf-card"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PDF {
  id: string
  title: string
  category: string
  subcategory1?: string
  subcategory2?: string
  link: string
}

export function SearchResults({ query }: { query: string }) {
  const [results, setResults] = useState<PDF[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    setCurrentPage(1) // Reset to first page when query changes
  }, [query])

  useEffect(() => {
    const fetchResults = async () => {
      setIsLoading(true)
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}&page=${currentPage}&limit=12`)
      const data = await response.json()
      setResults(data.results)
      setTotalPages(data.totalPages)
      setIsLoading(false)
      window.scrollTo(0, 0)
    }

    fetchResults()
  }, [query, currentPage])

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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-12 h-12 animate-spin text-gray-500" />
      </div>
    )
  }

  if (results.length === 0) {
    return <p className="text-center text-gray-600">No results found for "{query}"</p>
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {results.map((pdf) => (
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

