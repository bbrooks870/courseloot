"use client"

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

declare global {
  interface Window {
    gtag: (
      type: string,
      action: string,
      data?: { [key: string]: any }
    ) => void
  }
}

export const usePageTracking = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (pathname) {
      // Construct the full URL
      const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '')
      
      // Track pageview
      window.gtag('event', 'page_view', {
        page_path: url,
        page_title: document.title,
        page_location: window.location.href
      })
    }
  }, [pathname, searchParams])
} 