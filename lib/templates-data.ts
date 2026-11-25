export type TemplateResourceType = "Skills" | "Repos y recursos" | "Templates"

export interface TemplateResource {
  id: string
  name: string
  type: TemplateResourceType
  description: string
  url: string
  source: string // Quién lo mantiene
  official?: boolean
  howToUse?: string
  highlights?: string[]
}

export const templateResourceTypes: ("Todos" | TemplateResourceType)[] = [
  "Todos",
  "Skills",
  "Repos y recursos",
  "Templates",
]

export const templatesData: TemplateResource[] = [
  // Skills
  {
    id: "anthropic-skills",
    name: "Anthropic Skills",
    type: "Skills",
    description: "El repositorio oficial de skills de Anthropic. Incluye skills para crear documentos (Word, Excel, PowerPoint, PDF), diseño de frontend, testing de apps web, creación de MCPs y una skill para crear tus propias skills.",
    url: "https://github.com/anthropics/skills",
    source: "Anthropic",
    official: true,
    howToUse: "En Claude Code: /plugin marketplace add anthropics/skills",
    highlights: [
      "Skills de documentos: docx, xlsx, pptx y pdf",
      "frontend-design para interfaces con mejor diseño",
      "skill-creator para armar tus propias skills",
      "Sirve como ejemplo de cómo se escribe una buena skill",
    ],
  },
  {
    id: "claude-plugins-official",
    name: "Claude Code Plugins (oficial)",
    type: "Skills",
    description: "Directorio oficial de plugins para Claude Code, curado por Anthropic. Cada plugin agrupa skills, comandos, agentes y conexiones MCP listos para instalar.",
    url: "https://github.com/anthropics/claude-plugins-official",
    source: "Anthropic",
    official: true,
    howToUse: "En Claude Code: /plugin y elegí del marketplace oficial",
    highlights: [
      "Plugins revisados por Anthropic",
      "Skills, comandos y agentes en un solo paquete",
      "Se instalan y desinstalan con un comando",
    ],
  },
  {
    id: "vercel-agent-skills",
    name: "Vercel Agent Skills",
    type: "Skills",
    description: "Colección oficial de skills de Vercel con buenas prácticas de React y Next.js, guías de diseño web y deploy a Vercel. Funciona con Claude Code, Cursor, OpenCode y otros agentes.",
    url: "https://github.com/vercel-labs/agent-skills",
    source: "Vercel",
    official: true,
    howToUse: "npx skills add vercel-labs/agent-skills",
    highlights: [
      "Buenas prácticas de React y Next.js",
      "Guías de diseño y accesibilidad web",
      "Deploy a Vercel desde el agente",
    ],
  },
  {
    id: "supabase-agent-skills",
    name: "Supabase Agent Skills",
    type: "Skills",
    description: "Skills oficiales de Supabase para que tu agente use bien la base de datos, la autenticación y las políticas de seguridad (RLS). Muy útil si tu proyecto usa Supabase como backend.",
    url: "https://github.com/supabase/agent-skills",
    source: "Supabase",
    official: true,
    howToUse: "npx skills add supabase/agent-skills",
    highlights: [
      "Buenas prácticas de Postgres y Supabase",
      "Seguridad: Row Level Security bien configurada",
      "Evita errores comunes de auth y migraciones",
    ],
  },
  {
    id: "superpowers",
    name: "Superpowers",
    type: "Skills",
    description: "Uno de los paquetes de skills más usados por la comunidad. Le da a tu agente un método de trabajo: hacer preguntas antes de arrancar, planificar, escribir tests primero, depurar de forma sistemática y revisar su propio código.",
    url: "https://github.com/obra/superpowers",
    source: "Jesse Vincent (comunidad)",
    howToUse: "Está en el marketplace oficial de plugins de Claude Code",
    highlights: [
      "Brainstorming y planificación antes de codear",
      "Desarrollo guiado por tests (TDD)",
      "Depuración sistemática",
      "Funciona con Claude Code, Codex, OpenCode y más",
    ],
  },
  {
    id: "skills-cli",
    name: "skills (CLI)",
    type: "Skills",
    description: "Herramienta de Vercel para instalar skills de cualquier repo de GitHub en tu agente con un solo comando. Funciona con Claude Code, Cursor, OpenCode, Codex y muchos más.",
    url: "https://github.com/vercel-labs/skills",
    source: "Vercel",
    official: true,
    howToUse: "npx skills add <usuario>/<repo>",
    highlights: [
      "Un comando para instalar skills de GitHub",
      "Compatible con decenas de agentes",
      "Buscador de skills en skills.sh",
    ],
  },

  // Skills populares de la comunidad
  {
    id: "caveman",
    name: "Caveman",
    type: "Skills",
    description: "La skill viral que hace que tu agente \"hable como cavernícola\": respuestas cortísimas y sin relleno, pero con el código, los errores y las rutas exactos. También comprime lo que el agente lee (logs, JSON, tests). Sirve para gastar menos tokens y llegar más lejos con tu plan.",
    url: "https://github.com/JuliusBrussee/caveman",
    source: "Julius Brussee (comunidad, +120k ★)",
    howToUse: "npx skills add JuliusBrussee/caveman",
    highlights: [
      "Respuestas mucho más cortas sin perder precisión técnica",
      "Comprime logs y salidas largas antes de leerlas",
      "Ahorro de tokens reportado por el autor: ~30% por sesión",
      "Variantes para commits, code review y refactors",
    ],
  },
  {
    id: "karpathy-skills",
    name: "Andrej Karpathy Skills",
    type: "Skills",
    description: "Un único CLAUDE.md con reglas inspiradas en las observaciones de Andrej Karpathy sobre los errores típicos de los agentes: pensar antes de codear, preferir lo simple, tocar solo lo necesario y verificar el resultado. Se volvió viral porque mejora mucho al agente con muy poco.",
    url: "https://github.com/multica-ai/andrej-karpathy-skills",
    source: "Comunidad (+230k ★)",
    howToUse: "Copiá el CLAUDE.md a la raíz de tu proyecto",
    highlights: [
      "Menos sobreingeniería y código innecesario",
      "Cambios más chicos y enfocados",
      "Un solo archivo, fácil de leer y adaptar",
    ],
  },
  {
    id: "mattpocock-skills",
    name: "Matt Pocock Skills",
    type: "Skills",
    description: "Las skills que usa Matt Pocock, uno de los educadores de TypeScript más conocidos, para programar con agentes: planificar, escribir PRDs, dividir el trabajo en issues, hacer TDD y mejorar la arquitectura.",
    url: "https://github.com/mattpocock/skills",
    source: "Matt Pocock (comunidad, +330k ★)",
    howToUse: "npx skills add mattpocock/skills",
    highlights: [
      "De la idea al PRD y a issues accionables",
      "Desarrollo guiado por tests",
      "Skills cortas y fáciles de entender",
    ],
  },
  {
    id: "gstack",
    name: "gstack",
    type: "Skills",
    description: "El setup de Claude Code de Garry Tan (CEO de Y Combinator): una serie de skills que hacen de CEO, diseñador, eng manager, QA y release manager para revisar tu producto desde distintos roles antes de lanzar.",
    url: "https://github.com/garrytan/gstack",
    source: "Garry Tan (comunidad, +140k ★)",
    highlights: [
      "Revisión de producto con mirada de CEO y diseño",
      "QA en el navegador y checklist de lanzamiento",
      "Muy útil para pasar de MVP a producto",
    ],
  },
  {
    id: "ui-ux-pro-max",
    name: "UI UX Pro Max",
    type: "Skills",
    description: "Skill de diseño que le da a tu agente criterio visual: estilos, paletas, tipografías y patrones de UX por tipo de producto. Ideal para que las apps hechas con vibecoding no se vean todas iguales.",
    url: "https://github.com/nextlevelbuilder/ui-ux-pro-max-skill",
    source: "Comunidad (+150k ★)",
    highlights: [
      "Decenas de estilos de UI y paletas",
      "Recomendaciones según el tipo de producto",
      "Funciona con React, Next.js, Tailwind y más",
    ],
  },
  {
    id: "humanizer",
    name: "Humanizer",
    type: "Skills",
    description: "Skill que revisa un texto y le saca las señales típicas de \"escrito por IA\" (frases hechas, exceso de listas, tono genérico) para que suene natural.",
    url: "https://github.com/blader/humanizer",
    source: "Comunidad (+70k ★)",
    howToUse: "npx skills add blader/humanizer",
    highlights: [
      "Detecta y corrige patrones típicos de texto de IA",
      "Útil para landings, mails y posts",
      "Mantiene el contenido y cambia el estilo",
    ],
  },
  {
    id: "marketing-skills",
    name: "Marketing Skills",
    type: "Skills",
    description: "Colección de skills de marketing para agentes: copywriting, SEO, optimización de conversión (CRO), analytics, emails y estrategia de lanzamiento.",
    url: "https://github.com/coreyhaines31/marketingskills",
    source: "Corey Haines (comunidad, +60k ★)",
    howToUse: "npx skills add coreyhaines31/marketingskills",
    highlights: [
      "Copy para landings y anuncios",
      "Auditorías de SEO y conversión",
      "Ideas de growth y lanzamiento",
    ],
  },
  {
    id: "obsidian-skills",
    name: "Obsidian Skills",
    type: "Skills",
    description: "Skills oficiales del equipo de Obsidian para que tu agente lea y edite tu bóveda: notas en Markdown, Bases y JSON Canvas.",
    url: "https://github.com/obsidianmd/obsidian-skills",
    source: "Obsidian",
    official: true,
    howToUse: "npx skills add obsidianmd/obsidian-skills",
    highlights: [
      "Edita notas respetando el formato de Obsidian",
      "Crea Bases y Canvas",
      "Ideal si usás Obsidian como segundo cerebro",
    ],
  },
  {
    id: "remotion-skills",
    name: "Remotion Skills",
    type: "Skills",
    description: "Skills oficiales de Remotion para que tu agente cree videos con código React siguiendo las buenas prácticas del framework.",
    url: "https://github.com/remotion-dev/skills",
    source: "Remotion",
    official: true,
    howToUse: "npx skills add remotion-dev/skills",
    highlights: [
      "Videos generados por el agente con Remotion",
      "Animaciones, subtítulos y audio",
      "Evita errores comunes del framework",
    ],
  },

  // Repos y recursos
  {
    id: "awesome-claude-code",
    name: "Awesome Claude Code",
    type: "Repos y recursos",
    description: "Lista curada a mano con lo mejor del ecosistema de Claude Code: skills, comandos, hooks, flujos de trabajo, herramientas y guías de la comunidad.",
    url: "https://github.com/hesreallyhim/awesome-claude-code",
    source: "Comunidad",
    highlights: [
      "Recursos revisados antes de entrar a la lista",
      "Organizado por tipo: skills, hooks, comandos, etc.",
      "Buen punto de partida para descubrir qué existe",
    ],
  },
  {
    id: "claude-cookbooks",
    name: "Claude Cookbooks",
    type: "Repos y recursos",
    description: "Recetas oficiales de Anthropic con ejemplos de código para usar la API de Claude: agentes, herramientas, RAG, clasificación, visión y más.",
    url: "https://github.com/anthropics/claude-cookbooks",
    source: "Anthropic",
    official: true,
    highlights: [
      "Ejemplos listos para copiar y adaptar",
      "Patrones de agentes y uso de herramientas",
      "Ideal para cuando tu app llama a la API de Claude",
    ],
  },
  {
    id: "mcp-servers",
    name: "MCP Servers (oficial)",
    type: "Repos y recursos",
    description: "Servidores de referencia del Model Context Protocol (MCP), el estándar para conectar agentes de IA con herramientas y datos externos. Incluye un listado de servidores oficiales de muchas empresas.",
    url: "https://github.com/modelcontextprotocol/servers",
    source: "Model Context Protocol",
    official: true,
    highlights: [
      "Servidores de referencia: archivos, git, fetch, memoria",
      "Listado de MCPs oficiales de empresas",
      "Ejemplos para crear tu propio MCP",
    ],
  },
  {
    id: "awesome-copilot",
    name: "Awesome Copilot",
    type: "Repos y recursos",
    description: "Colección de GitHub con instrucciones, agentes, prompts y skills de la comunidad. Aunque está pensada para GitHub Copilot, muchas instrucciones sirven para cualquier agente.",
    url: "https://github.com/github/awesome-copilot",
    source: "GitHub",
    official: true,
    highlights: [
      "Instrucciones por lenguaje y framework",
      "Agentes y prompts reutilizables",
      "Mantenido en la organización oficial de GitHub",
    ],
  },

  {
    id: "context7",
    name: "Context7",
    type: "Repos y recursos",
    description: "MCP muy popular que le da a tu agente la documentación actualizada de miles de librerías y frameworks. Evita que la IA use funciones viejas o inventadas.",
    url: "https://github.com/upstash/context7",
    source: "Upstash (+65k ★)",
    highlights: [
      "Documentación al día de miles de librerías",
      "Menos errores por APIs desactualizadas",
      "Funciona con Claude Code, Cursor y otros agentes",
    ],
  },

  // Templates
  {
    id: "nextjs-saas-starter",
    name: "Next.js SaaS Starter",
    type: "Templates",
    description: "Template oficial del equipo de Next.js para arrancar un SaaS: login, pagos con Stripe, base de datos Postgres, panel de usuario y componentes de shadcn/ui ya armados.",
    url: "https://github.com/nextjs/saas-starter",
    source: "Next.js / Vercel",
    official: true,
    highlights: [
      "Autenticación y manejo de equipos",
      "Suscripciones con Stripe",
      "Postgres + Drizzle ORM",
      "UI con shadcn/ui",
    ],
  },
  {
    id: "vercel-templates",
    name: "Vercel Templates",
    type: "Templates",
    description: "Galería oficial de templates de Vercel: chatbots con IA, e-commerce, blogs, landing pages, dashboards y más. Cada uno se despliega con un clic.",
    url: "https://vercel.com/templates",
    source: "Vercel",
    official: true,
    highlights: [
      "Filtrá por framework, caso de uso o base de datos",
      "Templates de IA (chatbots, agentes)",
      "Deploy en un clic a tu cuenta",
    ],
  },
  {
    id: "shadcn-ui",
    name: "shadcn/ui",
    type: "Templates",
    description: "La librería de componentes más usada en proyectos de vibecoding. No se instala como dependencia: copiás los componentes a tu proyecto y los adaptás. Incluye bloques prearmados (logins, dashboards, sidebars).",
    url: "https://ui.shadcn.com",
    source: "shadcn (comunidad, respaldado por Vercel)",
    highlights: [
      "Componentes accesibles y personalizables",
      "Bloques completos listos para copiar",
      "Los agentes de IA la conocen muy bien",
    ],
  },
]
