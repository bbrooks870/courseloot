"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { SearchResults } from "@/components/search-results"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { SEO } from "@/components/seo"

function SearchPageContent() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""

  return (
    <>
      <SEO 
        title={`Search Results for "${query}" | Programming PDFs | CourseLoot`}
        description={`Search results for "${query}" in our collection of Courses At Cheap prices. Find and read coding resources at CourseLoot.live.`}
        ogDescription={`Browse search results for "${query}" in our vast collection of programming PDFs. Access free resources at CourseLoot.live.`}
        twitterDescription={`Discover programming PDFs matching "${query}". Read and download coding resources at CourseLoot.live.`}
        canonicalUrl={`https://CourseLoot.live/search?q=${encodeURIComponent(query)}`}
        keywords={[
          query,
          "Programming PDFs",
          "eBooks",
          "Coding Resources",
          "CourseLoot",
          "Search"
        ]}
      />
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-blue-600 flex items-center gap-1">
            <Home className="h-4 w-4" />
            Home
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-gray-900">Search Results</span>
        </div>

        <h1 className="text-3xl font-bold mb-6">
          Search Results for "{query}"
        </h1>

        <SearchResults query={query} />
      </div>
    </>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-8">Loading search results...</div>}>
      <SearchPageContent />
    </Suspense>
  )
}

