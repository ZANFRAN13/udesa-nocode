import { GoogleGenerativeAI } from "@google/generative-ai"
import { NextResponse } from "next/server"
import { SYSTEM_CONTEXT } from "@/lib/system-context"

interface Message {
  role: "user" | "assistant"
  content: string
}

export async function POST(request: Request) {
  try {
    const { prompt, context, conversationHistory = [] } = await request.json()

    if (!prompt) {
      return NextResponse.json(
        { error: "El prompt es requerido" },
        { status: 400 }
      )
    }

    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { error: "API key no configurada" },
        { status: 500 }
      )
    }

    const genAI = new GoogleGenerativeAI(apiKey)
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" })

    // Usar el contexto del sistema desde CONTEXT_LLM.md
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
      success: true 
    })

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

