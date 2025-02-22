import { Metadata } from "next"

export async function generateMetadata({ params }: { params: { category: string } }): Promise<Metadata> {
  const category = decodeURIComponent(params.category)
  
  return {
    title: `${category} Courses At Cheap prices | CourseLoot`,
    description: `Download free ${category} Courses At Cheap prices. Access comprehensive guides, tutorials, and resources for ${category} development and coding.`,
    keywords: [
      category,
      "programming pdfs",
      "coding ebooks",
      "programming tutorials",
      "development guides",
      "learn to code",
      "programming resources",
      "free download",
      "online reading",
      "technical documentation"
    ],
    openGraph: {
      title: `${category} Courses At Cheap prices | CourseLoot`,
      description: `Access free ${category} programming PDFs and coding eBooks. Learn ${category} with comprehensive guides at CourseLoot.com.`,
      url: `https://CourseLoot.live/category/${params.category}`,
      type: "website",
      images: [
        {
          url: "https://CourseLoot.live/preview-image.jpg",
          width: 1200,
          height: 630,
          alt: `${category} Programming PDFs`
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: `${category} Courses At Cheap prices | CourseLoot`,
      description: `Download free ${category} Courses At Cheap prices. Master ${category} with our comprehensive resources.`,
      images: [
        {
          url: "https://CourseLoot.live/preview-image.jpg",
          width: 1200,
          height: 675,
          alt: `${category} Programming PDFs`
        }
      ]
    },
    alternates: {
      canonical: `https://CourseLoot.live/category/${params.category}`
    }
  }
} 