import { BookOpen, Code, Zap, Globe } from "lucide-react"

export function InfoColumns() {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Why Use Our Web Development PDFs?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <InfoColumn
            icon={<BookOpen className="w-12 h-12 text-blue-500" />}
            title="Comprehensive Learning"
            description="Access in-depth guides and tutorials covering a wide range of web development topics."
          />
          <InfoColumn
            icon={<Code className="w-12 h-12 text-green-500" />}
            title="Practical Examples"
            description="Learn from real-world code examples and best practices in web development."
          />
          <InfoColumn
            icon={<Zap className="w-12 h-12 text-yellow-500" />}
            title="Stay Updated"
            description="Keep up with the latest trends and technologies in the rapidly evolving web development field."
          />
          <InfoColumn
            icon={<Globe className="w-12 h-12 text-purple-500" />}
            title="Diverse Technologies"
            description="Explore various web technologies including HTML, CSS, JavaScript, PHP, Node.js, and more."
          />
        </div>
      </div>
    </section>
  )
}

function InfoColumn({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

