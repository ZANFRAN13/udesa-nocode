// Content Knowledge Base for Brújula Navigation
// Dynamically builds complete knowledge base from glossary data files

// Import types only at top level to avoid loading all data
import type { UITerm } from './ui-glossary-data'
import type { CSSTerm } from './css-glossary-data'
import type { DevTerm } from './dev-glossary-data'
import type { AITerm } from './ai-glossary-data'
import type { ProductTerm } from './product-glossary-data'

export interface ContentItem {
  id: string
  title: string
  type: 'glossary-term' | 'guide' | 'page'
  url: string
  category?: string
  keywords: string[] // Spanish keywords and synonyms
  description: string
}

// Helper to extract keywords from a term's data
function extractKeywords(term: any): string[] {
  const keywords: string[] = []
  
  // Add the term name itself (split by spaces and special chars)
  const nameWords = term.name.toLowerCase()
    .split(/[\s\-\/\(\)]+/)
    .filter((w: string) => w.length > 2)
  keywords.push(...nameWords)
  keywords.push(term.name.toLowerCase())
  
  // Add category
  if (term.category) {
    keywords.push(term.category.toLowerCase())
  }
  
  // Extract words from description (first 100 chars)
  const descWords = term.description.toLowerCase()
    .substring(0, 100)
    .split(/[\s\-\/\(\)]+/)
    .filter((w: string) => w.length > 3)
  keywords.push(...descWords.slice(0, 5))
  
  // Add related terms if they exist
  if (term.relatedTerms && Array.isArray(term.relatedTerms)) {
    term.relatedTerms.forEach((rt: string) => {
      keywords.push(rt.toLowerCase())
    })
  }
  
  return [...new Set(keywords)] // Remove duplicates
}

