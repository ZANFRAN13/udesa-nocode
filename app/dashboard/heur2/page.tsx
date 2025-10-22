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
  RefreshCw,
  Sparkles,
  ListChecks,
  Blocks,
  ChevronDown,
  ChevronRight
} from "lucide-react"

export default function HeuristicsPage() {
  const router = useRouter()
  const supabase = createClient()
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({})
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

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }))
  }

  const toggleItem = (itemId: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }))
  }

  const heuristics = [
    {
      id: "ai-interaction",
      title: "Interacción con IA Generativa",
      icon: Brain,
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
      id: "prompting",
      title: "Técnicas de Prompting Efectivo",
      icon: Sparkles,
      items: [
        {
          title: "Sé específico y claro",
          description: "Cuanto más específico seas en tu consulta, mejores resultados obtendrás. Incluye detalles sobre qué quieres lograr y cómo.",
          example: "❌ Mal: 'Crea un botón'\n✅ Bien: 'Crea un botón primario de color azul con texto blanco, bordes redondeados y efecto hover que cambie la opacidad. Debe ser accesible y responsive'",
          icon: Target,
          type: "technique"
        },
        {
          title: "Proporciona contexto completo",
          description: "Incluye información sobre tu proyecto, tecnologías que usas, audiencia objetivo y cualquier restricción técnica.",
          example: "Estoy creando una aplicación de gestión de tareas usando React y Tailwind CSS. Necesito un componente de tarjeta para mostrar tareas individuales que funcione en móvil y desktop. La app usa modo oscuro.",
          icon: FileText,
          type: "technique"
        },
        {
          title: "Usa ejemplos en tus prompts",
          description: "Proporciona ejemplos de lo que quieres o no quieres. Esto ayuda a la IA a entender mejor tu visión.",
          example: "Quiero un diseño de login similar a Notion (minimalista y moderno), pero no como LinkedIn (más corporativo). Debe tener:\n- Campo de email\n- Campo de contraseña\n- Opción de 'Recordarme'\n- Botón de acceso con Google",
          icon: Blocks,
          type: "technique"
        },
        {
          title: "Divide tareas complejas en pasos",
          description: "Para proyectos grandes, divide tu consulta en tareas más pequeñas y manejables. Aborda una cosa a la vez.",
          example: "En lugar de: 'Crea una app completa de e-commerce'\nMejor:\n1. 'Crea la estructura base de una página de productos'\n2. 'Agrega funcionalidad de búsqueda y filtros'\n3. 'Implementa el carrito de compras'\n4. 'Crea el proceso de checkout'",
          icon: ListChecks,
          type: "technique"
        },
        {
          title: "Asigna un rol o contexto a la IA",
          description: "Puedes pedir a la IA que actúe como un experto específico para obtener respuestas más enfocadas y relevantes.",
          example: "Actúa como un diseñador UX experto. Necesito crear un flujo de onboarding para una app de finanzas personales dirigida a jóvenes adultos. ¿Qué pasos debería incluir?",
          icon: Users,
          type: "technique"
        },
        {
          title: "Itera y refina progresivamente",
          description: "Si el primer resultado no es perfecto, no empieces de cero. Pide ajustes específicos sobre lo que ya tienes.",
          example: "Primera consulta: 'Crea un componente de navbar'\nRespuesta obtenida...\nSegunda consulta: 'Muy bien, ahora hazlo sticky al hacer scroll y agrega un efecto de blur en el fondo'\nTercera consulta: 'Perfecto, ahora agrega un menú móvil tipo hamburguesa'",
          icon: RefreshCw,
          type: "technique"
        },
        {
          title: "Especifica formato de salida deseado",
          description: "Indica claramente en qué formato quieres la respuesta: código, lista, tabla, explicación paso a paso, etc.",
          example: "Dame una comparación de React vs Vue en formato de tabla con las siguientes columnas: Característica, React, Vue, Ventajas, Desventajas",
          icon: FileText,
          type: "technique"
        },
        {
          title: "Usa restricciones y limitaciones",
          description: "Define límites claros: tecnologías específicas, compatibilidad de navegadores, límites de rendimiento, etc.",
          example: "Crea un slider de imágenes que:\n- Use solo JavaScript vanilla (sin jQuery)\n- Funcione en navegadores antiguos (IE11+)\n- Pese menos de 5KB\n- Sea accesible con teclado\n- Incluya controles de reproducción automática",
          icon: Shield,
          type: "technique"
        },
        {
          title: "Pide explicaciones y alternativas",
          description: "No solo pidas código o soluciones. Pide que te expliquen el razonamiento y alternativas posibles.",
          example: "Explícame por qué recomendarías usar Context API vs Redux para manejar el estado en esta aplicación. También menciona otras alternativas y en qué casos serían mejores.",
          icon: Lightbulb,
          type: "technique"
        },
        {
          title: "Solicita código con comentarios",
          description: "Pide que el código generado incluya comentarios explicativos para entender qué hace cada parte.",
          example: "Crea una función que valide emails con regex. Incluye comentarios explicando cada parte de la expresión regular y el flujo de la validación.",
          icon: Code,
          type: "technique"
        }
      ]
    },
    {
      id: "vibecoding-practices",
      title: "Buenas Prácticas de Vibecoding",
      icon: Zap,
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
      case "technique": return <Sparkles className="h-4 w-4" />
      default: return <Info className="h-4 w-4" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "principle": return "bg-blue-100 text-blue-800 border-blue-200"
      case "practice": return "bg-purple-100 text-purple-800 border-purple-200"
      case "workflow": return "bg-green-100 text-green-800 border-green-200"
      case "collaboration": return "bg-orange-100 text-orange-800 border-orange-200"
      case "technique": return "bg-pink-100 text-pink-800 border-pink-200"
      default: return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "principle": return "Principio"
      case "practice": return "Práctica"
      case "workflow": return "Flujo"
      case "collaboration": return "Colaboración"
      case "technique": return "Técnica"
      default: return "General"
    }
  }

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
                  <span className="hidden md:inline">Heurísticas y Buenas Prácticas</span>
                  <span className="md:hidden">Heurísticas</span>
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
              Guía de Heurísticas y Buenas Prácticas
            </h2>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              Aprende a desarrollar productos de manera efectiva usando vibecoding e IA. Cada sección incluye principios, prácticas y ejemplos concretos.
            </p>
          </div>

          {/* Heuristics Sections */}
          <div>
            {heuristics.map((section) => {
              const IconComponent = section.icon
              const isOpen = expandedSections[section.id]
              
              return (
                <Card key={section.id} className="overflow-hidden border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-background mb-6 group hover:bg-primary/10 transition-all duration-200">
                  <Collapsible
                    open={isOpen}
                    onOpenChange={() => toggleSection(section.id)}
                  >
                    <CollapsibleTrigger className="w-full">
                      <CardHeader className="cursor-pointer p-4 md:p-6">
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2 md:gap-3 min-w-0 flex-1">
                            <div className="p-1.5 md:p-2 bg-primary/10 rounded-lg shrink-0">
                              <IconComponent className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                            </div>
                            <div className="text-left min-w-0">
                              <CardTitle className="text-base md:text-xl">
                                {section.title}
                              </CardTitle>
                              <p className="text-xs md:text-sm text-muted-foreground mt-0.5 md:mt-1 line-clamp-1">
                                {section.id === "ai-interaction" && "Principios para interactuar con IA"}
                                {section.id === "prompting" && "Técnicas para crear prompts efectivos"}
                                {section.id === "vibecoding-practices" && "Prácticas de vibecoding"}
                                {section.id === "development-workflow" && "Flujos de trabajo seguros"}
                                {section.id === "collaboration" && "Colaboración y aprendizaje"}
                              </p>
                            </div>
                          </div>
                          <div className="shrink-0">
                            {isOpen ? (
                              <ChevronDown className="h-4 w-4 md:h-5 md:w-5 text-muted-foreground" />
                            ) : (
                              <ChevronRight className="h-4 w-4 md:h-5 md:w-5 text-muted-foreground" />
                            )}
                          </div>
                        </div>
                      </CardHeader>
                    </CollapsibleTrigger>
                    
                    <CollapsibleContent>
                      <CardContent className="p-3 md:p-6">
                        <div className="space-y-2 md:space-y-3">
                          {section.items.map((item, index) => {
                            const itemId = `${section.id}-${index}`
                            const isItemExpanded = expandedItems[itemId]
                            
                            return (
                              <div key={index} className="border border-border/30 rounded-lg overflow-hidden bg-background/50">
                                <button
                                  onClick={() => toggleItem(itemId)}
                                  className="w-full flex items-start gap-2 md:gap-3 p-3 md:p-4 text-left hover:bg-accent/5 transition-colors"
                                >
                                  <div className="flex-shrink-0 w-6 h-6 md:w-7 md:h-7 bg-accent/10 rounded-full flex items-center justify-center mt-0.5">
                                    <span className="text-xs md:text-sm font-semibold text-accent">
                                      {index + 1}
                                    </span>
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap">
                                      <h3 className="text-sm md:text-base font-semibold text-foreground">
                                        {item.title}
                                      </h3>
                                      <Badge className={`${getTypeColor(item.type)} border text-xs`}>
                                        {getTypeLabel(item.type)}
                                      </Badge>
                                    </div>
                                  </div>
                                  <div className="flex-shrink-0">
                                    {isItemExpanded ? (
                                      <ChevronDown className="h-4 w-4 text-accent" />
                                    ) : (
                                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                                    )}
                                  </div>
                                </button>
                                
                                {isItemExpanded && (
                                  <div className="px-3 md:px-4 pb-3 md:pb-4 animate-in slide-in-from-top-2 duration-200">
                                    <div className="pl-8 md:pl-10 pr-2 md:pr-4 space-y-3">
                                      <div className="pt-2 md:pt-3 border-t border-border/20">
                                        <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                                          {item.description}
                                        </p>
                                      </div>
                                      {item.example && (
                                        <div className="bg-accent/5 p-3 md:p-4 rounded-lg border border-accent/20">
                                          <h4 className="text-xs md:text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                                            <FileText className="h-3 w-3 md:h-4 md:w-4 text-accent" />
                                            Ejemplo:
                                          </h4>
                                          <pre className="text-xs md:text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed">
                                            {item.example}
                                          </pre>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                )}
                              </div>
                            )
                          })}
                        </div>
                      </CardContent>
                    </CollapsibleContent>
                  </Collapsible>
                </Card>
              )
            })}
          </div>

          {/* Additional Resources */}
          <Card className="mt-6 md:mt-8 border border-border/50 shadow-sm">
            <CardHeader className="bg-accent/5 border-b p-4 md:p-6">
              <CardTitle className="text-base md:text-xl font-semibold text-foreground flex items-center gap-2 md:gap-3">
                <BookOpen className="h-4 w-4 md:h-5 md:w-5 text-accent shrink-0" />
                Recursos Adicionales
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 md:p-6">
              <div className="grid md:grid-cols-2 gap-3 md:gap-4">
                <div className="p-3 md:p-4 bg-accent/5 rounded-lg border border-accent/20">
                  <h4 className="text-sm md:text-base font-semibold text-foreground mb-1 md:mb-2">Documentación de Herramientas</h4>
                  <p className="text-xs md:text-sm text-muted-foreground mb-2 md:mb-3">
                    Consulta siempre la documentación oficial de las herramientas que uses
                  </p>
                  <div className="flex flex-wrap gap-1.5 md:gap-2">
                    <Badge variant="outline" className="text-xs">React Docs</Badge>
                    <Badge variant="outline" className="text-xs">Tailwind CSS</Badge>
                    <Badge variant="outline" className="text-xs">Supabase</Badge>
                    <Badge variant="outline" className="text-xs">Vercel</Badge>
                  </div>
                </div>
                <div className="p-3 md:p-4 bg-accent/5 rounded-lg border border-accent/20">
                  <h4 className="text-sm md:text-base font-semibold text-foreground mb-1 md:mb-2">Comunidad y Soporte</h4>
                  <p className="text-xs md:text-sm text-muted-foreground mb-2 md:mb-3">
                    Únete a la comunidad para resolver dudas y compartir experiencias
                  </p>
                  <div className="flex flex-wrap gap-1.5 md:gap-2">
                    <Badge variant="outline" className="text-xs">WhatsApp</Badge>
                    <Badge variant="outline" className="text-xs">GitHub</Badge>
                    <Badge variant="outline" className="text-xs">Stack Overflow</Badge>
                    <Badge variant="outline" className="text-xs">Discord</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="mt-8 md:mt-12 text-center">
            <p className="text-muted-foreground text-xs md:text-sm px-2">
              💡 Estas heurísticas son guías, no reglas rígidas. Adapta las prácticas a tu contexto específico.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
