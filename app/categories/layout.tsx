import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Browse Categories | Courses At Cheap prices - CourseLoot",
  description: "Browse various categories of courses at cheap prices on CourseLoot.",
}

export default function CategoriesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 