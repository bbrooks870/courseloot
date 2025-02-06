import { Introduction } from "./introduction"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import Link from "next/link"
import { BookOpen, Search, Download, BookMarked } from "lucide-react"

export function HomeContent() {
  return (
    <div>
      <Introduction />
      
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Why Choose Vedic Pustak?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card>
              <CardContent className="p-6">
                <BookOpen className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Ancient Wisdom</h3>
                <p className="text-gray-600">
                  Access timeless knowledge from authentic Vedic scriptures and sacred Hindu texts.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <Search className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Easy Navigation</h3>
                <p className="text-gray-600">
                  Find specific texts through our well-organized categories and powerful search.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <Download className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Free Access</h3>
                <p className="text-gray-600">
                  Download and read sacred texts completely free, anytime and anywhere.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <BookMarked className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Multiple Languages</h3>
                <p className="text-gray-600">
                  Read texts in Sanskrit with translations in Hindi, English, and other languages.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Link href="/page/1" passHref>
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                Explore All Texts
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

