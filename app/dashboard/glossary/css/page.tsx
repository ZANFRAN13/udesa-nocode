"use client"

import { useState, useEffect } from "react"
import { BookOpen } from "lucide-react"
import { cssTermsData, cssCategories } from "@/lib/css-glossary-data"
import { GlossaryPageLayout } from "@/components/glossary/glossary-page-layout"
import { UnitsReferenceSection } from "@/components/glossary/help-sections/units-reference-section"
import { ExampleSection } from "@/components/glossary/help-sections/example-section"

export default function CSSGlossaryPage() {
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
      title="Glosario CSS"
      subtitle="Glosario de Conceptos CSS"
      icon={BookOpen}
      termsData={cssTermsData}
      categories={cssCategories}
      showBasicsFilter={true}
      description={
        <>
            <p>Ser técnicamente específicos en lo que le pedimos a la IA puede aportar en gran medida en la precisión del resultado.</p>
            <br />
            <p className="text-muted-foreground text-lg leading-relaxed">
              CSS (Cascading Style Sheets) es el lenguaje que le da vida visual a tus proyectos web. 
              Con CSS puedes cambiar colores, fuentes, tamaños, posiciones y crear diseños atractivos 
              sin necesidad de programar. Es tu herramienta principal para hacer que tus páginas se 
              vean profesionales y modernas mientras vibecodeas tus ideas digitales.
            </p>
        </>
      }
      helpSections={
        <>
          <ExampleSection
            title="¿Por qué es importante conocer CSS?"
            subtitle="Aprende a dar instrucciones precisas sobre estilos"
            badgeText="CSS Basics"
            vagueTitleBad="❌ Instrucciones vagas (resultado impreciso):"
            vagueTitleGood="✅ Instrucciones específicas (resultado preciso):"
            vagueExamples={[
              '"Separa un poquito las cards"',
              '"Las separaste demasiado, júntalas un poco"',
              '"Ahora un poquito más separadas pero apenas"',
            ]}
            specificExamples={[
              '"Agrega margin: 1rem a las cards del carousel"',
            ]}
            tipText={'<strong>💡 Consejo:</strong> Conocer los términos CSS básicos te permite comunicarte mejor con la IA y obtener resultados más precisos en tus proyectos de vibecoding. Este glosario te ayudará a hablar el "idioma" que entiende la IA para crear diseños profesionales.'}
          />
          <UnitsReferenceSection />
        </>
      }
      />
    </>
  )
}
