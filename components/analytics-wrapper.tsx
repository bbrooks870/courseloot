'use client'

import { usePageTracking } from "@/hooks/usePageTracking"

export function AnalyticsWrapper({ children }: { children: React.ReactNode }) {
  usePageTracking()
  return <>{children}</>
} 