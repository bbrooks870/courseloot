import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
        <Link href="/" className="hover:text-blue-600 flex items-center gap-1">
          <Home className="h-4 w-4" />
          Home
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-gray-900">Privacy Policy</span>
      </div>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        
        <div className="prose prose-blue max-w-none">
          <p className="text-gray-600 mb-6">Last updated: {new Date().toLocaleDateString()}</p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
            <p className="mb-4">At FreeCodingPDF, we collect and process the following types of information:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Usage Data (pages visited, time spent, etc.)</li>
              <li>Device Information (browser type, operating system)</li>
              <li>IP Address and Location Data</li>
              <li>Cookies and Similar Technologies</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
            <p className="mb-4">We use the collected information for:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Providing and improving our services</li>
              <li>Analyzing website usage and trends</li>
              <li>Personalizing user experience</li>
              <li>Sending important updates and notifications</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Data Security</h2>
            <p className="mb-4">We implement appropriate security measures to protect your information, including:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Encryption of data in transit</li>
              <li>Regular security assessments</li>
              <li>Access controls and authentication</li>
              <li>Secure data storage practices</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Cookies Policy</h2>
            <p className="mb-4">We use cookies to enhance your browsing experience. These include:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Essential cookies for website functionality</li>
              <li>Analytics cookies to understand usage</li>
              <li>Preference cookies to remember your settings</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Your Rights</h2>
            <p className="mb-4">You have the right to:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Access your personal data</li>
              <li>Request data correction or deletion</li>
              <li>Opt-out of marketing communications</li>
              <li>Lodge a complaint with supervisory authorities</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Contact Us</h2>
            <p className="mb-4">
              If you have any questions about this Privacy Policy, please contact us at:{" "}
              <Link href="mailto:contact@freecodingpdf.live" className="text-blue-600 hover:underline">
                contact@freecodingpdf.live
              </Link>
            </p>
          </section>
        </div>
      </div>
    </div>
  )
} 