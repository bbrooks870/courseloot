"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { videos } from "@/server/videos"
import { Card, CardContent } from "@/components/ui/card"

interface Category {
  name: string
  count: number
}

export function CategoryGrid() {
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    const categoryMap = new Map<string, number>()
    videos.forEach((video) => {
      const count = categoryMap.get(video.Categories) || 0
      categoryMap.set(video.Categories, count + 1)
    })
    const categoryList = Array.from(categoryMap.entries()).map(([name, count]) => ({ name, count }))
    setCategories(categoryList)
  }, [])

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {categories.map((category) => (
        <Link key={category.name} href={`/category/${encodeURIComponent(category.name)}`}>
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold mb-2">{category.name}</h3>
              <p className="text-sm text-gray-600">{category.count} PDFs</p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}

