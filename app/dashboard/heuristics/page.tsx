"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Lightbulb,
  ChevronDown,
  ChevronRight,
  Copy,
  Check,
  ExternalLink,
  FileText,
} from "lucide-react"
import { heuristicsNewData, getTypeColorNew, getTypeLabelNew } from "@/lib/heuristics-new-data"
import { useAuth } from "@/lib/hooks/use-auth"
import { useExpandable } from "@/lib/hooks/use-expandable"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { GeminiHelper } from "@/components/glossary/gemini-helper"

export default function HeuristicsPage() {
  const { handleLogout, handleBackToDashboard } = useAuth()
  const { toggle: toggleSection, isExpanded: isSectionExpanded } = useExpandable()
  const { toggle: toggleItem, isExpanded: isItemExpanded } = useExpandable()
  const [copiedCommands, setCopiedCommands] = useState<Record<string, boolean>>({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  // Función para detectar si es un comando
  const isCommand = (text: string) => {
    const commandPrefixes = ['git ', 'npm ', 'cd ', 'npx ', 'yarn ', 'pnpm ']
    return commandPrefixes.some(prefix => text.trim().startsWith(prefix))
  }

  // Función para copiar al clipboard
  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedCommands(prev => ({ ...prev, [id]: true }))
      setTimeout(() => {
        setCopiedCommands(prev => ({ ...prev, [id]: false }))
      }, 2000)
    } catch (err) {
      console.error('Error al copiar:', err)
    }
  }

  // Función para formatear texto con código estilo terminal
  const formatTextWithCode = (text: string) => {
    const parts = text.split(/(`[^`]+`)/)
    return parts.map((part, index) => {
      if (part.startsWith('`') && part.endsWith('`')) {
        const code = part.slice(1, -1)
        const isCmd = isCommand(code)
        const commandId = `cmd-${index}-${code.substring(0, 10)}`
        const isCopied = copiedCommands[commandId]

        return (
          <span key={index} className="inline-flex items-center group relative">
            <code 
              className="px-2 py-1 mx-0.5 bg-black text-white rounded text-xs font-mono border border-gray-800 inline-block"
            >
              {code}
            </code>
            {isCmd && (
              <button
                onClick={() => copyToClipboard(code, commandId)}
                className="ml-1 p-1 hover:bg-gray-800 rounded transition-colors opacity-0 group-hover:opacity-100"
                title="Copiar comando"
              >
                {isCopied ? (
                  <Check className="h-3 w-3 text-green-400" />
                ) : (
                  <Copy className="h-3 w-3 text-gray-400" />
                )}
              </button>
            )}
          </span>
        )
      }
      // Preservar saltos de línea en el texto normal
      return part.split('\n').map((line, i, arr) => (
        <span key={`${index}-${i}`}>
          {line}
          {i < arr.length - 1 && <br />}
        </span>
      ))
    })
  }

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
        <div className="text-center">
          <img src="/images/udesa-logo-black-v.jpg" alt="UdeSA" className="h-28 w-auto animate-udesa-in" />
          <p className="text-gray-300 mt-4">Cargando...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader
        title="Guía de Vibecoding con IA"
        mobileTitle="Vibecoding con IA"
        onBack={handleBackToDashboard}
        onLogout={handleLogout}
      />

      {/* Main Content */}
      <div className="container mx-auto px-3 md:px-4 py-6 md:py-8">
        <div className="max-w-4xl mx-auto">
          {/* Introduction */}
          <div className="mb-6 md:mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2 md:mb-3">
              Guía de Programación Asistida con IA
            </h2>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              Aprende a trabajar eficientemente con IA para crear tus proyectos. Estas son las mejores prácticas y consejos esenciales para vibecoding exitoso y escalable.
            </p>
          </div>

          {/* Heuristics Sections */}
          <div>
            {heuristicsNewData.map((section) => {
              const IconComponent = section.icon
              const isOpen = isSectionExpanded(section.id)
              
              return (
                <Card key={section.id} className="overflow-hidden border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-background mb-6 group hover:bg-primary/10 transition-all duration-200">
                  <Collapsible
                    open={isOpen}
                    onOpenChange={() => toggleSection(section.id)}
                  >
                    <CollapsibleTrigger className="w-full">
                      <CardHeader className="cursor-pointer p-4 md:p-6">
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2 md:gap-3 min-w-0 flex-1">
                            <div className="p-1.5 md:p-2 bg-primary/10 rounded-lg shrink-0">
                              <IconComponent className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                            </div>
                            <div className="text-left min-w-0">
                              <CardTitle className="text-base md:text-xl">
                                {section.title}
                              </CardTitle>
                              <p className="text-xs md:text-sm text-muted-foreground mt-0.5 md:mt-1 line-clamp-1">
                                {section.id === "ai-heuristics" && "Principios para trabajar efectivamente con IA"}
                                {section.id === "dev-practices" && "Prácticas esenciales del desarrollo asistido por IA"}
                                {section.id === "project-rules" && "Reglas fundamentales para tu proyecto"}
                              </p>
                            </div>
                          </div>
                          <div className="shrink-0">
                            {isOpen ? (
                              <ChevronDown className="h-4 w-4 md:h-5 md:w-5 text-muted-foreground" />
                            ) : (
                              <ChevronRight className="h-4 w-4 md:h-5 md:w-5 text-muted-foreground" />
                            )}
                          </div>
                        </div>
                      </CardHeader>
                    </CollapsibleTrigger>
                    
                    <CollapsibleContent>
                      <CardContent className="p-3 md:p-6">
                        {section.id === "ai-heuristics" && (
                          <div className="mb-4 md:mb-6 p-3 md:p-4 bg-primary/5 border border-primary/20 rounded-lg">
                            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                              Estas son reglas generales y fáciles de recordar para interactuar adecuadamente con la IA Generativa más allá del vibecoding.
                            </p>
                          </div>
                        )}
                        <div className="space-y-2 md:space-y-3">
                          {section.items.map((item, index) => {
                            const itemId = `${section.id}-${index}`
                            const isItemOpen = isItemExpanded(itemId)
                            
                            return (
                              <div key={index} className="border border-border/30 rounded-lg overflow-hidden bg-background/50">
                                <button
                                  onClick={() => toggleItem(itemId)}
                                  className="w-full flex items-start gap-2 md:gap-3 p-3 md:p-4 text-left hover:bg-accent/5 transition-colors"
                                >
                                  <div className="flex-shrink-0 w-6 h-6 md:w-7 md:h-7 bg-accent/10 rounded-full flex items-center justify-center mt-0.5">
                                    <span className="text-xs md:text-sm font-semibold text-accent">
                                      {index + 1}
                                    </span>
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap">
                                      <h3 className="text-sm md:text-base font-semibold text-foreground">
                                        {item.title}
                                      </h3>
                                      <Badge className={`${getTypeColorNew(item.type)} border text-xs`}>
                                        {getTypeLabelNew(item.type)}
                                      </Badge>
                                    </div>
                                  </div>
                                  <div className="flex-shrink-0">
                                    {isItemOpen ? (
                                      <ChevronDown className="h-4 w-4 text-accent" />
                                    ) : (
                                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                                    )}
                                  </div>
                                </button>
                                
                                {isItemOpen && (
                                  <div className="px-3 md:px-4 pb-3 md:pb-4 animate-in slide-in-from-top-2 duration-200">
                                    <div className="pl-8 md:pl-10 pr-2 md:pr-4 space-y-3">
                                      <div className="pt-2 md:pt-3 border-t border-border/20">
                                        <div className="text-xs md:text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
                                          {formatTextWithCode(item.description)}
                                        </div>
                                      </div>
                                      {item.image && (
                                        <div className="bg-accent/5 p-3 md:p-4 rounded-lg border border-accent/20">
                                          <div className="flex items-center justify-between mb-2">
                                            <h4 className="text-xs md:text-sm font-medium text-foreground flex items-center gap-2">
                                              <FileText className="h-3 w-3 md:h-4 md:w-4 text-accent" />
                                              Referencia visual:
                                            </h4>
                                            {item.link && (
                                              <a
                                                href={item.link.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-primary hover:text-primary/80 transition-colors"
                                                title="Ver más información"
                                              >
                                                <ExternalLink className="h-3 w-3 md:h-4 md:w-4" />
                                              </a>
                                            )}
                                          </div>
                                          <div className="mt-2">
                                            <img 
                                              src={item.image} 
                                              alt={item.imageCaption || "Imagen de referencia"}
                                              className="w-full max-w-md mx-auto rounded-lg border border-border/30"
                                            />
                                            {item.imageCaption && (
                                              <p className="text-xs text-muted-foreground mt-2 text-center italic">
                                                {item.imageCaption}
                                              </p>
                                            )}
                                          </div>
                                        </div>
                                      )}
                                      {item.example && (
                                        <div className="bg-accent/5 p-3 md:p-4 rounded-lg border border-accent/20">
                                          <div className="flex items-center justify-between mb-2">
                                            <h4 className="text-xs md:text-sm font-medium text-foreground flex items-center gap-2">
                                              <FileText className="h-3 w-3 md:h-4 md:w-4 text-accent" />
                                              Ejemplo:
                                            </h4>
                                            {item.exampleLinks && (
                                              <div className="relative group">
                                                <div className="text-primary hover:text-primary/80 transition-colors cursor-pointer">
                                                  <ExternalLink className="h-3 w-3 md:h-4 md:w-4" />
                                                </div>
                                                <div className="absolute right-0 top-full mt-1 w-32 bg-card border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                                  {item.exampleLinks.map((link, linkIndex) => (
                                                    <a
                                                      key={linkIndex}
                                                      href={link.url}
                                                      target="_blank"
                                                      rel="noopener noreferrer"
                                                      className="block px-3 py-2 text-xs text-foreground hover:bg-accent/10 transition-colors first:rounded-t-lg last:rounded-b-lg"
                                                    >
                                                      {link.label}
                                                    </a>
                                                  ))}
                                                </div>
                                              </div>
                                            )}
                                          </div>
                                          <div className="text-xs md:text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed">
                                            {formatTextWithCode(item.example)}
                                          </div>
                                        </div>
                                      )}
                                      {item.link && !item.image && (
                                        <div className="pt-2 text-xs md:text-sm text-muted-foreground">
                                          {item.link.text}{' '}
                                          <a 
                                            href={item.link.url} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="text-primary hover:text-primary/80 underline font-medium"
                                          >
                                            aquí
                                          </a>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                )}
                              </div>
                            )
                          })}
                        </div>
                      </CardContent>
                    </CollapsibleContent>
                  </Collapsible>
                </Card>
              )
            })}
          </div>

          {/* Tips Card */}
          <Card className="mt-6 md:mt-8 border border-border/50 shadow-sm">
            <CardHeader className="bg-accent/5 border-b p-4 md:p-6">
              <CardTitle className="text-base md:text-xl font-semibold text-foreground flex items-center gap-2 md:gap-3">
                <Lightbulb className="h-4 w-4 md:h-5 md:w-5 text-accent shrink-0" />
                Consejos Rápidos
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 md:p-6">
              <div className="grid md:grid-cols-2 gap-3 md:gap-4">
                <div className="p-3 md:p-4 bg-accent/5 rounded-lg border border-accent/20">
                  <h4 className="text-sm md:text-base font-semibold text-foreground mb-1 md:mb-2">✅ SÍ hacer</h4>
                  <ul className="text-xs md:text-sm text-muted-foreground space-y-1">
                    <li>• Estructurar prompts completos</li>
                    <li>• Verificar fuentes siempre</li>
                    <li>• Trabajar con branches y ambientes</li>
                    <li>• Refactoring y auditorías periódicas</li>
                    <li>• Documentar y comentar el código</li>
                    <li>• Cerrar chat si alucina</li>
                  </ul>
                </div>
                <div className="p-3 md:p-4 bg-accent/5 rounded-lg border border-accent/20">
                  <h4 className="text-sm md:text-base font-semibold text-foreground mb-1 md:mb-2">❌ NO hacer</h4>
                  <ul className="text-xs md:text-sm text-muted-foreground space-y-1">
                    <li>• Ser tendencioso en las consultas</li>
                    <li>• Usar IA como fuente de verdad absoluta</li>
                    <li>• Exponer datos sensibles en código</li>
                    <li>• Duplicar código sin refactorizar</li>
                    <li>• Mantener chats sobresaturados</li>
                    <li>• Probar directamente en producción</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="mt-8 md:mt-12 text-center">
            <p className="text-muted-foreground text-xs md:text-sm px-2">
              💡 Estas prácticas te ayudarán a trabajar mejor con IA. Aplicálas según las necesidades de tu proyecto.
            </p>
          </div>
        </div>
      </div>
      <GeminiHelper />
    </div>
  )
}
