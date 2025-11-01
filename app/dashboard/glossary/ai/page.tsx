"use client"

import { useState, useEffect } from "react"
import { Brain } from "lucide-react"
import { aiTermsData, aiCategories } from "@/lib/ai-glossary-data"
import { GlossaryPageLayout } from "@/components/glossary/glossary-page-layout"
import { ExampleSection } from "@/components/glossary/help-sections/example-section"
import { GeminiHelper } from "@/components/glossary/gemini-helper"

export default function AIGlossaryPage() {
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
            La <strong>Inteligencia Artificial generativa</strong> consta de sistemas que aprenden patrones de grandes 
            cantidades de datos y los aplican para generar texto, código, imágenes y más. Esto marca una evolución en el <strong>No-Code</strong> (plataformas que permiten crear sin programar), democratizando el 
            desarrollo de software: ahora puedes diseñar, construir y lanzar productos digitales completos 
            conversando con IA, sin necesidad de saber programar. Este vocabulario te da las claves para 
            entender cómo funciona esta tecnología y aprovecharla al máximo en tus proyectos.
          </p>
        </>
      }
      helpSections={
        <ExampleSection
          title="¿Por qué es importante conocer estos términos?"
          subtitle="Domina los conceptos clave de IA (Generativa) para saber cuándo, cómo y para qué usarla."
          badgeText="Vibecoding"
          vagueTitleBad="❌ Qué no hace:"
          vagueTitleGood="✅ Qué sí hace:"
          vagueExamples={[
            'Predice el futuro',
            'Entiende el contenido semántico de un texto',
            'Te tira la posta',
          ]}
          specificExamples={[
            'Identifica patrones en un <em class="italic font-semibold text-green-700">corpus</em> de texto',
            'Asigna códigos númericos a conjuntos de caracteres (<em class="italic font-semibold text-green-700">tokens</em>) para procesarlos en un espacio <em class="italic font-semibold text-green-700">vectorial</em>',
            'Te dice que <em class="italic font-semibold text-green-700">token</em> es más probable que siga en un texto según el <em class="italic font-semibold text-green-700">contexto</em>',
          ]}
          bottomBadText="La IA puede desinformar, generar errores y confusión"
          bottomGoodText="Usada con criterio es una gran palanca"
          tipText='<strong>💡 Consejo:</strong> Entender términos como <em class="italic">prompt</em>, <em class="italic">contexto</em>, <em class="italic">temperatura</em> y <em class="italic">RAG</em> te permite diseñar mejor tus interacciones con IA y crear productos más sofisticados. Este glosario es tu guía para pasar de "usuario casual" a "constructor informado".'
        />
      }
      />
      <GeminiHelper />
    </>
  )
}

