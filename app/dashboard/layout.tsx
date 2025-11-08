"use client"

import { GeminiHelper } from "@/components/glossary/gemini-helper"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
      <GeminiHelper />
    </>
  )
}

