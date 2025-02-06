import { Metadata } from "next"

export async function generateMetadata({ params }: { params: { category: string } }): Promise<Metadata> {
  const category = decodeURIComponent(params.category)
  
  return {
    title: `${category} Hindu Sacred Texts & Scriptures | Vedic Pustak`,
    description: `Explore our collection of ${category} Hindu scriptures and sacred texts. Find authentic PDFs from the ${category} tradition at VedicPustak.com.`,
    keywords: [
      category,
      "Hindu Scriptures",
      "Sacred Texts",
      "Religious Literature",
      "Spiritual Texts",
      "Ancient Wisdom",
      "Sanskrit Texts",
      "Free Download",
      "Online Reading",
      "Vedic Literature"
    ],
    openGraph: {
      title: `${category} Hindu Sacred Texts & Scriptures | Vedic Pustak`,
      description: `Access authentic ${category} Hindu scriptures and sacred texts. Read and download PDFs from VedicPustak.com's ${category} collection.`,
      url: `https://vedicpustak.com/category/${params.category}`,
      type: "website",
      images: [
        {
          url: "https://vedicpustak.com/images/meta/og-image.jpg",
          width: 1200,
          height: 630,
          alt: `${category} Hindu Sacred Texts`
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: `${category} Hindu Sacred Texts & Scriptures | Vedic Pustak`,
      description: `Discover ${category} Hindu scriptures and sacred texts. Browse our collection at VedicPustak.com.`,
      images: [
        {
          url: "https://vedicpustak.com/images/meta/twitter-image.jpg",
          width: 1200,
          height: 675,
          alt: `${category} Hindu Sacred Texts`
        }
      ]
    },
    alternates: {
      canonical: `https://vedicpustak.com/category/${params.category}`
    }
  }
} 