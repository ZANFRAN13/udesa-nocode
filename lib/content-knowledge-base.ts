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
      
      // Check title match
      if (item.title.toLowerCase().includes(queryLower)) score += 10
      
      // Check description match
      if (item.description.toLowerCase().includes(queryLower)) score += 5
      
      // Check keyword matches
      item.keywords.forEach(keyword => {
        if (keyword.includes(queryLower)) score += 8
        queryWords.forEach(word => {
          if (keyword.includes(word)) score += 3
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

