"use client"

import { useSearchParams } from "next/navigation"
import { SearchResults } from "@/components/search-results"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { SEO } from "@/components/seo"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""

  return (
    <>
      <SEO 
        title={`Search Results for "${query}" | Hindu Scriptures | Vedic Pustak`}
        description={`Search results for "${query}" in our collection of Hindu scriptures and sacred texts. Find and read authentic Vedic literature at VedicPustak.com.`}
        ogDescription={`Browse search results for "${query}" in our vast collection of Hindu scriptures. Access authentic texts at VedicPustak.com.`}
        twitterDescription={`Discover Hindu scriptures matching "${query}". Read and download sacred texts at VedicPustak.com.`}
        canonicalUrl={`https://vedicpustak.com/search?q=${encodeURIComponent(query)}`}
        keywords={[
          query,
          "Hindu Scriptures",
          "Sacred Texts",
          "Vedic Literature",
          "Religious Texts",
          "Spiritual Books",
          "Sanskrit Texts",
          "Ancient Wisdom",
          "Hindu Philosophy",
          "Vedic Search"
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

