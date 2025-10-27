"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  LogOut,
  Lightbulb,
  Search,
  FileText,
  Target,
  Rocket,
  RefreshCw,
  Zap,
  Link as LinkIcon,
  Shield,
  CheckCircle,
  Sparkles,
  ExternalLink,
} from "lucide-react"

export default function VibecodingGuidePage() {
  const router = useRouter()
  const supabase = createClient()
  const [activeStep, setActiveStep] = useState<string>("step-0.0")

  // Setup auth listener only for sign out events
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

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sectionIds = [...steps.map(s => s.id), 'success-section']
      const scrollPosition = window.scrollY + 200

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const section = document.getElementById(sectionIds[i])
        if (section && section.offsetTop <= scrollPosition) {
          setActiveStep(sectionIds[i])
          break
        }
      }
    }

    handleScroll() // Check initial position
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToStep = (stepId: string) => {
    const element = document.getElementById(stepId)
    if (element) {
      const offset = 100
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  const handleBackToDashboard = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    router.push('/dashboard')
  }

  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    await supabase.auth.signOut()
    router.push('/')
  }

  // Tool URLs mapping
  const toolUrls: Record<string, string> = {
    "ChatGPT": "https://chat.openai.com",
    "Claude": "https://claude.ai",
    "Gemini": "https://gemini.google.com",
    "021": "https://from021.io",
    "v0": "https://v0.dev",
    "Lovable": "https://lovable.dev",
    "Replit": "https://replit.com",
    "21st dev": "https://21st.dev",
    "Magic Patterns": "https://magicpatterns.com",
    "Google AI Studio": "https://aistudio.google.com",
    "Supabase": "https://supabase.com",
  }

  const steps = [
    {
      id: "step-0.0",
      number: "0.0",
      title: "Brainstorming",
      icon: Lightbulb,
      description: "Hacer una sesión de brainstorming con la IA. Pedirle ideas y acorde a indicaciones de tu preferencia.",
      tools: ["ChatGPT", "Claude", "Gemini"],
      color: "from-purple-500/10 to-purple-600/5",
      iconColor: "text-purple-600",
      optional: true,
      detail: "Si no sabes por dónde empezar, empieza aquí. Si ya tenés una idea clara, podés saltar al Paso 1.0."
    },
    {
      id: "step-0.5",
      number: "0.5",
      title: "Validación inicial",
      icon: Search,
      description: "Elegí una idea y utiliza la función 'deep research' (feature de IA) para validación inicial de oportunidad. Pedile una investigación de mercado para la idea y un posterior análisis y ranking según criterios.",
      tools: ["ChatGPT", "Claude", "Gemini"],
      color: "from-blue-500/10 to-blue-600/5",
      iconColor: "text-blue-600",
      optional: true,
      detail: "Criterios sugeridos: riesgos por impacto y probabilidad, FODA, oportunidad de diferenciación (moats), tamaño de mercado, etc."
    },
    {
      id: "step-1.0",
      number: "1.0",
      title: "Definición de producto",
      icon: FileText,
      description: "Pedile que cree un PRD (Product Requirements Document) para la idea elegida. Que lo estructure y complete según el análisis. Revisá y refiná, si fuera necesario.",
      tools: ["021", "ChatGPT", "Claude", "Gemini"],
      color: "from-green-500/10 to-green-600/5",
      iconColor: "text-green-600",
      detail: "El PRD es la 'biblia' de tu producto. Define qué vas a construir y por qué."
    },
    {
      id: "step-1.5",
      number: "1.5",
      title: "Definición de MVP",
      icon: Target,
      description: "Pedile una versión del PRD reducida al MVP con priorización de features.",
      tools: ["ChatGPT", "Claude", "Gemini"],
      color: "from-emerald-500/10 to-emerald-600/5",
      iconColor: "text-emerald-600",
      detail: "El MVP es la versión con las funcionalidades mínimas para validar tu idea. No todo lo que está en el PRD va en el MVP."
    },
    {
      id: "step-2.0",
      number: "2.0",
      title: "Kick-off desarrollo",
      icon: Rocket,
      description: "Crea tu proyecto en v0, lovable, replit (o similar). Adjunta documentación de PRD y MVP como PDF, imágenes de referencia (si hubiera), e instrucciones.",
      tools: ["v0", "Lovable", "Replit"],
      color: "from-orange-500/10 to-orange-600/5",
      iconColor: "text-orange-600",
      detail: "Las instrucciones deben incluir una dirección muy clara y resumida acerca de por dónde arrancar (ej: 'comienza creando la landing page'; 'comienza desarrollando las features principales'). Incluí descripción de estilo y look & feel."
    },
    {
      id: "step-2.5",
      number: "2.5",
      title: "Iteración",
      icon: RefreshCw,
      description: "Continúa refinando hasta lograr una maqueta que te parezca potable.",
      tools: ["21st dev", "Magic Patterns", "ChatGPT", "v0", "Lovable", "Replit"],
      color: "from-amber-500/10 to-amber-600/5",
      iconColor: "text-amber-600",
      detail: "No te preocupes por la perfección en la primera iteración. El refinamiento es parte del proceso."
    },
    {
      id: "step-3.0",
      number: "3.0",
      title: "Funcionalidad",
      icon: Zap,
      description: "Una vez que la estructura está bien planteada, hace que las cosas cobren vida...que funcionen. No abrumes a la IA con tareas complejas, concentrate en hacer que funcionen de a una a la vez.",
      tools: ["v0", "Lovable", "Replit", "Supabase"],
      color: "from-yellow-500/10 to-yellow-600/5",
      iconColor: "text-yellow-600",
      detail: "Enfoque: una funcionalidad a la vez. Es mejor tener pocas cosas funcionando bien que muchas a medias."
    },
    {
      id: "step-3.5",
      number: "3.5",
      title: "Integraciones",
      icon: LinkIcon,
      description: "Algunas funcionalidades probablemente requerirán integraciones con diferentes servicios. Puedes pedirle a la plataforma que los conecte.",
      tools: ["ChatGPT", "Claude", "Google AI Studio", "Supabase", "v0", "Lovable", "Replit"],
      color: "from-cyan-500/10 to-cyan-600/5",
      iconColor: "text-cyan-600",
      detail: "Tip: Describe la funcionalidad a ChatGPT y que encuentre cuál es el mejor servicio dentro de tu presupuesto. Luego pasa esa URL de API o documentación técnica a v0/lovable/replit y pedile que lo integre."
    },
    {
      id: "step-4.0",
      number: "4.0",
      title: "Autenticación",
      icon: Shield,
      description: "Una de las features va a ser la autenticación. Cuando tengas andando el flujo principal de tu app, pedile a la IA que configure la autenticación.",
      tools: ["Supabase", "v0", "Lovable", "Replit"],
      color: "from-indigo-500/10 to-indigo-600/5",
      iconColor: "text-indigo-600",
      detail: "Por defecto, la mayoría de las plataformas usan Supabase y casi siempre lo integra automáticamente."
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/50 bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto px-3 md:px-4 py-3 md:py-4">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 md:gap-4 min-w-0 flex-1">
              <Button
                type="button"
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
                  <span className="hidden md:inline">Guía Rápida de Vibecoding</span>
                  <span className="md:hidden">Guía Vibecoding</span>
                </h1>
              </div>
            </div>
            <Button
              type="button"
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

      {/* Main Content with Sidebar */}
      <div className="container mx-auto px-3 md:px-4 py-6 md:py-8">
        <div className="flex gap-8 max-w-7xl mx-auto">
          {/* Sidebar - Hidden on mobile */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="fixed top-24 w-64 h-[calc(100vh-7rem)] space-y-1 overflow-hidden">
              <div className="text-sm font-semibold text-muted-foreground mb-3 px-3">
                Paso a Paso
              </div>
              {steps.map((step) => (
                <button
                  key={step.id}
                  onClick={() => scrollToStep(step.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                    activeStep === step.id
                      ? 'bg-primary/10 text-primary font-medium'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs opacity-70">
                      {step.number}
                    </span>
                    <span className="truncate">{step.title}</span>
                  </div>
                  {step.optional && (
                    <span className="text-xs opacity-60 ml-8">Opcional</span>
                  )}
                </button>
              ))}
              
              <div className="pt-4 mt-4 border-t border-border">
                <button
                  onClick={() => scrollToStep('success-section')}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                    activeStep === 'success-section'
                      ? 'bg-primary/10 text-primary font-medium'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    <span>¡MVP Listo!</span>
                  </div>
                </button>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0 max-w-4xl">
          {/* Introduction */}
          <div className="mb-8 md:mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl">
                <Sparkles className="h-6 w-6 md:h-8 md:w-8 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  Paso a Paso: Vibecoding Fácil
                </h2>
                <p className="text-sm md:text-base text-muted-foreground mt-1">
                  De la idea al MVP funcional usando IA
                </p>
              </div>
            </div>
            
            <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-background">
              <CardContent className="pt-6">
                <p className="text-muted-foreground leading-relaxed">
                  Esta guía te muestra cómo llevar un producto digital desde la idea inicial hasta un MVP funcional 
                  usando herramientas de IA. Si no sabes por dónde empezar, comienza en el <strong>Paso 0.0</strong>. 
                  Si ya estás convencido de qué producto querés encarar, podés empezar en el <strong>Paso 1.0</strong>.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Steps */}
          <div className="space-y-6">
            {steps.map((step, index) => {
              const Icon = step.icon
              const isOptional = step.optional

              return (
                <Card 
                  key={step.id}
                  id={step.id}
                  className={`scroll-mt-24 overflow-hidden border-2 transition-all duration-200 hover:shadow-lg ${
                    isOptional ? 'border-border/50' : 'border-primary/20'
                  }`}
                >
                  <CardHeader className={`bg-gradient-to-br ${step.color} p-4 md:p-6`}>
                    <div className="flex items-start gap-3 md:gap-4">
                      <div className={`p-2 md:p-3 bg-background rounded-lg shrink-0 ${step.iconColor}`}>
                        <Icon className="h-5 w-5 md:h-6 md:w-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline" className="font-mono">
                            Paso {step.number}
                          </Badge>
                          {isOptional && (
                            <Badge variant="secondary" className="text-xs">
                              Opcional
                            </Badge>
                          )}
                        </div>
                        <CardTitle className="text-lg md:text-xl mb-2">
                          {step.title}
                        </CardTitle>
                        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="p-4 md:p-6 space-y-4">
                    {/* Detail */}
                    {step.detail && (
                      <div className="p-3 md:p-4 bg-accent/5 rounded-lg border border-accent/10">
                        <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                          💡 <strong>Tip:</strong> {step.detail}
                        </p>
                      </div>
                    )}

                    {/* Tools */}
                    <div>
                      <h4 className="text-sm font-semibold text-foreground mb-2">
                        🛠️ Herramientas recomendadas:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {step.tools.map((tool) => {
                          const url = toolUrls[tool]
                          if (url) {
                            return (
                              <a
                                key={tool}
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 transition-transform hover:scale-105"
                              >
                                <Badge 
                                  variant="secondary"
                                  className="text-xs cursor-pointer hover:bg-secondary/80"
                                >
                                  {tool}
                                  <ExternalLink className="h-3 w-3 ml-1 inline" />
                                </Badge>
                              </a>
                            )
                          }
                          return (
                            <Badge 
                              key={tool}
                              variant="secondary"
                              className="text-xs"
                            >
                              {tool}
                            </Badge>
                          )
                        })}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Success Card */}
          <Card id="success-section" className="mt-8 scroll-mt-24 border-2 border-green-500/20 bg-gradient-to-br from-green-500/10 to-background">
            <CardHeader className="text-center p-6 md:p-8">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-green-500/10 rounded-full">
                  <CheckCircle className="h-12 w-12 md:h-16 md:w-16 text-green-600" />
                </div>
              </div>
              <CardTitle className="text-2xl md:text-3xl mb-3">
                ¡Felicidades! ¡Ya tienes tu MVP andando!
              </CardTitle>
              <p className="text-muted-foreground text-sm md:text-base">
                Ahora viene lo importante: validar con usuarios reales, iterar basándote en feedback, 
                y seguir mejorando tu producto. Recuerda: un MVP es el inicio del viaje, no el final.
              </p>
            </CardHeader>
          </Card>

          {/* Additional Resources */}
          <Card className="mt-6 border-primary/20">
            <CardHeader>
              <CardTitle className="text-lg">📚 Recursos adicionales</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => router.push('/dashboard/nocode-tools')}
              >
                Ver todas las Herramientas No-Code →
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => router.push('/dashboard/glossary/product')}
              >
                Glosario de Producto (MVP, PRD, etc.) →
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => router.push('/dashboard/glossary/ai')}
              >
                Vocabulario de IA →
              </Button>
            </CardContent>
          </Card>
        </div>
        </div>
      </div>
    </div>
  )
}

