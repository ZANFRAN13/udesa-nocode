import { GoogleGenerativeAI } from "@google/generative-ai"
import { NextResponse } from "next/server"
import { SYSTEM_CONTEXT } from "@/lib/system-context"
import { formatContentKnowledgeForGemini } from "@/lib/content-knowledge-base"

interface Message {
  role: "user" | "assistant"
  content: string
}

// Get Gemini client (primary or fallback)
function getGeminiClient(useFallback: boolean = false) {
  const apiKey = useFallback ? process.env.GEMINI_API_KEY_2 : process.env.GEMINI_API_KEY
  if (!apiKey) return null
  
  const genAI = new GoogleGenerativeAI(apiKey)
  return genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" })
}

export async function POST(request: Request) {
  try {
    const { prompt, context, conversationHistory = [], mode = "tutor", query } = await request.json()

    // Handle Brújula mode early (uses 'query' instead of 'prompt')
    if (mode === "brujula") {
      const primaryModel = getGeminiClient(false)
      const fallbackModel = getGeminiClient(true)
      
      // If primary Gemini is not configured, try fallback
      if (!primaryModel) {
        console.log("⚠️ Primary Gemini API key not found, using secondary key...")
        if (fallbackModel) {
          return await handleBrujulaMode(query, fallbackModel, "gemini-secondary")
        }
        // No AI provider available
        return NextResponse.json(
          { error: "No hay ningún proveedor de IA configurado. Por favor, configurá GEMINI_API_KEY o GEMINI_API_KEY_2 en el archivo .env.local" },
          { status: 500 }
        )
      }
      
      // Try primary Gemini first, fallback to secondary if rate limited
      try {
        return await handleBrujulaMode(query, primaryModel, "gemini")
      } catch (error: any) {
        // Check if it's a rate limit error
        if (error?.status === 429 || error?.message?.includes('429') || error?.message?.includes('Too Many Requests')) {
          console.log("🔄 Primary Gemini rate limited, falling back to secondary key...")
          if (fallbackModel) {
            return await handleBrujulaMode(query, fallbackModel, "gemini-secondary")
          }
          // If no fallback available, return the rate limit error
          throw error
        }
        throw error
      }
    }

    // For Tutor mode, prompt is required
    if (!prompt) {
      return NextResponse.json(
        { error: "El prompt es requerido" },
        { status: 400 }
      )
    }

    const primaryModel = getGeminiClient(false)
    const fallbackModel = getGeminiClient(true)
    
    // If primary Gemini is not configured, try fallback
    if (!primaryModel) {
      console.log("⚠️ Primary Gemini API key not found, using secondary key...")
      if (fallbackModel) {
        return await handleTutorMode(fallbackModel, prompt, context, conversationHistory, "gemini-secondary")
      }
      // No AI provider available
      return NextResponse.json(
        { error: "No hay ningún proveedor de IA configurado. Por favor, configurá GEMINI_API_KEY o GEMINI_API_KEY_2 en el archivo .env.local" },
        { status: 500 }
      )
    }

    // Try primary Gemini first for Tutor mode, fallback to secondary if rate limited
    try {
      return await handleTutorMode(primaryModel, prompt, context, conversationHistory, "gemini")
    } catch (error: any) {
      // Check if it's a rate limit error
      if (error?.status === 429 || error?.message?.includes('429') || error?.message?.includes('Too Many Requests')) {
        console.log("🔄 Primary Gemini rate limited, falling back to secondary key...")
        if (fallbackModel) {
          return await handleTutorMode(fallbackModel, prompt, context, conversationHistory, "gemini-secondary")
        }
        // If no fallback available, return the rate limit error
        throw error
      }
      throw error
    }

  } catch (error) {
    console.error("Error en API de Gemini:", error)
    
    // Proporcionar más detalles del error
    let errorMessage = "Error al procesar la solicitud"
    if (error instanceof Error) {
      errorMessage = error.message
      console.error("Detalles del error:", {
        message: error.message,
        stack: error.stack,
        name: error.name
      })
    }
    
    return NextResponse.json(
      { 
        error: errorMessage,
        success: false 
      },
      { status: 500 }
    )
  }
}

