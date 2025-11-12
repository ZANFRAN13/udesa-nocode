import { OpenAI } from "openai"
import { GoogleGenerativeAI } from "@google/generative-ai" // For user fallback
import { NextResponse } from "next/server"
import { SYSTEM_CONTEXT } from "@/lib/system-context"
import { formatContentKnowledgeForGemini } from "@/lib/content-knowledge-base"

interface Message {
  role: "user" | "assistant"
  content: string
}

// ========================================
// RATE LIMITING CONFIGURATION
// ========================================
// 10 requests per session per 120 minutes
const RATE_LIMIT = 10
const RATE_LIMIT_WINDOW = 120 * 60 * 1000 // 120 minutes in milliseconds

// In-memory storage for rate limiting (per session)
// In production, consider using Redis or similar
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

function checkRateLimit(sessionId: string): { allowed: boolean; remaining: number; resetTime: number } {
  const now = Date.now()
  const userLimit = rateLimitStore.get(sessionId)

  if (!userLimit || now > userLimit.resetTime) {
    // New session or expired window
    const resetTime = now + RATE_LIMIT_WINDOW
    rateLimitStore.set(sessionId, { count: 1, resetTime })
    return { allowed: true, remaining: RATE_LIMIT - 1, resetTime }
  }

  if (userLimit.count >= RATE_LIMIT) {
    // Rate limit exceeded
    return { allowed: false, remaining: 0, resetTime: userLimit.resetTime }
  }

  // Increment count
  userLimit.count++
  return { allowed: true, remaining: RATE_LIMIT - userLimit.count, resetTime: userLimit.resetTime }
}

// ========================================
// OPENAI CLIENT (PRIMARY - DEFAULT)
// ========================================
function getOpenAIClient() {
  const apiKey = process.env.OPENAI_API_KEY
  
  if (!apiKey || apiKey === 'INSERT_YOUR_OPENAI_API_KEY_HERE') {
    console.error(`❌ OpenAI API key not configured (OPENAI_API_KEY)`)
    return null
  }
  
  console.log(`✅ OpenAI API key configured (${apiKey.substring(0, 8)}...${apiKey.substring(apiKey.length - 4)})`)
  return new OpenAI({ apiKey })
}

// ========================================
// TEMPORARILY COMMENTED OUT - GEMINI CLIENTS
// ========================================
/*
// Get Gemini client (primary or fallback)
function getGeminiClient(useFallback: boolean = false) {
  const apiKey = useFallback ? process.env.GEMINI_API_KEY_2 : process.env.GEMINI_API_KEY
  const keyType = useFallback ? 'FALLBACK' : 'PRIMARY'
  const envVar = useFallback ? 'GEMINI_API_KEY_2' : 'GEMINI_API_KEY'
  
  if (!apiKey || apiKey === 'INSERT_YOUR_SECOND_GEMINI_API_KEY_HERE' || apiKey === 'INSERT_YOUR_GEMINI_API_KEY_HERE') {
    console.error(`❌ ${keyType} Gemini API key not configured (${envVar})`)
    return null
  }
  
  console.log(`✅ ${keyType} Gemini API key configured (${envVar}: ${apiKey.substring(0, 8)}...${apiKey.substring(apiKey.length - 4)})`)
  const genAI = new GoogleGenerativeAI(apiKey)
  return genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" })
}
*/

// Helper to check if error is rate limit
function isRateLimitError(error: any): boolean {
  if (!error) {
    console.log('🔍 isRateLimitError: No error object')
    return false
  }
  
  const errorString = JSON.stringify(error).toLowerCase()
  const message = error?.message?.toLowerCase() || ''
  const errorResponse = error?.response?.data?.error?.message?.toLowerCase() || ''
  
  const isRateLimit = (
    error?.status === 429 ||
    error?.statusCode === 429 ||
    error?.response?.status === 429 ||
    message.includes('429') ||
    message.includes('rate limit') ||
    message.includes('too many requests') ||
    message.includes('quota') ||
    message.includes('resource exhausted') ||
    errorString.includes('429') ||
    errorString.includes('resource_exhausted') ||
    errorString.includes('rate limit') ||
    errorResponse.includes('quota') ||
    errorResponse.includes('rate limit')
  )
  
  console.log(`🔍 isRateLimitError result: ${isRateLimit}`)
  console.log(`   Status: ${error?.status || error?.statusCode || error?.response?.status}`)
  console.log(`   Message snippet: ${message.substring(0, 100)}`)
  
  return isRateLimit
}

