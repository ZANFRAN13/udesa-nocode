"use client"

import { useRouter } from "next/navigation"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code2, ArrowRight } from "lucide-react"

export function DevToolsSection() {
  const router = useRouter()

  const handleClick = () => {
    router.push('/dashboard/glossary/devtools')
  }

  return (
    <Card 
      className="mb-6 md:mb-8 border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-background overflow-hidden group hover:bg-primary/10 transition-all duration-200 cursor-pointer"
      onClick={handleClick}
    >
      <CardHeader className="p-4 md:p-6">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 md:gap-3 min-w-0 flex-1">
            <div className="p-1.5 md:p-2 bg-primary/10 rounded-lg shrink-0">
              <Code2 className="h-4 w-4 md:h-5 md:w-5 text-primary" />
            </div>
            <div className="text-left min-w-0">
              <CardTitle className="text-base md:text-xl">🔧 Guía Básica: Dev Tools del Navegador</CardTitle>
              <p className="text-xs md:text-sm text-muted-foreground mt-1 line-clamp-2">
                Herramientas esenciales para ver errores y entender qué pasa en tu app web
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 md:gap-2 shrink-0">
            <Badge variant="secondary" className="bg-primary/10 text-primary text-xs hidden sm:inline-flex">
              Esencial
            </Badge>
            <ArrowRight className="h-4 w-4 md:h-5 md:w-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </CardHeader>
    </Card>
  )
}
