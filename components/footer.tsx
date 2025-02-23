import Link from "next/link"
import { Github, Twitter, Linkedin, Mail, Heart } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-50 to-gray-100 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">About CourseLoot</h3>
            <p className="text-gray-600 text-sm">
              CourseLoot is a platform that offers a wide range of courses at affordable prices. We aim to provide the best learning experience for our users.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/page/1" className="text-gray-600 hover:text-blue-600 transition-colors">
                  All Courses
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/search" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Search
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Categories */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Popular Categories</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/category/Marketing" className="text-gray-600 hover:text-blue-600 transition-colors">
                Marketing
                </Link>
              </li>
              <li>
                <Link href="/category/YouTube" className="text-gray-600 hover:text-blue-600 transition-colors">
                YouTube
                </Link>
              </li>
              <li>
                <Link href="/category/Trading" className="text-gray-600 hover:text-blue-600 transition-colors">
                Trading
                </Link>
              </li>
              <li>
                <Link href="/category/Funnel" className="text-gray-600 hover:text-blue-600 transition-colors">
                Funnel
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Connect</h3>
            <div className="flex space-x-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600 transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="mailto:contact@CourseLoot.com" className="text-gray-600 hover:text-blue-600 transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-600 flex items-center">
              Made with <Heart className="w-4 h-4 mx-1 text-red-500" /> for the coding community
            </p>
            <div className="flex space-x-6 text-sm text-gray-600">
              <Link href="/privacy" className="hover:text-blue-600 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-blue-600 transition-colors">
                Terms of Use
              </Link>
              <Link href="/contact" className="hover:text-blue-600 transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 