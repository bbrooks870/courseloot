import { Introduction } from "./introduction"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import Link from "next/link"
import { Code, BookOpen, Rocket, Globe, Terminal, Database, Brain, Zap } from "lucide-react"

export function HomeContent() {
  return (
    <div>
      <Introduction />
      
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Why Choose CourseLoot?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-white/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <Terminal className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Comprehensive Library</h3>
                <p className="text-gray-600">
                  Access thousands of programming books, from beginner tutorials to advanced guides.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-white/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <Brain className="w-12 h-12 text-purple-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Learn Any Language</h3>
                <p className="text-gray-600">
                  Python, JavaScript, Java, C++, and more - all the popular programming languages covered.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-white/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <Rocket className="w-12 h-12 text-green-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Latest Technologies</h3>
                <p className="text-gray-600">
                  Stay updated with books on AI, Machine Learning, Web Dev, Mobile Apps, and Cloud Computing.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-white/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <Zap className="w-12 h-12 text-yellow-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Free Forever</h3>
                <p className="text-gray-600">
                  All programming PDFs are completely free to download and read. No subscriptions needed.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Link href="/page/1" passHref>
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                Explore All Programming PDFs
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

