"use client"

import { Brain } from "lucide-react"
import { aiTermsData, aiCategories } from "@/lib/ai-glossary-data"
import { GlossaryPageLayout } from "@/components/glossary/glossary-page-layout"
import { ExampleSection } from "@/components/glossary/help-sections/example-section"

export default function AIGlossaryPage() {
  return (
    <GlossaryPageLayout
      title="Vocabulario de IA"
      subtitle="Glosario de Términos de Inteligencia Artificial"
      icon={Brain}
      termsData={aiTermsData}
      categories={aiCategories}
      showBasicsFilter={true}
      description={
        <>
          <p>Conocer estos términos te ayudará a comunicarte mejor con IAs y a entender el ecosistema de herramientas.</p>
          <br />
          <p className="text-muted-foreground text-lg leading-relaxed">
            Este vocabulario está pensado para personas sin base técnica que quieren usar IA 
            para imaginar, prototipar y lanzar productos digitales. Cada término incluye 
            una descripción clara, ejemplos prácticos y términos relacionados para que puedas 
            profundizar tu conocimiento de manera progresiva.
          </p>
        </>
      }
      helpSections={
        <ExampleSection
          title="¿Por qué es importante conocer estos términos?"
          subtitle="Habla el lenguaje de la IA para obtener mejores resultados"
          badgeText="Vibecoding"
          vagueTitleBad="❌ Sin conocer los términos (resultados limitados):"
          vagueTitleGood="✅ Conociendo los términos (resultados precisos):"
          vagueExamples={[
            '"Hazme un chatbot que sepa de mis productos"',
            '"Quiero que la IA recuerde lo que hablamos"',
            '"Necesito que sea más creativo pero no tan loco"',
          ]}
          specificExamples={[
            '"Crea un <em class="italic font-semibold text-green-700">asistente con RAG</em> que busque en mis docs y responda en contexto"',
            '"Implementa <em class="italic font-semibold text-green-700">threads</em> para mantener el historial de cada usuario"',
            '"Usa <em class="italic font-semibold text-green-700">temperatura 0.7</em> para balance entre creatividad y coherencia"',
          ]}
          tipText='<strong>💡 Consejo:</strong> Entender términos como <em class="italic">prompt</em>, <em class="italic">contexto</em>, <em class="italic">temperatura</em> y <em class="italic">RAG</em> te permite diseñar mejor tus interacciones con IA y crear productos más sofisticados. Este glosario es tu guía para pasar de "usuario casual" a "constructor informado".'
        />
      }
    />
  )
}

