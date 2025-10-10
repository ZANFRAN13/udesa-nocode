export interface NoCodeTool {
  id: string
  name: string
  category: string
  description: string
  website?: string
  pricing?: string
  features?: string[]
  imageUrl?: string
  tags?: string[]
}

export const noCodeToolsData: NoCodeTool[] = [
  // WebApps y Sitios
  {
    id: "lovable",
    name: "Lovable",
    category: "WebApps y Sitios",
    description: "Crea aplicaciones web completas usando prompts en lenguaje natural. Ideal para principiantes y usuarios no técnicos.",
    website: "https://lovable.dev",
    tags: ["ATP"]
  },
  {
    id: "v0-vercel",
    name: "v0 by Vercel",
    category: "WebApps y Sitios",
    description: "Genera componentes de UI y páginas web con IA. Código React limpio y listo para producción.",
    website: "https://v0.dev",
    tags: ["ATP"]
  },
  {
    id: "firebase-studio",
    name: "Firebase Studio",
    category: "WebApps y Sitios",
    description: "Construye aplicaciones web completas con backend de Firebase integrado.",
    website: "https://firebasestudio.dev",
    tags: []
  },
  {
    id: "replit",
    name: "Replit",
    category: "WebApps y Sitios",
    description: "Plataforma de desarrollo colaborativa con IA para construir aplicaciones y sitios web.",
    website: "https://replit.com",
    tags: []
  },
  {
    id: "tempo",
    name: "Tempo",
    category: "WebApps y Sitios",
    description: "Herramienta de desarrollo ágil: Prompt. Develop. Design. Collaborate.",
    website: "https://tempo.dev",
    tags: []
  },
  {
    id: "bolt-new",
    name: "bolt.new",
    category: "WebApps y Sitios",
    description: "Crea aplicaciones web instantáneamente con IA. Desarrollo rápido y eficiente.",
    website: "https://bolt.new",
    tags: ["ATP"]
  },
  {
    id: "emergent",
    name: "Emergent",
    category: "WebApps y Sitios",
    description: "La primera plataforma de vibe-coding agnética del mundo. Desarrollo asistido por IA de próxima generación.",
    website: "https://emergent.build",
    tags: ["ATP"]
  },
  {
    id: "rocket-new",
    name: "Rocket.new",
    category: "WebApps y Sitios",
    description: "Construye aplicaciones 10x más rápido con herramientas potenciadas por IA.",
    website: "https://rocket.new",
    tags: []
  },
  {
    id: "orchids",
    name: "Orchids",
    category: "WebApps y Sitios",
    description: "Crea algo hermoso con esta herramienta de desarrollo visual potenciada por IA.",
    website: "https://orchids.so",
    tags: ["ATP"]
  },
  
  // Apps Móviles
  {
    id: "a0-dev",
    name: "a0.dev",
    category: "Apps Móviles",
    description: "Crea aplicaciones móviles con IA. Desarrollo simplificado para iOS y Android.",
    website: "https://a0.dev",
    tags: []
  },
  {
    id: "rork-team",
    name: "Rork Team",
    category: "Apps Móviles",
    description: "De idea a app móvil en minutos. Desarrollo rápido con IA.",
    website: "https://rork.team",
    tags: []
  },
  
  // Diseño UI
  {
    id: "stitch",
    name: "Stitch",
    category: "Diseño UI",
    description: "Diseña interfaces con IA. Herramienta de diseño potenciada por inteligencia artificial.",
    website: "https://stitch.so",
    tags: ["ATP"]
  },
  {
    id: "magicpath",
    name: "MagicPath",
    category: "Diseño UI",
    description: "Crea flujos de usuario y diseños de interfaces de manera inteligente.",
    website: "https://magicpath.ai",
    tags: []
  },
  {
    id: "flora",
    name: "FLORA",
    category: "Diseño UI",
    description: "Diseño de interfaces y componentes visuales con IA.",
    website: "https://flora.so",
    tags: []
  },
  {
    id: "21st-dev",
    name: "21st.dev",
    category: "Diseño UI",
    description: "Descubre, comparte y crea componentes de UI con la comunidad.",
    website: "https://21st.dev",
    tags: ["ATP"]
  },
  {
    id: "magic-patterns",
    name: "Magic Patterns",
    category: "Diseño UI",
    description: "Genera patrones de diseño y componentes UI automáticamente con IA.",
    website: "https://magicpatterns.com",
    tags: ["ATP"]
  },
  
  // Editores de Código
  {
    id: "cursor",
    name: "Cursor",
    category: "Editores de Código",
    description: "El editor de código con IA más avanzado. Escribe código más rápido con asistencia inteligente.",
    website: "https://cursor.sh",
    tags: []
  },
  {
    id: "windsurf",
    name: "Windsurf",
    category: "Editores de Código",
    description: "El editor de código con IA más poderoso (anteriormente Codeium). Aumenta tu productividad al máximo.",
    website: "https://codeium.com/windsurf",
    tags: []
  },
  
  // Infrastructure
  {
    id: "supabase",
    name: "Supabase",
    category: "Infrastructure",
    description: "La alternativa open source a Firebase. Base de datos, autenticación, storage y más.",
    website: "https://supabase.com",
    tags: ["ATP"]
  },
  {
    id: "netlify",
    name: "Netlify",
    category: "Infrastructure",
    description: "Escala y despliega más rápido con una arquitectura web componible.",
    website: "https://netlify.com",
    tags: ["ATP"]
  },
  {
    id: "vercel",
    name: "Vercel",
    category: "Infrastructure",
    description: "Construye y despliega las mejores experiencias web con el Framework más rápido.",
    website: "https://vercel.com",
    tags: ["ATP"]
  },
  {
    id: "mintlify",
    name: "Mintlify",
    category: "Infrastructure",
    description: "La plataforma de documentación inteligente. Crea docs hermosas y funcionales.",
    website: "https://mintlify.com",
    tags: []
  },
  
  // Agentes IA
  {
    id: "manus",
    name: "Manus",
    category: "Agentes IA",
    description: "Agente de IA para automatizar tareas de desarrollo y construcción.",
    website: "https://manus.app",
    tags: []
  },
  {
    id: "factory",
    name: "Factory",
    category: "Agentes IA",
    description: "Construye agentes de IA personalizados para tu equipo de desarrollo.",
    website: "https://factory.ai",
    tags: []
  },
  {
    id: "devin",
    name: "Devin",
    category: "Agentes IA",
    description: "El primer ingeniero de software con IA. Asistente autónomo de desarrollo.",
    website: "https://devin.ai",
    tags: []
  },
  {
    id: "shinkai",
    name: "Shinkai",
    category: "Agentes IA",
    description: "IA completamente local (modelos, archivos y agentes). Privacidad y control total.",
    website: "https://shinkai.com",
    tags: []
  },
  {
    id: "google-ai-studio",
    name: "Google AI Studio",
    category: "Agentes IA",
    description: "Plataforma de Google para crear y experimentar con agentes de IA.",
    website: "https://aistudio.google.com",
    tags: []
  },
  {
    id: "databutton",
    name: "Databutton",
    category: "Agentes IA",
    description: "El desarrollador de IA para personas no técnicas. Construye apps sin código.",
    website: "https://databutton.com",
    tags: ["ATP"]
  },
  {
    id: "launchdarkly",
    name: "LaunchDarkly",
    category: "Agentes IA",
    description: "Feature Flags, gestión de features y experimentación para equipos de desarrollo.",
    website: "https://launchdarkly.com",
    tags: []
  },
  {
    id: "superblocks",
    name: "Superblocks",
    category: "Agentes IA",
    description: "Une ingenieros, equipos de negocio y TI para construir herramientas internas.",
    website: "https://superblocks.com",
    tags: []
  },
  {
    id: "genspark",
    name: "Genspark",
    category: "Agentes IA",
    description: "Super agente definitivo todo-en-uno con IA. El asistente más completo.",
    website: "https://genspark.ai",
    tags: ["ATP"]
  },
  {
    id: "relevance-ai",
    name: "Relevance AI",
    category: "Agentes IA",
    description: "Construye tu fuerza laboral con IA. IA para negocios y automatización.",
    website: "https://relevanceai.com",
    tags: []
  },
  
  // Automatización
  {
    id: "n8n",
    name: "n8n.io",
    category: "Automatización",
    description: "Herramienta poderosa de automatización de workflows. Conecta apps y servicios.",
    website: "https://n8n.io",
    tags: ["ATP"]
  },
  {
    id: "langgraph",
    name: "LangGraph",
    category: "Automatización",
    description: "Framework para construir agentes y workflows con LLMs.",
    website: "https://langgraph.com",
    tags: []
  },
  {
    id: "make",
    name: "Make",
    category: "Automatización",
    description: "Software de automatización. Conecta apps y diseña workflows visualmente.",
    website: "https://make.com",
    tags: []
  },
  {
    id: "zapier",
    name: "Zapier",
    category: "Automatización",
    description: "Automatiza sin límites. Conecta tus apps favoritas y crea workflows poderosos.",
    website: "https://zapier.com",
    tags: []
  },
  {
    id: "buildship",
    name: "BuildShip",
    category: "Automatización",
    description: "Constructor visual de workflows backend. Automatización sin código.",
    website: "https://buildship.com",
    tags: ["ATP"]
  },
  {
    id: "lieverage",
    name: "Lieverage",
    category: "Automatización",
    description: "Automatiza procesos de negocio con IA. Aumenta la eficiencia de tu empresa.",
    website: "https://lieverage.ai",
    tags: []
  },
  
  // No-Code Clásico
  {
    id: "bubble",
    name: "Bubble",
    category: "No-Code Clásico",
    description: "El constructor de apps full-stack no-code. ¡Empieza gratis!",
    website: "https://bubble.io",
    tags: []
  },
  {
    id: "jet-admin",
    name: "Jet Admin",
    category: "No-Code Clásico",
    description: "Construye apps de negocio personalizadas con no-code. Herramientas internas rápidas.",
    website: "https://jetadmin.io",
    tags: []
  },
  {
    id: "flutterflow",
    name: "FlutterFlow",
    category: "No-Code Clásico",
    description: "Construye apps de alta calidad y personalizadas rápidamente. No-code para Flutter.",
    website: "https://flutterflow.io",
    tags: []
  },
  
  // Otras Herramientas
  {
    id: "abacus-ai",
    name: "Abacus.AI",
    category: "Otras Herramientas",
    description: "La primera plataforma de IA asistida end-to-end para ciencia de datos del mundo.",
    website: "https://abacus.ai",
    tags: []
  },
  {
    id: "elevenlabs",
    name: "ElevenLabs",
    category: "Otras Herramientas",
    description: "Generador gratuito de texto a voz y voces con IA. Calidad profesional.",
    website: "https://elevenlabs.io",
    tags: []
  },
  {
    id: "project-mariner",
    name: "Project Mariner",
    category: "Otras Herramientas",
    description: "Proyecto experimental de Google DeepMind para agentes de navegación web.",
    website: "https://deepmind.google/technologies/project-mariner",
    tags: []
  }
]

export const noCodeCategories = [
  "Todos",
  "WebApps y Sitios",
  "Apps Móviles",
  "Diseño UI",
  "Editores de Código",
  "Infraestructura",
  "Agentes IA",
  "Automatización",
  "No-Code Clásico",
  "Otras Herramientas"
]

