export interface SupportTool {
  id: string
  name: string
  category: string | string[]
  description: string
  website?: string
  pricing?: string
  features?: string[]
  tags?: string[]
}

export const supportToolsData: SupportTool[] = [
  // AI-powered LLM APIs - Brainstorming & Writing
  {
    id: "chatgpt",
    name: "ChatGPT",
    category: ["Brainstorming y Writing", "Creación de Imágenes"],
    description: "Asistente de IA conversacional de OpenAI para generar ideas, escribir contenido, crear imágenes con DALL-E 3 y refinar prompts.",
    website: "https://chat.openai.com",
    pricing: "Gratis con opción premium desde $20/mes",
    features: [
      "Generación de ideas y brainstorming",
      "Redacción y edición de contenido",
      "Creación de imágenes con DALL-E 3",
      "Refinamiento de prompts",
      "Análisis de documentos",
      "Conversaciones contextuales"
    ],
    tags: ["AI-powered"]
  },
  {
    id: "claude",
    name: "Claude",
    category: "Brainstorming y Writing",
    description: "IA conversacional de Anthropic, excelente para escritura larga, análisis profundo y razonamiento complejo.",
    website: "https://claude.ai",
    pricing: "Gratis con opción premium desde $20/mes",
    features: [
      "Escritura larga y detallada",
      "Análisis de código",
      "Conversaciones contextuales extensas",
      "Razonamiento paso a paso"
    ],
    tags: ["AI-powered"]
  },
  {
    id: "gemini",
    name: "Gemini",
    category: "Brainstorming y Writing",
    description: "IA multimodal de Google con capacidades avanzadas de generación de texto, conversación, imágenes y análisis.",
    website: "https://gemini.google.com",
    pricing: "Gratis con opciones premium",
    features: [
      "Generación de texto e ideas",
      "Conversaciones avanzadas",
      "Análisis de documentos",
      "Integración multimodal",
      "Integración con Google Cloud"
    ],
    tags: ["AI-powered"]
  },
  {
    id: "grok",
    name: "Grok",
    category: "Brainstorming y Writing",
    description: "IA de X (Twitter) con acceso a información en tiempo real y personalidad única.",
    website: "https://x.ai",
    pricing: "Requiere suscripción X Premium",
    features: [
      "Acceso a datos en tiempo real",
      "Integración con X/Twitter",
      "Personalidad conversacional",
      "Búsqueda de información actual"
    ],
    tags: ["AI-powered"]
  },

  // Video creation
  {
    id: "midjourney",
    name: "Midjourney",
    category: ["Creación de Video", "Creación de Imágenes"],
    description: "Generador líder de imágenes por IA con calidad artística excepcional. Próximamente con capacidades de video.",
    website: "https://midjourney.com",
    pricing: "Desde $10/mes",
    features: [
      "Generación de imágenes de alta calidad",
      "Calidad artística superior",
      "Estilos artísticos variados",
      "Control de estilos avanzado",
      "Comunidad activa en Discord"
    ]
  },
  {
    id: "veo3",
    name: "Veo 3",
    category: "Creación de Video",
    description: "Modelo de generación de video de Google DeepMind de última generación.",
    website: "https://deepmind.google/technologies/veo/",
    pricing: "En desarrollo / Acceso limitado",
    features: [
      "Generación de video de alta calidad",
      "Control de movimiento de cámara",
      "Coherencia temporal mejorada"
    ]
  },
  {
    id: "sora",
    name: "Sora",
    category: "Creación de Video",
    description: "Modelo de generación de video de OpenAI, crea videos realistas a partir de texto.",
    website: "https://openai.com/sora",
    pricing: "En desarrollo / Acceso limitado",
    features: [
      "Videos de hasta 60 segundos",
      "Alta calidad visual",
      "Múltiples escenas y personajes",
      "Física realista"
    ]
  },

  // Image creation
  {
    id: "gemini-image",
    name: "Google AI Studio",
    category: "Creación de Imágenes",
    description: "Explora Google Gemini con todas sus capacidades multimodales avanzadas.",
    website: "https://aistudio.google.com/",
    pricing: "Gratis con opciones premium",
    features: [
      "Generación de imágenes",
      "Edición contextual",
      "Integración multimodal",
      "Procesamiento rápido"
    ],
    tags: ["AI-powered"]
  },

  // TTS (Text-to-Speech)
  {
    id: "elevenlabs",
    name: "ElevenLabs",
    category: "TTS",
    description: "Generador líder de voz por IA con voces ultra-realistas y clonación de voz.",
    website: "https://elevenlabs.io",
    pricing: "Gratis limitado, planes desde $5/mes",
    features: [
      "Voces ultra-realistas",
      "Clonación de voz",
      "Múltiples idiomas",
      "Control de emociones",
      "API disponible"
    ]
  },
  {
    id: "chatgpt-tts",
    name: "ChatGPT (TTS)",
    category: "TTS",
    description: "Síntesis de voz integrada en ChatGPT con voces naturales.",
    website: "https://platform.openai.com/docs/guides/text-to-speech",
    pricing: "Pay-per-use en API",
    features: [
      "Voces naturales",
      "Múltiples idiomas",
      "Integración con ChatGPT",
      "API simple"
    ],
    tags: ["AI-powered"]
  },

  // UI components
  {
    id: "21st-dev",
    name: "21st.dev",
    category: "Componentes UI",
    description: "Biblioteca de componentes UI modernos y accesibles, generados con IA.",
    website: "https://21st.dev",
    pricing: "Gratis / Open source",
    features: [
      "Componentes React modernos",
      "Accesibilidad integrada",
      "Personalización fácil",
      "Integración con Tailwind"
    ]
  },
  {
    id: "magic-patterns",
    name: "Magic Patterns",
    category: "Componentes UI",
    description: "Genera componentes UI y patrones de diseño usando IA.",
    website: "https://www.magicpatterns.com",
    pricing: "Gratis con opciones premium",
    features: [
      "Generación de componentes con IA",
      "Múltiples frameworks",
      "Patrones de diseño",
      "Código exportable"
    ]
  },

  // Analytics
  {
    id: "google-analytics",
    name: "Google Analytics",
    category: "Analytics",
    description: "Plataforma líder de análisis web para medir tráfico y comportamiento de usuarios.",
    website: "https://analytics.google.com",
    pricing: "Gratis (GA4)",
    features: [
      "Análisis de tráfico web",
      "Seguimiento de conversiones",
      "Informes personalizados",
      "Integración con Google Ads",
      "Machine learning integrado"
    ]
  },
  {
    id: "hotjar",
    name: "Hotjar",
    category: "Analytics",
    description: "Herramienta de análisis de comportamiento con mapas de calor, grabaciones y encuestas.",
    website: "https://www.hotjar.com",
    pricing: "Gratis limitado, planes desde $32/mes",
    features: [
      "Mapas de calor",
      "Grabaciones de sesiones",
      "Encuestas y feedback",
      "Embudos de conversión",
      "Análisis de formularios"
    ]
  },

  // Music creation
  {
    id: "suno-ai",
    name: "Suno AI",
    category: "Creación Musical",
    description: "Generador de música completa por IA, crea canciones con letra, melodía y producción.",
    website: "https://suno.ai",
    pricing: "Gratis limitado, planes desde $8/mes",
    features: [
      "Generación de canciones completas",
      "Múltiples géneros musicales",
      "Letra y música integradas",
      "Control de estilo y ánimo",
      "Exportación de alta calidad"
    ]
  },

  // Avatar creation
  {
    id: "higgsfield-ai",
    name: "Higgsfield AI",
    category: "Creación de Avatares",
    description: "Crea avatares realistas y videos con IA para contenido personalizado.",
    website: "https://higgsfield.ai",
    pricing: "Planes desde $19/mes",
    features: [
      "Avatares realistas",
      "Videos personalizados",
      "Lip-sync automático",
      "Múltiples idiomas"
    ]
  }
]

export const supportCategories = [
  "Todos",
  "AI-powered",
  "Brainstorming y Writing",
  "Creación de Video",
  "Creación de Imágenes",
  "TTS",
  "Componentes UI",
  "Analytics",
  "Creación Musical",
  "Creación de Avatares"
]

