import Head from "next/head"

interface SEOProps {
  title?: string
  description?: string
  ogDescription?: string
  twitterDescription?: string
  canonicalUrl?: string
  keywords?: string[]
  ogImage?: string
  twitterImage?: string
  type?: string
  author?: string
}

export function SEO({ 
  title = "Vedic Pustak – Explore Ancient Hindu Scriptures & Sacred Texts",
  description = "Discover a vast collection of ancient Hindu scriptures, Vedas, Upanishads, Puranas, and sacred texts. Read and explore the wisdom of Sanatan Dharma.",
  ogDescription = "Read sacred Hindu texts like Vedas, Upanishads, and Puranas online. Discover the divine wisdom of Sanatan Dharma at VedicPustak.com.",
  twitterDescription = "Read sacred Hindu texts like Vedas, Upanishads, and Puranas online. Discover the divine wisdom of Sanatan Dharma at VedicPustak.com.",
  canonicalUrl = "https://vedicpustak.com",
  keywords = [
    "Vedic Pustak",
    "Hindu Scriptures",
    "Vedas",
    "Upanishads",
    "Puranas",
    "Sanatan Dharma",
    "Bhagavad Gita",
    "Ramayana",
    "Mahabharata",
    "Ancient Hindu Texts",
    "Sacred Books"
  ],
  ogImage = "https://vedicpustak.com/images/meta/og-image.jpg",
  twitterImage = "https://vedicpustak.com/images/meta/twitter-image.jpg",
  type = "website",
  author = "VedicPustak.com"
}: SEOProps) {
  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(", ")} />
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={ogDescription} />
      <meta property="og:image" content={ogImage} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonicalUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={twitterDescription} />
      <meta property="twitter:image" content={twitterImage} />

      {/* Canonical */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Additional Meta Tags */}
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      
      {/* Favicon and App Icons */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <meta name="theme-color" content="#ffffff" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
    </Head>
  )
}

