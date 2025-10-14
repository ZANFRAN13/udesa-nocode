"use client"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GlossaryTerm } from "@/components/ui/glossary-term"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { 
  ArrowLeft, 
  Search, 
  Filter,
  BookOpen,
  SortAsc,
  SortDesc,
  ChevronUp,
  ChevronDown
} from "lucide-react"
import { cssTermsData, cssCategories } from "@/lib/css-glossary-data"

type SortOrder = "asc" | "desc" | "category"

export default function CSSGlossaryPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Todos")
  const [showBasicsOnly, setShowBasicsOnly] = useState(false)
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc")
  const [expandedTerm, setExpandedTerm] = useState<string | null>(null)
  const [isUnitsOpen, setIsUnitsOpen] = useState(false)
  const [isExampleOpen, setIsExampleOpen] = useState(false)

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
    let filtered = cssTermsData.filter(term => {
      const matchesSearch = term.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           term.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === "Todos" || term.category === selectedCategory
      const matchesBasics = !showBasicsOnly || (term.tags && term.tags.includes("basics"))
      return matchesSearch && matchesCategory && matchesBasics
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
  }, [searchTerm, selectedCategory, showBasicsOnly, sortOrder])

  const termsByCategory = useMemo(() => {
    if (sortOrder !== "category") return null
    
    const grouped: { [key: string]: typeof cssTermsData } = {}
    filteredAndSortedTerms.forEach(term => {
      if (!grouped[term.category]) {
        grouped[term.category] = []
      }
      grouped[term.category].push(term)
    })
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
                  Glosario CSS
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
              Glosario de Conceptos CSS
            </h2>
            <p>Ser técnicamente específicos en lo que le pedimos a la IA puede aportar en gran medida en la precisión del resultado.</p>
            <br />
            <p className="text-muted-foreground text-lg leading-relaxed">
              CSS (Cascading Style Sheets) es el lenguaje que le da vida visual a tus proyectos web. 
              Con CSS puedes cambiar colores, fuentes, tamaños, posiciones y crear diseños atractivos 
              sin necesidad de programar. Es tu herramienta principal para hacer que tus páginas se 
              vean profesionales y modernas mientras vibecodeas tus ideas digitales.
            </p>
          </div>

          {/* Example Section */}
          <Collapsible open={isExampleOpen} onOpenChange={setIsExampleOpen}>
            <Card className="mb-8 border border-accent/20 bg-accent/5">
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-accent/10 transition-colors">
                  <CardTitle className="text-lg font-semibold text-accent flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      💡 Ejemplo Práctico: ¿Por qué es importante conocer CSS?
                    </div>
                    {isExampleOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                  </CardTitle>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Vague Instructions */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-destructive">❌ Instrucciones vagas (resultado impreciso):</h4>
                      <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 space-y-2">
                        <p className="text-sm text-destructive/80 font-medium">"Separa un poquito las cards"</p>
                        <p className="text-sm text-destructive/80 font-medium">"Las separaste demasiado, júntalas un poco"</p>
                        <p className="text-sm text-destructive/80 font-medium">"Ahora un poquito más separadas pero apenas"</p>
                        <p className="text-xs text-destructive/60 italic">→ La IA no sabe exactamente qué hacer</p>
                      </div>
                    </div>

                    {/* Specific Instructions */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-green-600">✅ Instrucciones específicas (resultado preciso):</h4>
                      <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4 space-y-2">
                        <p className="text-sm text-green-600/80 font-medium">"Agrega margin: 1rem a las cards del carousel"</p>
                        <p className="text-xs text-green-600/60 italic">→ La IA sabe exactamente qué hacer</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-muted/50 rounded-lg p-4 border-l-4 border-accent">
                    <p className="text-sm text-muted-foreground">
                      <strong>💡 Consejo:</strong> Conocer los términos CSS básicos te permite comunicarte mejor con la IA 
                      y obtener resultados más precisos en tus proyectos de vibecoding. Este glosario te ayudará a 
                      hablar el "idioma" que entiende la IA para crear diseños profesionales.
                    </p>
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>

          {/* Units Reference Section */}
          <Collapsible open={isUnitsOpen} onOpenChange={setIsUnitsOpen}>
            <Card className="mb-8 border border-accent/20 bg-accent/5">
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-accent/10 transition-colors">
                  <CardTitle className="text-lg font-semibold text-accent flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      📏 Referencia de Unidades de Medida
                    </div>
                    {isUnitsOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                  </CardTitle>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Rem/Em Equivalences */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-2 h-2 bg-accent rounded-full"></div>
                        <h4 className="font-semibold text-accent text-base">Unidades Relativas</h4>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 p-2 bg-background/50 rounded-lg border border-border/30">
                          <code className="bg-accent/10 text-accent px-2 py-1 rounded text-xs font-mono">1rem</code>
                          <span className="text-muted-foreground text-xs">= 16px</span>
                        </div>
                        <div className="flex items-center gap-2 p-2 bg-background/50 rounded-lg border border-border/30">
                          <code className="bg-accent/10 text-accent px-2 py-1 rounded text-xs font-mono">0.5rem</code>
                          <span className="text-muted-foreground text-xs">= 8px</span>
                        </div>
                        <div className="flex items-center gap-2 p-2 bg-background/50 rounded-lg border border-border/30">
                          <code className="bg-accent/10 text-accent px-2 py-1 rounded text-xs font-mono">1.5rem</code>
                          <span className="text-muted-foreground text-xs">= 24px</span>
                        </div>
                        <div className="flex items-center gap-2 p-2 bg-background/50 rounded-lg border border-border/30">
                          <code className="bg-accent/10 text-accent px-2 py-1 rounded text-xs font-mono">2rem</code>
                          <span className="text-muted-foreground text-xs">= 32px</span>
                        </div>
                        <div className="flex items-center gap-2 p-2 bg-background/50 rounded-lg border border-border/30">
                          <code className="bg-accent/10 text-accent px-2 py-1 rounded text-xs font-mono">1em</code>
                          <span className="text-muted-foreground text-xs">= tamaño del padre</span>
                        </div>
                      </div>
                    </div>

                    {/* Viewport Units */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-2 h-2 bg-accent rounded-full"></div>
                        <h4 className="font-semibold text-accent text-base">Unidades de Viewport</h4>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 p-2 bg-background/50 rounded-lg border border-border/30">
                          <code className="bg-accent/10 text-accent px-2 py-1 rounded text-xs font-mono">100vw</code>
                          <span className="text-muted-foreground text-xs">= ancho completo de pantalla</span>
                        </div>
                        <div className="flex items-center gap-2 p-2 bg-background/50 rounded-lg border border-border/30">
                          <code className="bg-accent/10 text-accent px-2 py-1 rounded text-xs font-mono">100vh</code>
                          <span className="text-muted-foreground text-xs">= altura completa de pantalla</span>
                        </div>
                        <div className="flex items-center gap-2 p-2 bg-background/50 rounded-lg border border-border/30">
                          <code className="bg-accent/10 text-accent px-2 py-1 rounded text-xs font-mono">50vw</code>
                          <span className="text-muted-foreground text-xs">= 50% del ancho de pantalla</span>
                        </div>
                        <div className="flex items-center gap-2 p-2 bg-background/50 rounded-lg border border-border/30">
                          <code className="bg-accent/10 text-accent px-2 py-1 rounded text-xs font-mono">50vh</code>
                          <span className="text-muted-foreground text-xs">= 50% de la altura de pantalla</span>
                        </div>
                        <div className="flex items-center gap-2 p-2 bg-background/50 rounded-lg border border-border/30">
                          <code className="bg-accent/10 text-accent px-2 py-1 rounded text-xs font-mono">1vmin</code>
                          <span className="text-muted-foreground text-xs">= 1% del lado más pequeño</span>
                        </div>
                      </div>
                    </div>

                    {/* Common Sizes */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-2 h-2 bg-accent rounded-full"></div>
                        <h4 className="font-semibold text-accent text-base">Tamaños Comunes</h4>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 p-2 bg-background/50 rounded-lg border border-border/30">
                          <code className="bg-accent/10 text-accent px-2 py-1 rounded text-xs font-mono">8px</code>
                          <span className="text-muted-foreground text-xs">= 0.5rem (espaciado pequeño)</span>
                        </div>
                        <div className="flex items-center gap-2 p-2 bg-background/50 rounded-lg border border-border/30">
                          <code className="bg-accent/10 text-accent px-2 py-1 rounded text-xs font-mono">16px</code>
                          <span className="text-muted-foreground text-xs">= 1rem (espaciado base)</span>
                        </div>
                        <div className="flex items-center gap-2 p-2 bg-background/50 rounded-lg border border-border/30">
                          <code className="bg-accent/10 text-accent px-2 py-1 rounded text-xs font-mono">24px</code>
                          <span className="text-muted-foreground text-xs">= 1.5rem (espaciado medio)</span>
                        </div>
                        <div className="flex items-center gap-2 p-2 bg-background/50 rounded-lg border border-border/30">
                          <code className="bg-accent/10 text-accent px-2 py-1 rounded text-xs font-mono">32px</code>
                          <span className="text-muted-foreground text-xs">= 2rem (espaciado grande)</span>
                        </div>
                        <div className="flex items-center gap-2 p-2 bg-background/50 rounded-lg border border-border/30">
                          <code className="bg-accent/10 text-accent px-2 py-1 rounded text-xs font-mono">48px</code>
                          <span className="text-muted-foreground text-xs">= 3rem (espaciado extra grande)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-muted/50 rounded-lg p-4 border-l-4 border-accent">
                    <p className="text-sm text-muted-foreground">
                      <strong>💡 Consejo:</strong> Usa <code className="bg-accent/10 text-accent px-1 py-0.5 rounded text-xs font-mono">rem</code> para tipografía y espaciados, 
                      <code className="bg-accent/10 text-accent px-1 py-0.5 rounded text-xs font-mono">px</code> para bordes, 
                      <code className="bg-accent/10 text-accent px-1 py-0.5 rounded text-xs font-mono">%</code> para layouts, 
                      y <code className="bg-accent/10 text-accent px-1 py-0.5 rounded text-xs font-mono">vw/vh</code> para elementos de pantalla completa.
                    </p>
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>


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
                    {cssCategories.map((category) => (
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

                {/* Basics Filter */}
                <div className="flex items-center gap-2">
                  <Button
                    variant={showBasicsOnly ? "default" : "outline"}
                    size="sm"
                    onClick={() => setShowBasicsOnly(!showBasicsOnly)}
                    className="flex items-center gap-1"
                  >
                    <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                      Basics
                    </Badge>
                  </Button>
                </div>
              </div>

              {/* Results Count */}
              <div className="text-sm text-muted-foreground">
                Mostrando {filteredAndSortedTerms.length} de {cssTermsData.length} términos
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
              Contenido educativo para el aprendizaje de CSS en proyectos de vibecoding
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