// Handle Tutor mode with Gemini
async function handleTutorMode(
  model: any,
  prompt: string,
  context: string,
  conversationHistory: Message[],
  provider: string
) {
  // Usar el contexto del sistema desde CONTEXT_LLM.md (for Tutor mode)
    const systemContext = `CONTEXTO DEL SISTEMA:

${SYSTEM_CONTEXT}

---

INSTRUCCIONES ADICIONALES:
Cuando el usuario pregunte sobre "flujo de vibecoding" o "integrar en vibecoding", refiérete siempre al proceso de programar con asistencia de IA usando las herramientas mencionadas (Cursor, Claude, v0, Lovable, etc.), NO a usar herramientas no-code/low-code.`

    // Construir el historial de conversación para Gemini
    let conversationContext = ""
    if (conversationHistory.length > 0) {
      conversationContext = "\n\nHISTORIAL DE LA CONVERSACIÓN:\n"
      conversationHistory.forEach((msg: Message) => {
        conversationContext += `\n${msg.role === "user" ? "Usuario" : "Asistente"}: ${msg.content}\n`
      })
      conversationContext += "\n---\n"
    }

    // Verificar si el contexto es solo un nombre de término (muy corto)
    const isMinimalContext = context && context.trim().length < 100

    const fullPrompt = context
      ? `${systemContext}

---

${isMinimalContext 
  ? `Término del glosario de desarrollo: ${context.replace(/\*\*/g, "").trim()}`
  : `Contexto del glosario de desarrollo:\n${context}`}
${conversationContext}

Solicitud actual del usuario: ${prompt}

---

INSTRUCCIONES DE RESPUESTA:
Responde de manera clara y didáctica, usando lenguaje accesible para personas que están aprendiendo a programar con IA (vibecoding). Si es relevante, incluye ejemplos prácticos y explica cómo aplicar el concepto en un flujo de desarrollo asistido por IA.

${isMinimalContext ? "NOTA: El usuario está preguntando sobre un término específico del glosario. Proporciona una explicación completa basándote en tu conocimiento del término." : ""}

${conversationHistory.length > 0 ? "IMPORTANTE: Tienes contexto de la conversación anterior. Usa esa información para dar respuestas más específicas y relevantes. Puedes hacer referencia a respuestas anteriores si es apropiado." : ""}

FORMATO:
- Usa **negrita** para términos importantes
- Usa *itálica* para énfasis
- Usa listas con - o números cuando enumeres cosas
- Usa \`código\` para comandos o código
- Usa bloques de código con \`\`\` para ejemplos de código más largos
- Usa ### para subtítulos si es necesario

Mantén la respuesta concisa pero completa.`
      : `${systemContext}
${conversationContext}

Solicitud actual del usuario: ${prompt}

---

Responde de manera clara y didáctica para personas aprendiendo a programar con IA.`

    const result = await model.generateContent(fullPrompt)
    const response = await result.response
    const text = response.text()

    return NextResponse.json({ 
      response: text,
    success: true,
    provider
  })
}