// Build complete knowledge base from all glossary data
// Lazy load to avoid loading all data at module initialization
async function buildCompleteKnowledgeBase(): Promise<ContentItem[]> {
  const items: ContentItem[] = []
  
  // Dynamically import only when needed (server-side only)
  const [
    { uiTermsData },
    { cssTermsData },
    { devTermsData },
    { aiTermsData },
    { productTermsData }
  ] = await Promise.all([
    import('./ui-glossary-data'),
    import('./css-glossary-data'),
    import('./dev-glossary-data'),
    import('./ai-glossary-data'),
    import('./product-glossary-data')
  ])
  
  // UI Terms
  uiTermsData.forEach(term => {
    items.push({
      id: `ui-${term.id}`,
      title: term.name,
      type: 'glossary-term',
      url: `/dashboard/glossary#${term.id}`,
      category: 'UI',
      keywords: extractKeywords(term),
      description: term.description.substring(0, 200) // Limit description length
    })
  })
  
  // CSS Terms
  cssTermsData.forEach(term => {
    items.push({
      id: `css-${term.id}`,
      title: term.name,
      type: 'glossary-term',
      url: `/dashboard/glossary/css#${term.id}`,
      category: 'CSS',
      keywords: extractKeywords(term),
      description: term.description.substring(0, 200)
    })
  })
  
  // Development Terms
  devTermsData.forEach(term => {
    items.push({
      id: `dev-${term.id}`,
      title: term.name,
      type: 'glossary-term',
      url: `/dashboard/glossary/development#${term.id}`,
      category: 'Desarrollo',
      keywords: extractKeywords(term),
      description: term.description.substring(0, 200)
    })
  })
  
  // AI Terms
  aiTermsData.forEach(term => {
    items.push({
      id: `ai-${term.id}`,
      title: term.name,
      type: 'glossary-term',
      url: `/dashboard/glossary/ai#${term.id}`,
      category: 'IA',
      keywords: extractKeywords(term),
      description: term.description.substring(0, 200)
    })
  })
  
  // Product Terms
  productTermsData.forEach(term => {
    items.push({
      id: `product-${term.id}`,
      title: term.name,
      type: 'glossary-term',
      url: `/dashboard/glossary/product#${term.id}`,
      category: 'Producto',
      keywords: extractKeywords(term),
      description: term.description.substring(0, 200)
    })
  })
  
  // Guide Pages (manually added as they're not in data files)
  items.push(
    {
      id: 'guide-vibecoding',
      title: 'Guía Rápida de Vibecoding: de idea a MVP',
      type: 'guide',
      url: '/dashboard/vibecoding-guide',
      category: 'Guía',
      keywords: ['vibecoding', 'guía', 'guia', 'completa', 'paso a paso', 'tutorial', 'mvp', 'idea', 'producto', 'crear', 'desarrollo', 'proceso'],
      description: 'Guía completa paso a paso de cómo crear un producto digital desde la idea inicial hasta un MVP funcional usando vibecoding'
    },
    {
      id: 'guide-cursor',
      title: 'Introducción Básica a Cursor',
      type: 'guide',
      url: '/dashboard/cursor-intro',
      category: 'Guía',
      keywords: ['cursor', 'introducción', 'introduccion', 'básico', 'basico', 'tutorial', 'empezar', 'comenzar', 'ide', 'editor', 'ai', 'perdido', 'aprender', 'usar'],
      description: 'Tutorial básico de cómo usar Cursor IDE para programar con asistencia de IA'
    },
    {
      id: 'guide-devtools',
      title: 'Guía Básica: Dev Tools del Navegador',
      type: 'guide',
      url: '/dashboard/glossary/devtools',
      category: 'Guía Esencial',
      keywords: [
        // Nombres principales
        'devtools', 'dev tools', 'herramientas de desarrollo', 'herramientas del navegador', 'herramientas desarrollador',
        
        // Errores y bugs
        'errores', 'error', 'bugs', 'bug', 'falla', 'fallo', 'fallos',
        'console', 'consola', 'console log', 'consola del navegador', 'consola chrome', 'consola firefox',
        
        // Copiar y ver errores (caso de uso principal)
        'copiar errores', 'copiar error', 'pegar errores', 'pegar error',
        'ver errores', 'ver error', 'encontrar errores', 'encontrar error', 
        'donde estan los errores', 'donde veo errores', 'donde estan errores', 'donde veo los errores',
        'como copiar errores', 'cómo copiar errores', 'como ver errores', 'cómo ver errores',
        'necesito copiar errores', 'necesito ver errores', 'quiero copiar errores',
        
        // V0 y Lovable (herramientas específicas)
        'v0', 'lovable', 'bolt', 'replit',
        'copiar para v0', 'pegar en v0', 'errores para v0', 'error para v0',
        'copiar para lovable', 'errores para lovable', 
        'compartir errores', 'enviar errores', 'mandar errores',
        
        // Debugging
        'debugging', 'depuración', 'depurar', 'debug', 'debuguear',
        'inspeccionar', 'inspect', 'inspector', 'inspeccionar elemento',
        
        // Atajos y acciones
        'f12', 'ctrl shift i', 'cmd option i', 'abrir consola', 'abrir devtools',
        'click derecho inspeccionar', 'boton derecho inspeccionar',
        
        // Síntomas visuales
        'rojo', 'mensajes rojos', 'texto rojo', 'aparecen errores', 'sale error', 'muestra error',
        'no funciona', 'no anda', 'no sirve', 'roto', 'problema', 'problemas',
        'qué pasa', 'que pasa', 'qué pasó', 'que paso', 'qué está pasando', 'que esta pasando',
        
        // Ubicación
        'cómo ver', 'como ver', 'donde encuentro', 'donde esta', 'donde están', 'donde se ven',
        'como abrir', 'cómo abrir', 'como llego', 'cómo llego',
        
        // Paneles de DevTools
        'network', 'elements', 'sources', 'application', 'console tab',
        'chrome devtools', 'firefox devtools', 'edge devtools', 'safari devtools',
        
        // Contexto de vibecoding
        'arreglar bug', 'solucionar error', 'resolver error', 'fix', 'corregir',
        'la ia necesita', 'darle a la ia', 'compartir con ia', 'mostrar a la ia'
      ],
      description: 'FUNDAMENTAL: Herramientas esenciales para ver y copiar errores de tu app web. Aprende a abrir la consola del navegador (F12), ver mensajes de error en rojo, copiar errores completos para pegarlos en v0, Lovable o en el chat de la IA, y usar el inspector de elementos. Esta guía es esencial para debugging y vibecoding efectivo - si tu app no funciona, aquí está la solución.'
    },
    {
      id: 'guide-terminal-commands',
      title: 'Guía Rápida: Comandos de Terminal',
      type: 'guide',
      url: '/dashboard/glossary/development#guia-comandos-terminal',
      category: 'Guía Esencial',
      keywords: [
        // Nombres principales
        'terminal', 'consola', 'línea de comandos', 'linea de comandos', 'shell', 'bash', 'cmd', 'powershell',
        'comandos', 'comando', 'command', 'commands', 'comandos de terminal', 'guia de comandos', 'guía de comandos',
        
        // NPM (gestión de paquetes)
        'npm', 'npm install', 'npm i', 'npm run dev', 'npm run build', 'npm start', 'npm run', 'instalar',
        'instalar dependencias', 'instalar paquetes', 'node modules',
        'levantar servidor', 'iniciar servidor', 'correr servidor', 'servidor local',
        'localhost', 'puerto', 'port', 'localhost 3000', 'puerto 3000',
        
        // Git (control de versiones) - PRIORIDAD ALTA
        'git', 'git status', 'git add', 'git commit', 'git push', 'git pull', 'github',
        'guardar cambios', 'subir cambios', 'enviar cambios', 'envio cambios',
        'guardar en github', 'subir a github', 'enviar a github', 'envio a github',
        'push', 'commit', 'pull', 'clone',
        'como envio', 'cómo envio', 'como enviar', 'cómo enviar', 'como subir', 'cómo subir',
        'como guardo', 'cómo guardo', 'como guardar', 'cómo guardar',
        'enviar desde cursor', 'subir desde cursor', 'guardar desde cursor', 'github desde cursor',
        'push desde cursor', 'commit desde cursor', 'usar git en cursor', 'git en cursor',
        'sincronizar', 'actualizar', 'versiones', 'repositorio',
        
        // Navegación
        'cd', 'ls', 'pwd', 'mkdir', 'rm', 'navegación', 'navegacion',
        'cambiar carpeta', 'ver archivos', 'listar archivos', 'entrar carpeta',
        'carpeta actual', 'directorio', 'path', 'ruta',
        
        // Acciones comunes
        'instalar', 'ejecutar', 'correr', 'run', 'install', 'iniciar', 'arrancar',
        'detener', 'parar', 'ctrl c', 'matar proceso', 'cancelar',
        
        // Errores y troubleshooting
        'errores de terminal', 'error en terminal', 'terminal no funciona', 'error npm',
        'error git', 'comando no encontrado', 'command not found',
        'permission denied', 'acceso denegado',
        
        // Aprendizaje y uso
        'cómo usar terminal', 'como usar terminal', 'aprender terminal', 'usar la terminal',
        'que es terminal', 'qué es terminal', 'para que sirve terminal',
        'comandos básicos', 'comandos basicos', 'comandos esenciales',
        'necesito terminal', 'usar terminal', 'trabajar con terminal',
        
        // Herramientas e IDEs
        'cursor terminal', 'vscode terminal', 'terminal integrada', 'terminal cursor', 'terminal vscode',
        'abrir terminal', 'como abrir terminal', 'cómo abrir terminal',
        
        // Contexto de desarrollo
        'dependencias', 'node_modules', 'package.json', 'package-lock',
        'copiar comandos', 'pegar comandos', 'ejecutar comandos', 'correr comandos',
        'flujo de trabajo', 'workflow', 'paso a paso terminal', 'tutorial terminal',
        
        // Casos de uso específicos
        'como instalar', 'cómo instalar', 'como ejecutar', 'cómo ejecutar',
        'como guardar', 'cómo guardar', 'como subir', 'cómo subir',
        'sincronizar github', 'actualizar proyecto', 'descargar cambios'
      ],
      description: 'ESENCIAL para Cursor: Aprende cómo enviar cambios a GitHub desde Cursor usando comandos de terminal. Guía completa con git push, git commit, git add paso a paso. Incluye comandos npm (instalar dependencias con npm i, correr servidor con npm run dev) y flujo de trabajo completo. Con ejemplos copiables y explicaciones simples para enviar tu código a GitHub.'
    }
  )
  
  // Resource Pages
  items.push(
    {
      id: 'page-nocode-tools',
      title: 'Herramientas No-Code',
      type: 'page',
      url: '/dashboard/nocode-tools',
      category: 'Recursos',
      keywords: ['nocode', 'no-code', 'herramientas', 'tools', 'sin código', 'sin codigo', 'plataformas'],
      description: 'Lista de herramientas no-code útiles para crear productos digitales sin programar'
    },
    {
      id: 'page-support-tools',
      title: 'Herramientas de Apoyo',
      type: 'page',
      url: '/dashboard/support-tools',
      category: 'Recursos',
      keywords: ['herramientas', 'apoyo', 'soporte', 'utilidades', 'productividad', 'desarrollo'],
      description: 'Herramientas de apoyo para el desarrollo de productos digitales'
    },
    {
      id: 'page-additional-resources',
      title: 'Recursos Adicionales',
      type: 'page',
      url: '/dashboard/additional-resources',
      category: 'Recursos',
      keywords: ['recursos', 'adicionales', 'complementarios', 'lecturas', 'links', 'material'],
      description: 'Recursos adicionales y lecturas recomendadas sobre vibecoding y desarrollo con IA'
    },
    {
      id: 'page-heuristics',
      title: 'Heurísticas y Buenas Prácticas',
      type: 'page',
      url: '/dashboard/heuristics',
      category: 'Recursos',
      keywords: ['heurísticas', 'heuristicas', 'buenas prácticas', 'practicas', 'usar ia', 'usar bien la ia', 'prompt', 'prompting', 'instrucciones', 'comunicarse con ia', 'hablar con ia', 'mejores prompts', 'ia efectiva', 'nielsen', 'usabilidad'],
      description: 'Guía completa de cómo usar la IA de manera efectiva: mejores prácticas para escribir prompts, dar instrucciones claras, y obtener los mejores resultados al programar con asistencia de IA. Incluye heurísticas de Nielsen aplicadas a vibecoding.'
    }
  )
  
  return items
}

