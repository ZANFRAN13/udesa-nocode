"use client"

import { useState, useMemo, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Search,
  SortAsc,
  SortDesc,
  ExternalLink,
  Sparkles,
  ShieldCheck,
  BadgeCheck,
} from "lucide-react"
import { templatesData, templateResourceTypes } from "@/lib/templates-data"

type SortOrder = "asc" | "desc"

export default function TemplatesPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Todos")
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc")

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  const handleBackToDashboard = () => {
    router.push('/dashboard')
  }

  const filteredAndSortedTools = useMemo(() => {
    let filtered = templatesData.filter(item => {
      const term = searchTerm.toLowerCase()
      const matchesSearch = item.name.toLowerCase().includes(term) ||
                           item.description.toLowerCase().includes(term) ||
                           item.source.toLowerCase().includes(term)
      const matchesCategory = selectedCategory === "Todos" || item.type === selectedCategory
      return matchesSearch && matchesCategory
    })

    filtered.sort((a, b) => {
      if (sortOrder === "asc") {
        return a.name.localeCompare(b.name)
      } else {
        return b.name.localeCompare(a.name)
      }
    })

    return filtered
  }, [searchTerm, selectedCategory, sortOrder])

  const toggleSortOrder = () => {
    setSortOrder(prev => prev === "asc" ? "desc" : "asc")
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
      {/* Header */}
      <div className="border-b border-border/50 bg-card/30 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleBackToDashboard}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver al Dashboard
            </Button>
            <div className="h-6 w-px bg-border" />
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-500/10 rounded-lg border border-purple-500/20">
                <Sparkles className="h-5 w-5 text-purple-600" />
              </div>
              <h1 className="text-xl font-semibold text-foreground">
                Templates, repos y skills
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Intro */}
          <div className="mb-8">
            <p className="text-muted-foreground text-lg">
              Skills, repositorios y templates populares y probados para arrancar más rápido y darle superpoderes a tu agente de IA. Priorizamos fuentes oficiales (Anthropic, Vercel, Supabase, GitHub) y proyectos de la comunidad muy usados.
            </p>
            <div className="mt-4 flex items-start gap-3 rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-foreground">
              <ShieldCheck className="h-5 w-5 flex-shrink-0 text-amber-600" />
              <p>
                <span className="font-medium">Antes de instalar una skill, leela.</span> Las skills son instrucciones (y a veces scripts) que tu agente va a seguir con tus permisos. Instalá solo de fuentes confiables y revisá qué hace, igual que con cualquier código que bajás de internet.
              </p>
            </div>
          </div>

          {/* Search and Filters */}
          <Card className="mb-8 border border-border/50 shadow-sm">
            <CardContent className="pt-6">
              <div className="space-y-4">
                {/* Search Bar */}
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Buscar skills, repos o templates..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {/* Filters Row */}
                <div className="flex flex-wrap items-center gap-4">
                  {/* Categories */}
                  <div className="flex flex-wrap gap-2">
                    {templateResourceTypes.map((category) => (
                      <Button
                        key={category}
                        variant={selectedCategory === category ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedCategory(category)}
                        className="text-xs"
                      >
                        {category}
                      </Button>
                    ))}
                  </div>

                  {/* Sort Button */}
                  <div className="ml-auto flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={toggleSortOrder}
                      className="flex items-center gap-2"
                    >
                      {sortOrder === "asc" ? (
                        <SortAsc className="h-4 w-4" />
                      ) : (
                        <SortDesc className="h-4 w-4" />
                      )}
                      {sortOrder === "asc" ? "A-Z" : "Z-A"}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Results Count */}
          <div className="mb-4 text-sm text-muted-foreground">
            {filteredAndSortedTools.length === 0 ? (
              <p>No se encontraron resultados</p>
            ) : (
              <p>
                Mostrando {filteredAndSortedTools.length} {filteredAndSortedTools.length === 1 ? "recurso" : "recursos"}
              </p>
            )}
          </div>

          {/* Tools Grid */}
          {filteredAndSortedTools.length === 0 ? (
            <Card className="border border-border/50">
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">
                  No se encontraron recursos que coincidan con tu búsqueda.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredAndSortedTools.map((tool) => (
                <Card 
                  key={tool.id}
                  className="overflow-hidden border border-border/50 shadow-sm hover:shadow-md transition-shadow"
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-start gap-3">
                      {/* Logo/Favicon */}
                      <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-purple-500/10 rounded-lg border border-purple-500/20">
                        <img
                          src={`https://www.google.com/s2/favicons?domain=${tool.url}&sz=64`}
                          alt={`${tool.name} logo`}
                          className="w-6 h-6 rounded"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                          }}
                        />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-lg font-semibold text-foreground mb-2">
                          {tool.name}
                        </CardTitle>
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge variant="secondary" className="text-xs">
                            {tool.type}
                          </Badge>
                          {tool.official && (
                            <Badge variant="secondary" className="text-xs flex items-center gap-1">
                              <BadgeCheck className="h-3 w-3" />
                              Oficial
                            </Badge>
                          )}
                        </div>
                      </div>

                      {tool.url && (
                        <a
                          href={tool.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 hover:bg-purple-500/10 rounded-lg transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink className="h-4 w-4 text-purple-600" />
                        </a>
                      )}
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    {/* Description */}
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {tool.description}
                    </p>

                    {/* Source */}
                    <div className="text-xs text-muted-foreground">
                      <span className="font-medium">Mantenido por:</span> {tool.source}
                    </div>

                    {/* How to use */}
                    {tool.howToUse && (
                      <div className="text-xs text-muted-foreground">
                        <span className="font-medium">Cómo usarlo:</span>{" "}
                        <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[11px] text-foreground break-all">{tool.howToUse}</code>
                      </div>
                    )}

                    {/* Features */}
                    {tool.highlights && tool.highlights.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-xs font-medium text-foreground">Lo destacado:</p>
                        <ul className="space-y-1">
                          {tool.highlights.map((feature, index) => (
                            <li key={index} className="flex items-start gap-2 text-xs text-muted-foreground">
                              <div className="w-1 h-1 bg-purple-600 rounded-full mt-1.5 flex-shrink-0" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

