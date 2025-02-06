"use client"

import { notFound } from "next/navigation"
import { videos } from "@/server/videos"
import { createSlug } from "@/utils/drive-url"
import PDFViewer from "@/components/pdf-viewer"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"

export default function PDFPage({ params }: { params: { slug: string } }) {
  const { slug } = params
  const decodedSlug = decodeURIComponent(slug)
  
  const pdf = videos.find((video) => {
    const videoSlug = createSlug(video.Name)
    return videoSlug === decodedSlug
  })

  if (!pdf) {
    notFound()
  }

  const activeSubcategory = pdf.SubCategories1 || pdf.SubCategories2

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
          href={`/category/${encodeURIComponent(pdf.Categories)}`}
          className="hover:text-blue-600"
        >
          {pdf.Categories}
        </Link>
        {activeSubcategory && (
          <>
            <ChevronRight size={16} />
            <Link 
              href={`/category/${encodeURIComponent(pdf.Categories)}/${encodeURIComponent(activeSubcategory)}`}
              className="hover:text-blue-600"
            >
              {activeSubcategory}
            </Link>
          </>
        )}
        <ChevronRight size={16} />
        <span className="font-medium text-gray-900 truncate max-w-[300px]" title={pdf.Name.replace('.pdf', '')}>
          {pdf.Name.replace('.pdf', '')}
        </span>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-8">
        {breadcrumbs}
        <div className="container mx-auto px-4">
          <PDFViewer pdf={pdf} />
        </div>
      </div>
    </div>
  )
}

