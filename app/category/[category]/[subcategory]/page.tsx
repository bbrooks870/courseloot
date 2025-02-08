"use client"

import { Suspense } from "react"
import { useParams, useSearchParams } from "next/navigation"
import { videos } from "@/server/videos"
import { PDFCard } from "@/components/pdf-card"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { SEO } from "@/components/seo"

function SubCategoryPageContent() {
  const params = useParams()
  const searchParams = useSearchParams()
  const category = decodeURIComponent(params.category as string)
  const subcategory = decodeURIComponent(params.subcategory as string)
  const page = Number.parseInt(searchParams.get("page") || "1")
  const limit = 12 // 12 PDFs per page

  const subcategoryPDFs = videos.filter(
    (pdf) => 
      pdf.Categories === category && 
      (pdf.SubCategories1 === subcategory || pdf.SubCategories2 === subcategory)
  )
  const start = (page - 1) * limit
  const end = start + limit
  const paginatedPDFs = subcategoryPDFs.slice(start, end)
  const totalPages = Math.ceil(subcategoryPDFs.length / limit)

  return (
    <>
      <SEO 
        title={`${subcategory} - ${category} | Hindu Scriptures | Vedic Pustak`}
        description={`Read and download Hindu scriptures from ${subcategory} in ${category}. Access authentic Vedic literature at VedicPustak.com.`}
        ogDescription={`Explore Hindu scriptures from ${subcategory} in ${category}. Access authentic texts at VedicPustak.com.`}
        twitterDescription={`Browse Hindu scriptures in ${subcategory} from ${category}. Read and download sacred texts at VedicPustak.com.`}
        canonicalUrl={`https://vedicpustak.com/category/${encodeURIComponent(category)}/${encodeURIComponent(subcategory)}`}
        keywords={[
          category,
          subcategory,
          "Hindu Scriptures",
          "Sacred Texts",
          "Vedic Literature",
          "Religious Texts",
          "Spiritual Books",
          "Sanskrit Texts",
          "Ancient Wisdom",
          "Hindu Philosophy"
        ]}
      />
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-blue-600 flex items-center gap-1">
            <Home className="h-4 w-4" />
            Home
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/categories" className="hover:text-blue-600">
            Categories
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link href={`/category/${encodeURIComponent(category)}`} className="hover:text-blue-600">
            {category}
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-gray-900">{subcategory}</span>
        </div>

        <h1 className="text-3xl font-bold mb-6">{subcategory}</h1>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
          {paginatedPDFs.map((pdf) => (
            <PDFCard
              key={pdf.Link}
              title={pdf.Name}
              fileId={pdf.Link.split("id=")[1]}
              category={pdf.Categories}
              subcategory1={pdf.SubCategories1}
              subcategory2={pdf.SubCategories2}
            />
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <Link
                key={pageNum}
                href={`/category/${encodeURIComponent(category)}/${encodeURIComponent(subcategory)}?page=${pageNum}`}
                className={`px-4 py-2 rounded ${
                  pageNum === page
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {pageNum}
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default function SubCategoryPage() {
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-8">Loading subcategory...</div>}>
      <SubCategoryPageContent />
    </Suspense>
  )
} 