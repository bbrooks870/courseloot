'use client'

import { Suspense } from 'react'
import { usePageTracking } from "@/hooks/usePageTracking"

function AnalyticsContent({ children }: { children: React.ReactNode }) {
  usePageTracking()
  return <>{children}</>
}

export function AnalyticsWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Suspense>
      <AnalyticsContent>{children}</AnalyticsContent>
    </Suspense>
  )
} 