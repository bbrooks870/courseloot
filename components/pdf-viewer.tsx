"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { getDriveDirectUrl, getDriveEmbedUrl, getDriveThumbnailUrl, createSlug } from "@/utils/drive-url"
import { Download, BookOpen, FileText, AlertTriangle } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import Link from "next/link"

interface PDF {
  Link: string
  Name: string
  Categories: string
  SubCategories1?: string
  SubCategories2?: string
  Size: string
}

interface PDFViewerProps {
  pdf: PDF
}

export default function PDFViewer({ pdf }: PDFViewerProps) {
  const router = useRouter()
  const [relatedBooks, setRelatedBooks] = useState<PDF[]>([])
  const [thumbnailError, setThumbnailError] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [categories, setCategories] = useState<string[]>([])

  const { Link: fileLink, Name: title, Categories: category, Size: size } = pdf
  const fileId = fileLink.split("id=")[1]
  const pdfUrl = getDriveDirectUrl(fileId)
  const embedUrl = getDriveEmbedUrl(fileId)
  const thumbnailUrl = getDriveThumbnailUrl(fileId)

  useEffect(() => {
    const fetchRelatedBooks = async () => {
      try {
        const response = await fetch(`/api/pdfs?category=${encodeURIComponent(category)}&limit=8`)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        const convertedPdfs = data.pdfs.map((p: any) => ({
          Link: p.link,
          Name: p.title,
          Categories: p.category,
          SubCategories1: p.subcategory1,
          SubCategories2: p.subcategory2,
          Size: p.size
        }))
        setRelatedBooks(
          convertedPdfs
            .filter((relatedPdf: PDF) => relatedPdf.Link !== pdf.Link && relatedPdf.Categories === category)
            .slice(0, 8)
        )
      } catch (error) {
        console.error("Failed to fetch related books:", error)
        setError("Failed to load related books. Please try again later.")
      }
    }
    fetchRelatedBooks()
  }, [category, pdf.Link])

  const handleThumbnailError = () => {
    setThumbnailError(true)
  }

  const faqItems = [
    { 
      question: `Is ${title} an authentic Hindu scripture?`,
      answer: `Yes, this text is widely recognized in Vedic and Puranic traditions.`
    },
    {
      question: `What is the size of the ${title} PDF file?`,
      answer: `The file size is ${size}, optimized for fast downloads.`
    },
    { 
      question: `Can I read ${title} online?`,
      answer: `Absolutely! We offer a free online version.`
    },
    { 
      question: `What language is ${title} available in?`,
      answer: `Original Sanskrit with translations in Hindi, English, and more.`
    },
    { 
      question: `Is ${title} historically accurate?`,
      answer: `It is a sacred Hindu text that blends history with spiritual symbolism.`
    },
    { 
      question: `Is this book available in Sanskrit?`,
      answer: `Yes, along with English and Hindi translations.`
    },
    { 
      question: `What is the main lesson from ${title}?`,
      answer: `The book teaches core teachings like Bhakti, Dharma, Moksha, Karma.`
    },
    { 
      question: `What is the essence of ${title}?`,
      answer: `It teaches non-dualistic philosophy and self-inquiry.`
    },
    { 
      question: `Can beginners read this book?`,
      answer: `Yes, but guidance from a guru or commentary is recommended.`
    },
    { 
      question: `Where can I download ${title}?`,
      answer: `You can download it from our website in PDF format.`
    },
    { 
      question: `Is ${title} free to download?`,
      answer: `Yes, we provide a free copy for reading.`
    },
    {
      question: `Is ${title} available in other formats (ePub, Kindle, etc.)?`,
      answer: `Currently, we offer the PDF version, but other formats may be available soon.`
    },
    {
      question: `How can I open a PDF file of ${title}?`,
      answer: `You can use any PDF reader like Adobe Acrobat, Google Chrome, or your phone's built-in viewer.`
    },
    {
      question: `Is ${title} legally available for free?`,
      answer: `We provide legally authorized downloads. If the book is copyrighted, we only share public domain or permission-based versions.`
    },
    { 
      question: `Can I download ${title} on my mobile?`,
      answer: `Yes! Our PDF files are mobile-friendly.`
    },
    {
      question: `Do I need to sign up to download ${title}?`,
      answer: `No registration required! You can download it instantly.`
    },
    {
      question: `Can I share ${title} with others?`,
      answer: `You can share the download link, but redistributing copyrighted content without permission is not allowed.`
    }
  ]

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleRelatedBookClick = (slug: string) => {
    window.scrollTo(0, 0)
    router.push(`/pdf/${slug}`)
  }

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories")
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        setCategories(data.categories)
      } catch (error) {
        console.error("Failed to fetch categories:", error)
      }
    }
    fetchCategories()
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-800 break-words px-4">
        {title} PDF Free Download | Read Online for Free
      </h1>
      <p className="text-xl text-center text-gray-600 mb-8">Category: {category}</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3">
                  {thumbnailError ? (
                    <div className="w-full h-[400px] bg-gray-200 rounded-lg flex items-center justify-center">
                      <FileText className="w-16 h-16 text-gray-400" />
                    </div>
                  ) : (
                    <Image
                      src={thumbnailUrl || "/placeholder.svg"}
                      alt={title}
                      width={300}
                      height={400}
                      className="rounded-lg shadow-md w-full h-auto object-cover"
                      onError={handleThumbnailError}
                    />
                  )}
                </div>
                <div className="md:w-2/3">
                  <h2 className="text-2xl font-semibold mb-4 text-blue-600">📌 About {title} PDF</h2>
                  <p className="mb-4 text-gray-700">
                    {title} is a sacred scripture belonging to the Puranic, Itihasa tradition and explores themes of dharma.
                    
                  </p>
                  <ul className="list-disc pl-6 mb-6 text-gray-700">
                    <li>✔️ PDF Size: {size}</li>
                    <li>✔️ Categories: {category}</li>
                    <li>✔️ Free PDF format for easy reading</li>
                    <li>✔️ Easy-to-follow language</li>
                    <li>✔️ Perfect for students and professionals</li>
                  </ul>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      onClick={() => window.open(pdfUrl, "_blank")}
                      className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download Now
                    </Button>
                    <Button
                      onClick={() => window.open(embedUrl, "_blank", "noopener,noreferrer")}
                      className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white"
                    >
                      <BookOpen className="w-4 h-4 mr-2" />
                      Read Online
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4 text-blue-600">📥 How to Access {title}</h2>
              <ol className="list-decimal pl-6 mb-6 text-gray-700">
                <li>
                  Click the <strong>Download Now</strong> button to save the PDF to your device.
                </li>
                <li>
                  Use the <strong>Read Online</strong> button to view the eBook in your browser without downloading.
                </li>
                <li>Open the PDF with any compatible reader on your computer or mobile device.</li>
              </ol>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4 text-blue-600">🔑 Core Teachings of <strong>{title}</strong></h2>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="mr-2">🧘</span>
                  <span><strong>Self-Realization</strong> – Understanding the true nature of the self.</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">🌿</span>
                  <span><strong>Karma & Rebirth</strong> – The cycle of life, death, and rebirth.</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✨</span>
                  <span><strong>Union with the Divine</strong> – Achieving moksha through spiritual wisdom.</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4 text-blue-600">🕊️ Why Should You Read <strong>{title}</strong>?</h2>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="mr-2">✨</span>
                  <span>Unveils the mysteries of <strong>Hindu philosophy/ancient wisdom</strong></span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✨</span>
                  <span>Explores the <strong>spiritual and cosmic laws</strong> that govern life</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✨</span>
                  <span>Provides practical lessons on <strong>Dharma, Moksha, Bhakti, Yoga</strong></span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">🔱</span>
                  <span>Learn about <strong>the cosmic order (Sanatana Dharma)</strong></span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">🧘</span>
                  <span>Gain insights into <strong>karma, rebirth, and liberation (moksha)</strong></span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">📖</span>
                  <span>Understand the spiritual journey of <strong>great sages and kings</strong></span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4 text-blue-600">🔍 Reviews & Ratings of <strong>{title}</strong></h2>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="mr-2">⭐</span>
                  <span><strong>4.8/5</strong> – "A masterpiece! Highly recommended."</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">⭐</span>
                  <span><strong>4.7/5</strong> – "Great insights on sacred scripture belonging to the Puranic."</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4 text-blue-600">🔍 What Readers Say About <strong>{title}</strong></h2>
              <div className="text-gray-700 italic">
                "A fantastic read! <strong>{title}</strong> helped me understand Puranic, Itihasa tradition. Highly recommended!"
                <div className="mt-2 text-gray-600 not-italic">– <em>Mohan</em></div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4 text-blue-600">FAQs</h2>
              <Accordion type="single" collapsible className="w-full">
                {faqItems.map((item, index) => (
                  <AccordionItem value={`item-${index}`} key={index}>
                    <AccordionTrigger>{item.question}</AccordionTrigger>
                    <AccordionContent>{item.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4 text-blue-600">📚 Related Books</h2>
              {error ? (
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              ) : (
                <ul className="space-y-2">
                  {relatedBooks.map((book, index) => (
                    <li key={index}>
                      <button
                        onClick={() => handleRelatedBookClick(createSlug(book.Name))}
                        className="text-blue-500 hover:text-blue-700 text-left w-full truncate"
                      >
                        {book.Name}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
          <Card className="mt-8">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4 text-blue-600">📚 All Categories</h2>
              <ul className="grid grid-cols-2 gap-2">
                {categories.map((cat, index) => (
                  <li key={index}>
                    <Link href={`/category/${encodeURIComponent(cat)}`} className="text-blue-500 hover:text-blue-700">
                      {cat}
                    </Link>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

