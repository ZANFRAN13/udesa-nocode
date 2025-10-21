"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, ChevronRight, Lightbulb } from "lucide-react"

interface ExampleSectionProps {
  title: string
  vagueTitleBad: string
  vagueTitleGood: string
  vagueExamples: string[]
  specificExamples: string[]
  tipText: string
  badgeText?: string
  subtitle?: string
  bottomBadText?: string
  bottomGoodText?: string
}

export function ExampleSection({
  title,
  vagueTitleBad,
  vagueTitleGood,
  vagueExamples,
  specificExamples,
  tipText,
  badgeText = "Mejores Prácticas",
  subtitle = "Aprende a comunicarte efectivamente con la IA",
  bottomBadText = "La IA no sabe exactamente qué hacer",
  bottomGoodText = "La IA sabe exactamente qué hacer",
}: ExampleSectionProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Card className="mb-6 md:mb-8 border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-background overflow-hidden group hover:bg-primary/10 transition-all duration-200">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="w-full">
          <CardHeader className="cursor-pointer p-4 md:p-6">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 md:gap-3 min-w-0 flex-1">
                <div className="p-1.5 md:p-2 bg-primary/10 rounded-lg shrink-0">
                  <Lightbulb className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                </div>
                <div className="text-left min-w-0">
                  <CardTitle className="text-base md:text-xl">💡 {title}</CardTitle>
                  <p className="text-xs md:text-sm text-muted-foreground mt-1 line-clamp-2">
                    {subtitle}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 md:gap-2 shrink-0">
                <Badge variant="secondary" className="bg-primary/10 text-primary text-xs hidden sm:inline-flex">
                  {badgeText}
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {/* Vague Instructions */}
              <div className="space-y-2 md:space-y-3">
                <h4 className="font-semibold text-destructive text-sm md:text-base">{vagueTitleBad}</h4>
                <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3 md:p-4 space-y-2">
                  {vagueExamples.map((example, index) => (
                    <p key={index} className="text-xs md:text-sm text-destructive/80 font-medium" dangerouslySetInnerHTML={{ __html: example }} />
                  ))}
                  <p className="text-xs text-destructive/60 italic">→ {bottomBadText}</p>
                </div>
              </div>

              {/* Specific Instructions */}
              <div className="space-y-2 md:space-y-3">
                <h4 className="font-semibold text-green-600 text-sm md:text-base">{vagueTitleGood}</h4>
                <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-3 md:p-4 space-y-2">
                  {specificExamples.map((example, index) => (
                    <p key={index} className="text-xs md:text-sm text-green-600/80 font-medium" dangerouslySetInnerHTML={{ __html: example }} />
                  ))}
                  <p className="text-xs text-green-600/60 italic">→ {bottomGoodText}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-muted/50 rounded-lg p-3 md:p-4 border-l-4 border-accent">
              <p className="text-xs md:text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: tipText }} />
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  )
}

