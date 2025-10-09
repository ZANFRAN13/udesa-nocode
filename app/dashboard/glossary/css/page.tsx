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
import { cssTermsData, cssCategories } from "@/lib/css-glossary-data"

type SortOrder = "asc" | "desc" | "category"

export default function CSSGlossaryPage() {
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
    let filtered = cssTermsData.filter(term => {
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
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Glosario CSS</h1>
              <p className="text-muted-foreground">
                Definiciones y ejemplos de conceptos CSS fundamentales
              </p>
            </div>
          </div>
        </div>

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
                  {cssCategories.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
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
