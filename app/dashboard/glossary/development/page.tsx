"use client"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DevGlossaryTerm } from "@/components/ui/dev-glossary-term"
import { Badge } from "@/components/ui/badge"
import { 
  ArrowLeft, 
  Search, 
  Filter,
  Code,
  SortAsc,
  SortDesc,
  Terminal,
  ChevronDown,
  ChevronRight,
  Info
} from "lucide-react"
import { devTermsData, devCategories } from "@/lib/dev-glossary-data"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

type SortOrder = "asc" | "desc" | "category"

export default function DevelopmentGlossaryPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Todos")
  const [showBasicsOnly, setShowBasicsOnly] = useState(false)
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc")
  const [expandedTerm, setExpandedTerm] = useState<string | null>(null)
  const [commandsExpanded, setCommandsExpanded] = useState(false)

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
    let filtered = devTermsData.filter(term => {
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
    
    const grouped: { [key: string]: typeof devTermsData } = {}
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
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleBackToDashboard}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver al Dashboard
            </Button>
          </div>
          
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Code className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Glosario de Desarrollo</h1>
              <p className="text-muted-foreground">
                Definiciones y conceptos fundamentales del desarrollo de software
              </p>
            </div>
          </div>
        </div>

        {/* Terminal Commands Section */}
        <Card className="mb-8 border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-background">
          <Collapsible open={commandsExpanded} onOpenChange={setCommandsExpanded}>
            <CollapsibleTrigger className="w-full">
              <CardHeader className="cursor-pointer hover:bg-accent/50 transition-colors rounded-t-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Terminal className="h-5 w-5 text-primary" />
                    </div>
                    <div className="text-left">
                      <CardTitle className="text-xl">🚀 Guía Rápida: Comandos de Terminal</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        Los comandos esenciales para trabajar con IA y crear aplicaciones
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="bg-primary/10 text-primary">
                      Para VibeCoding
                    </Badge>
                    {commandsExpanded ? (
                      <ChevronDown className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>
                </div>
              </CardHeader>
            </CollapsibleTrigger>
            
            <CollapsibleContent>
              <CardContent className="space-y-6 pt-6">
                {/* Disclaimer */}
                <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                    <div className="text-sm">
                      <p className="text-blue-900 dark:text-blue-100">
                        <strong>Importante:</strong> Estos comandos son necesarios cuando usas herramientas como <strong>Cursor</strong> o editores de código similares. 
                        Si trabajas con plataformas como <strong>v0</strong> o <strong>Lovable</strong> (basadas en web), no necesitarás usar la terminal ya que estas herramientas se encargan de todo automáticamente.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Introduction */}
                <div className="bg-muted/30 rounded-lg p-4 border border-border/50">
                  <h3 className="font-semibold text-lg mb-2">¿Qué es la Terminal?</h3>
                  <p className="text-muted-foreground mb-3">
                    La terminal (o consola) es una ventana donde escribes comandos de texto para controlar tu computadora. 
                    Aunque parece intimidante al principio, solo necesitas conocer unos pocos comandos básicos para trabajar con IA y crear tus apps.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    💡 <strong>Tip:</strong> Copia y pega los comandos directamente. Presiona <kbd className="px-2 py-1 bg-background border border-border rounded text-xs">Enter</kbd> para ejecutarlos.
                  </p>
                </div>

                {/* Commands Grid */}
                <div className="grid gap-4 md:grid-cols-2">
                  {/* Navegación */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-base flex items-center gap-2">
                      📁 Navegación
                    </h4>
                    
                    <div className="bg-card border border-border rounded-lg p-3 space-y-2">
                      <div className="flex items-start gap-2">
                        <code className="text-sm bg-primary/10 px-2 py-1 rounded text-primary font-mono flex-shrink-0">ls</code>
                        <p className="text-sm text-muted-foreground">Ver qué archivos tienes en la carpeta actual</p>
                      </div>
                    </div>

                    <div className="bg-card border border-border rounded-lg p-3 space-y-2">
                      <div className="flex items-start gap-2">
                        <code className="text-sm bg-primary/10 px-2 py-1 rounded text-primary font-mono flex-shrink-0">cd carpeta</code>
                        <p className="text-sm text-muted-foreground">Entrar a una carpeta. Usa <code className="text-xs bg-muted px-1 rounded">cd ..</code> para volver atrás</p>
                      </div>
                    </div>
                  </div>

                  {/* NPM */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-base flex items-center gap-2">
                      📦 Instalar y Ejecutar
                    </h4>
                    
                    <div className="bg-card border border-border rounded-lg p-3 space-y-2">
                      <div className="flex items-start gap-2">
                        <code className="text-sm bg-primary/10 px-2 py-1 rounded text-primary font-mono flex-shrink-0">npm i</code>
                        <p className="text-sm text-muted-foreground">Instalar todo lo que el proyecto necesita (puede tardar unos minutos)</p>
                      </div>
                    </div>

                    <div className="bg-card border border-border rounded-lg p-3 space-y-2">
                      <div className="flex items-start gap-2">
                        <code className="text-sm bg-primary/10 px-2 py-1 rounded text-primary font-mono flex-shrink-0">npm run dev</code>
                        <p className="text-sm text-muted-foreground">Iniciar tu app para verla en el navegador (localhost:3000)</p>
                      </div>
                    </div>
                  </div>

                  {/* Git - Status & Add */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-base flex items-center gap-2">
                      🔍 Revisar Cambios
                    </h4>
                    
                    <div className="bg-card border border-border rounded-lg p-3 space-y-2">
                      <div className="flex items-start gap-2">
                        <code className="text-sm bg-primary/10 px-2 py-1 rounded text-primary font-mono flex-shrink-0">git status</code>
                        <p className="text-sm text-muted-foreground">Ver qué archivos modificaste</p>
                      </div>
                    </div>

                    <div className="bg-card border border-border rounded-lg p-3 space-y-2">
                      <div className="flex items-start gap-2">
                        <code className="text-sm bg-primary/10 px-2 py-1 rounded text-primary font-mono flex-shrink-0">git add .</code>
                        <p className="text-sm text-muted-foreground">Preparar TODOS tus cambios para guardarlos</p>
                      </div>
                    </div>
                  </div>

                  {/* Git - Commit & Push */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-base flex items-center gap-2">
                      💾 Guardar y Compartir
                    </h4>
                    
                    <div className="bg-card border border-border rounded-lg p-3 space-y-2">
                      <div className="flex flex-col gap-1">
                        <code className="text-sm bg-primary/10 px-2 py-1 rounded text-primary font-mono w-fit">git commit -m "mensaje"</code>
                        <p className="text-sm text-muted-foreground">Guardar cambios con una descripción</p>
                        <p className="text-xs text-muted-foreground/70">Ej: "Agregué login" o "Corregí error del formulario"</p>
                      </div>
                    </div>

                    <div className="bg-card border border-border rounded-lg p-3 space-y-2">
                      <div className="flex items-start gap-2">
                        <code className="text-sm bg-primary/10 px-2 py-1 rounded text-primary font-mono flex-shrink-0">git push</code>
                        <p className="text-sm text-muted-foreground">Subir tus cambios a GitHub (la nube)</p>
                      </div>
                    </div>

                    <div className="bg-card border border-border rounded-lg p-3 space-y-2">
                      <div className="flex items-start gap-2">
                        <code className="text-sm bg-primary/10 px-2 py-1 rounded text-primary font-mono flex-shrink-0">git pull</code>
                        <p className="text-sm text-muted-foreground">Descargar los últimos cambios del equipo</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Workflow Example */}
                <div className="bg-primary/5 border-2 border-primary/20 rounded-lg p-4">
                  <h4 className="font-semibold text-base mb-3 flex items-center gap-2">
                    🔄 Flujo de Trabajo Típico
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-3">
                      <span className="text-primary font-bold flex-shrink-0">1.</span>
                      <p><code className="bg-background px-2 py-0.5 rounded text-xs mr-1">cd mi-proyecto</code> - Entrar a tu proyecto</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-primary font-bold flex-shrink-0">2.</span>
                      <p><code className="bg-background px-2 py-0.5 rounded text-xs mr-1">git pull</code> - Traer últimos cambios</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-primary font-bold flex-shrink-0">3.</span>
                      <p><code className="bg-background px-2 py-0.5 rounded text-xs mr-1">npm run dev</code> - Iniciar tu app</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-primary font-bold flex-shrink-0">4.</span>
                      <p className="text-muted-foreground">Trabajar con la IA y hacer cambios... 🤖</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-primary font-bold flex-shrink-0">5.</span>
                      <p><code className="bg-background px-2 py-0.5 rounded text-xs mr-1">git add .</code> - Preparar cambios</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-primary font-bold flex-shrink-0">6.</span>
                      <p><code className="bg-background px-2 py-0.5 rounded text-xs mr-1">git commit -m "Descripción"</code> - Guardar</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-primary font-bold flex-shrink-0">7.</span>
                      <p><code className="bg-background px-2 py-0.5 rounded text-xs mr-1">git push</code> - Subir a GitHub ✨</p>
                    </div>
                  </div>
                </div>

                {/* Tips */}
                <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-900 rounded-lg p-4">
                  <h4 className="font-semibold text-base mb-2 flex items-center gap-2">
                    💡 Consejos
                  </h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Si un comando no funciona, verifica que estés en la carpeta correcta del proyecto</li>
                    <li>• Usa <kbd className="px-1.5 py-0.5 bg-background border border-border rounded text-xs">Tab</kbd> para autocompletar nombres de carpetas y archivos</li>
                    <li>• Presiona <kbd className="px-1.5 py-0.5 bg-background border border-border rounded text-xs">Ctrl + C</kbd> para detener un comando que está corriendo</li>
                    <li>• Puedes copiar errores de la terminal y pegarlos en el chat de la IA para que te ayude</li>
                  </ul>
                </div>
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Buscar y Filtrar
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Buscar términos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4">
              {/* Category Filter */}
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-1 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  {devCategories.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
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

              {/* Sort Order */}
              <div className="flex items-center gap-2">
                <Button
                  variant={sortOrder === "asc" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSortOrder("asc")}
                  className="flex items-center gap-1"
                >
                  <SortAsc className="h-4 w-4" />
                  A-Z
                </Button>
                <Button
                  variant={sortOrder === "desc" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSortOrder("desc")}
                  className="flex items-center gap-1"
                >
                  <SortDesc className="h-4 w-4" />
                  Z-A
                </Button>
                <Button
                  variant={sortOrder === "category" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSortOrder("category")}
                  className="flex items-center gap-1"
                >
                  <Filter className="h-4 w-4" />
                  Categoría
                </Button>
              </div>
            </div>

            {/* Results Count */}
            <div className="text-sm text-muted-foreground">
              {filteredAndSortedTerms.length} término{filteredAndSortedTerms.length !== 1 ? 's' : ''} encontrado{filteredAndSortedTerms.length !== 1 ? 's' : ''}
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
                <DevGlossaryTerm
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
                  <h3 className="text-lg font-semibold mb-2">No se encontraron términos</h3>
                  <p>Intenta ajustar tu búsqueda o filtros</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
