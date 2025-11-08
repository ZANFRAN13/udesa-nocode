"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Sparkles, Send, X, Loader2, User, Bot } from "lucide-react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import "./gemini-markdown-styles.css"

interface Message {
  role: "user" | "assistant"
  content: string
  usedFallback?: boolean
}

interface GeminiPopupProps {
  position: { x: number; y: number }
  selectedText: string
  onClose: () => void
}

const MAX_MESSAGES = 3 // Límite: pregunta inicial + 2 repreguntas

export function GeminiPopup({ position, selectedText, onClose }: GeminiPopupProps) {
  const [prompt, setPrompt] = useState("")
  const [conversationHistory, setConversationHistory] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showFallbackInfo, setShowFallbackInfo] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Scroll automático al final cuando hay nuevos mensajes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [conversationHistory])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Contar solo mensajes del usuario
    const userMessagesCount = conversationHistory.filter(m => m.role === "user").length
    if (!prompt.trim() || userMessagesCount >= MAX_MESSAGES) return

    const userMessage: Message = { role: "user", content: prompt.trim() }
    
    // Agregar mensaje del usuario al historial
    setConversationHistory(prev => [...prev, userMessage])
    setPrompt("")
    setIsLoading(true)

    try {
      // Detectar si solo tenemos el nombre del término (acordeón cerrado)
      // El nombre viene como: **Nombre del Término**
      const isTermNameOnly = selectedText.startsWith("**") && 
                             selectedText.endsWith("**") && 
                             selectedText.split("\n").length === 1
      
      // Si es solo el nombre, construir un contexto que indique el tema
      let contextToSend = selectedText
      let promptToSend = userMessage.content
      
      if (isTermNameOnly && conversationHistory.length === 0) {
        // Primera pregunta sobre un término cerrado
        const termName = selectedText.replace(/\*\*/g, "").trim()
        promptToSend = `Sobre el término "${termName}": ${userMessage.content}`
      }

      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: promptToSend,
          context: contextToSend,
          conversationHistory: conversationHistory, // Enviar historial previo
        }),
      })

      const data = await res.json()

      if (data.success) {
        const assistantMessage: Message = { 
          role: "assistant", 
          content: data.response,
          usedFallback: data.fallbackUsed || false
        }
        setConversationHistory(prev => [...prev, assistantMessage])
        
        // Mostrar info de fallback si se usó
        if (data.fallbackUsed) {
          setShowFallbackInfo(true)
        }
      } else {
        const errorMessage: Message = { 
          role: "assistant", 
          content: "❌ Error: " + (data.error || "No se pudo obtener respuesta") 
        }
        setConversationHistory(prev => [...prev, errorMessage])
      }
    } catch (error) {
      const errorMessage: Message = { 
        role: "assistant", 
        content: "❌ Error al conectar con el servicio de IA" 
      }
      setConversationHistory(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const userMessagesCount = conversationHistory.filter(m => m.role === "user").length
  const remainingQuestions = MAX_MESSAGES - userMessagesCount

  const quickPrompts = [
    "Explícalo como si tuviera 5 años",
    "¿Cómo lo integro en mi flujo de vibecoding?",
    "Dame un ejemplo práctico",
    "¿Cuándo debería usarlo?",
  ]

  // Calcular posición ajustada para que no se salga de la pantalla
  const calculatePosition = useCallback((hasMessages: boolean) => {
    const popupWidth = 384 // w-96 = 384px
    const margin = 16 // margen desde los bordes
    const maxHeight = window.innerHeight - margin * 2
    
    let left = position.x
    let top = position.y
    
    // Ajustar horizontalmente
    if (left + popupWidth > window.innerWidth - margin) {
      left = window.innerWidth - popupWidth - margin
    }
    if (left < margin) {
      left = margin
    }
    
    // Ajustar verticalmente - dejar espacio suficiente desde abajo
    const estimatedHeight = hasMessages ? 600 : 350 // altura estimada según tenga mensajes o no
    if (top + estimatedHeight > window.innerHeight - margin) {
      top = Math.max(margin, window.innerHeight - estimatedHeight - margin)
    }
    if (top < margin) {
      top = margin
    }
    
    return { left, top, maxHeight }
  }, [position.x, position.y])

  const [adjustedPosition, setAdjustedPosition] = useState(() => calculatePosition(false))

  // Recalcular posición cuando cambia el historial
  useEffect(() => {
    setAdjustedPosition(calculatePosition(conversationHistory.length > 0))
  }, [conversationHistory, calculatePosition])

  return (
    <Card
      className="fixed z-50 w-96 max-w-[calc(100vw-2rem)] shadow-2xl border-2 border-accent/20 bg-background flex flex-col gemini-popup-scrollbar"
      style={{
        left: `${adjustedPosition.left}px`,
        top: `${adjustedPosition.top}px`,
        maxHeight: `${adjustedPosition.maxHeight}px`,
      }}
    >
      {/* Close Button - Fixed in top right corner */}
      <Button
        variant="ghost"
        size="sm"
        onClick={onClose}
        className="absolute top-2 right-2 z-10 h-7 w-7 p-0 rounded-full hover:bg-accent/10"
      >
        <X className="h-4 w-4" />
      </Button>

      {/* Scrollable Content Area */}
      <div className="p-4 space-y-3 overflow-y-auto flex-1 pr-3 pb-0">
        {/* Header */}
        <div className="flex items-center gap-2 pr-6 flex-wrap">
          <div className="p-1.5 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <h3 className="font-semibold text-sm">Asistente IA</h3>
          {showFallbackInfo && (
            <span className="text-[10px] px-2 py-0.5 bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 rounded-full">
              Gemini 2
            </span>
          )}
        </div>

        {/* Selected Context Preview */}
        <div className="bg-accent/5 rounded-lg p-2 text-xs text-muted-foreground border border-accent/10 max-h-20 overflow-y-auto">
          <span className="font-medium">Contenido seleccionado:</span>
          <p className="mt-1 line-clamp-3">{selectedText}</p>
        </div>

        {/* Quick Prompts - Solo mostrar si no hay historial */}
        {conversationHistory.length === 0 && (
          <div className="flex flex-wrap gap-1.5">
            {quickPrompts.map((quickPrompt) => (
              <Button
                key={quickPrompt}
                variant="outline"
                size="sm"
                onClick={() => setPrompt(quickPrompt)}
                className="text-xs h-7 px-2"
                disabled={isLoading}
              >
                {quickPrompt}
              </Button>
            ))}
          </div>
        )}

        {/* Conversation History */}
        {conversationHistory.length > 0 && (
          <div className="space-y-3 overflow-y-auto">
            {conversationHistory.map((message, index) => (
              <div
                key={index}
                className={`flex gap-2 ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {message.role === "assistant" && (
                  <div className="shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                    <Bot className="h-3 w-3 text-white" />
                  </div>
                )}
                <div
                  className={`rounded-lg p-3 text-sm max-w-[85%] ${
                    message.role === "user"
                      ? "bg-accent text-accent-foreground"
                      : "bg-accent/5 border border-accent/10"
                  }`}
                >
                  {message.role === "assistant" ? (
                    <div className="gemini-markdown text-foreground">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          a: ({ node, ...props }) => (
                            <a
                              {...props}
                              className="text-accent hover:text-accent/80"
                              target="_blank"
                              rel="noopener noreferrer"
                            />
                          ),
                          code: ({ node, inline, ...props }: any) =>
                            inline ? (
                              <code
                                {...props}
                                className="bg-muted/50 px-1.5 py-0.5 rounded text-xs"
                              />
                            ) : (
                              <code {...props} className="block" />
                            ),
                        }}
                      >
                        {message.content}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    <p className="whitespace-pre-wrap">{message.content}</p>
                  )}
                </div>
                {message.role === "user" && (
                  <div className="shrink-0 w-6 h-6 rounded-full bg-accent flex items-center justify-center">
                    <User className="h-3 w-3" />
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Fixed Input Area at Bottom */}
      <div className="border-t border-border/50 bg-background p-4 pt-3">
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <div className="flex gap-2">
            <Input
              placeholder={
                remainingQuestions > 0
                  ? "Escribe tu pregunta aquí..."
                  : "Límite alcanzado"
              }
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              disabled={isLoading || remainingQuestions === 0}
              className="text-sm"
            />
            <Button
              type="submit"
              size="sm"
              disabled={isLoading || !prompt.trim() || remainingQuestions === 0}
              className="shrink-0"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
          {conversationHistory.length > 0 && (
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-muted-foreground">Context Window</span>
                <span className="text-muted-foreground">{userMessagesCount}/{MAX_MESSAGES}</span>
              </div>
              <div className="flex gap-1 h-1.5">
                {[...Array(MAX_MESSAGES)].map((_, index) => (
                  <div
                    key={index}
                    className={`flex-1 rounded-full transition-colors ${
                      index < userMessagesCount
                        ? "bg-green-500"
                        : "bg-muted"
                    }`}
                  />
                ))}
              </div>
              {remainingQuestions === 0 && (
                <p className="text-xs text-orange-600 dark:text-orange-400 mt-1">
                  Límite alcanzado. Cierra y selecciona otro contenido.
                </p>
              )}
            </div>
          )}
        </form>
      </div>
    </Card>
  )
}

