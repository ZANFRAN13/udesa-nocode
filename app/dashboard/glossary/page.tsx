"use client"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GlossaryTerm } from "@/components/ui/glossary-term"
import { Badge } from "@/components/ui/badge"
import { 
  ArrowLeft, 
  Search, 
  Filter,
  BookOpen,
  SortAsc,
  SortDesc
} from "lucide-react"
import { uiTermsData, categories, UITerm } from "@/lib/ui-glossary-data"

type SortOrder = "asc" | "desc" | "category"

export default function UIGlossaryPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Todos")
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc")
  const [expandedTerm, setExpandedTerm] = useState<string | null>(null)

  const handleBackToDashboard = () => {
    router.push('/dashboard')
  }

  const toggleTerm = (termId: string) => {
    if (expandedTerm === termId) {
      setExpandedTerm(null) // Close if already open
    } else {
      setExpandedTerm(termId) // Open this term and close others
    }
  }

  const handleTermClick = (termId: string) => {
    // Always expand the clicked term (close others)
    setExpandedTerm(termId)
    
    // Scroll to the term
    setTimeout(() => {
      const element = document.getElementById(`term-${termId}`)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    }, 100)
  }

  const filteredAndSortedTerms = useMemo(() => {
    let filtered = uiTermsData.filter(term => {
      const matchesSearch = term.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           term.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === "Todos" || term.category === selectedCategory
      return matchesSearch && matchesCategory
    })

    // Sort terms
    filtered.sort((a, b) => {
      switch (sortOrder) {
        case "asc":
          return a.name.localeCompare(b.name)
        case "desc":
          return b.name.localeCompare(a.name)
        case "category":
          if (a.category === b.category) {
            return a.name.localeCompare(b.name)
          }
          return a.category.localeCompare(b.category)
        default:
          return 0
      }
    })

    return filtered
  }, [searchTerm, selectedCategory, sortOrder])

  const termsByCategory = useMemo(() => {
    if (sortOrder !== "category") return null
    
    const grouped = filteredAndSortedTerms.reduce((acc, term) => {
      if (!acc[term.category]) {
        acc[term.category] = []
      }
      acc[term.category].push(term)
      return acc
    }, {} as Record<string, UITerm[]>)

    return grouped
  }, [filteredAndSortedTerms, sortOrder])

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/50 bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                onClick={handleBackToDashboard}
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver al Dashboard
              </Button>
              <div className="h-6 w-px bg-border" />
              <div className="flex items-center gap-3">
                <div className="p-2 bg-accent/10 rounded-lg border border-accent/20">
                  <BookOpen className="h-5 w-5 text-accent" />
                </div>
                <h1 className="text-xl font-semibold text-foreground">
                  Glosario de Términos UI
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Introduction */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Glosario de Elementos de Interfaz de Usuario
            </h2>
            <p>Ser técnicamente específicos en lo que le pedimos a la IA puede aportar en gran medida en la precisión del resultado.</p>
            <br />
            <p className="text-muted-foreground text-lg leading-relaxed">
              Explora definiciones, ejemplos y mejores prácticas para los elementos más comunes de las interfaces de usuario. 
              Basado en la publicación de{" "}
              <a 
                href="https://www.nngroup.com/articles/ui-elements-glossary/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                Nielsen Norman Group
              </a>.
            </p>
          </div>

          {/* Example Section */}
          <Card className="mb-8 border border-accent/20 bg-accent/5">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-accent flex items-center gap-2">
                💡 Ejemplo Práctico: ¿Por qué es importante conocer los elementos UI?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Vague Instructions */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-destructive">❌ Instrucciones vagas (resultado impreciso):</h4>
                  <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 space-y-2">
                    <p className="text-sm text-destructive/80 font-medium">"Créame un cosito para el otro coso de arriba"</p>
                    <p className="text-sm text-destructive/80 font-medium">"Que cuando paso por arriba me diga ir a carrito"</p>
                    <p className="text-sm text-destructive/80 font-medium">"Ponle algo que se vea bonito"</p>
                    <p className="text-xs text-destructive/60 italic">→ La IA no sabe qué elemento crear ni dónde</p>
                  </div>
                </div>

                {/* Specific Instructions */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-green-600">✅ Instrucciones específicas (resultado preciso):</h4>
                  <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4 space-y-2">
                    <p className="text-sm text-green-600/80 font-medium">
                      "Agrega un <em className="italic font-semibold text-green-700">tooltip</em> para el <em className="italic font-semibold text-green-700">icono</em> del carrito en el <em className="italic font-semibold text-green-700">menú de navegación</em>"
                    </p>
                    <p className="text-sm text-green-600/80 font-medium">
                      "Que al hacer <em className="italic font-semibold text-green-700">hover</em> me diga 'Ir a carrito'"
                    </p>
                    <p className="text-sm text-green-600/80 font-medium">
                      "Con estilo <em className="italic font-semibold text-green-700">minimalista</em> y <em className="italic font-semibold text-green-700">animación suave</em>"
                    </p>
                    <p className="text-xs text-green-600/60 italic">→ La IA sabe exactamente qué crear y cómo</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-muted/50 rounded-lg p-4 border-l-4 border-accent">
                <p className="text-sm text-muted-foreground">
                  <strong>💡 Consejo:</strong> Conocer los nombres correctos de los elementos UI (<em className="italic">tooltip</em>, <em className="italic">dropdown</em>, <em className="italic">modal</em>, etc.) 
                  te permite comunicarte mejor con la IA y obtener interfaces más profesionales. Este glosario te enseñará 
                  el "vocabulario" que entiende la IA para crear experiencias de usuario excepcionales.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Search and Filters */}
          <Card className="mb-8 border border-border/50 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Filter className="h-5 w-5 text-accent" />
                Buscar y Filtrar
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Buscar términos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
                />
              </div>

              {/* Filters Row */}
              <div className="flex flex-wrap gap-4 items-center">
                {/* Category Filter */}
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-foreground">Categoría:</span>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
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
                </div>

                {/* Sort Options */}
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-foreground">Ordenar:</span>
                  <div className="flex gap-1">
                    <Button
                      variant={sortOrder === "asc" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSortOrder("asc")}
                      className="text-xs"
                    >
                      <SortAsc className="h-3 w-3 mr-1" />
                      A-Z
                    </Button>
                    <Button
                      variant={sortOrder === "desc" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSortOrder("desc")}
                      className="text-xs"
                    >
                      <SortDesc className="h-3 w-3 mr-1" />
                      Z-A
                    </Button>
                    <Button
                      variant={sortOrder === "category" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSortOrder("category")}
                      className="text-xs"
                    >
                      Categoría
                    </Button>
                  </div>
                </div>
              </div>

              {/* Results Count */}
              <div className="text-sm text-muted-foreground">
                Mostrando {filteredAndSortedTerms.length} de {uiTermsData.length} términos
              </div>
            </CardContent>
          </Card>

          {/* Terms List */}
          <div className="space-y-4">
            {sortOrder === "category" && termsByCategory ? (
              // Grouped by category
              Object.entries(termsByCategory).map(([category, terms]) => (
                <div key={category}>
                  <div className="flex items-center gap-2 mb-4">
                    <h3 className="text-xl font-semibold text-foreground">{category}</h3>
                    <Badge variant="secondary">{terms.length}</Badge>
                  </div>
                  <div className="space-y-3 mb-8">
                    {terms.map((term) => (
                      <div key={term.id} id={`term-${term.id}`}>
                        <GlossaryTerm
                          term={term}
                          isExpanded={expandedTerm === term.id}
                          onToggle={() => toggleTerm(term.id)}
                          onTermClick={handleTermClick}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              // Simple list
              filteredAndSortedTerms.map((term) => (
                <div key={term.id} id={`term-${term.id}`}>
                  <GlossaryTerm
                    term={term}
                    isExpanded={expandedTerm === term.id}
                    onToggle={() => toggleTerm(term.id)}
                    onTermClick={handleTermClick}
                  />
                </div>
              ))
            )}

            {filteredAndSortedTerms.length === 0 && (
              <Card className="text-center py-12">
                <CardContent>
                  <div className="text-muted-foreground">
                    <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p className="text-lg mb-2">No se encontraron términos</p>
                    <p className="text-sm">
                      Intenta ajustar tu búsqueda o seleccionar una categoría diferente.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Footer */}
          <div className="mt-12 text-center">
            <p className="text-muted-foreground text-sm">
              Contenido basado en el{" "}
              <a 
                href="https://www.nngroup.com/articles/ui-elements-glossary/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                Glosario de Elementos UI de Nielsen Norman Group
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
