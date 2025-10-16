"use client"

import { BookOpen } from "lucide-react"
import { uiTermsData, categories } from "@/lib/ui-glossary-data"
import { GlossaryPageLayout } from "@/components/glossary/glossary-page-layout"
import { ExampleSection } from "@/components/glossary/help-sections/example-section"
import { getNielsenNormanGroupUrl } from "@/lib/glossary-utils"

export default function UIGlossaryPage() {
  return (
    <GlossaryPageLayout
      title="Glosario de Términos UI"
      subtitle="Glosario de Elementos de Interfaz de Usuario"
      icon={BookOpen}
      termsData={uiTermsData}
      categories={categories}
      externalLinkGenerator={getNielsenNormanGroupUrl}
      description={
        <>
            <p>Ser técnicamente específicos en lo que le pedimos a la IA puede aportar en gran medida en la precisión del resultado.</p>
            <br />
            <p className="text-muted-foreground text-lg leading-relaxed">
              Explora definiciones, ejemplos y mejores prácticas para los elementos más comunes de las interfaces de usuario. 
              Basado en la publicación de{" "}
              <a 
                href="https://www.nngroup.com/articles/ui-elements-glossary/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                Nielsen Norman Group
              </a>.
            </p>
        </>
      }
      helpSections={
        <ExampleSection
          title="¿Por qué es importante conocer los elementos UI?"
          subtitle="Aprende a nombrar correctamente los componentes de interfaz"
          badgeText="UI Design"
          vagueTitleBad="❌ Instrucciones vagas (resultado impreciso):"
          vagueTitleGood="✅ Instrucciones específicas (resultado preciso):"
          vagueExamples={[
            '"Créame un cosito para el otro coso de arriba"',
            '"Que cuando paso por arriba me diga ir a carrito"',
            '"Ponle algo que se vea bonito"',
          ]}
          specificExamples={[
            '"Agrega un <em class="italic font-semibold text-green-700">tooltip</em> para el <em class="italic font-semibold text-green-700">icono</em> del carrito en el <em class="italic font-semibold text-green-700">menú de navegación</em>"',
            '"Que al hacer <em class="italic font-semibold text-green-700">hover</em> me diga \'Ir a carrito\'"',
            '"Con estilo <em class="italic font-semibold text-green-700">minimalista</em> y <em class="italic font-semibold text-green-700">animación suave</em>"',
          ]}
          tipText='<strong>💡 Consejo:</strong> Conocer los nombres correctos de los elementos UI (<em class="italic">tooltip</em>, <em class="italic">dropdown</em>, <em class="italic">modal</em>, etc.) te permite comunicarte mejor con la IA y obtener interfaces más profesionales. Este glosario te enseñará el "vocabulario" que entiende la IA para crear experiencias de usuario excepcionales.'
        />
      }
    />
  )
}
