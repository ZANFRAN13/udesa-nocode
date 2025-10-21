"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, ChevronRight, ExternalLink, Code } from "lucide-react"
import { GenericGlossaryTerm } from "@/lib/glossary-types"
import {
  processTextWithLinks,
  processConfigurationText,
} from "@/lib/glossary-utils"

interface GlossaryTermProps {
  term: GenericGlossaryTerm
  isExpanded?: boolean
  onToggle?: () => void
  onTermClick?: (termId: string) => void
  externalLinkGenerator?: (termId: string) => string
  allTerms?: GenericGlossaryTerm[]
}

export function GlossaryTerm({
  term,
  isExpanded = false,
  onToggle,
  onTermClick,
  externalLinkGenerator,
  allTerms = [],
}: GlossaryTermProps) {
  return (
    <Card className="overflow-hidden border border-border/50 shadow-sm hover:shadow-md transition-shadow">
      <CardHeader
        className="cursor-pointer hover:bg-accent/5 transition-colors p-3 md:p-4"
        onClick={onToggle}
      >
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 md:gap-3 min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-1.5 md:gap-2 min-w-0">
              <h3 className="text-base md:text-lg font-semibold text-foreground">
                {term.name}
              </h3>
              <Badge variant="secondary" className="text-xs shrink-0">
                {term.category}
              </Badge>
              {term.tags && term.tags.includes("basics") && (
                <Badge
                  variant="outline"
                  className="text-xs bg-blue-50 text-blue-700 border-blue-200 shrink-0"
                >
                  Basics
                </Badge>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {isExpanded ? (
              <ChevronDown className="h-4 w-4 md:h-5 md:w-5 text-muted-foreground" />
            ) : (
              <ChevronRight className="h-4 w-4 md:h-5 md:w-5 text-muted-foreground" />
            )}
          </div>
        </div>
      </CardHeader>

      {isExpanded && (
        <CardContent className="pt-0 pb-3 md:pb-4 px-3 md:px-4 animate-in slide-in-from-top-2 duration-200">
          <div className="space-y-3 md:space-y-4">
            {/* Description */}
            <div>
              <h4 className="text-xs md:text-sm font-medium text-foreground mb-1.5 md:mb-2">
                Descripción
              </h4>
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                {processTextWithLinks(term.description, onTermClick)}
              </p>
            </div>

            {/* Example */}
            {term.example && (
              <div>
                <h4 className="text-xs md:text-sm font-medium text-foreground mb-1.5 md:mb-2">
                  Ejemplo
                </h4>
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed italic">
                  {processTextWithLinks(term.example, onTermClick)}
                </p>
              </div>
            )}

            {/* Code Example (for dev terms) */}
            {term.codeExample && (
              <div>
                <h4 className="text-xs md:text-sm font-medium text-foreground mb-1.5 md:mb-2 flex items-center gap-2">
                  <Code className="h-3 w-3 md:h-4 md:w-4" />
                  Ejemplo de Código
                </h4>
                <div className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto">
                  <pre className="text-xs md:text-sm font-mono whitespace-pre-wrap">
                    {term.codeExample}
                  </pre>
                </div>
              </div>
            )}

            {/* Configuration (for CSS and UI terms) */}
            {term.configuration && (
              <div>
                <h4 className="text-xs md:text-sm font-medium text-foreground mb-2 md:mb-3 flex items-center gap-2">
                  <span className="text-yellow-500">💡</span>
                  Cómo configurar
                </h4>
                <div className="bg-gradient-to-r from-accent/5 to-accent/10 border border-accent/30 rounded-xl p-3 md:p-4 space-y-3 md:space-y-4">
                  <div className="text-xs md:text-sm text-foreground leading-relaxed">
                    {processConfigurationText(term.configuration, onTermClick)}
                  </div>
                </div>
              </div>
            )}

            {/* Visual Example - Single Image */}
            {term.imageUrl && !term.imageUrls && (
              <div>
                <h4 className="text-xs md:text-sm font-medium text-foreground mb-1.5 md:mb-2">
                  Ejemplo Visual
                </h4>
                <div className="rounded-lg overflow-hidden border border-border/30 bg-accent/5 p-3 md:p-4">
                  <img
                    src={term.imageUrl}
                    alt={`Ejemplo visual de ${term.name}`}
                    className="w-full max-w-md mx-auto rounded-md shadow-sm"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.style.display = "none"
                    }}
                  />
                </div>
              </div>
            )}

            {/* Visual Examples - Multiple Images */}
            {term.imageUrls && term.imageUrls.length > 0 && (
              <div>
                <h4 className="text-xs md:text-sm font-medium text-foreground mb-1.5 md:mb-2">
                  Ejemplos Visuales
                </h4>
                <div className="space-y-3 md:space-y-4">
                  {term.imageUrls.map((imageUrl, index) => (
                    <div
                      key={index}
                      className="rounded-lg overflow-hidden border border-border/30 bg-accent/5 p-3 md:p-4"
                    >
                      <img
                        src={imageUrl}
                        alt={`Ejemplo visual ${index + 1} de ${term.name}`}
                        className="w-full max-w-2xl mx-auto rounded-md shadow-sm"
                        loading="lazy"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.style.display = "none"
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Related Terms */}
            {term.relatedTerms && term.relatedTerms.length > 0 && (
              <div>
                <h4 className="text-xs md:text-sm font-medium text-foreground mb-1.5 md:mb-2">
                  Términos relacionados
                </h4>
                <div className="flex flex-wrap gap-1.5 md:gap-2">
                  {term.relatedTerms.map((relatedTermId, index) => {
                    // Find the full term data to get the name
                    const relatedTerm = allTerms.find(t => t.id === relatedTermId)
                    const displayName = relatedTerm?.name || relatedTermId
                    
                    return (
                      <Badge
                        key={index}
                        variant="outline"
                        className="text-xs cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors"
                        onClick={(e) => {
                          e.stopPropagation()
                          onTermClick?.(relatedTermId)
                        }}
                      >
                        {displayName}
                      </Badge>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Reference Link (optional, based on externalLinkGenerator) */}
            {externalLinkGenerator && (
              <div className="pt-2 border-t border-border/30">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs text-muted-foreground hover:text-accent h-auto py-1.5"
                  asChild
                >
                  <a
                    href={externalLinkGenerator(term.id)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1"
                  >
                    <ExternalLink className="h-3 w-3" />
                    <span className="hidden sm:inline">Ver en Nielsen Norman Group</span>
                    <span className="sm:hidden">Ver más</span>
                  </a>
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      )}
    </Card>
  )
}
