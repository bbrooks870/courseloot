"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getDriveThumbnailUrl, createSlug } from "@/utils/drive-url"
import { FileText, Eye } from "lucide-react"

interface PDFCardProps {
  title: string
  fileId: string
  category: string
  subcategory1?: string
  subcategory2?: string
}

export function PDFCard({ title, fileId, category, subcategory1, subcategory2 }: PDFCardProps) {
  const [thumbnailError, setThumbnailError] = useState(false)
  // Extract the actual ID from the full Google Drive URL if needed
  const actualFileId = fileId.includes("id=") ? fileId.split("id=")[1] : fileId
  const thumbnailUrl = getDriveThumbnailUrl(actualFileId)
  const slug = createSlug(title)

  const handleThumbnailError = () => {
    setThumbnailError(true)
  }

  const pdfPageUrl = `/pdf/${slug}`

  return (
    <div className="flex flex-col gap-2 w-full max-w-[200px] mx-auto group min-h-[320px]">
      <Link href={pdfPageUrl} className="flex-shrink-0">
        <div className="relative aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden shadow-md transition-transform duration-300 ease-in-out transform group-hover:scale-105 cursor-pointer">
          {thumbnailError ? (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-200 text-gray-600">
              <FileText className="w-16 h-16" />
            </div>
          ) : (
            <Image
              src={thumbnailUrl || "/placeholder.svg"}
              alt={title}
              layout="fill"
              objectFit="cover"
              onError={handleThumbnailError}
            />
          )}
        </div>
      </Link>
      <div className="flex flex-col flex-grow justify-between gap-2">
        <div className="space-y-2">
          <h3 className="text-sm font-medium line-clamp-2 group-hover:text-blue-600 transition-colors duration-300 text-center px-1">
            {title}
          </h3>
          <div className="flex flex-col items-center gap-1">
            <p className="text-xs text-gray-500 text-center line-clamp-1 px-1">{category}</p>
            {subcategory1 && <p className="text-xs text-gray-400 text-center line-clamp-1 px-1">{subcategory1}</p>}
            {subcategory2 && <p className="text-xs text-gray-400 text-center line-clamp-1 px-1">{subcategory2}</p>}
          </div>
        </div>
        <Link href={pdfPageUrl} className="mt-auto block">
          <Button
            variant="outline"
            size="sm"
            className="w-full bg-[#98D462] text-black hover:bg-[#8BC456] hover:text-white border-0 transition-colors duration-300 flex items-center justify-center gap-2"
          >
            <Eye className="w-4 h-4" />
            View PDF
          </Button>
        </Link>
      </div>
    </div>
  )
}

