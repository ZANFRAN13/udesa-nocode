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
} from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function WorksheetsPage() {
  const router = useRouter()
  const [expandedTasks, setExpandedTasks] = useState<Record<string, boolean>>({})
  const supabase = createClient()

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
      description: "Empiecen a pensar ideas para sus proyectos",
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
          description: "Plataforma de desarrollo con IA"
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
                                      <p className="text-xs text-muted-foreground line-clamp-2">
                                        {resource.description}
                                      </p>
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
  )
}
