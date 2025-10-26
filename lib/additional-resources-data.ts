export type ResourceType = 
  | "articulo"
  | "guia"
  | "bibliografia"
  | "video"
  | "paper"
  | "documentacion"
  | "curso"

export type ResourceTopic = 
  | "vibecoding"
  | "llm"
  | "agentes"
  | "prompting"
  | "arquitectura"
  | "ux-ui"
  | "desarrollo"
  | "producto"
  | "general"

export type DifficultyLevel = 1 | 2 | 3

export interface Resource {
  id: string
  title: string
  description: string
  type: ResourceType
  topic: ResourceTopic[]
  difficulty: DifficultyLevel
  url: string
  author?: string
  duration?: string // Para videos/cursos
  tags?: string[]
  language?: "es" | "en"
}

export const resources: Resource[] = [
  // Papers de Investigación
  {
    id: "paper-1",
    title: "Attention Is All You Need (2017)",
    description: "El paper fundacional que introdujo la arquitectura Transformer, la base de todos los modelos de lenguaje modernos como GPT, BERT y Claude. Un documento esencial para entender cómo funcionan los LLMs.",
    type: "paper",
    topic: ["llm", "arquitectura"],
    difficulty: 3,
    url: "https://drive.google.com/file/d/1eQq2Uls0Yxyo95_REmfhG_NpdcB8pvf9/view?usp=sharing",
    author: "Vaswani et al. (Google Brain)",
    language: "en",
    tags: ["transformer", "arquitectura", "paper", "investigación", "fundacional"]
  },
  {
    id: "paper-2",
    title: "LLMs Get Lost In Multi-Turn Conversations (2025)",
    description: "Investigación reciente que explora las limitaciones de los modelos de lenguaje en conversaciones largas y cómo pierden contexto con el tiempo. Esencial para entender los desafíos actuales de los chatbots.",
    type: "paper",
    topic: ["llm", "agentes"],
    difficulty: 2,
    url: "https://drive.google.com/file/d/1jmYrrJmyNx256tvCAm5qJ8fdtbtV0L58/view?usp=drive_link",
    author: "Laban et al.",
    language: "en",
    tags: ["conversaciones", "contexto", "limitaciones", "chatbots", "investigación"]
  },
  {
    id: "paper-3",
    title: "Dynamic Chunking for End-to-End Hierarchical Sequence Modeling (2025)",
    description: "Paper que explora técnicas avanzadas para procesar secuencias largas de información de manera más eficiente, crucial para aplicaciones que manejan documentos extensos.",
    type: "paper",
    topic: ["arquitectura", "llm"],
    difficulty: 3,
    url: "https://drive.google.com/file/d/1rmKASU74xA6Y2u5Od4lIJ71FAAvKIkBy/view?usp=sharing",
    author: "Hwang et al.",
    language: "en",
    tags: ["chunking", "procesamiento", "documentos", "técnico", "avanzado"]
  },
  {
    id: "paper-4",
    title: "The Illusion of Thinking: Understanding Reasoning Models (2025)",
    description: "Análisis profundo sobre las fortalezas y limitaciones de los modelos de razonamiento de IA. Examina qué tan bien estos modelos 'piensan' realmente versus simular pensamiento, visto desde la complejidad del problema.",
    type: "paper",
    topic: ["llm", "agentes"],
    difficulty: 3,
    url: "https://drive.google.com/file/d/1blPfQSG4oOujdfRinGPAhPbqUnzxB1YY/view?usp=sharing",
    author: "Shojaee et al. (Apple)",
    language: "en",
    tags: ["razonamiento", "limitaciones", "cognición", "investigación"]
  },
  {
    id: "paper-5",
    title: "The Illusion of The Illusion of Thinking: A Comment on Shojaee et al. (2025)",
    description: "Comentario sobre el paper de Shojaee et al. (2025) sobre las limitaciones de los modelos de razonamiento de IA, cuyo autor principal es el modelo Opus de Anthropic.",
    type: "paper",
    topic: ["llm", "agentes"],
    difficulty: 3,
    url: "https://arxiv.org/html/2506.09250v1#abstract",
    author: "C. Opus (Anthropic)",
    language: "en",
    tags: ["razonamiento", "limitaciones", "cognición", "investigación"]
  },
  {
    id: "paper-6",
    title: "A Survey of Self-Evolving Agents: On Path to Artificial Super Intelligence",
    description: "Un estudio sobre agentes autónomos auto-evolutivos y un destello de lo que podría ser la superinteligencia artificial.",
    type: "paper",
    topic: ["agentes"],
    difficulty: 3,
    url: "https://drive.google.com/file/d/1c6undRm9XgTGwi7hiO_oe9Ddx6LZQtVD/view?usp=sharing",
    author: "Gao et al.",
    language: "en",
    tags: ["agentes", "autónomos", "investigación"]
  },

  // Guías y Artículos Explicativos
  {
    id: "article-1",
    title: "What is ChatGPT doing... and why does it work? (2023)",
    description: "Explicación profunda pero accesible de Stephen Wolfram sobre cómo funciona ChatGPT internamente. Perfecto para entender los fundamentos sin necesidad de ser experto en matemáticas.",
    type: "articulo",
    topic: ["llm"],
    difficulty: 2,
    url: "https://drive.google.com/file/d/1dtFEiorWF1qw4lvJZMnTAsqQji4ubSZN/view?usp=sharing",
    author: "Stephen Wolfram",
    language: "en",
    tags: ["chatgpt", "explicación", "fundamentos", "comprensible"]
  },
  {
    id: "article-2",
    title: "Secure Vibe Coding: The Tools and Fundamentals to Vibe Code Securely",
    description: "Guía completa de Replit sobre cómo desarrollar aplicaciones con IA de manera segura. Incluye 16 mejores prácticas, checklist de seguridad y tips para proteger tus apps.",
    type: "guia",
    topic: ["vibecoding", "desarrollo"],
    difficulty: 2,
    url: "https://blog.replit.com/16-ways-to-vibe-code-securely",
    author: "Replit Team",
    language: "en",
    tags: ["seguridad", "buenas prácticas", "desarrollo", "protección"]
  },
  {
    id: "article-3",
    title: "Software is becoming a commodity",
    description: "Articulo sobre como el software se esta volviendo un commodity gracias a como la IA esta cambiando la forma de desarrollar software.",
    type: "articulo",
    topic: ["desarrollo", "producto"],
    difficulty: 1,
    url: "https://medium.com/@stephanemboghossian/software-is-becoming-a-commodity-273741174d04",
    author: "Stephane M. Boghossian",
    language: "en",
    tags: ["software", "commodity", "ia", "desarrollo", "producto"]
  },
  {
    id: "article-4",
    title: "MIT says 95% of AI pilots fail, McKinsey explains why agentic engineering shows how to fix it",
    description: "Análisis de reportes de McKinsey y MIT sobre los fallos de las implementaciones de IA y como la ingeniería agentica puede ayudar a resolverlos.",
    type: "articulo",
    topic: ["desarrollo", "producto"],
    difficulty: 1,
    url: "https://medium.com/generative-ai-revolution-ai-native-transformation/mit-says-95-of-ai-pilots-fail-mckinsey-explains-why-agentic-engineering-shows-how-to-fix-it-66a7bb2d8e0d",
    author: "Yi Zhou",
    language: "en",
    tags: ["ia", "ingeniería", "agentic", "ingeniería", "producto"]
  },
  {
    id: "article-5",
    title: "One Year of Agentic AI: Six Lessons from the People Doing the Work",
    description: "Reporte de McKinsey sobre el estadi de los agentes de IA en el año 2025.",
    type: "articulo",
    topic: ["desarrollo", "producto"],
    difficulty: 1,
    url: "https://medium.com/generative-ai-revolution-ai-native-transformation/the-future-of-ai-native-engineering-66a7bb2d8e0d",
    author: "McKinsey",
    language: "en",
    tags: ["ia", "ingeniería", "agentic", "ingeniería", "producto"]
  },
  {
    id: "article-6",
    title: "MIT was wrong: G2 Insight Report on AI Agents",
    description: "Reporte de G2 sobre el estado de los agentes de IA en el año 2025.",
    type: "articulo",
    topic: ["desarrollo", "producto"],
    difficulty: 1,
    url: "https://www.linkedin.com/posts/jeet-pattanaik_g2insightreportjeetpattanaik-activity-7384587130095939584-wyR4?utm_source=share&utm_medium=member_desktop&rcm=ACoAADZ4xToBVx5ZSTBX-H3Fj1LO2sEVVuaDdMg",
    author: "Jeet Pattanaik",
    language: "en",
    tags: ["ia", "ingeniería", "agentic", "ingeniería", "producto"]
  },
  {
    id: "article-7",
    title: "8 Google employees invented modern AI transformers. Here’s what they say about the paper that changed everything.",
    description: "Articulo sobre como ocho empleados de Google inventaron los transformadores modernos de IA y lo que dicen sobre el paper que cambió todo.",
    type: "articulo",
    topic: ["desarrollo", "producto"],
    difficulty: 1,
    url: "https://www.wired.com/story/eight-google-employees-invented-modern-ai-transformers-paper/",
    author: "Steven Levy (WIRED)",
    language: "en",
    tags: ["ia", "ingeniería", "agentic", "ingeniería", "producto"]
  },

  // Recursos de Aprendizaje Interactivo
  {
    id: "guia-1",
    title: "Cursor Learn",
    description: "Plataforma oficial de aprendizaje de Cursor con tutoriales interactivos, guías paso a paso y mejores prácticas para aprovechar al máximo el editor de código potenciado con IA.",
    type: "guia",
    topic: ["vibecoding", "desarrollo"],
    difficulty: 1,
    url: "https://cursor.com/es/learn/",
    author: "Cursor Team",
    language: "es",
    tags: ["cursor", "tutorial", "herramientas", "aprendizaje", "principiantes"]
  },
  {
    id: "guia-3",
    title: "Best Practices for Secure Vibe Coding",
    description: "Guía sobre las mejores prácticas para desarrollar aplicaciones con IA de manera segura.",
    type: "guia",
    topic: ["vibecoding", "desarrollo"],
    difficulty: 2,
    url: "https://vitara.ai/best-practices-for-secure-vibe-coding/#what-makes-vibe-coding-vulnerable",
    author: "Vitara Team",
    language: "en",
    tags: ["seguridad", "buenas prácticas", "desarrollo", "protección"]
  },
  {
    id: "guia-4",
    title: "Introduction to V0 and Vibe Coding",
    description: "Guía sobre como usar V0 para desarrollar aplicaciones con IA y consejos para vibecoding en general.",
    type: "guia",
    topic: ["vibecoding", "desarrollo"],
    difficulty: 1,
    url: "https://v0.app/docs/introduction",
    author: "V0 Team",
    language: "en",
    tags: ["v0", "desarrollo", "ia", "protección"]
  },
  {
    id: "guia-5",
    title: "Lienzo de Propuesta de Valor",
    description: "Guía sobre como crear un lienzo de propuesta de valor para tu producto.",
    type: "guia",
    topic: ["producto", "desarrollo"],
    difficulty: 1,
    url: "https://xn--designthinkingespaa-d4b.com/lienzo-de-propuesta-de-valor",
    author: "Design Thinking España",
    language: "es",
    tags: ["producto", "desarrollo", "ia", "protección"]
  },
  {
    id: "guia-6",
    title: "Cómo crear un documento de requerimientos de producto (PRD)",
    description: "Guía sobre como crear un documento de requisitos para tu producto.",
    type: "guia",
    topic: ["producto", "desarrollo"],
    difficulty: 1,
    url: "https://www.atlassian.com/es/agile/product-management/requirements",
    author: "Atlassian",
    language: "es",
    tags: ["producto", "desarrollo", "ia", "protección"]
  },
  {
    id: "guia-7",
    title: "Sistema de Priorización MoSCoW",
    description: "Guía sobre como usar el sistema de priorización MoSCoW para priorizar los requisitos de tu producto.",
    type: "guia",
    topic: ["producto", "desarrollo"],
    difficulty: 1,
    url: "https://www.productplan.com/glossary/moscow-prioritization/",
    author: "ProductPlan",
    language: "en",
    tags: ["producto", "desarrollo", "ia", "protección"]
  },
  {
    id: "guia-8",
    title: "Qué es un MVP?",
    description: "Guía sobre como definir y alcanzar un MVP (Minimum Viable Product) para tu producto.",
    type: "guia",
    topic: ["producto", "desarrollo"],
    difficulty: 1,
    url: "https://productschool.com/resources/glossary/mvp-minimum-viable-product",
    author: "ProductSchool",
    language: "en",
    tags: ["producto", "desarrollo", "ia", "protección"]
  },

  // Reportes de Industria
  {
    id: "report-1",
    title: "State of AI in Business (2025)",
    description: "Reporte actualizado sobre el estado de la inteligencia artificial en el mundo empresarial. Incluye estadísticas, tendencias, casos de uso y proyecciones para el futuro cercano.",
    type: "articulo",
    topic: ["producto", "agentes"],
    difficulty: 1,
    url: "https://drive.google.com/file/d/1bRrhxvN0WoGkeY04oyPz_d1ZaKkMPaHP/view?usp=drive_link",
    author: "MIT",
    language: "en",
    tags: ["negocios", "tendencias", "estadísticas", "industria", "2025"]
  },
]

// Helper functions
export const getResourcesByType = (type: ResourceType) => 
  resources.filter(r => r.type === type)

export const getResourcesByTopic = (topic: ResourceTopic) => 
  resources.filter(r => r.topic.includes(topic))

export const getResourcesByDifficulty = (difficulty: DifficultyLevel) => 
  resources.filter(r => r.difficulty === difficulty)

export const searchResources = (query: string) => {
  const lowerQuery = query.toLowerCase()
  return resources.filter(r => 
    r.title.toLowerCase().includes(lowerQuery) ||
    r.description.toLowerCase().includes(lowerQuery) ||
    r.tags?.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
    r.author?.toLowerCase().includes(lowerQuery)
  )
}

