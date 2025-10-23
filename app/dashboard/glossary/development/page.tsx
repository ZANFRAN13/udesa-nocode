"use client"

import { Code } from "lucide-react"
import { devTermsData, devCategories } from "@/lib/dev-glossary-data"
import { GlossaryPageLayout } from "@/components/glossary/glossary-page-layout"
import { TerminalCommandsSection } from "@/components/glossary/help-sections/terminal-commands-section"
import { DevToolsSection } from "@/components/glossary/help-sections/devtools-section"

export default function DevelopmentGlossaryPage() {
  return (
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
  )
}
