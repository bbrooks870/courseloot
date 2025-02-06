import { Metadata } from "next"
import { videos } from "@/server/videos"
import { createSlug } from "@/utils/drive-url"

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const decodedSlug = decodeURIComponent(params.slug)
  const pdf = videos.find((video) => createSlug(video.Name) === decodedSlug)
  
  if (!pdf) {
    return {
      title: "PDF Not Found | Vedic Pustak",
      description: "The requested PDF could not be found."
    }
  }

  const title = pdf.Name.replace('.pdf', '')
  
  return {
    title: `${title} PDF Free Download | Read Online On Vedic Pustak`,
    description: `Download ${title} PDF or read online for free. Access this authentic Hindu scripture from the ${pdf.Categories} tradition. Available in Sanskrit with translations.`,
    keywords: [
      title,
      pdf.Categories,
      "Free PDF Download",
      "Hindu Scripture",
      "Sacred Text",
      "Read Online",
      "Sanskrit Text",
      "Religious Literature",
      "Spiritual Text",
      "Ancient Wisdom"
    ],
    openGraph: {
      title: `${title} PDF Free Download | Read Online On Vedic Pustak`,
      description: `Read ${title} online or download PDF for free. Explore this sacred Hindu text from the ${pdf.Categories} tradition at VedicPustak.com.`,
      url: `https://vedicpustak.com/pdf/${params.slug}`,
      type: "article",
      images: [
        {
          url: "https://vedicpustak.com/images/meta/og-image.jpg",
          width: 1200,
          height: 630,
          alt: `${title} - Hindu Sacred Text`
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} PDF Free Download | Read Online On Vedic Pustak`,
      description: `Access ${title} PDF for free. Read online or download this sacred Hindu scripture at VedicPustak.com.`,
      images: [
        {
          url: "https://vedicpustak.com/images/meta/twitter-image.jpg",
          width: 1200,
          height: 675,
          alt: `${title} - Hindu Sacred Text`
        }
      ]
    },
    alternates: {
      canonical: `https://vedicpustak.com/pdf/${params.slug}`
    }
  }
} 