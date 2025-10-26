"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  BookOpen,
  ChevronDown,
  ChevronRight,
  FileText
} from "lucide-react"
import { heuristicsData, getTypeColor, getTypeLabel } from "@/lib/heuristics-data"
import { useAuth } from "@/lib/hooks/use-auth"
import { useExpandable } from "@/lib/hooks/use-expandable"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"

export default function HeuristicsPage() {
  const { handleLogout, handleBackToDashboard } = useAuth()
  const { toggle: toggleSection, isExpanded: isSectionExpanded } = useExpandable()
  const { toggle: toggleItem, isExpanded: isItemExpanded } = useExpandable()

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader
        title="Heurísticas y Buenas Prácticas"
        mobileTitle="Heurísticas"
        onBack={handleBackToDashboard}
        onLogout={handleLogout}
      />

      {/* Main Content */}
      <div className="container mx-auto px-3 md:px-4 py-6 md:py-8">
        <div className="max-w-4xl mx-auto">
          {/* Introduction */}
          <div className="mb-6 md:mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2 md:mb-3">
              Guía de Heurísticas y Buenas Prácticas
            </h2>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              Aprende a desarrollar productos de manera efectiva usando vibecoding e IA. Cada sección incluye principios, prácticas y ejemplos concretos.
            </p>
          </div>

          {/* Heuristics Sections */}
          <div>
            {heuristicsData.map((section) => {
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
                                {section.id === "ai-interaction" && "Principios para interactuar con IA"}
                                {section.id === "prompting" && "Técnicas para crear prompts efectivos"}
                                {section.id === "vibecoding-practices" && "Prácticas de vibecoding"}
                                {section.id === "development-workflow" && "Flujos de trabajo seguros"}
                                {section.id === "collaboration" && "Colaboración y aprendizaje"}
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
                                      <Badge className={`${getTypeColor(item.type)} border text-xs`}>
                                        {getTypeLabel(item.type)}
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
                                        <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                                          {item.description}
                                        </p>
                                      </div>
                                      {item.example && (
                                        <div className="bg-accent/5 p-3 md:p-4 rounded-lg border border-accent/20">
                                          <h4 className="text-xs md:text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                                            <FileText className="h-3 w-3 md:h-4 md:w-4 text-accent" />
                                            Ejemplo:
                                          </h4>
                                          <pre className="text-xs md:text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed">
                                            {item.example}
                                          </pre>
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

          {/* Additional Resources */}
          <Card className="mt-6 md:mt-8 border border-border/50 shadow-sm">
            <CardHeader className="bg-accent/5 border-b p-4 md:p-6">
              <CardTitle className="text-base md:text-xl font-semibold text-foreground flex items-center gap-2 md:gap-3">
                <BookOpen className="h-4 w-4 md:h-5 md:w-5 text-accent shrink-0" />
                Recursos Adicionales
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 md:p-6">
              <div className="grid md:grid-cols-2 gap-3 md:gap-4">
                <div className="p-3 md:p-4 bg-accent/5 rounded-lg border border-accent/20">
                  <h4 className="text-sm md:text-base font-semibold text-foreground mb-1 md:mb-2">Documentación de Herramientas</h4>
                  <p className="text-xs md:text-sm text-muted-foreground mb-2 md:mb-3">
                    Consulta siempre la documentación oficial de las herramientas que uses
                  </p>
                  <div className="flex flex-wrap gap-1.5 md:gap-2">
                    <Badge variant="outline" className="text-xs">React Docs</Badge>
                    <Badge variant="outline" className="text-xs">Tailwind CSS</Badge>
                    <Badge variant="outline" className="text-xs">Supabase</Badge>
                    <Badge variant="outline" className="text-xs">Vercel</Badge>
                  </div>
                </div>
                <div className="p-3 md:p-4 bg-accent/5 rounded-lg border border-accent/20">
                  <h4 className="text-sm md:text-base font-semibold text-foreground mb-1 md:mb-2">Comunidad y Soporte</h4>
                  <p className="text-xs md:text-sm text-muted-foreground mb-2 md:mb-3">
                    Únete a la comunidad para resolver dudas y compartir experiencias
                  </p>
                  <div className="flex flex-wrap gap-1.5 md:gap-2">
                    <Badge variant="outline" className="text-xs">WhatsApp</Badge>
                    <Badge variant="outline" className="text-xs">GitHub</Badge>
                    <Badge variant="outline" className="text-xs">Stack Overflow</Badge>
                    <Badge variant="outline" className="text-xs">Discord</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="mt-8 md:mt-12 text-center">
            <p className="text-muted-foreground text-xs md:text-sm px-2">
              💡 Estas heurísticas son guías, no reglas rígidas. Adapta las prácticas a tu contexto específico.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
