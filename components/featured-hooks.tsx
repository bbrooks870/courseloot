"use client"

import { useState, useEffect } from "react"
import { PDFCard } from "@/components/pdf-card"
import { Loader2 } from "lucide-react"
import Link from "next/link"

interface PDF {
  id: string
  title: string
}

export function FeaturedPDFs() {
  const [pdfs, setPDFs] = useState<PDF[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchPDFs()
  }, [])

  const fetchPDFs = async () => {
    setIsLoading(true)
    const response = await fetch("/api/pdfs?page=1&limit=8")
    const data = await response.json()
    setPDFs(data.pdfs)

    setIsLoading(false)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-8 text-center">Featured Web Development PDFs</h2>
      <p className="text-center text-gray-600 mb-8">
        Discover our top-rated web development PDFs. These comprehensive guides cover essential topics to help you
        enhance your skills and stay up-to-date with the latest technologies.
      </p>
      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-12 h-12 animate-spin text-gray-500" />
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {pdfs.map((pdf) => (
            <PDFCard key={pdf.id} title={pdf.title} fileId={pdf.id} />
          ))}
        </div>
      )}
      <div className="text-center mt-8">
        <Link
          href="/page/1"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition duration-300"
        >
          View All Web Development PDFs
        </Link>
      </div>
    </div>
  )
}

