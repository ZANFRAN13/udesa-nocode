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
  {
    id: "groq",
    name: "Groq",
    category: "Brainstorming y Writing",
    description: "Plataforma de IA famosa por su velocidad ultrarrápida. Permite chatear con modelos open-source (Llama, Mixtral, DeepSeek y más) con respuestas casi instantáneas así como usar sus APIs de LLM de forma gratuita (limitada), útil para pruebas o proyectos pequeños.",
    website: "https://groq.com",
    pricing: "Gratis con límites, planes de pago por uso",
    features: [
      "Respuestas a velocidad récord (cientos de tokens por segundo)",
      "Acceso a modelos open-source populares",
      "Chat gratuito en groq.com",
      "API compatible con OpenAI",
      "Ideal para apps que requieren respuestas en tiempo real"
    ],
    tags: ["AI-powered"]
  },
  {
    id: "notebooklm",
    name: "NotebookLM",
    category: "Brainstorming y Writing",
    description: "Asistente de investigación y escritura de Google. Subí tus documentos (PDFs, notas, videos) y conversá con ellos para resumir, estudiar o generar ideas.",
    website: "https://notebooklm.google.com",
    pricing: "Gratis con opción premium",
    features: [
      "Análisis de tus propios documentos",
      "Resúmenes automáticos con fuentes citadas",
      "Generación de podcasts a partir de tus notas",
      "Guías de estudio y mapas mentales",
      "Privacidad: no entrena con tus datos"
    ],
    tags: ["AI-powered"]
  },

  {
    id: "obsidian",
    name: "Obsidian",
    category: "Brainstorming y Writing",
    description: "App de notas que guarda todo como archivos Markdown en tu propia compu. Podés conectar notas entre sí y armar tu \"segundo cerebro\". Como son archivos locales, los agentes de IA (Claude Code, OpenCode, etc.) pueden leerlos y editarlos directamente.",
    website: "https://obsidian.md",
    pricing: "Gratis (también para uso comercial); Sync y Publish son pagos",
    features: [
      "Notas en Markdown guardadas localmente",
      "Links entre notas y vista de grafo",
      "Miles de plugins de la comunidad",
      "Funciona offline y en todos los dispositivos",
      "Ideal como base de conocimiento para agentes de IA"
    ]
  },

  // Video programático y con IA
  {
    id: "remotion",
    name: "Remotion",
    category: "Creación de Video",
    description: "Framework open-source para crear videos con código usando React. Ideal para hacer videos que se generan automáticamente a partir de datos (recaps, demos de producto, videos personalizados) y se combina muy bien con agentes de IA que escriben el código por vos.",
    website: "https://www.remotion.dev",
    pricing: "Gratis para personas y equipos chicos; licencia paga para empresas",
    features: [
      "Videos definidos como componentes de React",
      "Renderizado a MP4 desde tu compu o en la nube",
      "Ideal para videos generados a partir de datos",
      "Plantillas y ejemplos para arrancar rápido",
      "Funciona muy bien con Claude Code, Cursor y otros agentes"
    ]
  },
  {
    id: "invideo",
    name: "InVideo",
    category: "Creación de Video",
    description: "Generador de videos con IA: escribís una idea o un guion y arma el video completo con escenas, voz en off, subtítulos y música. Muy útil para videos de marketing, redes sociales y explicativos sin saber editar.",
    website: "https://invideo.io",
    pricing: "Plan gratis con límites, planes pagos mensuales",
    features: [
      "Video completo a partir de un prompt o guion",
      "Voz en off con IA en varios idiomas",
      "Subtítulos y música automáticos",
      "Edición del resultado con instrucciones en lenguaje natural",
      "Formatos para YouTube, Reels y TikTok"
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
  {
    id: "runway",
    name: "Runway",
    category: "Creación de Video",
    description: "Suite creativa con IA para generar y editar videos. Crea clips desde texto o imagen, aplica efectos y hasta lip-sync profesional.",
    website: "https://runwayml.com",
    pricing: "Gratis limitado, planes desde $15/mes",
    features: [
      "Generación de video desde texto o imagen (Gen-3/Gen-4)",
      "Edición avanzada con IA",
      "Lip-sync y animación de personajes",
      "Efectos especiales y motion graphics",
      "Exportación en alta calidad"
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
  },
  {
    id: "heygen",
    name: "HeyGen",
    category: ["Creación de Avatares", "Creación de Video"],
    description: "Plataforma líder de avatares por IA. Creá videos profesionales con presentadores virtuales hablando en más de 175 idiomas, sin cámara ni estudio.",
    website: "https://www.heygen.com",
    pricing: "Gratis limitado, planes desde $29/mes",
    features: [
      "Avatares hiperrealistas con tu cara o de stock",
      "Traducción y doblaje automático en 175+ idiomas",
      "Lip-sync de alta precisión",
      "Clonación de voz",
      "Plantillas listas para usar"
    ]
  },

  // Herramientas Adicionales
  {
    id: "elicit",
    name: "Elicit",
    category: "Herramientas Adicionales",
    description: "Asistente de investigación con IA especializado en papers académicos y científicos. Buscá entre más de 138 millones de publicaciones, generá resúmenes con citas y armá reportes de investigación sin necesidad de saber buscar palabras clave exactas.",
    website: "https://elicit.com",
    pricing: "Gratis con límites, Pro desde $49/mes",
    features: [
      "Búsqueda semántica en 138M+ papers académicos",
      "Generación automática de reportes de investigación",
      "Tablas interactivas con datos extraídos de papers",
      "Revisiones sistemáticas de literatura",
      "Alertas de nuevas publicaciones sobre tu tema",
      "Todas las respuestas vienen con citas verificables"
    ],
    tags: ["AI-powered"]
  },
  {
    id: "theresanaiforthat",
    name: "There's An AI For That",
    category: "Herramientas Adicionales",
    description: "El directorio más grande de herramientas de IA. Si necesitás una IA para cualquier tarea imaginable, acá la vas a encontrar. Tiene miles de herramientas organizadas por categoría con descripción, precio y valoraciones.",
    website: "https://theresanaiforthat.com",
    pricing: "Gratis",
    features: [
      "Miles de herramientas de IA organizadas por categoría",
      "Filtros por precio, popularidad y tipo de tarea",
      "Comparaciones entre herramientas similares",
      "Reseñas y valoraciones de usuarios",
      "Actualizaciones diarias con herramientas nuevas"
    ]
  },
  {
    id: "chatgpt-images-2",
    name: "ChatGPT Images (GPT-4o)",
    category: ["Herramientas Adicionales", "Creación de Imágenes"],
    description: "La generación de imágenes nativa de ChatGPT usando el modelo GPT-4o. A diferencia de DALL-E, entiende instrucciones complejas con mucho más detalle, edita partes de una imagen sin tocar el resto y mantiene coherencia visual a lo largo de varias generaciones.",
    website: "https://chat.openai.com",
    pricing: "Incluido en ChatGPT Plus ($20/mes)",
    features: [
      "Generación de imágenes desde texto con altísima precisión",
      "Edición de zonas específicas de una imagen (inpainting)",
      "Comprensión de instrucciones detalladas y complejas",
      "Consistencia visual entre múltiples imágenes",
      "Texto legible dentro de las imágenes",
      "Integración directa en la conversación de ChatGPT"
    ],
    tags: ["AI-powered"]
  },
  {
    id: "openclaw",
    name: "OpenClaw",
    category: "Herramientas Adicionales",
    description: "Agente de IA personal open-source que corre en tu propia computadora. Lo conectás a tu modelo de IA favorito (Claude, ChatGPT, etc.) y lo usás desde WhatsApp, Telegram, Discord u otras apps de mensajería. Puede manejar archivos, navegar la web, automatizar tareas y recordar conversaciones anteriores.",
    website: "https://openclaw.ai",
    pricing: "Gratis y open-source (pagás solo el uso de la API de IA)",
    features: [
      "Corre en tu máquina: Mac, Windows o Linux",
      "Controlable desde WhatsApp, Telegram, Discord, Slack, Signal e iMessage",
      "Compatible con Claude, ChatGPT y modelos locales",
      "Memoria persistente entre conversaciones",
      "Navegación web y control del navegador",
      "Automatización de tareas y archivos del sistema",
      "Extensible con plugins y habilidades propias"
    ],
    tags: ["AI-powered"]
  },

  // Desarrollo con IA
  {
    id: "opencode",
    name: "OpenCode",
    category: "Desarrollo con IA",
    description: "Agente de programación open-source que corre en la terminal (también tiene app de escritorio y extensión para el editor). Es una alternativa abierta a Claude Code: lo conectás al modelo que quieras y le pedís que lea, escriba y corra código en tu proyecto.",
    website: "https://opencode.ai",
    pricing: "Gratis y open-source (pagás el modelo que uses; hay opciones gratuitas)",
    features: [
      "Agente de código en la terminal, escritorio o editor",
      "Compatible con Claude, GPT, Gemini, modelos locales y más",
      "Lee y edita archivos, corre comandos y tests",
      "Soporta MCP y skills",
      "Varias sesiones en paralelo sobre el mismo proyecto"
    ],
    tags: ["AI-powered"]
  },
  {
    id: "openrouter",
    name: "OpenRouter",
    category: "Desarrollo con IA",
    description: "Una sola API (y una sola cuenta) para usar cientos de modelos de IA de distintos proveedores: Anthropic, OpenAI, Google, Meta, Mistral y más. Ideal para probar y comparar modelos en tu app sin tener que abrir una cuenta en cada proveedor.",
    website: "https://openrouter.ai",
    pricing: "Pagás por uso según el modelo; hay modelos gratis con límites",
    features: [
      "Cientos de modelos con una sola API key",
      "Compatible con el formato de la API de OpenAI",
      "Comparador de precios y rankings de modelos",
      "Fallback automático si un proveedor se cae",
      "Chat web para probar modelos lado a lado"
    ],
    tags: ["AI-powered"]
  },
  {
    id: "eve-vercel",
    name: "Eve (Vercel)",
    category: "Desarrollo con IA",
    description: "Framework open-source de Vercel para construir agentes de IA. Cada agente es una carpeta con archivos simples (instrucciones, herramientas, skills y horarios) y se despliega en Vercel, donde las sesiones sobreviven a cortes y pueden pausarse para pedir aprobación humana.",
    website: "https://vercel.com/docs/frameworks/agents/eve",
    pricing: "Open-source (Apache-2.0); pagás los recursos de Vercel que use. En beta",
    features: [
      "Agentes definidos como carpetas y archivos",
      "Sesiones durables que se pausan y retoman",
      "Aprobación humana para acciones sensibles",
      "Canales para web, Slack, Discord y HTTP",
      "Subagentes, skills y tareas programadas",
      "Se arranca con: npx eve@latest init mi-agente"
    ],
    tags: ["AI-powered"]
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
  "Creación de Avatares",
  "Desarrollo con IA",
  "Herramientas Adicionales"
]

