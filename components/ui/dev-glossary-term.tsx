"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, ChevronRight, Code } from "lucide-react"
import { DevTerm } from "@/lib/dev-glossary-data"

interface DevGlossaryTermProps {
  term: DevTerm
  isExpanded?: boolean
  onToggle?: () => void
  onTermClick?: (termId: string) => void
}

// Function to process text with internal links
function processTextWithLinks(text: string, onTermClick?: (termId: string) => void) {
  const linkRegex = /\*\[([^\]]+)\]\(#([^)]+)\)\*/g
  const parts = []
  let lastIndex = 0
  let match

  while ((match = linkRegex.exec(text)) !== null) {
    // Add text before the link
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index))
    }
    
    // Add the clickable link
    const linkText = match[1]
    const termId = match[2]
    parts.push(
      <button
        key={match.index}
        onClick={() => onTermClick?.(termId)}
        className="text-accent hover:text-accent/80 underline italic font-medium transition-colors"
      >
        {linkText}
      </button>
    )
    
    lastIndex = match.index + match[0].length
  }
  
  // Add remaining text
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex))
  }
  
  // Process remaining italic text (without links)
  return parts.map((part, index) => {
    if (typeof part === 'string') {
      return part.replace(/\*([^*]+)\*/g, (_, italicText) => italicText)
    }
    return part
  })
}

export function DevGlossaryTerm({ term, isExpanded = false, onToggle, onTermClick }: DevGlossaryTermProps) {
  return (
    <Card className="overflow-hidden border border-border/50 shadow-sm hover:shadow-md transition-shadow">
      <CardHeader 
        className="cursor-pointer hover:bg-accent/5 transition-colors p-4"
        onClick={onToggle}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold text-foreground">{term.name}</h3>
              <Badge variant="secondary" className="text-xs">
                {term.category}
              </Badge>
              {term.tags && term.tags.includes("basics") && (
                <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                  Basics
                </Badge>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            {isExpanded ? (
              <ChevronDown className="h-5 w-5 text-muted-foreground" />
            ) : (
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            )}
          </div>
        </div>
      </CardHeader>
      
      {isExpanded && (
        <CardContent className="pt-0 pb-4 px-4 animate-in slide-in-from-top-2 duration-200">
          <div className="space-y-4">
            {/* Description */}
            <div>
              <h4 className="text-sm font-medium text-foreground mb-2">Descripción</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {processTextWithLinks(term.description, onTermClick)}
              </p>
            </div>

            {/* Example */}
            {term.example && (
              <div>
                <h4 className="text-sm font-medium text-foreground mb-2">Ejemplo</h4>
                <p className="text-sm text-muted-foreground leading-relaxed italic">
                  {processTextWithLinks(term.example, onTermClick)}
                </p>
              </div>
            )}

            {/* Code Example */}
            {term.codeExample && (
              <div>
                <h4 className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                  <Code className="h-4 w-4" />
                  Ejemplo de Código
                </h4>
                <div className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto">
                  <pre className="text-sm font-mono whitespace-pre-wrap">
                    {term.codeExample}
                  </pre>
                </div>
              </div>
            )}

            {/* Visual Example - Single Image */}
            {term.imageUrl && !term.imageUrls && (
              <div>
                <h4 className="text-sm font-medium text-foreground mb-2">Ejemplo Visual</h4>
                <div className="rounded-lg overflow-hidden border border-border/30 bg-accent/5 p-4">
                  <img
                    src={term.imageUrl}
                    alt={`Ejemplo visual de ${term.name}`}
                    className="w-full max-w-md mx-auto rounded-md shadow-sm"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                </div>
              </div>
            )}

            {/* Visual Examples - Multiple Images */}
            {term.imageUrls && term.imageUrls.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-foreground mb-2">Ejemplos Visuales</h4>
                <div className="space-y-4">
                  {term.imageUrls.map((imageUrl, index) => (
                    <div key={index} className="rounded-lg overflow-hidden border border-border/30 bg-accent/5 p-4">
                      <img
                        src={imageUrl}
                        alt={`Ejemplo visual ${index + 1} de ${term.name}`}
                        className="w-full max-w-2xl mx-auto rounded-md shadow-sm"
                        loading="lazy"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
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
                <h4 className="text-sm font-medium text-foreground mb-2">Términos relacionados</h4>
                <div className="flex flex-wrap gap-2">
                  {term.relatedTerms.map((relatedTerm, index) => (
                    <Badge 
                      key={index} 
                      variant="outline" 
                      className="text-xs cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        onTermClick?.(relatedTerm);
                      }}
                    >
                      {relatedTerm}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      )}
    </Card>
  )
}
