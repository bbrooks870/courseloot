import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Browse Categories | Programming PDFs & eBooks - FreeCodingPDF",
  description: "Explore our comprehensive collection of programming PDFs and eBooks by category. Find free resources for web development, mobile development, data science, and more.",
}

export default function CategoriesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 