import { Inter } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Metadata } from "next"
import Script from "next/script"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CourseLoot: Courses At Cheap prices",
  description: "Find courses at cheap prices on CourseLoot.",
  keywords: [
    "CourseLoot",
    "programming ebooks",
    "download programming books",
    "learn coding online",
    "free programming resources",
    "Python",
    "Java",
    "JavaScript",
    "C++",
    "AI",
    "Web Development",
    "Machine Learning",
    "Data Science",
    "Mobile Development",
    "Cloud Computing"
  ],
  authors: [{ name: "CourseLoot" }],
  creator: "CourseLoot",
  publisher: "CourseLoot",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    url: "https://courseloot.com",
    title: "CourseLoot: Courses At Cheap prices",
    description: "Find courses at cheap prices on CourseLoot.",
    siteName: "CourseLoot",
    images: [
      {
        url: "https://courseheistshop.info/preview-image.jpg",
        width: 1200,
        height: 630,
        alt: "CourseLoot - Programming eBooks Library"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "CourseLoot: Courses At Cheap prices",
    description: "Find courses at cheap prices on CourseLoot.",
    creator: "@CourseLoot",
    images: [
      {
        url: "https://courseheistshop.info/preview-image.jpg",
        width: 1200,
        height: 675,
        alt: "CourseLoot - Programming eBooks Library"
      }
    ]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: "https://courseloot.com"
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION || "",
    yahoo: process.env.NEXT_PUBLIC_YAHOO_VERIFICATION || "",
    other: {
      me: [process.env.NEXT_PUBLIC_PERSONAL_WEBSITE || ""]
    },
  },
  category: "Technology"
}

// JSON-LD Schema
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "CourseLoot",
  url: "https://courseheistshop.info",
  description: "Get CourseLoots and programming eBooks for Python, Java, JavaScript, C++, Web Development, AI, and more. Download and start learning today!",
  image: "https://courseheistshop.info/preview-image.jpg",
  publisher: {
    "@type": "Organization",
    name: "CourseLoot",
    logo: {
      "@type": "ImageObject",
      url: "https://courseheistshop.info/logo.png"
    }
  },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://courseheistshop.info/search?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-8E2E3V1KGP"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            // Initialize Google Analytics
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-8E2E3V1KGP');
          `}
        </Script>
      </head>
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}

