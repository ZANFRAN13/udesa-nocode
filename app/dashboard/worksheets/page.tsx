"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  BookOpen,
  CheckCircle,
  Circle,
  ArrowLeft,
  LogOut,
  ChevronDown,
  ChevronRight,
  FileText,
  ExternalLink,
  GraduationCap,
  Info,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export default function WorksheetsPage() {
  const router = useRouter()
  const [expandedTasks, setExpandedTasks] = useState<Record<string, boolean>>({})
  const [isLoading, setIsLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

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

  const toggleTask = (taskId: string) => {
    setExpandedTasks(prev => ({
      ...prev,
      [taskId]: !prev[taskId]
    }))
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

  const class1Tasks = [
    {
      id: "task-1",
      title: "Pensar ideas para proyectos",
      description: "Empiecen a pensar ideas para su proyecto de curso",
      resources: [
        {
          title: "Ideación de productos",
          url: "https://chatgpt.com/?q=dame_una_lista_de_ideas_de_producto_digital/",
          description: "Cómo generar ideas innovadoras"
        }
      ]
    },
    {
      id: "task-2", 
      title: "Configurar cuentas y herramientas",
      description: "Crear cuenta en Github, V0, Supabase, 021, Vercel, Gemini API",
      resources: [
        {
          title: "GitHub",
          url: "https://github.com",
          description: "Crear cuenta gratuita"
        },
        {
          title: "V0",
          url: "https://v0.app",
          description: "Herramienta de Vercel para desarrollo con IA"
        },
        {
          title: "Supabase",
          url: "https://supabase.com",
          description: "Base de datos y backend como servicio"
        },
        {
          title: "021",
          url: "https://from021.io",
          description: "Ideación, priorización y planificación de productos"
        },
        {
          title: "Vercel",
          url: "https://vercel.com",
          description: "Plataforma de hosting y deployment"
        },
        {
          title: "Gemini API",
          url: "https://aistudio.google.com/",
          description: "API de Google para IA (versión gratuita disponible)"
        }
      ]
    },
    {
      id: "task-3",
      title: "Investigar noticias de IA y Vibe-coding",
      description: "Traer 3 noticias sobre inteligencia artificial y/o Vibe-coding",
      resources: [
        {
          title: "TechCrunch - IA",
          url: "https://techcrunch.com/category/artificial-intelligence/",
          description: "Noticias sobre IA en TechCrunch"
        },
        {
          title: "The Verge - IA",
          url: "https://www.theverge.com/ai-artificial-intelligence",
          description: "Cobertura de IA en The Verge"
        },
        {
          title: "Hacker News",
          url: "https://news.ycombinator.com",
          description: "Comunidad de desarrolladores y noticias tech"
        }
      ]
    },
    {
      id: "task-4",
      title: "Crear una Single-Feature App",
      description: "Crear una app de una sola funcionalidad como la que hicimos en clase usando una de las herramientas de a continuación",
      resources: [
        {
          title: "v0",
          url: "https://v0.app/",
          description: "Herramienta de Vercel para desarrollo con IA"
        },
        {
          title: "Lovable",
          url: "https://lovable.dev/",
          description: "Plataforma de desarrollo rápido con IA"
        },
        {
          title: "Replit",
          url: "https://replit.com/",
          description: "Entorno de desarrollo online colaborativo"
        }
      ]
    }
  ]

  const class2Tasks = [
    {
      id: "task-1",
      title: "Definir idea para proyecto de curso",
      description: "Definir y documentar la idea que desarrollarán como proyecto final del curso",
      resources: [
        {
          title: "Ideación de productos",
          url: "https://chatgpt.com/?q=ayudame_a_elegir_entre_esta_lista_de_ideas_de_producto_digital/",
          description: "Herramienta para generar ideas innovadoras"
        }
      ]
    },
    {
      id: "task-2",
      title: "Investigar noticias de IA y Vibe-coding",
      description: "Traer 3 noticias sobre inteligencia artificial y/o Vibe-coding",
      resources: [
        {
          title: "TechCrunch - IA",
          url: "https://techcrunch.com/category/artificial-intelligence/",
          description: "Noticias sobre IA en TechCrunch"
        },
        {
          title: "The Verge - IA",
          url: "https://www.theverge.com/ai-artificial-intelligence",
          description: "Cobertura de IA en The Verge"
        },
        {
          title: "Hacker News",
          url: "https://news.ycombinator.com",
          description: "Comunidad de desarrolladores y noticias tech"
        }
      ]
    }
  ]

  const class3Tasks = [
    {
      id: "task-1",
      title: "Empezar a desarrollar un producto desde cero",
      description: "Crear un PRD (Documento de Requisitos del Producto), una landing page y empezar a desarrollar las funcionalidades principales",
      resources: [
        {
          title: "ChatGPT",
          url: "https://chatgpt.com/",
          description: "Úsalo para brainstorming, crear el PRD y planificar tu producto"
        },
        {
          title: "021",
          url: "https://from021.io/",
          description: "Ideación, priorización y planificación de productos"
        },
        {
          title: "V0",
          url: "https://v0.app/",
          description: "Herramienta de Vercel para desarrollo con IA",
          tooltip: "Recuerden que también pueden usar otras herramientas como Lovable o Replit. Pueden encontrar un benchmark completo en la sección Herramientas No-Code"
        },
        {
          title: "📊 Ver todas las Herramientas No-Code",
          url: "/dashboard/nocode-tools",
          description: "Explora el benchmark completo de herramientas de desarrollo sin código"
        }
      ]
    },
    {
      id: "task-2",
      title: "Investigar noticias de IA y Vibe-coding",
      description: "Traer 3 noticias sobre inteligencia artificial y/o Vibe-coding",
      resources: [
        {
          title: "TechCrunch - IA",
          url: "https://techcrunch.com/category/artificial-intelligence/",
          description: "Noticias sobre IA en TechCrunch"
        },
        {
          title: "The Verge - IA",
          url: "https://www.theverge.com/ai-artificial-intelligence",
          description: "Cobertura de IA en The Verge"
        },
        {
          title: "Hacker News",
          url: "https://news.ycombinator.com",
          description: "Comunidad de desarrolladores y noticias tech"
        }
      ]
    }
  ]
  const class4Tasks = [
    {
      id: "task-1",
      title: "Hacer que funcione",
      description: "Terminar las funcionalidades y conectar servicios",
      resources: [
        {
          title: "v0",
          url: "https://v0.app/",
          description: "Puedes conectar AI Gateway y AI SDK para darle un diferencial con IA. Ideal para maquetar y conectar servicios"
        },
        {
          title: "Lovable",
          url: "https://lovable.dev/",
          description: "Lovable Cloud & AI simplifican la integración de servicios como base de datos y AI. Ideal para maquetar y conectar servicios",
          tooltip: "Recuerden que también pueden usar otras herramientas como Replit, Bolt, etc. Pueden encontrar un benchmark completo en la sección Herramientas No-Code"
        },
        {
          title: "Cursor",
          url: "https://cursor.com/",
          description: "Editor de código con IA más completo y versátil. Ideal para funcionalidades complejas",
        },
        {
          title: "📊 Ver todas las Herramientas No-Code",
          url: "/dashboard/nocode-tools",
          description: "Explora el benchmark completo de herramientas de desarrollo sin código"
        }
      ]
    },
    {
      id: "task-2",
      title: "Investigar noticias de IA y Vibe-coding",
      description: "Traer 3 noticias sobre inteligencia artificial y/o Vibe-coding",
      resources: [
        {
          title: "📊 Ver RRSS de Referentes y otros Recursos de Aprendizaje",
          url: "/dashboard/additional-resources",
          description: "Sigue a referentes para aprender trucos y tips y las últimas noticias sobre IA y Vibe-coding"
        },
        {
          title: "TechCrunch - IA",
          url: "https://techcrunch.com/category/artificial-intelligence/",
          description: "Noticias sobre IA en TechCrunch"
        },
        {
          title: "The Verge - IA",
          url: "https://www.theverge.com/ai-artificial-intelligence",
          description: "Cobertura de IA en The Verge"
        },
        {
          title: "Hacker News",
          url: "https://news.ycombinator.com",
          description: "Comunidad de desarrolladores y noticias tech"
        }
      ]
    }
  ]

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
    <TooltipProvider>
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
                  <span className="hidden md:inline">Worksheets y Actividades</span>
                  <span className="md:hidden">Worksheets</span>
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

      {/* Main Content */}
      <div className="container mx-auto px-3 md:px-4 py-6 md:py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 md:mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              Tareas y Actividades
            </h2>
            <p className="text-sm md:text-base text-muted-foreground">
              Aquí encontrarás todas las tareas y actividades asignadas para cada clase.
            </p>
          </div>

          {/* Clase 1 Tasks */}
          <Card className="overflow-hidden border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-background mb-6 group hover:bg-primary/10 transition-all duration-200">
            <Collapsible
              open={expandedTasks["clase-1"]}
              onOpenChange={() => toggleTask("clase-1")}
            >
              <CollapsibleTrigger className="w-full">
                <CardHeader className="cursor-pointer p-4 md:p-6">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 md:gap-3 min-w-0 flex-1">
                      <div className="p-1.5 md:p-2 bg-primary/10 rounded-lg shrink-0">
                        <GraduationCap className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                      </div>
                      <div className="text-left min-w-0">
                        <CardTitle className="text-base md:text-xl">📚 Clase 1: La revolución de Producto</CardTitle>
                        <p className="text-xs md:text-sm text-muted-foreground mt-1 line-clamp-2">
                          Tareas para preparar la Clase 2
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 md:gap-2 shrink-0">
                      <Badge variant="secondary" className="bg-primary/10 text-primary text-xs hidden sm:inline-flex">
                        Para la próxima clase
                      </Badge>
                      {expandedTasks["clase-1"] ? (
                        <ChevronDown className="h-4 w-4 md:h-5 md:w-5 text-muted-foreground" />
                      ) : (
                        <ChevronRight className="h-4 w-4 md:h-5 md:w-5 text-muted-foreground" />
                      )}
                    </div>
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              
              <CollapsibleContent>
                <CardContent className="p-4 md:p-6">
                  <div className="space-y-3 md:space-y-4">
                    {class1Tasks.map((task, index) => (
                      <div key={task.id} className="flex items-start gap-2 md:gap-3 p-3 md:p-4 rounded-lg bg-accent/5 border border-accent/10">
                        <div className="w-5 h-5 md:w-6 md:h-6 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-medium text-accent">
                            {index + 1}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-sm md:text-base text-foreground mb-1">
                            {task.title}
                          </h3>
                          <p className="text-xs md:text-sm text-muted-foreground mb-2 md:mb-3">
                            {task.description}
                          </p>

                          {task.resources && task.resources.length > 0 && (
                            <div className="mt-2 md:mt-3">
                              <h4 className="font-medium text-foreground mb-1.5 md:mb-2 text-xs md:text-sm">Recursos útiles:</h4>
                              <div className="space-y-1.5 md:space-y-2">
                                {task.resources.map((resource, idx) => (
                                  <div key={idx} className="flex items-center gap-2 p-2 md:p-2.5 bg-background rounded border border-border/20">
                                    <FileText className="h-3 w-3 md:h-4 md:w-4 text-accent shrink-0" />
                                    <div className="flex-1 min-w-0">
                                      <a
                                        href={resource.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-xs md:text-sm font-medium text-accent hover:text-accent/80 transition-colors block truncate"
                                      >
                                        {resource.title}
                                      </a>
                                      {resource.description && (
                                        <p className="text-xs text-muted-foreground line-clamp-2">
                                          {resource.description}
                                        </p>
                                      )}
                                    </div>
                                    <ExternalLink className="h-3 w-3 text-muted-foreground shrink-0" />
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>

          {/* Clase 2 Tasks */}
          <Card className="overflow-hidden border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-background mb-6 group hover:bg-primary/10 transition-all duration-200">
            <Collapsible
              open={expandedTasks["clase-2"]}
              onOpenChange={() => toggleTask("clase-2")}
            >
              <CollapsibleTrigger className="w-full">
                <CardHeader className="cursor-pointer p-4 md:p-6">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 md:gap-3 min-w-0 flex-1">
                      <div className="p-1.5 md:p-2 bg-primary/10 rounded-lg shrink-0">
                        <GraduationCap className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                      </div>
                      <div className="text-left min-w-0">
                        <CardTitle className="text-base md:text-xl">📚 Clase 2: De la idea al prototipo</CardTitle>
                        <p className="text-xs md:text-sm text-muted-foreground mt-1 line-clamp-2">
                          Tareas para preparar la Clase 3
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 md:gap-2 shrink-0">
                      <Badge variant="secondary" className="bg-primary/10 text-primary text-xs hidden sm:inline-flex">
                        Para la próxima clase
                      </Badge>
                      {expandedTasks["clase-2"] ? (
                        <ChevronDown className="h-4 w-4 md:h-5 md:w-5 text-muted-foreground" />
                      ) : (
                        <ChevronRight className="h-4 w-4 md:h-5 md:w-5 text-muted-foreground" />
                      )}
                    </div>
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              
              <CollapsibleContent>
                <CardContent className="p-4 md:p-6">
                  <div className="space-y-3 md:space-y-4">
                    {class2Tasks.map((task, index) => (
                      <div key={task.id} className="flex items-start gap-2 md:gap-3 p-3 md:p-4 rounded-lg bg-accent/5 border border-accent/10">
                        <div className="w-5 h-5 md:w-6 md:h-6 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-medium text-accent">
                            {index + 1}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-sm md:text-base text-foreground mb-1">
                            {task.title}
                          </h3>
                          <p className="text-xs md:text-sm text-muted-foreground mb-2 md:mb-3">
                            {task.description}
                          </p>

                          {task.resources && task.resources.length > 0 && (
                            <div className="mt-2 md:mt-3">
                              <h4 className="font-medium text-foreground mb-1.5 md:mb-2 text-xs md:text-sm">Recursos útiles:</h4>
                              <div className="space-y-1.5 md:space-y-2">
                                {task.resources.map((resource, idx) => (
                                  <div key={idx} className="flex items-center gap-2 p-2 md:p-2.5 bg-background rounded border border-border/20">
                                    <FileText className="h-3 w-3 md:h-4 md:w-4 text-accent shrink-0" />
                                    <div className="flex-1 min-w-0">
                                      <a
                                        href={resource.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-xs md:text-sm font-medium text-accent hover:text-accent/80 transition-colors block truncate"
                                      >
                                        {resource.title}
                                      </a>
                                      {resource.description && (
                                        <p className="text-xs text-muted-foreground line-clamp-2">
                                          {resource.description}
                                        </p>
                                      )}
                                    </div>
                                    <ExternalLink className="h-3 w-3 text-muted-foreground shrink-0" />
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>

          {/* Clase 3 Tasks */}
          <Card className="overflow-hidden border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-background mb-6 group hover:bg-primary/10 transition-all duration-200">
            <Collapsible
              open={expandedTasks["clase-3"]}
              onOpenChange={() => toggleTask("clase-3")}
            >
              <CollapsibleTrigger className="w-full">
                <CardHeader className="cursor-pointer p-4 md:p-6">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 md:gap-3 min-w-0 flex-1">
                      <div className="p-1.5 md:p-2 bg-primary/10 rounded-lg shrink-0">
                        <GraduationCap className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                      </div>
                      <div className="text-left min-w-0">
                        <CardTitle className="text-base md:text-xl">📚 Clase 3: Desarrollo y construcción</CardTitle>
                        <p className="text-xs md:text-sm text-muted-foreground mt-1 line-clamp-2">
                          Tareas para preparar la Clase 4
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 md:gap-2 shrink-0">
                      <Badge variant="secondary" className="bg-primary/10 text-primary text-xs hidden sm:inline-flex">
                        Para la próxima clase
                      </Badge>
                      {expandedTasks["clase-3"] ? (
                        <ChevronDown className="h-4 w-4 md:h-5 md:w-5 text-muted-foreground" />
                      ) : (
                        <ChevronRight className="h-4 w-4 md:h-5 md:w-5 text-muted-foreground" />
                      )}
                    </div>
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              
              <CollapsibleContent>
                <CardContent className="p-4 md:p-6">
                  <div className="space-y-3 md:space-y-4">
                    {class3Tasks.map((task, index) => (
                      <div key={task.id} className="flex items-start gap-2 md:gap-3 p-3 md:p-4 rounded-lg bg-accent/5 border border-accent/10">
                        <div className="w-5 h-5 md:w-6 md:h-6 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-medium text-accent">
                            {index + 1}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-sm md:text-base text-foreground mb-1">
                            {task.title}
                          </h3>
                          <p className="text-xs md:text-sm text-muted-foreground mb-2 md:mb-3">
                            {task.description}
                          </p>

                          {task.resources && task.resources.length > 0 && (
                            <div className="mt-2 md:mt-3">
                              <h4 className="font-medium text-foreground mb-1.5 md:mb-2 text-xs md:text-sm">Recursos útiles:</h4>
                              <div className="space-y-1.5 md:space-y-2">
                                {task.resources.map((resource, idx) => (
                                  <div key={idx} className="flex items-center gap-2 p-2 md:p-2.5 bg-background rounded border border-border/20">
                                    <FileText className="h-3 w-3 md:h-4 md:w-4 text-accent shrink-0" />
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-center gap-1.5">
                                        <a
                                          href={resource.url}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="text-xs md:text-sm font-medium text-accent hover:text-accent/80 transition-colors block truncate"
                                        >
                                          {resource.title}
                                        </a>
                                        {resource.tooltip && (
                                          <Tooltip>
                                            <TooltipTrigger asChild>
                                              <Info className="h-3 w-3 text-muted-foreground cursor-help shrink-0" />
                                            </TooltipTrigger>
                                            <TooltipContent className="max-w-xs">
                                              <p className="text-xs">{resource.tooltip}</p>
                                            </TooltipContent>
                                          </Tooltip>
                                        )}
                                      </div>
                                      {resource.description && (
                                        <p className="text-xs text-muted-foreground line-clamp-2">
                                          {resource.description}
                                        </p>
                                      )}
                                    </div>
                                    <ExternalLink className="h-3 w-3 text-muted-foreground shrink-0" />
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>
          {/* Clase 4 Tasks */}
          <Card className="overflow-hidden border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-background mb-6 group hover:bg-primary/10 transition-all duration-200">
            <Collapsible
              open={expandedTasks["clase-4"]}
              onOpenChange={() => toggleTask("clase-4")}
            >
              <CollapsibleTrigger className="w-full">
                <CardHeader className="cursor-pointer p-4 md:p-6">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 md:gap-3 min-w-0 flex-1">
                      <div className="p-1.5 md:p-2 bg-primary/10 rounded-lg shrink-0">
                        <GraduationCap className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                      </div>
                      <div className="text-left min-w-0">
                        <CardTitle className="text-base md:text-xl">📚 Clase 4: Haciendo que funcione</CardTitle>
                        <p className="text-xs md:text-sm text-muted-foreground mt-1 line-clamp-2">
                          Tareas para preparar la Clase 4
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 md:gap-2 shrink-0">
                      <Badge variant="secondary" className="bg-primary/10 text-primary text-xs hidden sm:inline-flex">
                        Para la próxima clase
                      </Badge>
                      {expandedTasks["clase-4"] ? (
                        <ChevronDown className="h-4 w-4 md:h-5 md:w-5 text-muted-foreground" />
                      ) : (
                        <ChevronRight className="h-4 w-4 md:h-5 md:w-5 text-muted-foreground" />
                      )}
                    </div>
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              
              <CollapsibleContent>
                <CardContent className="p-4 md:p-6">
                  <div className="space-y-3 md:space-y-4">
                    {class4Tasks.map((task, index) => (
                      <div key={task.id} className="flex items-start gap-2 md:gap-3 p-3 md:p-4 rounded-lg bg-accent/5 border border-accent/10">
                        <div className="w-5 h-5 md:w-6 md:h-6 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-medium text-accent">
                            {index + 1}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-sm md:text-base text-foreground mb-1">
                            {task.title}
                          </h3>
                          <p className="text-xs md:text-sm text-muted-foreground mb-2 md:mb-3">
                            {task.description}
                          </p>

                          {task.resources && task.resources.length > 0 && (
                            <div className="mt-2 md:mt-3">
                              <h4 className="font-medium text-foreground mb-1.5 md:mb-2 text-xs md:text-sm">Recursos útiles:</h4>
                              <div className="space-y-1.5 md:space-y-2">
                                {task.resources.map((resource, idx) => (
                                  <div key={idx} className="flex items-center gap-2 p-2 md:p-2.5 bg-background rounded border border-border/20">
                                    <FileText className="h-3 w-3 md:h-4 md:w-4 text-accent shrink-0" />
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-center gap-1.5">
                                        <a
                                          href={resource.url}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="text-xs md:text-sm font-medium text-accent hover:text-accent/80 transition-colors block truncate"
                                        >
                                          {resource.title}
                                        </a>
                                        {resource.tooltip && (
                                          <Tooltip>
                                            <TooltipTrigger asChild>
                                              <Info className="h-3 w-3 text-muted-foreground cursor-help shrink-0" />
                                            </TooltipTrigger>
                                            <TooltipContent className="max-w-xs">
                                              <p className="text-xs">{resource.tooltip}</p>
                                            </TooltipContent>
                                          </Tooltip>
                                        )}
                                      </div>
                                      {resource.description && (
                                        <p className="text-xs text-muted-foreground line-clamp-2">
                                          {resource.description}
                                        </p>
                                      )}
                                    </div>
                                    <ExternalLink className="h-3 w-3 text-muted-foreground shrink-0" />
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>

          {/* Future classes placeholder */}
          <Card className="overflow-hidden border border-border/50 shadow-sm">
            <CardHeader className="bg-muted/30 p-4 md:p-6">
              <div className="flex items-center gap-2 md:gap-3">
                <div className="p-1.5 md:p-2 bg-muted/50 rounded-lg shrink-0">
                  <BookOpen className="h-4 w-4 md:h-5 md:w-5 text-muted-foreground" />
                </div>
                <div className="min-w-0">
                  <CardTitle className="text-base md:text-lg font-semibold text-muted-foreground">
                    Próximas clases
                  </CardTitle>
                  <p className="text-xs md:text-sm text-muted-foreground mt-1">
                    Las tareas de las siguientes clases aparecerán aquí
                  </p>
                </div>
              </div>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
    </TooltipProvider>
  )
}
