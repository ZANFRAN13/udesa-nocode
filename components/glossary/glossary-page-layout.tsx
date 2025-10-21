"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GlossaryTerm } from "@/components/ui/glossary-term"
import {
  ArrowLeft,
  Search,
  Filter,
  SortAsc,
  SortDesc,
  LucideIcon,
} from "lucide-react"
import { BaseGlossaryTerm } from "@/lib/glossary-types"
import { useGlossaryFilter } from "@/lib/hooks/use-glossary-filter"
import { ReactNode } from "react"

interface GlossaryPageLayoutProps<T extends BaseGlossaryTerm> {
  // Header props
  title: string
  subtitle: string
  description?: string | ReactNode
  icon: LucideIcon

  // Data props
  termsData: T[]
  categories: string[]

  // Optional sections
  helpSections?: ReactNode
  showBasicsFilter?: boolean

  // External link generator (for UI glossary)
  externalLinkGenerator?: (termId: string) => string
}

export function GlossaryPageLayout<T extends BaseGlossaryTerm>({
  title,
  subtitle,
  description,
  icon: Icon,
  termsData,
  categories,
  helpSections,
  showBasicsFilter = false,
  externalLinkGenerator,
}: GlossaryPageLayoutProps<T>) {
  const router = useRouter()
  
  const {
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    showBasicsOnly,
    setShowBasicsOnly,
    sortOrder,
    setSortOrder,
    expandedTerm,
    filteredAndSortedTerms,
    termsByCategory,
    toggleTerm,
    handleTermClick,
  } = useGlossaryFilter({ termsData, showBasicsFilter })

  const handleBackToDashboard = () => {
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/50 bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto px-3 md:px-4 py-3 md:py-4">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 md:gap-4 min-w-0 flex-1">
              <Button
                onClick={handleBackToDashboard}
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground shrink-0"
              >
                <ArrowLeft className="h-4 w-4 md:mr-2" />
                <span className="hidden sm:inline">Volver al Dashboard</span>
              </Button>
              <div className="hidden sm:block h-6 w-px bg-border" />
              <div className="flex items-center gap-2 md:gap-3 min-w-0">
                <div className="p-1.5 md:p-2 bg-accent/10 rounded-lg border border-accent/20 shrink-0">
                  <Icon className="h-4 w-4 md:h-5 md:w-5 text-accent" />
                </div>
                <h1 className="text-sm md:text-xl font-semibold text-foreground truncate">
                  {title}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-3 md:px-4 py-6 md:py-8">
        <div className="max-w-6xl mx-auto">
          {/* Introduction */}
          <div className="mb-6 md:mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3 md:mb-4">
              {subtitle}
            </h2>
            {description && (
              typeof description === "string" ? (
                <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                  {description}
                </p>
              ) : (
                description
              )
            )}
          </div>

          {/* Help Sections (if provided) */}
          {helpSections}

          {/* Search and Filters */}
          <Card className="mb-6 md:mb-8 border border-border/50 shadow-sm">
            <CardHeader className="p-4 md:p-6">
              <CardTitle className="text-base md:text-lg font-semibold flex items-center gap-2">
                <Filter className="h-4 w-4 md:h-5 md:w-5 text-accent" />
                Buscar y Filtrar
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 md:space-y-4 p-4 md:p-6 pt-0">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Buscar términos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 md:py-2.5 text-sm md:text-base border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
                />
              </div>

              {/* Filters Row */}
              <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 md:gap-4">
                {/* Category Filter */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full sm:w-auto">
                  <span className="text-xs md:text-sm font-medium text-foreground shrink-0">
                    Categoría:
                  </span>
                  <div className="flex flex-wrap gap-1.5 md:gap-2">
                    {categories.map((category) => (
                      <Button
                        key={category}
                        variant={
                          selectedCategory === category ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() => setSelectedCategory(category)}
                        className="text-xs h-8 px-2.5 md:px-3"
                      >
                        {category}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Sort Options */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full sm:w-auto">
                  <span className="text-xs md:text-sm font-medium text-foreground shrink-0">
                    Ordenar:
                  </span>
                  <div className="flex gap-1 md:gap-1.5">
                    <Button
                      variant={sortOrder === "asc" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSortOrder("asc")}
                      className="text-xs h-8 px-2 md:px-3"
                    >
                      <SortAsc className="h-3 w-3 md:mr-1" />
                      <span className="hidden sm:inline">A-Z</span>
                    </Button>
                    <Button
                      variant={sortOrder === "desc" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSortOrder("desc")}
                      className="text-xs h-8 px-2 md:px-3"
                    >
                      <SortDesc className="h-3 w-3 md:mr-1" />
                      <span className="hidden sm:inline">Z-A</span>
                    </Button>
                    <Button
                      variant={
                        sortOrder === "category" ? "default" : "outline"
                      }
                      size="sm"
                      onClick={() => setSortOrder("category")}
                      className="text-xs h-8 px-2 md:px-3"
                    >
                      Categoría
                    </Button>
                  </div>
                </div>

                {/* Basics Filter (if enabled) */}
                {showBasicsFilter && (
                  <div className="flex items-center gap-2">
                    <Button
                      variant={showBasicsOnly ? "default" : "outline"}
                      size="sm"
                      onClick={() => setShowBasicsOnly(!showBasicsOnly)}
                      className="flex items-center gap-1 h-8 px-2.5 md:px-3"
                    >
                      <Badge
                        variant="outline"
                        className="text-xs bg-blue-50 text-blue-700 border-blue-200"
                      >
                        Basics
                      </Badge>
                    </Button>
                  </div>
                )}
              </div>

              {/* Results Count */}
              <div className="text-xs md:text-sm text-muted-foreground">
                Mostrando {filteredAndSortedTerms.length} de {termsData.length}{" "}
                términos
              </div>
            </CardContent>
          </Card>

          {/* Terms List */}
          <div className="space-y-3 md:space-y-4">
            {sortOrder === "category" && termsByCategory ? (
              // Grouped by category
              Object.entries(termsByCategory).map(([category, terms]) => (
                <div key={category}>
                  <div className="flex items-center gap-2 mb-3 md:mb-4">
                    <h3 className="text-lg md:text-xl font-semibold text-foreground">
                      {category}
                    </h3>
                    <Badge variant="secondary" className="text-xs">{terms.length}</Badge>
                  </div>
                  <div className="space-y-2 md:space-y-3 mb-6 md:mb-8">
                    {terms.map((term) => (
                      <div key={term.id} id={`term-${term.id}`}>
                        <GlossaryTerm
                          term={term}
                          isExpanded={expandedTerm === term.id}
                          onToggle={() => toggleTerm(term.id)}
                          onTermClick={handleTermClick}
                          externalLinkGenerator={externalLinkGenerator}
                          allTerms={termsData}
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
                    externalLinkGenerator={externalLinkGenerator}
                    allTerms={termsData}
                  />
                </div>
              ))
            )}

            {filteredAndSortedTerms.length === 0 && (
              <Card className="text-center py-8 md:py-12">
                <CardContent className="p-4 md:p-6">
                  <div className="text-muted-foreground">
                    <Search className="h-10 w-10 md:h-12 md:w-12 mx-auto mb-3 md:mb-4 opacity-50" />
                    <p className="text-base md:text-lg mb-2">No se encontraron términos</p>
                    <p className="text-xs md:text-sm px-2">
                      Intenta ajustar tu búsqueda o seleccionar una categoría
                      diferente.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Footer */}
          <div className="mt-8 md:mt-12 text-center">
            <p className="text-muted-foreground text-xs md:text-sm px-2">
              Contenido educativo para el aprendizaje de {title.toLowerCase()}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

