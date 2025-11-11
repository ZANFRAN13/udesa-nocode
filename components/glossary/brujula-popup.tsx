"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { X, Compass, Send, Loader2, ExternalLink, Sparkles } from "lucide-react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import "./gemini-markdown-styles.css"

interface BrujulaPopupProps {
  onClose: () => void
}

interface BrujulaResponse {
  answer: string
  links: Array<{
    title: string
    url: string
    description?: string
  }>
  fallback?: boolean
}

export function BrujulaPopup({ onClose }: BrujulaPopupProps) {
  const router = useRouter()
  const [query, setQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isNavigating, setIsNavigating] = useState(false)
  const [response, setResponse] = useState<BrujulaResponse | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [usedFallback, setUsedFallback] = useState(false)
  const [showUserKeyInput, setShowUserKeyInput] = useState(false)
  const [userApiKey, setUserApiKey] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)
  const apiKeyInputRef = useRef<HTMLInputElement>(null)
  
  const handleLinkClick = (url: string) => {
    // Mostrar feedback inmediato
    setIsNavigating(true)
    
    // Check if the link is to the same page with a different hash
    const currentPath = window.location.pathname
    const [targetPath, targetHash] = url.split('#')
    
    // Pequeño delay para que el usuario vea el spinner
    setTimeout(() => {
      if (currentPath === targetPath && targetHash) {
        // Same page, just update hash and trigger navigation
        window.location.hash = targetHash
        setTimeout(() => {
          window.dispatchEvent(new Event('hashchange'))
          onClose()
        }, 50)
      } else {
        // Different page, use router
        router.push(url)
        // Cerrar después de iniciar la navegación
        setTimeout(() => {
          onClose()
        }, 100)
      }
    }, 50)
  }

  // Auto-focus input on mount
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!query.trim()) return

    console.log("🧭 [FRONTEND] Submitting Brújula query:", query.trim())
    setIsLoading(true)
    setError(null)
    setResponse(null)

    try {
      console.log("🧭 [FRONTEND] Fetching /api/gemini...")
      const requestBody: any = {
        mode: "brujula",
        query: query.trim(),
      }
      
      // If user provided their own API key, include it
      if (userApiKey.trim()) {
        console.log("🔑 [FRONTEND] Using user-provided API key")
        requestBody.userApiKey = userApiKey.trim()
      }
      
      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      })

      console.log("🧭 [FRONTEND] Response status:", res.status)
      const data = await res.json()
      console.log("🧭 [FRONTEND] Response data:", { 
        success: data.success, 
        fallbackUsed: data.fallbackUsed,
        linksCount: data.brujulaResponse?.links?.length 
      })

      if (data.success && data.brujulaResponse) {
        console.log("✅ [FRONTEND] Success! Fallback used:", data.fallbackUsed)
        setResponse(data.brujulaResponse)
        setUsedFallback(data.fallbackUsed || false)
        setShowUserKeyInput(false) // Hide key input on success
        setUserApiKey("") // Clear user key
      } else {
        console.error("❌ [FRONTEND] API returned error:", data.error)
        // Show specific error messages
        if (data.errorType === 'rate_limit') {
          setError("⏱️ " + data.error + " (Límite de consultas alcanzado)")
          setShowUserKeyInput(true) // Show input for user's own API key
          // Focus the API key input after a short delay
          setTimeout(() => {
            apiKeyInputRef.current?.focus()
          }, 100)
        } else {
          setError(data.error || "No se pudo procesar tu búsqueda")
          setShowUserKeyInput(false)
        }
      }
    } catch (err) {
      console.error("❌ [FRONTEND] Fetch error:", err)
      setError("Error al conectar con el servicio de búsqueda. Verificá tu conexión a internet.")
    } finally {
      setIsLoading(false)
    }
  }

  const quickSearches = [
    "¿Dónde veo los errores?",
    "¿Cómo uso Cursor?",
    "¿Qué es un MVP?",
    "¿Cómo uso Git?",
  ]

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Navigating Overlay */}
      {isNavigating && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="bg-background rounded-lg shadow-2xl p-6 flex flex-col items-center gap-4 border-2 border-blue-500/20">
            <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            <p className="text-sm font-medium">Navegando...</p>
          </div>
        </div>
      )}
      
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-3xl max-h-[85vh] bg-background shadow-2xl border-2 border-accent/20 relative flex flex-col gemini-popup-scrollbar">
          {/* Close Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            disabled={isNavigating}
            className="absolute top-4 right-4 z-10 h-8 w-8 p-0 rounded-full hover:bg-accent/10 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <X className="h-4 w-4" />
          </Button>

          {/* Header */}
          <div className="p-6 pb-4 border-b border-border/50">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg">
                <Compass className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-xl md:text-2xl font-bold">
                    Brújula de Contenido
                  </h2>
                  {usedFallback && (
                    <span className="text-[10px] px-2 py-0.5 bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 rounded-full">
                      Gemini 2
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  Dime qué estás buscando y te ayudo a encontrarlo
                </p>
              </div>
            </div>

            {/* Search Form */}
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                ref={inputRef}
                placeholder="Ej: ¿Dónde veo los errores de mi app?"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                disabled={isLoading || isNavigating}
                className="text-sm"
              />
              <Button
                type="submit"
                size="sm"
                disabled={isLoading || isNavigating || !query.trim()}
                className="shrink-0 bg-gradient-to-br from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </form>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto p-6">
            {/* Initial state - Quick searches */}
            {!response && !error && !isLoading && (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Búsquedas rápidas:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {quickSearches.map((quickSearch) => (
                    <Button
                      key={quickSearch}
                      variant="outline"
                      size="sm"
                      onClick={() => setQuery(quickSearch)}
                      disabled={isNavigating}
                      className="text-left justify-start h-auto py-3 px-4 hover:bg-accent/10 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Compass className="h-4 w-4 mr-2 shrink-0 text-blue-500" />
                      <span className="text-sm">{quickSearch}</span>
                    </Button>
                  ))}
                </div>

                <div className="mt-8 p-4 bg-accent/5 rounded-lg border border-accent/10">
                  <p className="text-sm text-muted-foreground">
                    💡 <strong>Tip:</strong> Describí tu necesidad en lenguaje natural. 
                    Por ejemplo: "necesito copiar errores para v0", "estoy perdido con cursor", 
                    "qué es un componente", etc.
                  </p>
                </div>
              </div>
            )}

            {/* Loading state */}
            {isLoading && (
              <div className="flex flex-col items-center justify-center py-12 space-y-4">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                <p className="text-sm text-muted-foreground">
                  Buscando el mejor contenido para vos...
                </p>
              </div>
            )}

            {/* Error state */}
            {error && (
              <div className="space-y-4">
                <div className={`p-4 rounded-lg ${
                  error.includes('Límite de consultas') 
                    ? 'bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-900'
                    : 'bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900'
                }`}>
                  <p className={`text-sm ${
                    error.includes('Límite de consultas')
                      ? 'text-orange-800 dark:text-orange-400'
                      : 'text-red-600 dark:text-red-400'
                  }`}>
                    {error}
                  </p>
                  {error.includes('Límite de consultas') && !showUserKeyInput && (
                    <p className="text-xs text-orange-700 dark:text-orange-500 mt-2">
                      💡 <strong>Tip:</strong> La API gratuita tiene límites. Esperá 30-60 segundos antes de hacer otra búsqueda.
                    </p>
                  )}
                </div>

                {/* User API Key Input - Second Fallback */}
                {showUserKeyInput && (
                  <div className="p-4 bg-blue-50 dark:bg-blue-950/20 border-2 border-blue-300 dark:border-blue-800 rounded-lg space-y-3">
                    <div className="flex items-start gap-2">
                      <div className="p-1.5 bg-blue-500 rounded">
                        <Sparkles className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-1">
                          🔑 Solución Rápida: Usá tu propia API Key
                        </h4>
                        <p className="text-xs text-blue-800 dark:text-blue-200 mb-3">
                          Pegá tu API key de Google Gemini para continuar con tu búsqueda inmediatamente
                        </p>
                        
                        <div className="space-y-2">
                          <Input
                            ref={apiKeyInputRef}
                            type="password"
                            placeholder="Pegá tu API key de Gemini aquí (AIza...)"
                            value={userApiKey}
                            onChange={(e) => setUserApiKey(e.target.value)}
                            disabled={isLoading}
                            className="text-sm font-mono"
                          />
                          
                          <div className="flex items-center justify-between gap-2">
                            <a
                              href="https://aistudio.google.com/api-keys"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-blue-700 dark:text-blue-300 hover:text-blue-900 dark:hover:text-blue-100 underline flex items-center gap-1"
                            >
                              <ExternalLink className="h-3 w-3" />
                              Conseguir API key gratuita (2 clicks)
                            </a>
                            
                            <Button
                              size="sm"
                              onClick={() => {
                                if (userApiKey.trim()) {
                                  handleSubmit(new Event('submit') as any)
                                }
                              }}
                              disabled={!userApiKey.trim() || isLoading}
                              className="bg-blue-600 hover:bg-blue-700 text-white"
                            >
                              {isLoading ? (
                                <Loader2 className="h-3 w-3 animate-spin" />
                              ) : (
                                <Send className="h-3 w-3 mr-1" />
                              )}
                              Buscar
                            </Button>
                          </div>
                        </div>
                        
                        <p className="text-xs text-blue-700 dark:text-blue-300 mt-2">
                          🔒 <strong>Privacidad:</strong> Tu API key solo se usa para esta búsqueda y no se guarda
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Response state */}
            {response && (
              <div className="space-y-6">
                {/* Answer */}
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  <div className="gemini-markdown">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        a: ({ node, ...props }) => (
                          <a
                            {...props}
                            className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                            target="_blank"
                            rel="noopener noreferrer"
                          />
                        ),
                      }}
                    >
                      {response.answer}
                    </ReactMarkdown>
                  </div>
                </div>

                {/* Links */}
                {response.links && response.links.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                      Enlaces sugeridos
                    </h3>
                    <div className="space-y-2">
                      {response.links.map((link, index) => (
                        <button
                          key={index}
                          onClick={() => handleLinkClick(link.url)}
                          disabled={isNavigating}
                          className="block w-full text-left p-4 bg-accent/5 hover:bg-accent/10 border border-accent/20 hover:border-accent/40 rounded-lg transition-all group cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <div className="flex items-start gap-3">
                            <div className="p-2 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-colors shrink-0">
                              <ExternalLink className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-sm group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                {link.title}
                              </h4>
                              {link.description && (
                                <p className="text-xs text-muted-foreground mt-1">
                                  {link.description}
                                </p>
                              )}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Fallback message */}
                {response.fallback && (
                  <div className="p-4 bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-900 rounded-lg">
                    <p className="text-sm text-orange-800 dark:text-orange-400">
                      💬 <strong>No encontramos contenido específico en la app.</strong> 
                      {" "}Te sugerimos consultar con ChatGPT, Claude u otro asistente de IA, 
                      o preguntar en el grupo de WhatsApp "Foro".
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </Card>
      </div>
    </>
  )
}