export async function POST(request: Request) {
  try {
    const { prompt, context, conversationHistory = [], mode = "tutor", query, userApiKey, sessionId = "default" } = await request.json()

    // Check rate limit
    const rateLimitResult = checkRateLimit(sessionId)
    if (!rateLimitResult.allowed) {
      const minutesRemaining = Math.ceil((rateLimitResult.resetTime - Date.now()) / 60000)
      console.log(`⏱️ Rate limit exceeded for session ${sessionId}`)
      return NextResponse.json({
        error: `Has alcanzado el límite de ${RATE_LIMIT} consultas. Por favor, esperá ${minutesRemaining} minutos antes de hacer otra consulta.`,
        success: false,
        errorType: 'rate_limit',
        remaining: 0,
        resetTime: rateLimitResult.resetTime
      }, { status: 429 })
    }

    console.log(`✅ Rate limit check passed. Remaining: ${rateLimitResult.remaining}/${RATE_LIMIT}`)

    // Handle Brújula mode early (uses 'query' instead of 'prompt')
    if (mode === "brujula") {
      console.log("🧭 [BRÚJULA MODE] Starting request")
      console.log(`📝 Query: "${query?.substring(0, 100)}${query?.length > 100 ? '...' : ''}"`)
      
      // If user provided their own API key, use Gemini with user's key (easier to get)
      if (userApiKey && userApiKey.trim()) {
        console.log("🔑 [BRÚJULA] User provided their own Gemini API key, using it directly")
        try {
          const genAI = new GoogleGenerativeAI(userApiKey.trim())
          const userModel = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" })
          const result = await handleBrujulaMode(query, userModel, "user-provided-gemini", false, true)
          console.log(`✅ [BRÚJULA] User Gemini API key success`)
          return result
        } catch (userKeyError: any) {
          console.error("❌ [BRÚJULA] User API key failed:", userKeyError?.message)
          // If user's key fails, return specific error
          return NextResponse.json({
            error: "La API key de Gemini que proporcionaste no es válida o ha alcanzado su límite. Verificá que sea correcta.",
            success: false,
            errorType: 'invalid_user_key'
          }, { status: 400 })
        }
      }
      
      const openaiClient = getOpenAIClient()
      
      // If OpenAI is not configured, return error
      if (!openaiClient) {
        console.error("❌ [BRÚJULA] No API keys configured")
        return NextResponse.json(
          { error: "No hay ningún proveedor de IA configurado. Por favor, configurá OPENAI_API_KEY en el archivo .env.local", success: false },
          { status: 500 }
        )
      }
      
      // Use OpenAI for Brújula
      const startTime = Date.now()
      try {
        console.log("🚀 [BRÚJULA] Attempting OpenAI API...")
        const result = await handleBrujulaMode(query, openaiClient, "openai", false)
        const duration = Date.now() - startTime
        console.log(`✅ [BRÚJULA] OpenAI API success (${duration}ms)`)
        
        // Add rate limit info to response
        const response = await result.json()
        return NextResponse.json({
          ...response,
          rateLimit: {
            remaining: rateLimitResult.remaining,
            total: RATE_LIMIT,
            resetTime: rateLimitResult.resetTime
          }
        })
      } catch (error: any) {
        const duration = Date.now() - startTime
        console.log(`⚠️ [BRÚJULA] OpenAI API failed (${duration}ms)`)
        console.error("Error details:", {
          status: error?.status,
          statusCode: error?.statusCode,
          message: error?.message,
          type: error?.constructor?.name
        })
        
        // Check if it's a rate limit error
        if (isRateLimitError(error)) {
          console.log("🔄 [BRÚJULA] Rate limit detected on OpenAI")
          return NextResponse.json({
            error: "El servicio de búsqueda está temporalmente sobrecargado. Por favor, intentá de nuevo en unos segundos o usá tu propia API key.",
            success: false,
            errorType: 'rate_limit'
          }, { status: 429 })
        }
        // Not a rate limit error, re-throw
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

    console.log("🎓 [TUTOR MODE] Starting request")
    console.log(`📝 Prompt: "${prompt?.substring(0, 100)}${prompt?.length > 100 ? '...' : ''}"`)
    console.log(`📚 Context length: ${context?.length || 0} chars`)
    console.log(`💬 Conversation history: ${conversationHistory?.length || 0} messages`)
    
    // If user provided their own API key, use Gemini with user's key (easier to get)
    if (userApiKey && userApiKey.trim()) {
      console.log("🔑 [TUTOR] User provided their own Gemini API key, using it directly")
      try {
        const genAI = new GoogleGenerativeAI(userApiKey.trim())
        const userModel = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" })
        const result = await handleTutorMode(userModel, prompt, context, conversationHistory, "user-provided-gemini", false, true)
        console.log(`✅ [TUTOR] User Gemini API key success`)
        return result
      } catch (userKeyError: any) {
        console.error("❌ [TUTOR] User API key failed:", userKeyError?.message)
        return NextResponse.json({
          error: "La API key de Gemini que proporcionaste no es válida o ha alcanzado su límite. Verificá que sea correcta.",
          success: false,
          errorType: 'invalid_user_key'
        }, { status: 400 })
      }
    }
    
    const openaiClient = getOpenAIClient()
    
    // If OpenAI is not configured, return error
    if (!openaiClient) {
      console.error("❌ [TUTOR] No API keys configured")
      return NextResponse.json(
        { error: "No hay ningún proveedor de IA configurado. Por favor, configurá OPENAI_API_KEY en el archivo .env.local", success: false },
        { status: 500 }
      )
    }

    // Use OpenAI for Tutor mode
    const startTime = Date.now()
    try {
      console.log("🚀 [TUTOR] Attempting OpenAI API...")
      const result = await handleTutorMode(openaiClient, prompt, context, conversationHistory, "openai", false)
      const duration = Date.now() - startTime
      console.log(`✅ [TUTOR] OpenAI API success (${duration}ms)`)
      
      // Add rate limit info to response
      const response = await result.json()
      return NextResponse.json({
        ...response,
        rateLimit: {
          remaining: rateLimitResult.remaining,
          total: RATE_LIMIT,
          resetTime: rateLimitResult.resetTime
        }
      })
    } catch (error: any) {
      const duration = Date.now() - startTime
      console.log(`⚠️ [TUTOR] OpenAI API failed (${duration}ms)`)
      console.error("Error details:", {
        status: error?.status,
        statusCode: error?.statusCode,
        message: error?.message,
        type: error?.constructor?.name
      })
      
      // Check if it's a rate limit error
      if (isRateLimitError(error)) {
        console.log("🔄 [TUTOR] Rate limit detected on OpenAI")
        return NextResponse.json({
          error: "El servicio de IA está temporalmente sobrecargado. Por favor, intentá de nuevo en unos segundos o usá tu propia API key.",
          success: false,
          errorType: 'rate_limit'
        }, { status: 429 })
      }
      // Not a rate limit error, re-throw
      throw error
    }

  } catch (error) {
    console.error("Error en API:", error)
    
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

// Handle Tutor mode with OpenAI or Gemini
async function handleTutorMode(
  client: any, // OpenAI or Gemini model
  prompt: string,
  context: string,
  conversationHistory: Message[],
  provider: string,
  usedFallback: boolean = false,
  isGemini: boolean = false
) {
  const apiType = usedFallback ? 'FALLBACK' : 'PRIMARY'
  console.log(`⚙️  [TUTOR] Processing with ${apiType} API (${provider})`)
  
  // Use system context
  const systemContext = `CONTEXTO DEL SISTEMA:

${SYSTEM_CONTEXT}

---

INSTRUCCIONES ADICIONALES:
Cuando el usuario pregunte sobre "flujo de vibecoding" o "integrar en vibecoding", refiérete siempre al proceso de programar con asistencia de IA usando las herramientas mencionadas (Cursor, Claude, v0, Lovable, etc.), NO a usar herramientas no-code/low-code.`

  // Build conversation context
  let conversationContext = ""
  if (conversationHistory.length > 0) {
    conversationContext = "\n\nHISTORIAL DE LA CONVERSACIÓN:\n"
    conversationHistory.forEach((msg: Message) => {
      conversationContext += `\n${msg.role === "user" ? "Usuario" : "Asistente"}: ${msg.content}\n`
    })
    conversationContext += "\n---\n"
  }

  // Check if context is minimal
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

  let text
  try {
    if (isGemini) {
      // Use Gemini API
      const result = await client.generateContent(fullPrompt)
      const response = await result.response
      text = response.text()
    } else {
      // Use OpenAI API
      const completion = await client.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemContext },
          { role: "user", content: fullPrompt }
        ],
        temperature: 1,
        max_completion_tokens: 2000,
      })
      text = completion.choices[0]?.message?.content || "No se pudo generar una respuesta."
    }
  } catch (apiError: any) {
    console.error(`💥 [TUTOR] API call error:`, {
      name: apiError?.name,
      message: apiError?.message,
      status: apiError?.status,
      statusCode: apiError?.statusCode
    })
    throw apiError // Re-throw to be caught by outer try-catch
  }
  
  console.log(`📤 [TUTOR] Returning response (${text.length} chars)`)

  return NextResponse.json({ 
    response: text,
    success: true,
    provider,
    fallbackUsed: usedFallback
  })
}

