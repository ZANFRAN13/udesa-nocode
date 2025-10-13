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
} from "lucide-react"

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

  const handleBackToDashboard = () => {
    router.push('/dashboard')
  }

  const handleLogout = async () => {
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
          title: "Guía de ideación de productos",
          url: "https://chatgpt.com",
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
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                onClick={handleBackToDashboard}
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver al Dashboard
              </Button>
              <div className="h-6 w-px bg-border" />
              <div className="flex items-center gap-3">
                <img
                  src="/images/udesa-png.svg"
                  alt="Universidad de San Andrés"
                  className="h-8 w-auto"
                />
                <h1 className="text-xl font-semibold text-foreground">
                  Worksheets y Actividades
                </h1>
              </div>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              size="sm"
              className="text-muted-foreground hover:text-foreground"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Cerrar sesión
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-2">
              Tareas y Actividades
            </h2>
            <p className="text-muted-foreground">
              Aquí encontrarás todas las tareas y actividades asignadas para cada clase.
            </p>
          </div>

          {/* Clase 1 Tasks */}
          <Card className="overflow-hidden border border-border/50 shadow-sm mb-6">
            <Collapsible
              open={expandedTasks["clase-1"]}
              onOpenChange={() => toggleTask("clase-1")}
            >
              <CollapsibleTrigger asChild>
                <CardHeader className="bg-accent/5 border-b border-border/30 cursor-pointer hover:bg-accent/10 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-accent/10 rounded-lg border border-accent/20">
                        <BookOpen className="h-5 w-5 text-accent" />
                      </div>
                      <div>
                        <CardTitle className="text-xl font-semibold text-foreground">
                          Clase 1: La revolución de Producto
                        </CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                          Tareas para preparar la Clase 2
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {expandedTasks["clase-1"] ? (
                        <ChevronDown className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              
              <CollapsibleContent>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {class1Tasks.map((task, index) => (
                      <div key={task.id} className="flex items-start gap-3 p-4 rounded-lg bg-accent/5 border border-accent/10">
                        <div className="w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-medium text-accent">
                            {index + 1}
                          </span>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-foreground mb-1">
                            {task.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-3">
                            {task.description}
                          </p>
                          
                          {task.resources && task.resources.length > 0 && (
                            <div className="mt-3">
                              <h4 className="font-medium text-foreground mb-2 text-sm">Recursos útiles:</h4>
                              <div className="space-y-2">
                                {task.resources.map((resource, idx) => (
                                  <div key={idx} className="flex items-center gap-2 p-2 bg-background rounded border border-border/20">
                                    <FileText className="h-4 w-4 text-accent" />
                                    <div className="flex-1">
                                      <a
                                        href={resource.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm font-medium text-accent hover:text-accent/80 transition-colors"
                                      >
                                        {resource.title}
                                      </a>
                                      <p className="text-xs text-muted-foreground">
                                        {resource.description}
                                      </p>
                                    </div>
                                    <ExternalLink className="h-3 w-3 text-muted-foreground" />
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
            <CardHeader className="bg-muted/30">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-muted/50 rounded-lg">
                  <BookOpen className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <CardTitle className="text-lg font-semibold text-muted-foreground">
                    Próximas clases
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
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
