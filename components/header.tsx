"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export function Header() {
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <Link href="/" className="text-2xl font-bold text-blue-600 text-center md:text-left">
            CourseLoot
          </Link>
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
            <form onSubmit={handleSearch} className="relative w-full md:w-auto">
              <Input
                type="search"
                placeholder="Search PDFs..."
                className="pl-10 pr-4 py-2 w-full md:w-[300px] rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </form>
            <nav className="w-full md:w-auto">
              <ul className="flex justify-center md:justify-start space-x-6">
                <li>
                  <Link href="/page/1" className="text-gray-600 hover:text-blue-600">
                    All PDFs
                  </Link>
                </li>
                <li>
                  <Link href="/categories" className="text-gray-600 hover:text-blue-600">
                    Categories
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}

