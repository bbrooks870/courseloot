import { Metadata } from "next"

interface Props {
  params: { page: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const pageNumber = params.page
  
  return {
    title: `Courses At Cheap prices - Page ${pageNumber} | CourseLoot`,
    description: `Page ${pageNumber} of courses at cheap prices on CourseLoot.`,
    openGraph: {
      title: `Courses At Cheap prices - Page ${pageNumber} | CourseLoot`,
      description: `Page ${pageNumber} of courses at cheap prices on CourseLoot.`,
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