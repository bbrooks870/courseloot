import { HomeContent } from "@/components/home-content"
import { CategoryGrid } from "@/components/category-grid"
import { SEO } from "@/components/seo"

export default function Home() {
  return (
    <>
      <SEO />
      <HomeContent />
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8 text-center">Browse Categories</h2>
        <CategoryGrid />
      </div>
    </>
  )
}

