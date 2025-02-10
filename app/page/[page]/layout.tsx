import { Metadata } from "next"

interface Props {
  params: { page: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const pageNumber = params.page
  
  return {
    title: `Programming PDFs and eBooks - Page ${pageNumber} | FreeCodingPDF`,
    description: `Browse through our collection of free programming PDFs and eBooks. Page ${pageNumber} of our comprehensive library of coding resources, tutorials, and documentation.`,
    openGraph: {
      title: `Programming PDFs and eBooks - Page ${pageNumber} | FreeCodingPDF`,
      description: `Browse through our collection of free programming PDFs and eBooks. Page ${pageNumber} of our comprehensive library of coding resources, tutorials, and documentation.`,
    },
  }
}

export default function PaginatedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 