// Cache for the knowledge base
let cachedKnowledgeBase: ContentItem[] | null = null

// Export async function to get knowledge base
export async function getContentKnowledgeBase(): Promise<ContentItem[]> {
  if (cachedKnowledgeBase) {
    return cachedKnowledgeBase
  }
  
  cachedKnowledgeBase = await buildCompleteKnowledgeBase()
  return cachedKnowledgeBase
}

// Helper function to search content by keywords
export async function searchContentByKeywords(query: string): Promise<ContentItem[]> {
  const knowledgeBase = await getContentKnowledgeBase()
  const queryLower = query.toLowerCase()
  const queryWords = queryLower.split(' ').filter(w => w.length > 2)
  
  return knowledgeBase
    .map(item => {
      let score = 0
      
      // Boost for essential guides
      if (item.category === 'Guía Esencial') score += 5
      
      // Check title match (highest priority)
      if (item.title.toLowerCase().includes(queryLower)) score += 15
      
      // Check description match (high priority, especially for exact phrases)
      const descLower = item.description.toLowerCase()
      if (descLower.includes(queryLower)) score += 12
      
      // Boost for specific high-value phrases in description
      if (queryLower.includes('error') || queryLower.includes('copiar')) {
        if (descLower.includes('copiar errores') || descLower.includes('ver errores')) {
          score += 10
        }
      }
      if (queryLower.includes('v0') || queryLower.includes('lovable')) {
        if (descLower.includes('v0') || descLower.includes('lovable')) {
          score += 10
        }
      }
      
      // Boost ALTO para queries sobre git/github + cursor/terminal
      if ((queryLower.includes('github') || queryLower.includes('git')) && 
          (queryLower.includes('cursor') || queryLower.includes('enviar') || queryLower.includes('envio') || queryLower.includes('subir'))) {
        if (item.id === 'guide-terminal-commands') {
          score += 25 // Boost masivo para la guía de terminal
        }
      }
      
      // Boost para queries sobre comandos/terminal
      if ((queryLower.includes('comando') || queryLower.includes('terminal')) && 
          (queryLower.includes('como') || queryLower.includes('cómo') || queryLower.includes('usar'))) {
        if (item.id === 'guide-terminal-commands') {
          score += 15
        }
      }
      
      // Check keyword matches
      item.keywords.forEach(keyword => {
        // Exact match of entire query in a keyword (very high priority)
        if (keyword === queryLower) score += 20
        
        // Query contained in keyword
        if (keyword.includes(queryLower)) score += 10
        
        // Individual word matches
        queryWords.forEach(word => {
          if (keyword.includes(word)) score += 2
          if (keyword === word) score += 5
        })
      })
      
      return { item, score }
    })
    .filter(result => result.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 10)
    .map(result => result.item)
}

// Format content knowledge base for Gemini context
export async function formatContentKnowledgeForGemini(): Promise<string> {
  const knowledgeBase = await getContentKnowledgeBase()
  const grouped: Record<string, ContentItem[]> = {}
  
  knowledgeBase.forEach(item => {
    const category = item.category || 'Otros'
    if (!grouped[category]) grouped[category] = []
    grouped[category].push(item)
  })
  
  let output = '# MAPA DE CONTENIDO DE LA APP\n\n'
  output += 'A continuación se lista todo el contenido disponible en la app, organizado por categorías.\n'
  output += 'Cuando el usuario pregunte dónde encontrar algo, usa esta información para sugerir los enlaces relevantes.\n\n'
  
  Object.keys(grouped).sort().forEach(category => {
    output += `## ${category}\n\n`
    grouped[category].forEach(item => {
      output += `- **${item.title}** (${item.type})\n`
      output += `  URL: ${item.url}\n`
      output += `  Descripción: ${item.description}\n`
      output += `  Keywords: ${item.keywords.slice(0, 5).join(', ')}\n\n`
    })
  })
  
  return output
}

