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
                <h3 className="text-xl font-semibold mb-2">Affordable Pricing</h3>
                <p className="text-gray-600">
                  Find courses that fit your budget without compromising on quality.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-white/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <Brain className="w-12 h-12 text-purple-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Diverse Course Selection</h3>
                <p className="text-gray-600">
                  Explore a wide range of topics, from programming to business skills.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-white/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <Rocket className="w-12 h-12 text-green-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Expert Instructors</h3>
                <p className="text-gray-600">
                  Learn from experienced professionals and industry experts.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-white/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <Zap className="w-12 h-12 text-yellow-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Flexible Learning</h3>
                <p className="text-gray-600">
                  Learn at your own pace, anytime, anywhere.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Link href="/page/1" passHref>
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                All Courses 
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

