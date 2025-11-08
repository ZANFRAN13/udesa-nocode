"use client"

import { useState, useEffect } from "react"
import { Code } from "lucide-react"
import { devTermsData, devCategories } from "@/lib/dev-glossary-data"
import { GlossaryPageLayout } from "@/components/glossary/glossary-page-layout"
import { TerminalCommandsSection } from "@/components/glossary/help-sections/terminal-commands-section"
import { DevToolsSection } from "@/components/glossary/help-sections/devtools-section"

export default function DevelopmentGlossaryPage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
        <div className="text-center">
          <img src="/images/udesa-logo-black-v.jpg" alt="UdeSA" className="h-28 w-auto animate-udesa-in" />
          <p className="text-gray-300 mt-4">Cargando...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <GlossaryPageLayout
        title="Glosario de Desarrollo"
        subtitle="Glosario de Desarrollo"
        icon={Code}
        termsData={devTermsData}
        categories={devCategories}
        showBasicsFilter={true}
        description="Definiciones y conceptos fundamentales del desarrollo de software"
        helpSections={
          <>
            <TerminalCommandsSection />
            <DevToolsSection />
          </>
        }
      />
    </>
  )
}
