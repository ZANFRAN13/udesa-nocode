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
  Search,
  RefreshCw,
  Sparkles,
  ListChecks,
  Blocks,
} from "lucide-react"

export interface HeuristicItemNew {
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

export interface HeuristicSectionNew {
  id: string
  title: string
  icon: any
  items: HeuristicItemNew[]
}

export const heuristicsNewData: HeuristicSectionNew[] = [
  {
    id: "ai-heuristics",
    title: "Heurísticas para la IA Generativa",
    icon: Brain,
    items: [
      {
        title: "Cerrar chat cuando empieza a alucinar",
        description: "Si la IA comienza a dar respuestas incorrectas, contradecirse o perder precisión, es momento de cerrar ese chat (`thread`) y abrir uno nuevo. Las alucinaciones son señal de que el contexto está saturado.",
        example: "🚨 Señales de alerta:\n- Respuestas contradictorias\n- Inventa información que no le diste\n- Genera código que rompe lo que funcionaba\n- Ignora instrucciones recientes\n\n✅ Solución: Cierra el chat actual y abre uno nuevo con contexto fresco.",
        icon: AlertTriangle,
        type: "heuristic",
        image: "/images/new-close-chat.png",
        imageCaption: "Nuevo chat y cierre del chat anterior"
      },
      {
        title: "Prompt completo > Prompts fragmentados",
        description: "En general, es más efectivo dar todas las instrucciones en un único prompt completo que fragmentarlas en varios prompts separados. Esto da contexto integral a la IA desde el inicio. Con excepciones para tareas complejas (siguiente heurística).",
        example: "❌ Fragmentado:\n'Crea un botón'\n'Hazlo azul'\n'Agrégale un ícono'\n'Que sea responsive'\n\n✅ Completo:\n'Crea un botón azul con un ícono a la izquierda, que sea responsive y use los colores del proyecto. El botón debe tener efecto hover y ser accesible.'",
        icon: MessageSquare,
        type: "heuristic",
        image: "/images/lost-in-conv.png",
        link: {
          text: "Más información sobre esto",
          url: "https://drive.google.com/file/d/1jmYrrJmyNx256tvCAm5qJ8fdtbtV0L58/view"
        }
      },
      {
        title: "Tareas complejas requieren planificación y fragmentación",
        description: "Esta es la excepción a la regla anterior. Cuando la tarea es compleja, es mejor fragmentar el prompt en varias partes para que la IA pueda trabajar en pequeños pasos ordenadosy no se pierda el contexto. De lo contrario, la IA puede alucinar o no seguir las instrucciones.",
        example: "En caso de vibecoding:\n\n❌ 'Crea un eccomerce completo con login, productos, carrito de compras, checkout, un chatbot y un panel de administración.' \n\n✅ 'Crea la estructura base de una página de productos'\n'Agrega funcionalidad de búsqueda y filtros'\n'Implementa el carrito de compras'\n'Crea el proceso de checkout'\n'Crea un chatbot para el eccomerce'\n'Crea un panel de administración para el eccomerce'",
        icon: MessageSquare,
        type: "heuristic",
        link: {
          text: "Más información sobre esto",
          url: "https://v0.app/docs/text-prompting"
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
        description: "Usa la IA como un catalizador que acelera tu trabajo, no como una fuente absoluta de verdad. Mantén siempre tu criterio y pensamiento crítico y valida las respuestas.",
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
        example: "Crea un archivo `.cursorrules` o `contexto.md`:\n\nPROYECTO: [Nombre y descripción]\nTECNOLOGÍAS: [Stack que usas]\nOBJETIVO: [Qué quieres lograr]\n\nREGLAS:\n- Reutilizar componentes existentes\n- Evitar duplicación de código\n- Documentar componentes y cambios importantes. Usa un documento maestro y uno por componente\n- Incluir comentarios explicativos en el código\n- Incluye un resumen no técnico al final de cada respuesta.",
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
        example: "🌳 Estructura de branches:\n\n`main` → Código estable en producción\n`development` → Desarrollo activo\n`feature/login` → Nueva funcionalidad\n`fix/bug-dashboard` → Corrección de error\n\n📝 Comandos básicos (en la Terminal):\n\n• Ver en qué rama estás:\n`git branch`\n(La rama actual aparece con un * y en color verde)\n\n• Crear una nueva rama:\n`git branch nombre-de-tu-rama`\nEjemplo: `git branch feature/nueva-funcion`\n\n• Cambiar a otra rama:\n`git checkout nombre-de-la-rama`\nEjemplo: `git checkout development`\n\n• Crear y cambiar a una rama nueva (atajo):\n`git checkout -b nombre-de-tu-rama`\nEjemplo: `git checkout -b feature/login`\n\n• Ver todas las ramas que existen:\n`git branch -a`\n\n• Fusionar (merge) una rama a la actual:\n1. Primero, cambiate a la rama donde quieres traer los cambios\n   `git checkout main`\n2. Luego, fusiona la otra rama\n   `git merge nombre-de-la-otra-rama`\n\n• Subir tu rama al repositorio online:\n`git push origin nombre-de-tu-rama`\n\n✅ Workflow completo:\n1. Crea branch para nueva función:\n   `git checkout -b feature/mi-funcion`\n2. Desarrolla y prueba (trabaja con tu IA)\n3. Guarda cambios:\n   `git add .`\n   `git commit -m \"Agregué mi nueva función\"`\n4. Sube tu rama:\n   `git push origin feature/mi-funcion`\n5. Cuando esté lista, fusiona a `development`:\n   `git checkout development`\n   `git merge feature/mi-funcion`\n6. Prueba completa en `development`\n7. Fusiona a `main` cuando todo funcione:\n   `git checkout main`\n   `git merge development`",
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
        example: "📝 Instrucciones de refactoring:\n\n1️⃣ Identificación:\n'Analiza todo el código (`codebase`) e identifica oportunidades de refactoring: código duplicado, funciones muy largas, componentes complejos, etc.'\n\n2️⃣ Planificación:\n'Crea un plan de refactoring priorizado para atacar todas las oportunidades identificadas.'\n\n3️⃣ Ejecución:\n'Ejecuta el `refactoring` punto por punto, probando después de cada cambio.'",
        icon: RefreshCw,
        type: "practice"
      },
      {
        title: "Auditorías de seguridad periódicas",
        description: "Realiza auditorías de seguridad regularmente para identificar vulnerabilidades, exposición de datos sensibles y malas prácticas.\n\n🔒 Checklist de auditoría de seguridad:\n- ¿Hay datos sensibles expuestos?\n- ¿Las variables de entorno están protegidas?\n- ¿Se validan correctamente los inputs?\n- ¿Hay vulnerabilidades conocidas?\n- ¿Los endpoints están protegidos?\n- ¿Se sanitizan los datos del usuario?\n\n✅ Hazlo cada 2-4 semanas y antes de cada release.",
        example: "`npm audit fix` - chequea si hay vulnerabilidades en los paquetes y las corrige.\n\n`.env` en `.gitignore` (archivos) - en `.env` se guardan las variables de entorno, como las claves API, tokens y contraseñas. Este archivo debe estar mencionado en `.gitignore` para no ser expuestas en el repositorio.\n\nPolíticas de Row Level Security (RLS) - son medidas de seguridad que permiten controlar el acceso a los datos de la base de datos según el rol del usuario. Pidele a la IA que cree las necesarias según tu base de datos.",
        icon: Shield,
        type: "practice",
        exampleLinks: [
          {
            label: "Enlace 1",
            url: "https://www.reddit.com/r/vibecoding/comments/1k9kaeb/we_built_a_cursor_security_audit_flow_as_part_of/"
          },
          {
            label: "Enlace 2",
            url: "https://x.com/PrajwalTomar_/status/1929530584059015309"
          }
        ]
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
        description: "Variables de entorno, claves API, tokens y contraseñas NUNCA deben estar en el código. Siempre usa archivos de entorno (`.env`) que estén en `.gitignore`.",
        example: "✅ Regla para la IA:\n'NUNCA expongas claves API, tokens, contraseñas o datos sensibles directamente en el código. Siempre usa variables de entorno (`process.env.VARIABLE_NAME`). Si detectas datos sensibles expuestos, avísame inmediatamente.'\n\n❌ NUNCA:\n`const apiKey = 'sk-abc123'`\n\n✅ SIEMPRE:\n`const apiKey = process.env.OPENAI_API_KEY`",
        icon: Shield,
        type: "rule"
      },
      {
        title: "Documentar componentes y cambios",
        description: "Mantén un documento maestro del proyecto y documentación por componente. Registra qué hace cada parte y qué cambios se han realizado.",
        example: "✅ Regla para la IA:\n'Mantén documentación actualizada:\n- Documento maestro: Arquitectura general, decisiones importantes, estructura del proyecto\n- Por componente: Qué hace, `props` que recibe, cuándo usarlo\n- Registro de cambios: Qué se modificó y por qué'\n\nEjemplo:\n`// Button.tsx`\n`// Componente de botón reutilizable`\n`// Props: variant, size, onClick, children`\n`// Usado en: LoginForm, Dashboard, Settings`",
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
        example: "✅ Regla para la IA:\n'Incluye comentarios en español explicando:\n- Qué hace cada función\n- Por qué se eligió determinado enfoque\n- Cómo funciona la lógica compleja\n- Qué parámetros recibe y qué retorna'\n\nEjemplo:\n`// Valida que el email tenga formato correcto`\n`// Parámetros: email (string)`\n`// Retorna: true si es válido, false si no`\n`function validateEmail(email) {`\n`  // Verifica que contenga @ y al menos un punto`\n`  const hasAt = email.includes('@')`\n`  const hasDot = email.includes('.')`\n`  return hasAt && hasDot`\n`}`",
        icon: Code,
        type: "rule"
      }
    ]
  }
]

export function getTypeIconNew(type: string) {
  switch (type) {
    case "heuristic": return Lightbulb
    case "practice": return Zap
    case "rule": return CheckCircle
    default: return Info
  }
}

export function getTypeColorNew(type: string) {
  switch (type) {
    case "heuristic": return "bg-blue-100 text-blue-800 border-blue-200"
    case "practice": return "bg-purple-100 text-purple-800 border-purple-200"
    case "rule": return "bg-green-100 text-green-800 border-green-200"
    default: return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

export function getTypeLabelNew(type: string) {
  switch (type) {
    case "heuristic": return "Heurística"
    case "practice": return "Práctica"
    case "rule": return "Regla"
    default: return "General"
  }
}

