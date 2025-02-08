import { Metadata } from "next"

export async function generateMetadata({ params }: { params: { category: string } }): Promise<Metadata> {
  const category = decodeURIComponent(params.category)
  
  return {
    title: `${category} Programming PDFs & eBooks | FreeCodingPDF`,
    description: `Download free ${category} programming PDFs and eBooks. Access comprehensive guides, tutorials, and resources for ${category} development and coding.`,
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
      title: `${category} Programming PDFs & eBooks | FreeCodingPDF`,
      description: `Access free ${category} programming PDFs and coding eBooks. Learn ${category} with comprehensive guides at FreeCodingPDF.com.`,
      url: `https://freecodingpdf.live/category/${params.category}`,
      type: "website",
      images: [
        {
          url: "https://freecodingpdf.live/preview-image.jpg",
          width: 1200,
          height: 630,
          alt: `${category} Programming PDFs`
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: `${category} Programming PDFs & eBooks | FreeCodingPDF`,
      description: `Download free ${category} programming PDFs and eBooks. Master ${category} with our comprehensive resources.`,
      images: [
        {
          url: "https://freecodingpdf.live/preview-image.jpg",
          width: 1200,
          height: 675,
          alt: `${category} Programming PDFs`
        }
      ]
    },
    alternates: {
      canonical: `https://freecodingpdf.live/category/${params.category}`
    }
  }
} 