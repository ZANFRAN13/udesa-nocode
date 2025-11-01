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
  Wrench,
} from "lucide-react"
import { noCodeToolsData, noCodeCategories } from "@/lib/nocode-tools-data"

type SortOrder = "asc" | "desc"

export default function NoCodeToolsPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Todos")
  const [showATPOnly, setShowATPOnly] = useState(false)
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
    let filtered = noCodeToolsData.filter(tool => {
      const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           tool.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === "Todos" || tool.category === selectedCategory
      const matchesATP = !showATPOnly || (tool.tags && tool.tags.includes("ATP"))
      return matchesSearch && matchesCategory && matchesATP
    })

    filtered.sort((a, b) => {
      if (sortOrder === "asc") {
        return a.name.localeCompare(b.name)
      } else {
        return b.name.localeCompare(a.name)
      }
    })

    return filtered
  }, [searchTerm, selectedCategory, showATPOnly, sortOrder])

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
              <div className="p-2 bg-accent/10 rounded-lg border border-accent/20">
                <Wrench className="h-5 w-5 text-accent" />
              </div>
              <h1 className="text-xl font-semibold text-foreground">
                Herramientas No-Code
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
              Explora las mejores herramientas No-Code para crear aplicaciones sin programar.
            </p>
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
                    placeholder="Buscar herramientas..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {/* Filters Row */}
                <div className="flex flex-wrap items-center gap-4">
                  {/* Categories */}
                  <div className="flex flex-wrap gap-2">
                    {noCodeCategories.map((category) => (
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

                  {/* ATP Filter + Sort Button */}
                  <div className="ml-auto flex items-center gap-2">
                    <Button
                      variant={showATPOnly ? "default" : "outline"}
                      size="sm"
                      onClick={() => setShowATPOnly(!showATPOnly)}
                      className="flex items-center gap-1"
                    >
                      <Badge variant="outline" className="text-xs bg-amber-50 text-amber-700 border-amber-200">
                        ⭐ ATP
                      </Badge>
                    </Button>
                    
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
              <p>No se encontraron herramientas</p>
            ) : (
              <p>
                Mostrando {filteredAndSortedTools.length} {filteredAndSortedTools.length === 1 ? "herramienta" : "herramientas"}
              </p>
            )}
          </div>

          {/* Tools Grid */}
          {filteredAndSortedTools.length === 0 ? (
            <Card className="border border-border/50">
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">
                  No se encontraron herramientas que coincidan con tu búsqueda.
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
                      <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-accent/10 rounded-lg border border-accent/20">
                        <img
                          src={`https://www.google.com/s2/favicons?domain=${tool.website}&sz=64`}
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
                            {tool.category}
                          </Badge>
                          {tool.tags && tool.tags.map((tag, index) => (
                            <Badge 
                              key={index} 
                              variant={tag === "ATP" ? "default" : "outline"}
                              className={`text-xs ${tag === "ATP" ? "bg-amber-500 hover:bg-amber-600 text-white border-amber-500" : ""}`}
                            >
                              {tag === "ATP" && "⭐ "}
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {tool.website && (
                        <a
                          href={tool.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 hover:bg-accent/10 rounded-lg transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink className="h-4 w-4 text-accent" />
                        </a>
                      )}
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    {/* Description */}
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {tool.description}
                    </p>

                    {/* Pricing */}
                    {tool.pricing && (
                      <div className="text-xs text-muted-foreground">
                        <span className="font-medium">Precio:</span> {tool.pricing}
                      </div>
                    )}

                    {/* Features */}
                    {tool.features && tool.features.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-xs font-medium text-foreground">Características:</p>
                        <ul className="space-y-1">
                          {tool.features.map((feature, index) => (
                            <li key={index} className="flex items-start gap-2 text-xs text-muted-foreground">
                              <div className="w-1 h-1 bg-accent rounded-full mt-1.5 flex-shrink-0" />
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

