import {
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
  RefreshCw,
  Sparkles,
  ListChecks,
  Blocks,
} from "lucide-react"

export interface HeuristicItem {
  title: string
  description: string
  example: string
  icon: any
  type: string
  image?: string
  imageCaption?: string
  link?: {
    text: string
    url: string
  }
  exampleLinks?: Array<{
    label: string
    url: string
  }>
}

export interface HeuristicSection {
  id: string
  title: string
  icon: any
  items: HeuristicItem[]
}

export const heuristicsData: HeuristicSection[] = [
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

export function getTypeIcon(type: string) {
  switch (type) {
    case "principle": return Lightbulb
    case "practice": return Zap
    case "workflow": return Settings
    case "collaboration": return Users
    case "technique": return Sparkles
    default: return Info
  }
}

export function getTypeColor(type: string) {
  switch (type) {
    case "principle": return "bg-blue-100 text-blue-800 border-blue-200"
    case "practice": return "bg-purple-100 text-purple-800 border-purple-200"
    case "workflow": return "bg-green-100 text-green-800 border-green-200"
    case "collaboration": return "bg-orange-100 text-orange-800 border-orange-200"
    case "technique": return "bg-pink-100 text-pink-800 border-pink-200"
    default: return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

export function getTypeLabel(type: string) {
  switch (type) {
    case "principle": return "Principio"
    case "practice": return "Práctica"
    case "workflow": return "Flujo"
    case "collaboration": return "Colaboración"
    case "technique": return "Técnica"
    default: return "General"
  }
}

