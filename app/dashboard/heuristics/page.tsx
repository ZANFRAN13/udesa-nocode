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
  Shield,
  Zap,
  Target,
  Users,
  BookOpen,
  CheckCircle,
  AlertTriangle,
  Info,
  Code,
  Brain,
  MessageSquare,
  Settings,
  GitBranch,
  FileText,
  Search,
  RefreshCw
} from "lucide-react"

export default function HeuristicsPage() {
  const router = useRouter()
  const supabase = createClient()

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

  const heuristics = [
    {
      id: "ai-interaction",
      title: "Interacción con IA Generativa",
      icon: Brain,
      color: "bg-blue-500/10 text-blue-600 border-blue-200",
      items: [
        {
          title: "Framing: Formular consultas de manera neutral y abierta",
          description: "Al consultar cosas para las cuales no sabes la respuesta, evita formular la consulta de manera parcial o tendenciosa. En cambio, procura hacerlo de manera neutral y abierta.",
          example: "❌ Mal: '¿Por qué React es mejor que Vue?'\n✅ Bien: '¿Cuáles son las ventajas y desventajas de React vs Vue para un proyecto web?'",
          icon: MessageSquare,
          type: "principle"
        },
        {
          title: "Proporcionar contexto específico",
          description: "Siempre incluye contexto relevante sobre tu proyecto, audiencia objetivo y restricciones técnicas para obtener respuestas más precisas.",
          example: "En lugar de: 'Necesito un botón'\nMejor: 'Necesito un botón para una app de e-commerce que debe ser accesible y funcionar en móviles'",
          icon: Target,
          type: "principle"
        },
        {
          title: "Iterar y refinar las consultas",
          description: "Si la respuesta no es lo que esperabas, reformula la pregunta con más detalles o desde un ángulo diferente.",
          example: "Primera consulta: 'Diseño de login'\nSegunda consulta: 'Diseño de login minimalista para app móvil con validación en tiempo real'",
          icon: RefreshCw,
          type: "principle"
        },
        {
          title: "Verificar y validar respuestas",
          description: "No asumas que la IA siempre tiene razón. Verifica información crítica y prueba las soluciones antes de implementarlas.",
          example: "Si la IA sugiere un código, pruébalo en un entorno seguro antes de usarlo en producción",
          icon: CheckCircle,
          type: "principle"
        }
      ]
    },
    {
      id: "vibecoding-practices",
      title: "Buenas Prácticas de Vibecoding",
      icon: Zap,
      color: "bg-purple-500/10 text-purple-600 border-purple-200",
      items: [
        {
          title: "Trabajar con Reglas y Contexto por proyecto",
          description: "Crea un archivo de reglas específicas para cada proyecto que incluya objetivos, restricciones, estilo de código y convenciones.",
          example: "Archivo 'reglas-proyecto.md':\n- Objetivo: App de gestión de tareas\n- Estilo: Minimalista, accesible\n- Tecnologías: React, Tailwind\n- Convenciones: Nombres en inglés, componentes funcionales",
          icon: FileText,
          type: "practice"
        },
        {
          title: "Reutilizar funciones y componentes",
          description: "Incluye en tus reglas el reutilizar funciones y componentes cuando sea posible. Esto mejora la consistencia y reduce el tiempo de desarrollo.",
          example: "En lugar de crear 5 botones diferentes, crea un componente Button reutilizable con variantes (primary, secondary, danger)",
          icon: GitBranch,
          type: "practice"
        },
        {
          title: "Documentar decisiones importantes",
          description: "Mantén un registro de las decisiones de diseño y desarrollo para referencia futura y para otros colaboradores.",
          example: "Decisión: Usar Supabase para autenticación\nRazón: Integración fácil con React, plan gratuito generoso\nFecha: 15/01/2024",
          icon: BookOpen,
          type: "practice"
        },
        {
          title: "Probar en dispositivos reales",
          description: "Siempre prueba tu aplicación en diferentes dispositivos y navegadores para asegurar una experiencia consistente.",
          example: "Prueba en: iPhone Safari, Android Chrome, Desktop Firefox, Tablet iPad",
          icon: Settings,
          type: "practice"
        }
      ]
    },
    {
      id: "development-workflow",
      title: "Flujo de Desarrollo Seguro",
      icon: Shield,
      color: "bg-green-500/10 text-green-600 border-green-200",
      items: [
        {
          title: "Desarrollo incremental",
          description: "Construye tu aplicación paso a paso, probando cada funcionalidad antes de agregar la siguiente.",
          example: "1. Crear página de login\n2. Probar login\n3. Agregar dashboard\n4. Probar navegación\n5. Continuar...",
          icon: CheckCircle,
          type: "workflow"
        },
        {
          title: "Backup y versionado",
          description: "Haz respaldos regulares de tu código y usa control de versiones (Git) para rastrear cambios.",
          example: "Commits descriptivos:\n- 'feat: agregar autenticación de usuario'\n- 'fix: corregir error en validación de formulario'",
          icon: GitBranch,
          type: "workflow"
        },
        {
          title: "Validación de datos",
          description: "Siempre valida los datos que ingresan a tu aplicación, tanto del lado del cliente como del servidor.",
          example: "Validar emails, contraseñas seguras, campos requeridos, tipos de datos correctos",
          icon: Shield,
          type: "workflow"
        },
        {
          title: "Manejo de errores",
          description: "Implementa manejo de errores amigable para el usuario y logging para el desarrollador.",
          example: "Mostrar: 'Error al cargar datos. Intenta nuevamente.'\nLog: 'Error 500 en /api/users: Database connection failed'",
          icon: AlertTriangle,
          type: "workflow"
        }
      ]
    },
    {
      id: "collaboration",
      title: "Colaboración y Comunidad",
      icon: Users,
      color: "bg-orange-500/10 text-orange-600 border-orange-200",
      items: [
        {
          title: "Compartir conocimiento",
          description: "Documenta y comparte lo que aprendes con la comunidad. Esto te ayuda a consolidar tu conocimiento y ayuda a otros.",
          example: "Crear tutoriales, escribir posts en el foro, compartir código en GitHub con documentación clara",
          icon: Users,
          type: "collaboration"
        },
        {
          title: "Pedir ayuda específica",
          description: "Cuando pidas ayuda, sé específico sobre el problema, qué has intentado y qué resultado esperas.",
          example: "❌ 'No funciona'\n✅ 'El botón de login no redirige al dashboard. He verificado que la función handleLogin se ejecuta pero router.push no funciona'",
          icon: MessageSquare,
          type: "collaboration"
        },
        {
          title: "Aprender de los errores",
          description: "Los errores son oportunidades de aprendizaje. Documenta qué salió mal y cómo lo solucionaste.",
          example: "Error: 'Cannot read property of undefined'\nSolución: Agregar validación de datos antes de acceder a propiedades\nLección: Siempre validar datos de APIs externas",
          icon: Lightbulb,
          type: "collaboration"
        },
        {
          title: "Mantener código limpio",
          description: "Escribe código que otros puedan entender fácilmente. Usa nombres descriptivos y comentarios cuando sea necesario.",
          example: "❌ const x = user.data.items.filter(i => i.active)\n✅ const activeUserItems = userData.items.filter(item => item.isActive)",
          icon: Code,
          type: "collaboration"
        }
      ]
    }
  ]

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "principle": return <Lightbulb className="h-4 w-4" />
      case "practice": return <Zap className="h-4 w-4" />
      case "workflow": return <Settings className="h-4 w-4" />
      case "collaboration": return <Users className="h-4 w-4" />
      default: return <Info className="h-4 w-4" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "principle": return "bg-blue-100 text-blue-800 border-blue-200"
      case "practice": return "bg-purple-100 text-purple-800 border-purple-200"
      case "workflow": return "bg-green-100 text-green-800 border-green-200"
      case "collaboration": return "bg-orange-100 text-orange-800 border-orange-200"
      default: return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "principle": return "Principio"
      case "practice": return "Práctica"
      case "workflow": return "Flujo"
      case "collaboration": return "Colaboración"
      default: return "General"
    }
  }

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
                  Heurísticas y Buenas Prácticas
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
        <div className="max-w-6xl mx-auto">
          {/* Introduction */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Guía de Heurísticas y Buenas Prácticas
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Esta guía te ayudará a desarrollar aplicaciones de manera segura y escalable usando 
              vibecoding e inteligencia artificial. Cada sección incluye principios fundamentales, 
              prácticas recomendadas y ejemplos concretos para que puedas aplicarlos en tus proyectos.
            </p>
          </div>

          {/* Heuristics Sections */}
          <div className="space-y-8">
            {heuristics.map((section) => {
              const IconComponent = section.icon
              
              return (
                <Card key={section.id} className="overflow-hidden border border-border/50 shadow-sm">
                  <CardHeader className={`${section.color} border-b`}>
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-white/80 rounded-lg border border-white/50">
                        <IconComponent className="h-6 w-6 text-current" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl font-bold text-current">
                          {section.title}
                        </CardTitle>
                        <p className="text-current/80 mt-1">
                          {section.id === "ai-interaction" && "Principios para interactuar efectivamente con IA generativa"}
                          {section.id === "vibecoding-practices" && "Mejores prácticas para el desarrollo con vibecoding"}
                          {section.id === "development-workflow" && "Flujos de trabajo seguros y escalables"}
                          {section.id === "collaboration" && "Colaboración efectiva y aprendizaje continuo"}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid gap-6">
                      {section.items.map((item, index) => (
                        <div key={index} className="p-6 bg-accent/5 rounded-lg border border-accent/20">
                          <div className="flex items-start gap-4">
                            <div className="p-2 bg-accent/10 rounded-lg border border-accent/30 flex-shrink-0">
                              {getTypeIcon(item.type)}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-3">
                                <h3 className="text-lg font-semibold text-foreground">
                                  {item.title}
                                </h3>
                                <Badge className={`${getTypeColor(item.type)} border`}>
                                  {getTypeLabel(item.type)}
                                </Badge>
                              </div>
                              <p className="text-muted-foreground leading-relaxed mb-4">
                                {item.description}
                              </p>
                              {item.example && (
                                <div className="bg-background/50 p-4 rounded-lg border border-border/30">
                                  <h4 className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                                    <FileText className="h-4 w-4" />
                                    Ejemplo:
                                  </h4>
                                  <pre className="text-sm text-muted-foreground whitespace-pre-wrap font-mono">
                                    {item.example}
                                  </pre>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Additional Resources */}
          <Card className="mt-8 border border-border/50 shadow-sm">
            <CardHeader className="bg-accent/5 border-b">
              <CardTitle className="text-xl font-semibold text-foreground flex items-center gap-3">
                <BookOpen className="h-5 w-5 text-accent" />
                Recursos Adicionales
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-accent/5 rounded-lg border border-accent/20">
                  <h4 className="font-semibold text-foreground mb-2">Documentación de Herramientas</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Consulta siempre la documentación oficial de las herramientas que uses
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">React Docs</Badge>
                    <Badge variant="outline">Tailwind CSS</Badge>
                    <Badge variant="outline">Supabase</Badge>
                    <Badge variant="outline">Vercel</Badge>
                  </div>
                </div>
                <div className="p-4 bg-accent/5 rounded-lg border border-accent/20">
                  <h4 className="font-semibold text-foreground mb-2">Comunidad y Soporte</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Únete a la comunidad para resolver dudas y compartir experiencias
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">WhatsApp</Badge>
                    <Badge variant="outline">GitHub</Badge>
                    <Badge variant="outline">Stack Overflow</Badge>
                    <Badge variant="outline">Discord</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="mt-12 text-center">
            <p className="text-muted-foreground text-sm">
              Recuerda: Estas heurísticas son guías, no reglas rígidas. Adapta las prácticas a tu contexto específico.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
