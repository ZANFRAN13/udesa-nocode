"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  ArrowLeft,
  LogOut,
  HelpCircle,
  ChevronDown,
  ChevronRight,
  Info,
  Lightbulb,
} from "lucide-react"

export default function FAQPage() {
  const router = useRouter()
  const supabase = createClient()
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({})

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_OUT') {
          router.push('/login')
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [router, supabase])

  const handleBackToDashboard = () => {
    router.push('/dashboard')
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  const toggleItem = (itemId: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }))
  }

  const faqItems = [
    {
      id: "faq-1",
      question: "¿Qué tipo de productos puedo armar en el curso?",
      answer: "En el curso podrás crear diversos tipos de productos digitales como aplicaciones web, landing pages, dashboards administrativos, sistemas de gestión, aplicaciones móviles web-responsive, chatbots, herramientas de productividad, marketplaces, plataformas de contenido, sistemas de reservas, y mucho más. El límite lo pone tu creatividad y las necesidades que identifiques en el mercado.",
      category: "producto"
    },
    {
      id: "faq-2",
      question: "¿Qué productos NO voy a aprender a crear en este programa?",
      answer: "Este programa NO enseña programación tradicional. Tampoco a usar herramientas low-code como n8n para crearworkflows complejos, automatizaciones desde cero, agentes de IA autónomos, videojuegos complejos con motores 3D, o software de escritorio tradicional (desktop apps). El enfoque está en crear aplicaciones funcionales completas que puedan integrar servicios existentes para lograr funcionalidades complejas.",
      category: "alcance"
    },
    {
      id: "faq-3",
      question: "¿Qué SÍ voy a aprender en este programa?",
      answer: "Aprenderás a desarrollar software asistido por IA: crear aplicaciones web completas sin necesidad de programar. Esto incluye integrar servicios existentes (autenticación, bases de datos, pagos, IA) para lograr funcionalidades complejas en tu producto. No crearemos estos servicios desde cero, sino que aprenderás a conectarlos e integrarlos para construir productos funcionales y profesionales.",
      example: "Por ejemplo, puedes crear una app de gestión de proyectos que use Supabase para la base de datos, autenticación de usuarios con Google, integración con la API de ChatGPT para sugerencias inteligentes, y Vercel para publicarla online - todo sin escribir código complejo.",
      category: "aprendizaje"
    },
    {
      id: "faq-4",
      question: "¿Voy a aprender a crear agentes de IA?",
      answer: "Hay varias definiciones de agentes de IA. Entendemos un agente como un sistema capaz de actuar de forma autónoma hacia una meta: decide, llama herramientas/APIs, lee/escribe archivos, recuerda, aprende, navega, coordina y ejecuta. NO aprenderemos a crear este tipo de agentes complejos desde cero. En cambio, aprenderás a integrar capacidades de IA en tus apps usando servicios existentes.",
      example: "Un ejemplo de agente complejo que NO crearemos: un sistema que revisa analíticas, crea una campaña de anuncios, prueba variaciones y pausa las que rinden mal, sin intervención humana.",
      category: "ia"
    },
    {
      id: "faq-5",
      question: "¿Necesito saber programar?",
      answer: "No es necesario tener conocimientos previos de programación. Este programa está diseñado para personas sin experiencia técnica que quieran crear productos digitales usando herramientas no-code e inteligencia artificial. Sin embargo, tener noción de ciertos conceptos y vocabulario específico hoy resulta un gran activo para usar estas herramientas. Por lo tanto, si ya sabes programar, genial! Si no, te proveeremos de materiales complementarios para que puedas aprenderlos y cómo usarlos.",
      category: "requisitos"
    },
    {
      id: "faq-6",
      question: "¿Qué herramientas vamos a usar?",
      answer: "Utilizaremos herramientas de vibecoding y servicios no-code como V0 (Vercel), Lovable, Replit, Cursor (editor con IA), Supabase (base de datos y autenticación), Vercel (hosting), ChatGPT, Claude y otras APIs de IA generativa. Todas tienen versiones gratuitas o períodos de prueba que podrás usar durante el curso para construir tus productos.",
      category: "herramientas"
    },
    {
      id: "faq-7",
      question: "¿Voy a poder lanzar mi producto al público?",
      answer: "¡Sí! Uno de los objetivos principales del programa es que logres lanzar tu producto de manera pública y testearlo con usuarios reales. Aprenderás a usar plataformas de hosting gratuitas como Vercel para que tu aplicación esté disponible en internet con un dominio público, permitiendo que usuarios reales puedan acceder y usar tu producto.",
      category: "lanzamiento"
    },
    {
      id: "faq-8",
      question: "¿Cuánto tiempo debo dedicarle al curso?",
      answer: "El programa tiene clases semanales de 2.5 horas. Además, recomendamos dedicar entre 3-5 horas adicionales por semana para trabajar en tu proyecto, completar las actividades y experimentar con las herramientas. La dedicación que le pongas se reflejará directamente en el resultado de tu producto final.",
      category: "dedicacion"
    },
    {
      id: "faq-9",
      question: "¿Puedo trabajar en equipo o debo hacerlo solo?",
      answer: "Puedes elegir trabajar solo o formar equipos. Trabajar en equipo te permite combinar habilidades complementarias (diseño, contenido, estrategia) y dividir el trabajo, pero requiere buena coordinación. Muchas personas prefieren empezar solos para aprender el proceso completo.",
      category: "modalidad"
    },
    {
      id: "faq-10",
      question: "¿Qué pasa si me pierdo una clase?",
      answer: "Todas las clases quedan grabadas y disponibles en la sección de 'Clases Grabadas' del dashboard. Podrás verlas cuando quieras y cuantas veces necesites. Estarán disponibles por 3 meses una vez finalizado el programa. También encontrarás los slides y materiales complementarios en el dashboard para que puedas ponerte al día.",
      category: "clases"
    },
    {
      id: "faq-11",
      question: "¿Recibiré un certificado al finalizar?",
      answer: "Sí, al completar el programa y presentar tu proyecto final recibirás un certificado de finalización emitido por la Universidad de San Andrés que acredita tu participación en el programa NO-CODE & AI y las competencias adquiridas en desarrollo de productos digitales con herramientas no-code e inteligencia artificial.",
      category: "certificacion"
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/50 bg-card/30 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-3 md:px-4 py-3 md:py-4">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 md:gap-4 min-w-0 flex-1">
              <Button
                onClick={handleBackToDashboard}
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground shrink-0"
              >
                <ArrowLeft className="h-4 w-4 md:mr-2" />
                <span className="hidden sm:inline">Volver al Dashboard</span>
              </Button>
              <div className="hidden sm:block h-6 w-px bg-border" />
              <div className="flex items-center gap-2 md:gap-3 min-w-0">
                <img
                  src="/images/udesa-png.svg"
                  alt="Universidad de San Andrés"
                  className="h-6 md:h-8 w-auto shrink-0"
                />
                <h1 className="text-sm md:text-xl font-semibold text-foreground truncate">
                  <span className="hidden md:inline">Preguntas Frecuentes (FAQ)</span>
                  <span className="md:hidden">FAQ</span>
                </h1>
              </div>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              size="sm"
              className="text-muted-foreground hover:text-foreground shrink-0 ml-2"
            >
              <LogOut className="h-4 w-4 md:mr-2" />
              <span className="hidden sm:inline">Cerrar sesión</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-3 md:px-4 py-6 md:py-8">
        <div className="max-w-4xl mx-auto">
          {/* Introduction */}
          <div className="mb-6 md:mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2 md:mb-3">
              Preguntas Frecuentes
            </h2>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              Respuestas a las dudas más comunes sobre el programa NO-CODE & AI. Encontrá aquí información sobre el curso, herramientas, metodología y más.
            </p>
          </div>

          {/* FAQ Items */}
          <Card className="overflow-hidden border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-background mb-6 group hover:bg-primary/10 transition-all duration-200">
            <CardHeader className="bg-primary/10 border-b border-primary/20 p-4 md:p-6">
              <div className="flex items-center gap-2 md:gap-3">
                <div className="p-1.5 md:p-2 bg-primary/20 rounded-lg shrink-0">
                  <HelpCircle className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-xl md:text-2xl font-bold text-foreground">
                    Todas tus dudas resueltas
                  </CardTitle>
                  <p className="text-xs md:text-sm text-muted-foreground mt-1">
                    Hacé click en cada pregunta para ver la respuesta completa
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4 md:p-6">
              <div className="space-y-2 md:space-y-3">
                {faqItems.map((faq, index) => {
                  const isExpanded = expandedItems[faq.id]
                  
                  return (
                    <div
                      key={faq.id}
                      className="border border-border/30 rounded-lg overflow-hidden bg-background/50 hover:border-primary/30 transition-all duration-200"
                    >
                      <button
                        onClick={() => toggleItem(faq.id)}
                        className="w-full flex items-center justify-between gap-3 p-3 md:p-4 text-left hover:bg-accent/5 transition-colors"
                      >
                        <div className="flex items-start gap-2 md:gap-3 flex-1 min-w-0">
                          <div className="w-6 h-6 md:w-7 md:h-7 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-xs md:text-sm font-semibold text-primary">
                              {index + 1}
                            </span>
                          </div>
                          <span className="text-sm md:text-base font-medium text-foreground flex-1">
                            {faq.question}
                          </span>
                        </div>
                        <div className="flex-shrink-0">
                          {isExpanded ? (
                            <ChevronDown className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                          ) : (
                            <ChevronRight className="h-4 w-4 md:h-5 md:w-5 text-muted-foreground" />
                          )}
                        </div>
                      </button>
                      
                      {isExpanded && (
                        <div className="px-3 md:px-4 pb-3 md:pb-4 animate-in slide-in-from-top-2 duration-200">
                          <div className="pl-8 md:pl-10 pr-2 md:pr-4">
                            <div className="pt-2 md:pt-3 border-t border-border/20 space-y-3">
                              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                                {faq.answer}
                              </p>
                              {faq.example && (
                                <div className="bg-accent/10 border border-accent/20 rounded-lg p-2.5 md:p-3">
                                  <p className="text-xs md:text-sm font-medium text-foreground mb-1">
                                    Ejemplo:
                                  </p>
                                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed italic">
                                    {faq.example}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Help Card */}
          <Card className="mt-6 md:mt-8 border border-border/50 shadow-sm">
            <CardHeader className="bg-accent/5 border-b p-4 md:p-6">
              <CardTitle className="text-base md:text-xl font-semibold text-foreground flex items-center gap-2 md:gap-3">
                <Lightbulb className="h-4 w-4 md:h-5 md:w-5 text-accent shrink-0" />
                ¿Todavía tenés dudas?
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 md:p-6">
              <div className="space-y-3">
                <p className="text-xs md:text-sm text-muted-foreground">
                  Si no encontraste la respuesta que buscabas, hay varias formas de obtener ayuda:
                </p>
                <div className="grid md:grid-cols-2 gap-3 md:gap-4">
                  <div className="p-3 md:p-4 bg-accent/5 rounded-lg border border-accent/20">
                    <h4 className="text-sm md:text-base font-semibold text-foreground mb-1 md:mb-2">
                      💬 Comunidad de WhatsApp
                    </h4>
                    <p className="text-xs md:text-sm text-muted-foreground">
                      Conectate con otros estudiantes y profesores en nuestro grupo de WhatsApp.
                    </p>
                  </div>
                  <div className="p-3 md:p-4 bg-accent/5 rounded-lg border border-accent/20">
                    <h4 className="text-sm md:text-base font-semibold text-foreground mb-1 md:mb-2">
                      📧 Contacto Directo
                    </h4>
                    <p className="text-xs md:text-sm text-muted-foreground">
                      Escribí a los coordinadores académicos para consultas específicas.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="mt-8 md:mt-12 text-center">
            <p className="text-muted-foreground text-xs md:text-sm px-2">
              💡 Esta sección se actualiza regularmente con las preguntas más frecuentes de los estudiantes.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