// Handle Brújula mode - AI-powered navigation
async function handleBrujulaMode(query: string, client: any, provider: string, usedFallback: boolean = false, isGemini: boolean = false) {
  const apiType = usedFallback ? 'FALLBACK' : 'PRIMARY'
  console.log(`⚙️  [BRÚJULA] Processing with ${apiType} API (${provider})`)
  
  if (!query || query.trim().length === 0) {
    return NextResponse.json(
      { error: "La consulta es requerida", success: false },
      { status: 400 }
    )
  }

  const contentKnowledge = await formatContentKnowledgeForGemini()
  console.log(`📚 [BRÚJULA] Content knowledge loaded (${contentKnowledge.length} chars)`)

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

AHORA RESPONDE A LA CONSULTA DEL USUARIO en formato JSON puro (sin markdown, sin bloques de código, solo el objeto JSON).`

  let text
  try {
    if (isGemini) {
      // Use Gemini API
      const result = await client.generateContent(brujulaPrompt)
      const response = await result.response
      text = response.text()
    } else {
      // Use OpenAI API
      const completion = await client.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "Eres un asistente experto en navegación de contenido educativo." },
          { role: "user", content: brujulaPrompt }
        ],
        temperature: 1,
        max_completion_tokens: 1500,
        response_format: { type: "json_object" }
      })
      text = completion.choices[0]?.message?.content || "{}"
    }
  } catch (apiError: any) {
    console.error(`💥 [BRÚJULA] API call error:`, {
      name: apiError?.name,
      message: apiError?.message,
      status: apiError?.status,
      statusCode: apiError?.statusCode
    })
    throw apiError // Re-throw to be caught by outer try-catch
  }

  // Clean up response - remove markdown code blocks if present
  text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()

  // Parse JSON response
  let brujulaResponse
  try {
    brujulaResponse = JSON.parse(text)
    console.log(`✨ [BRÚJULA] Successfully parsed response with ${brujulaResponse?.links?.length || 0} links`)
  } catch (parseError) {
    console.error("❌ [BRÚJULA] Failed to parse OpenAI JSON response:", text?.substring(0, 200))
    return NextResponse.json({
      error: "Error al procesar la respuesta de búsqueda",
      success: false 
    }, { status: 500 })
  }

  console.log(`📤 [BRÚJULA] Returning response`)
  return NextResponse.json({
    brujulaResponse,
    success: true,
    provider,
    fallbackUsed: usedFallback
  })
}
