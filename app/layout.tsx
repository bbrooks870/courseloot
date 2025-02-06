import { Inter } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { Metadata } from "next"
import Script from "next/script"
import { AnalyticsWrapper } from "@/components/analytics-wrapper"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Vedic Pustak – Explore Ancient Hindu Scriptures & Sacred Texts",
  description: "Discover a vast collection of ancient Hindu scriptures, Vedas, Upanishads, Puranas, and sacred texts. Read and explore the wisdom of Sanatan Dharma.",
  keywords: ["Hindu Scriptures", "Vedic Texts", "Upanishads", "Puranas", "Sanatan Dharma", "Sanskrit Texts"],
  authors: [{ name: "VedicPustak.com" }],
  openGraph: {
    type: "website",
    url: "https://vedicpustak.com",
    title: "Vedic Pustak – Explore Ancient Hindu Scriptures & Sacred Texts",
    description: "Read sacred Hindu texts like Vedas, Upanishads, and Puranas online. Discover the divine wisdom of Sanatan Dharma at VedicPustak.com.",
    siteName: "Vedic Pustak",
    images: [
      {
        url: "https://vedicpustak.com/images/meta/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Vedic Pustak - Hindu Sacred Texts Library"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Vedic Pustak – Explore Ancient Hindu Scriptures & Sacred Texts",
    description: "Read sacred Hindu texts like Vedas, Upanishads, and Puranas online. Discover the divine wisdom of Sanatan Dharma at VedicPustak.com.",
    images: [
      {
        url: "https://vedicpustak.com/images/meta/twitter-image.jpg",
        width: 1200,
        height: 675,
        alt: "Vedic Pustak - Hindu Sacred Texts Library"
      }
    ]
  },
  robots: {
    index: true,
    follow: true
  },
  alternates: {
    canonical: "https://vedicpustak.com"
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-3WB4BSNECN"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-3WB4BSNECN');
          `}
        </Script>
      </head>
      <body className={inter.className}>
        <AnalyticsWrapper>
          <Header />
          {children}
        </AnalyticsWrapper>
      </body>
    </html>
  )
}

