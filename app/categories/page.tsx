"use client"

import { useState, useEffect } from "react"
import { videos } from "@/server/videos"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"

interface Category {
  name: string
  count: number
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    const categoryMap = new Map<string, number>()

    // Count PDFs in each category
    videos.forEach((video) => {
      const count = categoryMap.get(video.Categories) || 0
      categoryMap.set(video.Categories, count + 1)
    })

    // Convert to array and sort alphabetically
    const categoryList = Array.from(categoryMap.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => a.name.localeCompare(b.name))

    setCategories(categoryList)
    setIsLoading(false)
  }, [])

  const breadcrumbs = (
    <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
      <Link href="/" className="flex items-center gap-1 hover:text-blue-600">
        <Home size={16} />
        <span>Home</span>
      </Link>
      <ChevronRight size={16} />
      <span className="font-medium text-gray-900">Browse Categories</span>
    </div>
  )

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        {breadcrumbs}
        <h1 className="text-3xl font-bold mb-6">Browse Categories</h1>
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
    <div className="container mx-auto px-4 py-8">
      {breadcrumbs}
      <h1 className="text-3xl font-bold mb-6">Browse Categories</h1>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map((category) => (
          <Link
            key={category.name}
            href={`/category/${encodeURIComponent(category.name)}`}
          >
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-2">{category.name}</h3>
                <p className="text-sm text-gray-600">{category.count} PDFs</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
} 