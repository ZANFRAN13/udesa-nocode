"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, ChevronRight, Ruler } from "lucide-react"

export function UnitsReferenceSection() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Card className="mb-6 md:mb-8 border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-background overflow-hidden group hover:bg-primary/10 transition-all duration-200">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="w-full">
          <CardHeader className="cursor-pointer p-4 md:p-6">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 md:gap-3 min-w-0 flex-1">
                <div className="p-1.5 md:p-2 bg-primary/10 rounded-lg shrink-0">
                  <Ruler className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                </div>
                <div className="text-left min-w-0">
                  <CardTitle className="text-base md:text-xl">📏 Referencia de Unidades de Medida</CardTitle>
                  <p className="text-xs md:text-sm text-muted-foreground mt-1 line-clamp-2">
                    Equivalencias y guía rápida de medidas CSS
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 md:gap-2 shrink-0">
                <Badge variant="secondary" className="bg-primary/10 text-primary text-xs hidden sm:inline-flex">
                  CSS Basics
                </Badge>
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
          <CardContent className="space-y-3 md:space-y-4 px-4 md:px-6 pb-4 md:pb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {/* Rem/Em Equivalences */}
              <div className="space-y-2 md:space-y-3">
                <div className="flex items-center gap-2 mb-2 md:mb-3">
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-accent rounded-full"></div>
                  <h4 className="font-semibold text-accent text-sm md:text-base">Unidades Relativas</h4>
                </div>
                <div className="space-y-1.5 md:space-y-2">
                  <div className="flex items-center gap-2 p-1.5 md:p-2 bg-background/50 rounded-lg border border-border/30">
                    <code className="bg-accent/10 text-accent px-1.5 md:px-2 py-0.5 md:py-1 rounded text-xs font-mono">1rem</code>
                    <span className="text-muted-foreground text-xs">= 16px</span>
                  </div>
                  <div className="flex items-center gap-2 p-1.5 md:p-2 bg-background/50 rounded-lg border border-border/30">
                    <code className="bg-accent/10 text-accent px-1.5 md:px-2 py-0.5 md:py-1 rounded text-xs font-mono">0.5rem</code>
                    <span className="text-muted-foreground text-xs">= 8px</span>
                  </div>
                  <div className="flex items-center gap-2 p-1.5 md:p-2 bg-background/50 rounded-lg border border-border/30">
                    <code className="bg-accent/10 text-accent px-1.5 md:px-2 py-0.5 md:py-1 rounded text-xs font-mono">1.5rem</code>
                    <span className="text-muted-foreground text-xs">= 24px</span>
                  </div>
                  <div className="flex items-center gap-2 p-1.5 md:p-2 bg-background/50 rounded-lg border border-border/30">
                    <code className="bg-accent/10 text-accent px-1.5 md:px-2 py-0.5 md:py-1 rounded text-xs font-mono">2rem</code>
                    <span className="text-muted-foreground text-xs">= 32px</span>
                  </div>
                  <div className="flex items-center gap-2 p-1.5 md:p-2 bg-background/50 rounded-lg border border-border/30">
                    <code className="bg-accent/10 text-accent px-1.5 md:px-2 py-0.5 md:py-1 rounded text-xs font-mono">1em</code>
                    <span className="text-muted-foreground text-xs">= tamaño del padre</span>
                  </div>
                </div>
              </div>

              {/* Viewport Units */}
              <div className="space-y-2 md:space-y-3">
                <div className="flex items-center gap-2 mb-2 md:mb-3">
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-accent rounded-full"></div>
                  <h4 className="font-semibold text-accent text-sm md:text-base">Unidades de Viewport</h4>
                </div>
                <div className="space-y-1.5 md:space-y-2">
                  <div className="flex items-center gap-2 p-1.5 md:p-2 bg-background/50 rounded-lg border border-border/30">
                    <code className="bg-accent/10 text-accent px-1.5 md:px-2 py-0.5 md:py-1 rounded text-xs font-mono">100vw</code>
                    <span className="text-muted-foreground text-xs">= ancho completo de pantalla</span>
                  </div>
                  <div className="flex items-center gap-2 p-1.5 md:p-2 bg-background/50 rounded-lg border border-border/30">
                    <code className="bg-accent/10 text-accent px-1.5 md:px-2 py-0.5 md:py-1 rounded text-xs font-mono">100vh</code>
                    <span className="text-muted-foreground text-xs">= altura completa de pantalla</span>
                  </div>
                  <div className="flex items-center gap-2 p-1.5 md:p-2 bg-background/50 rounded-lg border border-border/30">
                    <code className="bg-accent/10 text-accent px-1.5 md:px-2 py-0.5 md:py-1 rounded text-xs font-mono">50vw</code>
                    <span className="text-muted-foreground text-xs">= 50% del ancho de pantalla</span>
                  </div>
                  <div className="flex items-center gap-2 p-1.5 md:p-2 bg-background/50 rounded-lg border border-border/30">
                    <code className="bg-accent/10 text-accent px-1.5 md:px-2 py-0.5 md:py-1 rounded text-xs font-mono">50vh</code>
                    <span className="text-muted-foreground text-xs">= 50% de la altura de pantalla</span>
                  </div>
                  <div className="flex items-center gap-2 p-1.5 md:p-2 bg-background/50 rounded-lg border border-border/30">
                    <code className="bg-accent/10 text-accent px-1.5 md:px-2 py-0.5 md:py-1 rounded text-xs font-mono">1vmin</code>
                    <span className="text-muted-foreground text-xs">= 1% del lado más pequeño</span>
                  </div>
                </div>
              </div>

              {/* Common Sizes */}
              <div className="space-y-2 md:space-y-3">
                <div className="flex items-center gap-2 mb-2 md:mb-3">
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-accent rounded-full"></div>
                  <h4 className="font-semibold text-accent text-sm md:text-base">Tamaños Comunes</h4>
                </div>
                <div className="space-y-1.5 md:space-y-2">
                  <div className="flex items-center gap-2 p-1.5 md:p-2 bg-background/50 rounded-lg border border-border/30">
                    <code className="bg-accent/10 text-accent px-1.5 md:px-2 py-0.5 md:py-1 rounded text-xs font-mono">8px</code>
                    <span className="text-muted-foreground text-xs">= 0.5rem (espaciado pequeño)</span>
                  </div>
                  <div className="flex items-center gap-2 p-1.5 md:p-2 bg-background/50 rounded-lg border border-border/30">
                    <code className="bg-accent/10 text-accent px-1.5 md:px-2 py-0.5 md:py-1 rounded text-xs font-mono">16px</code>
                    <span className="text-muted-foreground text-xs">= 1rem (espaciado base)</span>
                  </div>
                  <div className="flex items-center gap-2 p-1.5 md:p-2 bg-background/50 rounded-lg border border-border/30">
                    <code className="bg-accent/10 text-accent px-1.5 md:px-2 py-0.5 md:py-1 rounded text-xs font-mono">24px</code>
                    <span className="text-muted-foreground text-xs">= 1.5rem (espaciado medio)</span>
                  </div>
                  <div className="flex items-center gap-2 p-1.5 md:p-2 bg-background/50 rounded-lg border border-border/30">
                    <code className="bg-accent/10 text-accent px-1.5 md:px-2 py-0.5 md:py-1 rounded text-xs font-mono">32px</code>
                    <span className="text-muted-foreground text-xs">= 2rem (espaciado grande)</span>
                  </div>
                  <div className="flex items-center gap-2 p-1.5 md:p-2 bg-background/50 rounded-lg border border-border/30">
                    <code className="bg-accent/10 text-accent px-1.5 md:px-2 py-0.5 md:py-1 rounded text-xs font-mono">48px</code>
                    <span className="text-muted-foreground text-xs">= 3rem (espaciado extra grande)</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-muted/50 rounded-lg p-3 md:p-4 border-l-4 border-accent">
              <p className="text-xs md:text-sm text-muted-foreground">
                <strong>💡 Consejo:</strong> Usa <code className="bg-accent/10 text-accent px-1 py-0.5 rounded text-xs font-mono">rem</code> para tipografía y espaciados, 
                <code className="bg-accent/10 text-accent px-1 py-0.5 rounded text-xs font-mono">px</code> para bordes, 
                <code className="bg-accent/10 text-accent px-1 py-0.5 rounded text-xs font-mono">%</code> para layouts, 
                y <code className="bg-accent/10 text-accent px-1 py-0.5 rounded text-xs font-mono">vw/vh</code> para elementos de pantalla completa.
              </p>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  )
}

