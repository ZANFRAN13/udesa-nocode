"use client"

import { useState, useEffect } from "react"
import { Target } from "lucide-react"
import { productTermsData, productCategories } from "@/lib/product-glossary-data"
import { GlossaryPageLayout } from "@/components/glossary/glossary-page-layout"
import { ExampleSection } from "@/components/glossary/help-sections/example-section"

export default function ProductGlossaryPage() {
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
      title="Vocabulario de Producto"
      subtitle="Glosario de Términos de Gestión de Productos Digitales"
      icon={Target}
      termsData={productTermsData}
      categories={productCategories}
      showBasicsFilter={true}
      description={
        <>
          <p>Conocer estos términos te ayudará a planificar, diseñar, construir y lanzar productos digitales exitosos.</p>
          <br />
          <p className="text-muted-foreground text-lg leading-relaxed">
            La <strong>Gestión de Productos</strong> es el arte y ciencia de llevar un producto desde la idea hasta 
            las manos de usuarios satisfechos. Este glosario cubre desde estrategia y planificación (MVP, roadmap, PRD) 
            hasta investigación de usuarios, métricas, testing y diseño. Ya sea que estés construyendo tu primer 
            producto o quieras profesionalizar tu proceso, estos términos son el vocabulario común que usa toda 
            la industria tech para crear productos que la gente ama.
          </p>
        </>
      }
      helpSections={
        <ExampleSection
          title="¿Por qué es importante conocer estos términos?"
          subtitle="Domina el lenguaje de producto para planificar mejor, validar rápido y construir lo correcto."
          badgeText="Product Management"
          vagueTitleBad="❌ Enfoque equivocado:"
          vagueTitleGood="✅ Enfoque correcto:"
          vagueExamples={[
            'Construir todas las features antes de validar',
            'Decidir basándote solo en opiniones internas',
            'Lanzar y esperar que funcione por arte de magia',
          ]}
          specificExamples={[
            'Lanzar un <em class="italic font-semibold text-green-700">MVP</em> para validar <em class="italic font-semibold text-green-700">problem-solution fit</em>',
            'Hacer <em class="italic font-semibold text-green-700">user research</em> y <em class="italic font-semibold text-green-700">A/B tests</em> para tomar decisiones <em class="italic font-semibold text-green-700">data-driven</em>',
            'Medir <em class="italic font-semibold text-green-700">KPIs</em> clave como <em class="italic font-semibold text-green-700">retention</em> y <em class="italic font-semibold text-green-700">engagement</em> para iterar',
          ]}
          bottomBadText="Productos que nadie usa y tiempo/dinero desperdiciado"
          bottomGoodText="Productos que resuelven problemas reales y escalan"
          tipText='<strong>💡 Consejo:</strong> No necesitas ser un Product Manager profesional para aplicar estos conceptos. Incluso en proyectos personales, usar frameworks como <em class="italic">Value Proposition Canvas</em>, priorizar con <em class="italic">MoSCoW</em>, y hacer <em class="italic">user testing</em> básico marca una diferencia enorme entre crear algo que funciona y algo que la gente realmente quiere usar.'
        />
      }
      />
    </>
  )
}

