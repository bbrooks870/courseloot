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
        console.log("API Response:", data);
        const convertedPdfs = data.pdfs.map((p: any) => ({
          Link: p.link,
          Name: p.title,
          Categories: p.category,
          SubCategories1: p.subcategory1,
          SubCategories2: p.subcategory2,
          Size: p.size
        }))
        console.log("Converted PDFs:", convertedPdfs);
        setRelatedBooks(
          convertedPdfs
            // .filter((relatedPdf: PDF) =>
            //   relatedPdf.Link !== pdf.Link &&
            //   relatedPdf.Categories.trim().toLowerCase() === category.trim().toLowerCase()
            // )
            .sort(() => Math.random() - 0.5) // Shuffle the array
            .slice(0, 8)
        )
        console.log("Related Books:", relatedBooks);
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
        {title} Course Free Download | Course At Cheap Price
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
                    {title} is a best course ever, covering essential concepts in {category}. Perfect for beginners and professionals alike.
                  </p>
                  <ul className="list-disc pl-6 mb-6 text-gray-700">
                    <li>✔️ PDF Size: {size}</li>
                    <li>✔️ Categories: {category}</li>
                    <li>✔️ DM on <a href="https://gdls.me/wp" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Whatsapp</a></li>
                    <li>✔️ DM on <a href="https://gdls.me/dm" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Telegram</a></li>
                    <li>✔️ Ideal for self-learners and developers</li>
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
              <h2 className="text-2xl font-semibold mb-4 text-blue-600">🔑 Key Topics Covered in <strong>{title}</strong></h2>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="mr-2">💻</span>
                  <span><strong>Fundamental Concepts</strong> – Learn the core principles of {category}.</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">🛠️</span>
                  <span><strong>Hands-on Examples</strong> – Practical exercises to improve  skills.</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">📜</span>
                  <span><strong>Best Practices</strong> – Industry standards and clean  techniques.</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">🔍</span>
                  <span><strong>Advanced Topics</strong> – Deep dive into algorithms, AI, and more.</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4 text-blue-600">🚀 Why Should You Download <strong>{title}</strong>?</h2>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="mr-2">📚</span>
                  <span>Comprehensive guide to <strong>{category}</strong></span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">🖥️</span>
                  <span>Step-by-step explanations with real-world examples</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">🎯</span>
                  <span>Perfect for <strong>beginners & experienced coders</strong></span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">⚡</span>
                  <span>Boost your <strong> skills and career</strong></span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">📖</span>
                  <span>Completely <strong>free to download & read</strong></span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4 text-blue-600">⭐ Reviews & Ratings of <strong>{title}</strong></h2>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="mr-2">⭐</span>
                  <span><strong>4.8/5</strong> – "An excellent programming resource!"</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">⭐</span>
                  <span><strong>4.7/5</strong> – "Very well-structured and easy to follow."</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4 text-blue-600">📝 What Readers Say About <strong>{title}</strong></h2>
              <div className="text-gray-700 italic">
                "A must-have for anyone learning {category}. Clear explanations and great examples!"
                <div className="mt-2 text-gray-600 not-italic">– <em>Rahul</em></div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4 text-blue-600">❓ Frequently Asked Questions</h2>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>📘 Is {title} suitable for beginners?</AccordionTrigger>
                  <AccordionContent>Yes! It's designed for both beginners and experienced coders.</AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>💾 What is the size of {title} PDF?</AccordionTrigger>
                  <AccordionContent>{size}, optimized for quick downloads.</AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>🌐 Can I read {title} online?</AccordionTrigger>
                  <AccordionContent>Yes! We provide a free online reading option.</AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>📚 What programming languages does this book cover?</AccordionTrigger>
                  <AccordionContent>It covers {category} including Python, Java, JavaScript, and more.</AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                  <AccordionTrigger>⚡ Is {title} available in other formats?</AccordionTrigger>
                  <AccordionContent>Yes, we offer PDF, EPUB, and Kindle formats.</AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-6">
                  <AccordionTrigger>📥 Do I need to sign up to download {title}?</AccordionTrigger>
                  <AccordionContent>No, instant download without registration.</AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-7">
                  <AccordionTrigger>📱 Can I download {title} on my phone?</AccordionTrigger>
                  <AccordionContent>Yes, it's mobile-friendly!</AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-8">
                  <AccordionTrigger>🛠️ What tools do I need to follow along?</AccordionTrigger>
                  <AccordionContent>Basic  tools like VS Code, Python, and a browser are enough.</AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-9">
                  <AccordionTrigger>🔓 Is {title} free to download?</AccordionTrigger>
                  <AccordionContent>Yes, it's completely free!</AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-10">
                  <AccordionTrigger>📩 Can I share {title} with others?</AccordionTrigger>
                  <AccordionContent>You can share the link, but not redistribute copyrighted material.</AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4 text-blue-600">📚 Related Courses</h2>
              {error ? (
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              ) : (
                <ul className="space-y-2">
                  {relatedBooks.length > 0 ? (
                    relatedBooks.map((book, index) => (
                      <li key={index}>
                        <button
                          onClick={() => handleRelatedBookClick(createSlug(book.Name))}
                          className="text-blue-500 hover:text-blue-700 text-left w-full truncate"
                        >
                          {book.Name}
                        </button>
                      </li>
                    ))
                  ) : (
                    <li>No related courses found.</li>
                  )}
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

