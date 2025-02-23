import { Metadata } from "next"
import { videos } from "@/server/videos"
import { createSlug } from "@/utils/drive-url"

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const decodedSlug = decodeURIComponent(params.slug)
  const pdf = videos.find((video) => createSlug(video.Name) === decodedSlug)
  
  if (!pdf) {
    return {
      title: "PDF Not Found | CourseLoot",
      description: "The requested programming PDF could not be found."
    }
  }

  const title = pdf.Name.replace('.pdf', '')
  
  return {
    title: `${title} Course Free Download | CourseLoot`,
    description: `Download ${title} PDF or Course At Cheap Price. Access this comprehensive programming guide from the ${pdf.Categories} category. Perfect for learning and reference.`,
    keywords: [
      title,
      pdf.Categories,
      "Free PDF Download",
      "Programming Guide",
      "Coding Tutorial",
      "Read Online",
      "Technical Book",
      "Development Resource",
      "Programming Tutorial",
      "Learn to Code"
    ],
    openGraph: {
      title: `${title} Course Free Download | CourseLoot`,
      description: `Read ${title} online or download PDF for free. Master programming with this comprehensive guide from the ${pdf.Categories} category at CourseLoot.com.`,
      url: `https://CourseLoot.live/pdf/${params.slug}`,
      type: "article",
      images: [
        {
          url: "https://CourseLoot.live/preview-image.jpg",
          width: 1200,
          height: 630,
          alt: `${title} - Programming Guide`
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} Course Free Download | CourseLoot`,
      description: `Access ${title} PDF for free. Learn programming with this comprehensive guide at CourseLoot.com.`,
      images: [
        {
          url: "https://CourseLoot.live/preview-image.jpg",
          width: 1200,
          height: 675,
          alt: `${title} - Programming Guide`
        }
      ]
    },
    alternates: {
      canonical: `https://CourseLoot.live/pdf/${params.slug}`
    }
  }
} 