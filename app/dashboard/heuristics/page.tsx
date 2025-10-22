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
      id: "ai-heuristics",
      title: "Heurísticas para la IA Generativa",
      icon: Brain,
      items: [
        {
          title: "Cerrar chat cuando empieza a alucinar",
          description: "Si la IA comienza a dar respuestas incorrectas, contradecirse o perder precisión, es momento de cerrar ese chat (thread) y abrir uno nuevo. Las alucinaciones son señal de que el contexto está saturado.",
          example: "🚨 Señales de alerta:\n- Respuestas contradictorias\n- Inventa información que no le diste\n- Genera código que rompe lo que funcionaba\n- Ignora instrucciones recientes\n\n✅ Solución: Cierra el chat actual y abre uno nuevo con contexto fresco.",
          icon: AlertTriangle,
          type: "heuristic",
          image: "/images/new-close-chat.png",
          imageCaption: "Nuevo chat y cierre del chat anterior"
        },
        {
          title: "Prompt completo > Prompts fragmentados",
          description: "En general, es más efectivo dar todas las instrucciones en un único prompt completo que fragmentarlas en varios prompts separados. Esto da contexto integral a la IA desde el inicio.",
          example: "❌ Fragmentado:\n'Crea un botón'\n'Hazlo azul'\n'Agrégale un ícono'\n'Que sea responsive'\n\n✅ Completo:\n'Crea un botón azul con un ícono a la izquierda, que sea responsive y use los colores del proyecto. El botón debe tener efecto hover y ser accesible.'",
          icon: MessageSquare,
          type: "heuristic",
          link: {
            text: "Más información sobre esto",
            url: "https://drive.google.com/file/d/1jmYrrJmyNx256tvCAm5qJ8fdtbtV0L58/view"
          }
        },
        {
          title: "Framing: Evitar ser tendencioso o parcial",
          description: "La forma en que planteas tu pregunta influye en la respuesta. Evita hacer suposiciones o ser tendencioso, especialmente cuando no conoces la respuesta. Preguntate: ¿Qué supuestos estoy tomando? ¿Qué tipo de respuesta busco?",
          example: "❌ Tendencioso:\n'¿Por qué React es mejor que Vue?'\n(Asume que React es superior)\n\n✅ Neutral y abierto:\n'¿Cuáles son las ventajas y desventajas de React vs Vue para mi proyecto?'\n\n❌ Tendencioso:\n'¿Cómo es la relación entre A y B?'\n(Asume que existe relación) \n\n✅ Neutral:\n'¿Existe relación entre A y B?'\n(Da lugar a ambos sí y no)",
          icon: Target,
          type: "heuristic"
        },
        {
          title: "Siempre pedir y verificar fuentes",
          description: "Cuando solicites información, pedí siempre fuentes reconocidas y verificá por tu cuenta. La IA puede inventar referencias o citar información desactualizada.",
          example: "✅ En tu prompt:\n'Dame esta información con fuentes verificables y reconocidas. Incluye links a documentación oficial o papers académicos.'\n\n🔍 Luego TÚ verifica:\n- ¿Las fuentes existen realmente?\n- ¿La información está actualizada?\n- ¿Es de fuentes confiables?\n- ¿Realmente dice lo que me respondió el chat?",
          icon: Search,
          type: "heuristic"
        },
        {
          title: "IA como acelerador, no como oráculo",
          description: "Usa la IA como un catalizador que acelera tu trabajo, no como una fuente absoluta de verdad. Mantén siempre tu criterio crítico y valida las respuestas.",
          example: "✅ Usar como acelerador:\n- 'Ayúdame a explorar opciones'\n- 'Redacta un texto sobre el tema X'\n- 'Realiza una investigación sobre el tema Y'\n\n❌ Usar como oráculo:\n- 'Dime qué debo hacer'\n- '¿Es esta la única solución?'\n- '¿Esto es verdad?'",
          icon: Zap,
          type: "heuristic"
        },
        {
          title: "Estructurar prompts de manera completa",
          description: "Para obtener mejores resultados, estructura tu prompt con todos los elementos necesarios: Personalidad, Tarea, Contexto, Tono y Formato esperado.",
          example: "📝 Estructura completa de prompt:\n\n🎭 PERSONALIDAD:\n'Sos un experto en Negocios Digitales'\n\n📋 TAREA:\n'Realiza una investigación de mercado de productos que resuelvan el problema X. Luego, prepara un ranking con los criterios del documento adjunto. Finalmente, identifica oportunidades de negocio.'\n\n🌍 CONTEXTO:\n'Tengo una empresa de soluciones digitales para pymes en Argentina. Nuestro presupuesto es limitado...'\n[Adjunta documentos relevantes]\n\n🗣️ TONO:\n'Formal, escueto, conciso y claro. Sin ambigüedades.'\n\n📄 FORMATO:\n'Devuelveme un documento con: ranking listado, tabla comparativa por criterios, y resumen ejecutivo al final.'",
          icon: FileText,
          type: "heuristic"
        }
      ]
    },
    {
      id: "dev-practices",
      title: "Buenas Prácticas del AI-Assisted Development",
      icon: Code,
      items: [
        {
          title: "Configurar contexto y reglas de proyecto",
          description: "Al inicio de cada proyecto, configura un archivo con las reglas y contexto que la IA debe seguir. Esto asegura consistencia en todo el desarrollo.",
          example: "Crea un archivo .cursorrules o contexto.md:\n\nPROYECTO: [Nombre y descripción]\nTECNOLOGÍAS: [Stack que usas]\nOBJETIVO: [Qué quieres lograr]\n\nREGLAS:\n- Reutilizar componentes existentes\n- Evitar duplicación de código\n- Documentar componentes y cambios importantes. Usa un documento maestro y uno por componente\n- Incluir comentarios explicativos en el código\n- Incluye un resumen no técnico al final de cada respuesta.",
          icon: Settings,
          type: "practice"
        },
        {
          title: "Trabajar por ambientes (dev, stg, prod)",
          description: "Mantén ambientes separados para desarrollo, staging (pruebas) y producción. Nunca pruebes directamente en producción.",
          example: "🔧 DESARROLLO (dev):\nAquí experimentas y pruebas sin riesgos\n\n🧪 STAGING (stg):\nAmbiente de pruebas similar a producción\n\n🚀 PRODUCCIÓN (prod):\nDonde está tu aplicación real funcionando\n\n✅ Flujo:\ndev → stg → prod\n(Prueba en cada etapa antes de avanzar)",
          icon: GitBranch,
          type: "practice"
        },
        {
          title: "Trabajar con ramas (branches)",
          description: "Usa ramas de Git para desarrollar nuevas funcionalidades sin afectar el código principal. Esto te permite experimentar con seguridad.",
          example: "🌳 Estructura de branches:\n\nmain → Código estable en producción\ndevelopment → Desarrollo activo\nfeature/login → Nueva funcionalidad\nfix/bug-dashboard → Corrección de error\n\n📝 Comandos básicos (en la Terminal):\n\n• Ver en qué rama estás:\ngit branch\n(La rama actual aparece con un * y en color verde)\n\n• Crear una nueva rama:\ngit branch nombre-de-tu-rama\nEjemplo: git branch feature/nueva-funcion\n\n• Cambiar a otra rama:\ngit checkout nombre-de-la-rama\nEjemplo: git checkout development\n\n• Crear y cambiar a una rama nueva (atajo):\ngit checkout -b nombre-de-tu-rama\nEjemplo: git checkout -b feature/login\n\n• Ver todas las ramas que existen:\ngit branch -a\n\n• Fusionar (merge) una rama a la actual:\n1. Primero, cambiate a la rama donde quieres traer los cambios\n   git checkout main\n2. Luego, fusiona la otra rama\n   git merge nombre-de-la-otra-rama\n\n• Subir tu rama al repositorio online:\ngit push origin nombre-de-tu-rama\n\n✅ Workflow completo:\n1. Crea branch para nueva función:\n   git checkout -b feature/mi-funcion\n2. Desarrolla y prueba (trabaja con tu IA)\n3. Guarda cambios:\n   git add .\n   git commit -m \"Agregué mi nueva función\"\n4. Sube tu rama:\n   git push origin feature/mi-funcion\n5. Cuando esté lista, fusiona a development:\n   git checkout development\n   git merge feature/mi-funcion\n6. Prueba completa en development\n7. Fusiona a main cuando todo funcione:\n   git checkout main\n   git merge development",
          icon: GitBranch,
          type: "practice"
        },
        {
          title: "Considerar límites del context window",
          description: "Tanto el chat como el contexto del proyecto tienen límites. El chat de Cursor te avisa cuando te acercas al límite. Usa diferentes chats para diferentes tareas.",
          example: "💡 Buenas prácticas:\n- Chat 1: Sistema de autenticación\n- Chat 2: Dashboard principal\n- Chat 3: Perfil de usuario\n\nAl llegar a 100%, Cursor empieza a resumir el contexto para poder seguir trabajando pero esto aumenta la probabilidad de alucinaciones.",
          icon: Brain,
          type: "practice",
          image: "/images/context-window-cursor.png",
          imageCaption: "Indicador del context window en Cursor - cuando se acerca al límite es momento de cerrar el chat"
        },
        {
          title: "Refactoring periódico",
          description: "Cuando los archivos se vuelven muy complejos o largos, realiza refactoring. Primero pide identificar oportunidades, luego ejecuta un plan sistemático.",
          example: "📝 Proceso de refactoring:\n\n1️⃣ Identificación:\n'Analiza todo el código (codebase) e identifica oportunidades de refactoring: código duplicado, funciones muy largas, componentes complejos, etc.'\n\n2️⃣ Planificación:\n'Crea un plan de refactoring priorizado para atacar todas las oportunidades identificadas.'\n\n3️⃣ Ejecución:\n'Ejecuta el refactoring punto por punto, probando después de cada cambio.'",
          icon: RefreshCw,
          type: "practice"
        },
        {
          title: "Auditorías de seguridad periódicas",
          description: "Realiza auditorías de seguridad regularmente para identificar vulnerabilidades, exposición de datos sensibles y malas prácticas.",
          example: "🔒 Checklist de auditoría:\n\n'Realiza una auditoría de seguridad del proyecto:\n- ¿Hay datos sensibles expuestos?\n- ¿Las variables de entorno están protegidas?\n- ¿Se validan correctamente los inputs?\n- ¿Hay vulnerabilidades conocidas?\n- ¿Los endpoints están protegidos?\n- ¿Se sanitizan los datos del usuario?'\n\n✅ Hazlo cada 2-4 semanas",
          icon: Shield,
          type: "practice"
        }
      ]
    },
    {
      id: "project-rules",
      title: "Reglas de Proyecto",
      icon: BookOpen,
      items: [
        {
          title: "Reutilizar funciones y componentes",
          description: "Siempre reutiliza funciones y componentes existentes cuando sea posible. Esto evita duplicación y mantiene el código consistente.",
          example: "✅ Regla para la IA:\n'Antes de crear un nuevo componente o función, revisa si ya existe algo similar que puedas reutilizar. Si existe, úsalo. Si no existe, créalo de manera reutilizable para futuro uso.'",
          icon: GitBranch,
          type: "rule"
        },
        {
          title: "Evitar duplicar código",
          description: "El código duplicado es más difícil de mantener. Si encuentras lógica repetida, refactorízala en una función o componente reutilizable.",
          example: "✅ Regla para la IA:\n'Si detectas código duplicado o lógica similar repetida, refactorízalo en una función o componente reutilizable. Documenta qué código duplicado encontraste y cómo lo simplificaste.'",
          icon: Blocks,
          type: "rule"
        },
        {
          title: "Nunca exponer datos sensibles",
          description: "Variables de entorno, claves API, tokens y contraseñas NUNCA deben estar en el código. Siempre usa archivos de entorno (.env) que estén en .gitignore.",
          example: "✅ Regla para la IA:\n'NUNCA expongas claves API, tokens, contraseñas o datos sensibles directamente en el código. Siempre usa variables de entorno (process.env.VARIABLE_NAME). Si detectas datos sensibles expuestos, avísame inmediatamente.'\n\n❌ NUNCA:\nconst apiKey = 'sk-abc123'\n\n✅ SIEMPRE:\nconst apiKey = process.env.OPENAI_API_KEY",
          icon: Shield,
          type: "rule"
        },
        {
          title: "Documentar componentes y cambios",
          description: "Mantén un documento maestro del proyecto y documentación por componente. Registra qué hace cada parte y qué cambios se han realizado.",
          example: "✅ Regla para la IA:\n'Mantén documentación actualizada:\n- Documento maestro: Arquitectura general, decisiones importantes, estructura del proyecto\n- Por componente: Qué hace, props que recibe, cuándo usarlo\n- Registro de cambios: Qué se modificó y por qué'\n\nEjemplo:\n// Button.tsx\n// Componente de botón reutilizable\n// Props: variant, size, onClick, children\n// Usado en: LoginForm, Dashboard, Settings",
          icon: FileText,
          type: "rule"
        },
        {
          title: "Incluir resúmenes no técnicos",
          description: "Al final de cada respuesta, la IA debe incluir un breve resumen en lenguaje simple de lo que hizo, sin términos técnicos complejos.",
          example: "✅ Regla para la IA:\n'Al final de cada respuesta, incluye un resumen no técnico explicando:\n- Qué hiciste en términos simples\n- Qué problema solucionaste\n- Qué puede hacer ahora el usuario'\n\nEjemplo de resumen:\n'Creé un formulario de contacto que guarda los mensajes en una base de datos. Ahora cuando alguien te escriba desde tu sitio, podrás ver todos los mensajes en tu panel de administración.'",
          icon: MessageSquare,
          type: "rule"
        },
        {
          title: "Dejar comments explicativos en el código",
          description: "El código debe incluir comentarios que expliquen qué hace cada parte, por qué se usa cierta técnica, y cómo funciona la lógica compleja.",
          example: "✅ Regla para la IA:\n'Incluye comentarios en español explicando:\n- Qué hace cada función\n- Por qué se eligió determinado enfoque\n- Cómo funciona la lógica compleja\n- Qué parámetros recibe y qué retorna'\n\nEjemplo:\n// Valida que el email tenga formato correcto\n// Parámetros: email (string)\n// Retorna: true si es válido, false si no\nfunction validateEmail(email) {\n  // Verifica que contenga @ y al menos un punto\n  const hasAt = email.includes('@')\n  const hasDot = email.includes('.')\n  return hasAt && hasDot\n}",
          icon: Code,
          type: "rule"
        }
      ]
    }
  ]

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "heuristic": return <Lightbulb className="h-4 w-4" />
      case "practice": return <Zap className="h-4 w-4" />
      case "rule": return <CheckCircle className="h-4 w-4" />
      default: return <Info className="h-4 w-4" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "heuristic": return "bg-blue-100 text-blue-800 border-blue-200"
      case "practice": return "bg-purple-100 text-purple-800 border-purple-200"
      case "rule": return "bg-green-100 text-green-800 border-green-200"
      default: return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "heuristic": return "Heurística"
      case "practice": return "Práctica"
      case "rule": return "Regla"
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
                  <span className="hidden md:inline">Guía de Vibecoding con IA</span>
                  <span className="md:hidden">Vibecoding con IA</span>
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
              Guía de Vibecoding con IA
            </h2>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              Aprende a trabajar eficientemente con IA para crear tus proyectos. Estas son las mejores prácticas y consejos esenciales para vibecoding exitoso.
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
                                {section.id === "ai-heuristics" && "Principios para trabajar efectivamente con IA"}
                                {section.id === "dev-practices" && "Prácticas esenciales del desarrollo asistido por IA"}
                                {section.id === "project-rules" && "Reglas fundamentales para tu proyecto"}
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
                                      {(item as any).image && (
                                        <div className="bg-accent/5 p-3 md:p-4 rounded-lg border border-accent/20">
                                          <h4 className="text-xs md:text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                                            <FileText className="h-3 w-3 md:h-4 md:w-4 text-accent" />
                                            Referencia visual:
                                          </h4>
                                          <div className="mt-2">
                                            <img 
                                              src={(item as any).image} 
                                              alt={(item as any).imageCaption || "Imagen de referencia"}
                                              className="w-full max-w-md mx-auto rounded-lg border border-border/30"
                                            />
                                            {(item as any).imageCaption && (
                                              <p className="text-xs text-muted-foreground mt-2 text-center italic">
                                                {(item as any).imageCaption}
                                              </p>
                                            )}
                                          </div>
                                        </div>
                                      )}
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
                                      {(item as any).link && (
                                        <div className="pt-2 text-xs md:text-sm text-muted-foreground">
                                          {(item as any).link.text}{' '}
                                          <a 
                                            href={(item as any).link.url} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="text-primary hover:text-primary/80 underline font-medium"
                                          >
                                            aquí
                                          </a>
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

          {/* Tips Card */}
          <Card className="mt-6 md:mt-8 border border-border/50 shadow-sm">
            <CardHeader className="bg-accent/5 border-b p-4 md:p-6">
              <CardTitle className="text-base md:text-xl font-semibold text-foreground flex items-center gap-2 md:gap-3">
                <Lightbulb className="h-4 w-4 md:h-5 md:w-5 text-accent shrink-0" />
                Consejos Rápidos
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 md:p-6">
              <div className="grid md:grid-cols-2 gap-3 md:gap-4">
                <div className="p-3 md:p-4 bg-accent/5 rounded-lg border border-accent/20">
                  <h4 className="text-sm md:text-base font-semibold text-foreground mb-1 md:mb-2">✅ SÍ hacer</h4>
                  <ul className="text-xs md:text-sm text-muted-foreground space-y-1">
                    <li>• Estructurar prompts completos</li>
                    <li>• Verificar fuentes siempre</li>
                    <li>• Trabajar con branches y ambientes</li>
                    <li>• Refactoring y auditorías periódicas</li>
                    <li>• Documentar y comentar el código</li>
                    <li>• Cerrar chat si alucina</li>
                  </ul>
                </div>
                <div className="p-3 md:p-4 bg-accent/5 rounded-lg border border-accent/20">
                  <h4 className="text-sm md:text-base font-semibold text-foreground mb-1 md:mb-2">❌ NO hacer</h4>
                  <ul className="text-xs md:text-sm text-muted-foreground space-y-1">
                    <li>• Ser tendencioso en las consultas</li>
                    <li>• Usar IA como fuente de verdad absoluta</li>
                    <li>• Exponer datos sensibles en código</li>
                    <li>• Duplicar código sin refactorizar</li>
                    <li>• Mantener chats sobresaturados</li>
                    <li>• Probar directamente en producción</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="mt-8 md:mt-12 text-center">
            <p className="text-muted-foreground text-xs md:text-sm px-2">
              💡 Estas prácticas te ayudarán a trabajar mejor con IA. Aplicálas según las necesidades de tu proyecto.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