// Handle Brújula mode - AI-powered navigation
async function handleBrujulaMode(query: string, model: any, provider: string) {
  if (!query || query.trim().length === 0) {
    return NextResponse.json(
      { error: "La consulta es requerida", success: false },
      { status: 400 }
    )
  }

  const contentKnowledge = await formatContentKnowledgeForGemini()

    const brujulaPrompt = `${contentKnowledge}

---

CONSULTA DEL USUARIO: "${query}"

---

INSTRUCCIONES:
Eres un asistente empático que ayuda a vibecoders (personas aprendiendo a programar con IA) a encontrar TODO el contenido que necesitan para tener éxito.

MENTALIDAD CLAVE:
- Los vibecoders son principiantes que no saben lo que no saben
- Si preguntan por una herramienta, probablemente necesitan conocer TODAS las herramientas relacionadas
- Si tienen un problema, necesitan la cadena completa de conocimiento para resolverlo
- Piensa en el "journey" completo del usuario, no solo en la respuesta literal

EJEMPLOS DE PENSAMIENTO EMPÁTICO:
- Pregunta: "¿Qué es una consola?" → Necesita: Terminal, comandos básicos, Y la guía de devtools (porque va a encontrar errores ahí)
- Pregunta: "Cómo uso Cursor?" → Necesita: Guía de Cursor, Terminal (lo va a usar), DevTools (va a debuggear), Git (va a versionar)
- Pregunta: "Cómo hago un buen prompt?" → Necesita: Heurísticas (OBLIGATORIO), glosario de IA (temperatura, contexto, etc), guías de vibecoding
- Pregunta: "Cómo usar bien la IA?" → Necesita: Heurísticas (OBLIGATORIO - es la página dedicada a esto), conceptos de IA, guías de vibecoding
- Pregunta: "Dónde veo errores?" → Necesita: DevTools, Terminal, Y cómo copiar errores para v0/Claude

REGLA ESPECIAL: Si la pregunta es sobre "usar IA", "mejores prompts", "comunicarse con IA", "instrucciones a la IA" o similar, la página de Heurísticas y Buenas Prácticas es OBLIGATORIA como primer link.

REGLA DE ORO: Incluye 3-5 links que cubran el objetivo implícito completo, no solo la pregunta literal.

1. Analiza la consulta y detecta:
   - ¿Qué quiere hacer el usuario? (objetivo explícito)
   - ¿Qué va a necesitar para lograrlo? (objetivo implícito)
   - ¿Qué herramientas/conocimientos complementarios son necesarios?

2. Responde en formato JSON estrictamente con esta estructura:
{
  "answer": "Respuesta amigable y clara explicando qué contenido le puede servir al usuario (2-3 oraciones máximo). Usa un tono cercano y didáctico.",
  "links": [
    {
      "title": "Título del contenido",
      "url": "/ruta/completa#hash-si-aplica",
      "description": "Breve descripción de por qué este link es relevante"
    }
  ],
  "fallback": false
}

3. REGLAS IMPORTANTES:
   - El campo "answer" debe ser texto plano, SIN markdown ni formato especial
   - Incluye 3-5 links que cubran el journey completo del usuario
   - Prioriza guías y páginas de contenido sobre términos individuales cuando sea apropiado
   - Las URLs deben ser exactas según el mapa de contenido
   - Si es un término de glosario, la URL debe incluir el hash (ej: /dashboard/glossary/development#git)
   - Si NO hay contenido relevante en el mapa, usa "fallback": true y sugiere alternativas (ChatGPT, grupo WhatsApp)
   - Sé conciso pero completo en la respuesta

4. EJEMPLOS DE RESPUESTAS:

Ejemplo 1 - Usuario pregunta: "dónde veo los errores para copiarlos a v0?"
{
  "answer": "Para ver y copiar errores, necesitás familiarizarte con las DevTools del navegador (F12) y la Terminal. Las DevTools te muestran errores del frontend, y la Terminal te muestra errores del servidor. Ambas son esenciales para vibecoding.",
  "links": [
    {
      "title": "DevTools",
      "url": "/dashboard/glossary/development#devtools",
      "description": "Herramientas del navegador para inspeccionar errores del frontend"
    },
    {
      "title": "Terminal / Command Line",
      "url": "/dashboard/glossary/development#terminal",
      "description": "Para ver errores del servidor y ejecutar comandos"
    },
    {
      "title": "Guía Rápida de Vibecoding",
      "url": "/dashboard/vibecoding-guide",
      "description": "Proceso completo de desarrollo incluyendo debugging"
    }
  ],
  "fallback": false
}

Ejemplo 2 - Usuario pregunta: "estoy perdido, cómo uso cursor?"
{
  "answer": "Tranquilo, es normal sentirse perdido al principio. Te recomendamos empezar por la guía de Cursor, pero también vas a necesitar entender la Terminal (para correr comandos), DevTools (para ver tu app), y el flujo completo de vibecoding. Todo está conectado.",
  "links": [
    {
      "title": "Introducción Básica a Cursor",
      "url": "/dashboard/cursor-intro",
      "description": "Tutorial básico de cómo usar Cursor IDE desde cero"
    },
    {
      "title": "Guía Rápida de Vibecoding",
      "url": "/dashboard/vibecoding-guide",
      "description": "El proceso completo de idea a MVP"
    },
    {
      "title": "Terminal / Command Line",
      "url": "/dashboard/glossary/development#terminal",
      "description": "Comandos básicos que vas a usar en Cursor"
    },
    {
      "title": "DevTools",
      "url": "/dashboard/glossary/development#devtools",
      "description": "Para ver tu app y debuggear problemas"
    }
  ],
  "fallback": false
}

Ejemplo 3 - Usuario pregunta: "cómo escribo mejores prompts?" o "cómo usar bien la IA?"
{
  "answer": "Para usar la IA de manera efectiva, lo más importante es seguir las heurísticas y buenas prácticas específicas para comunicarte con IA. Esta es la guía principal. También te va a servir entender conceptos clave como contexto, temperatura, y cómo estructurar prompts efectivos.",
  "links": [
    {
      "title": "Heurísticas y Buenas Prácticas",
      "url": "/dashboard/heuristics",
      "description": "Guía completa de cómo usar la IA efectivamente y escribir mejores prompts"
    },
    {
      "title": "Prompt",
      "url": "/dashboard/glossary/ai#prompt",
      "description": "Qué es un prompt y cómo funciona"
    },
    {
      "title": "Context / Context Window",
      "url": "/dashboard/glossary/ai#contexto",
      "description": "Entender el contexto para prompts más efectivos"
    },
    {
      "title": "LLM (Large Language Model)",
      "url": "/dashboard/glossary/ai#llm",
      "description": "Cómo funcionan los modelos de lenguaje"
    },
    {
      "title": "Guía Rápida de Vibecoding",
      "url": "/dashboard/vibecoding-guide",
      "description": "Aplicar buenas prácticas en el flujo completo de desarrollo"
    }
  ],
  "fallback": false
}

Ejemplo 4 - Usuario pregunta algo no cubierto: "cómo funciona blockchain?"
{
  "answer": "No tenemos contenido específico sobre blockchain en la plataforma. Para este tema, te recomendamos consultar con ChatGPT, Claude u otro asistente de IA, o preguntar en el grupo de WhatsApp 'Foro' del programa.",
  "links": [],
  "fallback": true
}

AHORA RESPONDE A LA CONSULTA DEL USUARIO en formato JSON puro (sin markdown, sin bloques de código, solo el objeto JSON).`

    const result = await model.generateContent(brujulaPrompt)
    const response = await result.response
    let text = response.text()

    // Clean up response - remove markdown code blocks if present
    text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()

    // Parse JSON response
    let brujulaResponse
    try {
      brujulaResponse = JSON.parse(text)
    } catch (parseError) {
      console.error("Failed to parse Gemini JSON response:", text)
      return NextResponse.json({
        error: "Error al procesar la respuesta de búsqueda",
        success: false 
      }, { status: 500 })
    }

  return NextResponse.json({
    brujulaResponse,
    success: true,
    provider
  })
}

