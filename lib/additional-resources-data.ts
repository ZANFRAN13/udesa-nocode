export type ResourceType = 
  | "articulo"
  | "guia"
  | "bibliografia"
  | "video"
  | "paper"
  | "documentacion"
  | "curso"
  | "referentes"
  | "podcast"

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
  // Videos
  {
    id: "video-1",
    title: "Don´t learn to code...NVIDIA´s CEO says",
    description: "La youtuber Goda Go reflexiona sobre los dichos deJensen Huang, CEO de NVIDIA, dice que la programacióm ya no es la carrera del futuro y que la ventaja estará en ser experto en un dominio específico. Hasta qué punto es esto cierto?",
    type: "video",
    topic: ["desarrollo", "producto"],
    difficulty: 1,
    url: "https://www.youtube.com/watch?v=vEd-LqBCONg",
    author: "Goda Go",
    language: "en",
    tags: ["nvidia", "programación", "desarrollo", "producto"]
  },
  {
    id: "video-2",
    title: "What is an MVP?",
    description: "Y Combinator, la aceleradora de startups más famosa del mundo, explica que es un MVP (Minimum Viable Product) y como definirlo.",
    type: "video",
    topic: ["producto", "desarrollo"],
    difficulty: 1,
    url: "http://youtube.com/watch?v=1hHMwLxN6EM",
    author: "Y Combinator",
    language: "en",
    tags: ["Y Combinator", "MVP", "desarrollo", "producto"]
  },
  {
    id: "video-3",
    title: "Transformers Explained",
    description: "Video sobre como funcionan los transformers, la arquitectura que permite a los modelos de lenguaje entender secuencias largas de texto.",
    type: "video",
    topic: ["llm", "arquitectura"],
    difficulty: 2,
    url: "https://www.youtube.com/watch?v=JZLZQVmfGn8",
    author: "Y Combinator",
    language: "en",
    tags: ["transformer", "arquitectura", "llm"]
  },
  {
    id: "video-4",
    title: "Software is Changing (Again) - Karphaty´s keynote at YC",
    description: "El nuevo lenguaje de programación es es el lenguaje natural. Qué significa esto para el futuro del desarrollo de software?",
    type: "video",
    topic: ["desarrollo", "producto"],
    difficulty: 1,
    url: "https://www.youtube.com/watch?v=LCEmiRjPEtQ&t=99s",
    author: "Andrej Karpathy",
    language: "en",
    tags: ["software", "commodity", "ia", "desarrollo", "producto"]
  },
  {
    id: "video-5",
    title: "Won´t reach AGI by scaling LLMs - Yann LeCun",
    description: "Yann LeCun, uno de los padres de la IA, explica que no se llegará a la IA general artificial por el simple hecho de escalar los modelos de lenguaje. Qué es lo que se necesita para llegar a la IA general artificial?",
    type: "video",
    topic: ["llm", "agentes"],
    difficulty: 1,
    url: "https://www.youtube.com/watch?v=4__gg83s_Do",
    author: "Yann LeCun",
    language: "en",
    tags: ["ia", "general", "artificial", "llm", "agentes"]
  },
  {
    id: "video-6",
    title: "Can LLMs reason?",
    description: "Pueden los LLM razonar realmente? Qué significa realmente razonar? Yann LeCun y Lex Fridman conversan en este podcast sobre IA.",
    type: "video",
    topic: ["llm", "agentes"],
    difficulty: 1,
    url: "https://www.youtube.com/watch?v=4__gg83s_Do",
    author: "Yann LeCun & Lex Fridman",
    language: "en",
    tags: ["ia", "general", "artificial", "llm", "agentes"]
  },
  {
    id: "video-7",
    title: "Vibes won´t cut it",
    description: "Chris Kelly, CEO de Augment, expone su postura sobre el vibecoding. Qué se necesita para poner código en producción?",
    type: "video",
    topic: ["desarrollo", "producto"],
    difficulty: 1,
    url: "https://www.youtube.com/watch?v=Dc3qOA9WOnE",
    author: "Chris Kelly",
    language: "en",
    tags: ["ia", "general", "artificial", "llm", "vibecoding"]
  },
  {
    id: "video-8",
    title: "Vibecoding is the Future, YC",
    description: "'95% del código de startups de Y Combinator (YC25) fue escrito por IA'. La aceleradora más famosa del mundo afirma que el vibecoding es el futuro del desarrollo de software y explora cómo esto cambia la forma de emprender en tecnología.",
    type: "video",
    topic: ["desarrollo", "producto"],
    difficulty: 1,
    url: "https://www.youtube.com/watch?v=IACHfKmZMr8&t=6s",
    author: "Y Combinator",
    language: "en",
    tags: ["ia", "general", "producto", "llm", "vibecoding"]
  },

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
  {
    id: "guia-9",
    title: "Vibe-Design Stack",
    description: "Felix Hass (Lovable) comparte su repertorio de tools para diseñar productos digitales con IA.",
    type: "guia",
    topic: ["producto", "desarrollo"],
    difficulty: 1,
    url: "https://designplusai.com/p/ultimate-ai-design-stack?r=4b4ys",
    author: "Felix Hass (Lovable)",
    language: "en",
    tags: ["producto", "desarrollo", "ia", "protección"]
  },
  {
    id: "guia-10",
    title: "La Prompt Library para Lovable",
    description: "Felix Hass (Lovable) comparte su biblioteca de prompts para diseñar productos digitales con IA.",
    type: "guia",
    topic: ["producto", "desarrollo"],
    difficulty: 1,
    url: "https://prompt-directory-fh.lovable.app/",
    author: "Felix Hass (Lovable)",
    language: "en",
    tags: ["producto", "desarrollo", "ia", "protección"]
  },
  {
    id: "guia-11",
    title: "Newsletter de Diseño y Vibecoding",
    description: "Newsletter de Felix Hass (Lovable) sobre diseño y vibecoding. Comparte tips, trucos y noticias sobre el mundo del diseño y la IA.",
    type: "guia",
    topic: ["producto", "desarrollo"],
    difficulty: 1,
    url: "https://designplusai.com/",
    author: "Felix Hass (Lovable)",
    language: "en",
    tags: ["producto", "desarrollo", "ia", "protección"]
  }

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

  // Referentes en IA y VibeCoding
  {
    id: "referente-1",
    title: "Andrej Karpathy",
    description: "Ex Director de IA en Tesla y co-fundador de OpenAI. Comparte conocimientos profundos sobre redes neuronales, deep learning y el futuro de la IA. Conocido por sus tutoriales educativos sobre machine learning.",
    type: "referentes",
    topic: ["llm", "desarrollo"],
    difficulty: 2,
    url: "https://twitter.com/karpathy",
    author: "Andrej Karpathy",
    language: "en",
    tags: ["ia", "deep learning", "neural networks", "tesla", "openai", "educación"]
  },
  {
    id: "referente-2",
    title: "Amjad Masad (Replit)",
    description: "CEO y co-fundador de Replit. Pionero en el concepto de VibeCoding y desarrollo asistido por IA. Comparte insights sobre el futuro de la programación y cómo la IA está democratizando el desarrollo de software.",
    type: "referentes",
    topic: ["vibecoding", "desarrollo", "producto"],
    difficulty: 1,
    url: "https://twitter.com/amasad",
    author: "Amjad Masad",
    language: "en",
    tags: ["vibecoding", "replit", "desarrollo", "ia", "no-code", "emprendimiento"]
  },
  {
    id: "referente-3",
    title: "Guillermo Rauch (Vercel)",
    description: "CEO de Vercel y creador de Next.js. Líder en desarrollo web moderno y deployment. Comparte sobre arquitectura frontend, desarrollo full-stack y el impacto de la IA en el desarrollo web.",
    type: "referentes",
    topic: ["desarrollo", "arquitectura", "producto"],
    difficulty: 2,
    url: "https://twitter.com/rauchg",
    author: "Guillermo Rauch",
    language: "en",
    tags: ["vercel", "nextjs", "frontend", "desarrollo", "arquitectura"]
  },
  {
    id: "referente-4",
    title: "Simon Willison",
    description: "Co-creador de Django y experto en IA práctica. Comparte experimentos, tutoriales y análisis profundos sobre LLMs, prompting y aplicaciones prácticas de IA. Mantiene un blog técnico muy respetado.",
    type: "referentes",
    topic: ["llm", "prompting", "desarrollo"],
    difficulty: 2,
    url: "https://twitter.com/simonw",
    author: "Simon Willison",
    language: "en",
    tags: ["llm", "prompting", "django", "ia", "desarrollo", "blog"]
  },
  {
    id: "referente-5",
    title: "Lex Fridman",
    description: "Investigador de IA en MIT y host de uno de los podcasts más influyentes sobre tecnología e IA. Entrevista a líderes del sector y comparte perspectivas profundas sobre el futuro de la inteligencia artificial.",
    type: "referentes",
    topic: ["llm", "agentes", "general"],
    difficulty: 1,
    url: "https://twitter.com/lexfridman",
    author: "Lex Fridman",
    language: "en",
    tags: ["podcast", "ia", "entrevistas", "mit", "investigación"]
  },
  {
    id: "referente-6",
    title: "Swyx (Shawn Wang)",
    description: "Developer advocate y escritor especializado en IA para desarrolladores. Acuñó el término 'AI Engineer' y comparte insights sobre cómo construir productos con IA. Organiza conferencias sobre AI Engineering.",
    type: "referentes",
    topic: ["desarrollo", "llm", "producto"],
    difficulty: 1,
    url: "https://twitter.com/swyx",
    author: "Swyx",
    language: "en",
    tags: ["ai engineering", "desarrollo", "producto", "comunidad"]
  },
  {
    id: "referente-7",
    title: "Ethan Mollick",
    description: "Profesor en Wharton y uno de los mayores expertos en el uso práctico de IA en negocios y educación. Comparte investigación sobre productividad con IA, prompting efectivo y transformación de industrias.",
    type: "referentes",
    topic: ["producto", "prompting", "general"],
    difficulty: 1,
    url: "https://twitter.com/emollick",
    author: "Ethan Mollick",
    language: "en",
    tags: ["educación", "negocios", "productividad", "investigación", "prompting"]
  },
  {
    id: "referente-8",
    title: "Jeremy Howard (fast.ai)",
    description: "Co-fundador de fast.ai, democratizando el deep learning. Ex presidente de Kaggle. Comparte recursos educativos de alta calidad sobre machine learning y IA práctica, accesibles para todos los niveles.",
    type: "referentes",
    topic: ["llm", "desarrollo"],
    difficulty: 2,
    url: "https://twitter.com/jeremyphoward",
    author: "Jeremy Howard",
    language: "en",
    tags: ["fastai", "deep learning", "educación", "kaggle", "ml"]
  },
  {
    id: "referente-9",
    title: "Pieter Levels",
    description: "Indie maker y emprendedor digital. Creador de múltiples productos exitosos construidos principalmente como solista. Comparte su proceso de construcción de startups, monetización y cómo usar herramientas no-code y low-code para lanzar productos rápidamente.",
    type: "referentes",
    topic: ["producto", "vibecoding", "desarrollo"],
    difficulty: 1,
    url: "https://twitter.com/levelsio",
    author: "Pieter Levels",
    language: "en",
    tags: ["indie maker", "emprendimiento", "no-code", "startup", "producto", "maker"]
  },
  {
    id: "referente-10",
    title: "Felix Hass",
    description: "Product Designer (Lovable) y experto en IA aplicada a productos digitales. Comparte insights y tips sobre vibecoding y product design. Enfoque práctico con casos concretos y resultados visibles.",
    type: "referentes",
    topic: ["producto", "desarrollo"],
    difficulty: 1,
    url: "https://www.linkedin.com/in/felixhhaas/",
    author: "Felix Hass",
    language: "en",
    tags: ["product management", "producto", "estrategia", "ia", "aplicaciones"]
  },
  {
    id: "referente-11",
    title: "Prajwal Tomar",
    description: "Founder y desarrollador enfocado en IA y automatización. Comparte recursos sobre construcción de agentes de IA, automatizaciones y herramientas prácticas. Conocido por hacer tutoriales accesibles sobre tecnologías complejas.",
    type: "referentes",
    topic: ["producto", "desarrollo", "vibecoding"],
    difficulty: 1,
    url: "https://x.com/PrajwalTomar_/",
    author: "Prajwal Tomar",
    language: "en",
    tags: ["agentes", "automatización", "tutoriales", "ia", "desarrollo"]
  },
  {
    id: "referente-12",
    title: "Peter Thiel",
    description: "Co-fundador de PayPal y Palantir, inversor pionero en Facebook. Filósofo de tecnología y emprendimiento. Comparte visiones contrarias sobre innovación, startups y el futuro de la tecnología. Autor de 'Zero to One'.",
    type: "referentes",
    topic: ["producto", "general"],
    difficulty: 1,
    url: "https://twitter.com/peterthiel",
    author: "Peter Thiel",
    language: "en",
    tags: ["emprendimiento", "inversión", "startups", "innovación", "estrategia", "filosofía"]
  },
  {
    id: "referente-13",
    title: "Ariel Mathov",
    description: "Especialista en Productos Digitales, fundador de 021. Comparte su experiencia y aprendizajes construyendo 021 día a día vía X (Twitter) como parte del movimiento 'build in public'.",
    type: "referentes",
    topic: ["desarrollo", "general"],
    difficulty: 1,
    url: "https://twitter.com/arielmathov",
    author: "Ariel Mathov",
    language: "es",
    tags: ["desarrollo", "tutoriales", "programación", "contenido", "educación"]
  },
  {
    id: "referente-14",
    title: "Anton Osika",
    description: "Founder (Lovable) y desarrollador de herramientas de IA para desarrolladores. Creador de GPT Engineer y otros proyectos open source. Comparte sobre automatización de desarrollo, code generation con IA y el futuro de la programación asistida.",
    type: "referentes",
    topic: ["vibecoding", "desarrollo", "llm"],
    difficulty: 1,
    url: "https://twitter.com/antonosika",
    author: "Anton Osika",
    language: "en",
    tags: ["gpt engineer", "code generation", "open source", "automatización", "ia"]
  },
  {
    id: "referente-15",
    title: "Adam Bourgh",
    description: "Emprendedor y experto en growth. Comparte estrategias sobre crecimiento de productos, adquisición de usuarios, marketing digital y construcción de audiencias. Enfoque práctico en métricas y experimentación.",
    type: "referentes",
    topic: ["producto", "general"],
    difficulty: 1,
    url: "https://www.linkedin.com/in/adamburgh/",
    author: "Adam Bourgh",
    language: "en",
    tags: ["growth", "marketing", "producto", "estrategia", "métricas", "usuarios"]
  },

  // Podcasts
  {
    id: "podcast-1",
    title: "Lex Fridman Podcast",
    description: "Conversaciones profundas con expertos en IA, tecnología, ciencia y filosofía. Incluye entrevistas con líderes como Sam Altman (OpenAI), Demis Hassabis (DeepMind), Elon Musk y muchos más. Ideal para entender el panorama completo de la IA.",
    type: "podcast",
    topic: ["llm", "agentes", "general"],
    difficulty: 1,
    url: "https://lexfridman.com/podcast/",
    author: "Lex Fridman",
    duration: "2-4 horas por episodio",
    language: "en",
    tags: ["entrevistas", "ia", "tecnología", "ciencia", "líderes"]
  },
  {
    id: "podcast-2",
    title: "Latent Space: The AI Engineer Podcast",
    description: "Podcast técnico sobre AI Engineering. Explora cómo construir productos con IA, mejores prácticas, herramientas y técnicas. Ideal para desarrolladores que trabajan con LLMs y agentes.",
    type: "podcast",
    topic: ["desarrollo", "llm", "agentes"],
    difficulty: 2,
    url: "https://www.latent.space/podcast",
    author: "Swyx & Alessio",
    duration: "45-60 min por episodio",
    language: "en",
    tags: ["ai engineering", "desarrollo", "llm", "técnico", "práctico"]
  },
  {
    id: "podcast-3",
    title: "No Priors: Artificial Intelligence | Technology | Startups",
    description: "Podcast sobre IA y startups tech. Entrevistas con fundadores, inversores y expertos sobre el impacto de la IA en los negocios. Perspectiva desde el ecosistema de startups y venture capital.",
    type: "podcast",
    topic: ["producto", "general"],
    difficulty: 1,
    url: "https://www.youtube.com/@NoPriorsPod",
    author: "Sarah Guo & Elad Gil",
    duration: "45-60 min por episodio",
    language: "en",
    tags: ["startups", "inversión", "negocios", "ia", "entrevistas"]
  },
  {
    id: "podcast-4",
    title: "The TWIML AI Podcast",
    description: "This Week in Machine Learning & AI. Podcast semanal sobre los últimos avances en machine learning e inteligencia artificial. Entrevistas con investigadores y profesionales. Cubre desde investigación hasta aplicaciones prácticas.",
    type: "podcast",
    topic: ["llm", "desarrollo"],
    difficulty: 2,
    url: "https://twimlai.com/podcast/twimlai/",
    author: "Sam Charrington",
    duration: "30-45 min por episodio",
    language: "en",
    tags: ["machine learning", "ia", "investigación", "noticias", "semanal"]
  },
  {
    id: "podcast-5",
    title: "Practical AI",
    description: "Podcast sobre IA práctica y accesible. Explica conceptos complejos de manera simple, casos de uso reales y cómo implementar IA en tu trabajo. Perfecto para principiantes y profesionales que buscan aplicar IA.",
    type: "podcast",
    topic: ["general", "desarrollo"],
    difficulty: 1,
    url: "https://changelog.com/practicalai",
    author: "Daniel Whitenack & Chris Benson",
    duration: "40-50 min por episodio",
    language: "en",
    tags: ["práctico", "accesible", "casos de uso", "implementación", "principiantes"]
  },
  {
    id: "podcast-6",
    title: "The Stack Overflow Podcast",
    description: "Podcast sobre desarrollo de software, tecnología y cultura tech. Incluye episodios sobre IA, herramientas de desarrollo, mejores prácticas y el futuro de la programación. Conversaciones honestas sobre el mundo del desarrollo.",
    type: "podcast",
    topic: ["desarrollo", "general"],
    difficulty: 1,
    url: "https://stackoverflow.blog/podcast/",
    author: "Stack Overflow Team",
    duration: "30-40 min por episodio",
    language: "en",
    tags: ["desarrollo", "programación", "herramientas", "cultura tech", "comunidad"]
  },
  {
    id: "podcast-7",
    title: "Y Combinator´s YouTube Channel",
    description: "Y Combinator, la aceleradora de startups más famosa del mundo, comparte videos sobre IA, startups, emprendimiento y tecnología. Ideal para entender el panorama completo de la IA y el emprendimiento.",
    type: "podcast",
    topic: ["producto", "general"],
    difficulty: 1,
    url: "https://www.youtube.com/@ycombinator",
    author: "Y Combinator",
    duration: "30-90 min por video",
    language: "en",
    tags: ["ia", "emprendimiento", "tecnología", "startup"]
  },
  {
    id: "podcast-8",
    title: "Andrej Karpathy´s YouTube Channel",
    description: "Andrej Karpathy, uno de nombres más importantes de la IA moderna, comparte videos educativos y tutoriales sobre IA. Ideal para los curiosos que quieren entender los detalles sin grandes barreras técnicas.",
    type: "podcast",
    topic: ["llm", "desarrollo"],
    difficulty: 1,
    url: "https://www.youtube.com/@andrejkarpathy",
    author: "Andrej Karpathy",
    duration: "90-180 min por video",
    language: "en",
    tags: ["ia", "desarrollo", "tutoriales", "cursos"]
  },
  {
    id: "podcast-9",
    title: "Greg Isenberg´s YouTube Channel",
    description: "Greg Isenberg, uno de los principales referentes del vibecoding, comparte videos de opinión, benchmarking y tutoriales sobre las últimas tendencias del vibecoding.",
    type: "podcast",
    topic: ["llm", "desarrollo"],
    difficulty: 1,
    url: "https://www.youtube.com/@GregIsenberg",
    author: "Greg Isenberg",
    duration: "25-45 min por video",
    language: "en",
  },
  {
    id: "podcast-10",
    title: "Lenny´s Podcast: Product | Career | Growth",
    description: "Entrevistas con líderes del sector de productos digitales y expertos en growth que comparten consejos concretos, accionables y tácticos para construir, lanzar y escalar tu producto.",
    type: "podcast",
    topic: ["producto", "general"],
    difficulty: 1,
    url: "https://www.lennysnewsletter.com/podcast",
    author: "Lenny Rachitsky",
    duration: "60-90 min por episodio",
    language: "en",
  }
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

