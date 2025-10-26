"use client"

import { useState, useEffect, useMemo } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  ArrowLeft,
  LogOut,
  Search,
  BookOpen,
  Video,
  FileText,
  Code,
  GraduationCap,
  ExternalLink,
  Filter,
  X,
  Clock,
  User,
  Sparkles,
  Brain,
  Mic,
} from "lucide-react"
import { resources, Resource, ResourceType, ResourceTopic, DifficultyLevel } from "@/lib/additional-resources-data"

const typeIcons: Record<ResourceType, any> = {
  articulo: FileText,
  guia: GraduationCap,
  bibliografia: BookOpen,
  video: Video,
  paper: Brain,
  documentacion: FileText,
  curso: GraduationCap,
  referentes: User,
  podcast: Mic,
}

const typeLabels: Record<ResourceType, string> = {
  articulo: "Artículo",
  guia: "Guía",
  bibliografia: "Libro",
  video: "Video",
  paper: "Paper",
  documentacion: "Documentación",
  curso: "Curso",
  referentes: "Referente",
  podcast: "Podcast",
}

const topicLabels: Record<ResourceTopic, string> = {
  vibecoding: "VibeCoding",
  llm: "LLM",
  agentes: "Agentes",
  prompting: "Prompting",
  arquitectura: "Arquitectura",
  "ux-ui": "UX/UI",
  desarrollo: "Desarrollo",
  producto: "Producto",
  general: "General",
}

const topicColors: Record<ResourceTopic, string> = {
  vibecoding: "bg-purple-100 text-purple-800 dark:bg-purple-950/30 dark:text-purple-400 border-purple-200 dark:border-purple-800",
  llm: "bg-blue-100 text-blue-800 dark:bg-blue-950/30 dark:text-blue-400 border-blue-200 dark:border-blue-800",
  agentes: "bg-green-100 text-green-800 dark:bg-green-950/30 dark:text-green-400 border-green-200 dark:border-green-800",
  prompting: "bg-yellow-100 text-yellow-800 dark:bg-yellow-950/30 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800",
  arquitectura: "bg-red-100 text-red-800 dark:bg-red-950/30 dark:text-red-400 border-red-200 dark:border-red-800",
  "ux-ui": "bg-pink-100 text-pink-800 dark:bg-pink-950/30 dark:text-pink-400 border-pink-200 dark:border-pink-800",
  desarrollo: "bg-indigo-100 text-indigo-800 dark:bg-indigo-950/30 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800",
  producto: "bg-orange-100 text-orange-800 dark:bg-orange-950/30 dark:text-orange-400 border-orange-200 dark:border-orange-800",
  general: "bg-gray-100 text-gray-800 dark:bg-gray-950/30 dark:text-gray-400 border-gray-200 dark:border-gray-800",
}

export default function AdditionalResourcesPage() {
  const router = useRouter()
  const supabase = createClient()
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTypes, setSelectedTypes] = useState<ResourceType[]>([])
  const [selectedTopics, setSelectedTopics] = useState<ResourceTopic[]>([])
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel | null>(null)
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_OUT') {
          router.push('/login')
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [router, supabase])

  const handleBackToDashboard = () => {
    router.push('/dashboard')
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  const toggleType = (type: ResourceType) => {
    setSelectedTypes(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    )
  }

  const toggleTopic = (topic: ResourceTopic) => {
    setSelectedTopics(prev => 
      prev.includes(topic) ? prev.filter(t => t !== topic) : [...prev, topic]
    )
  }

  const toggleDifficulty = (difficulty: DifficultyLevel) => {
    setSelectedDifficulty(prev => prev === difficulty ? null : difficulty)
  }

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedTypes([])
    setSelectedTopics([])
    setSelectedDifficulty(null)
  }

  const hasActiveFilters = searchQuery || selectedTypes.length > 0 || selectedTopics.length > 0 || selectedDifficulty !== null

  // Filtered resources
  const filteredResources = useMemo(() => {
    let filtered = [...resources]

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(r => 
        r.title.toLowerCase().includes(query) ||
        r.description.toLowerCase().includes(query) ||
        r.tags?.some(tag => tag.toLowerCase().includes(query)) ||
        r.author?.toLowerCase().includes(query)
      )
    }

    // Type filter
    if (selectedTypes.length > 0) {
      filtered = filtered.filter(r => selectedTypes.includes(r.type))
    }

    // Topic filter
    if (selectedTopics.length > 0) {
      filtered = filtered.filter(r => 
        r.topic.some(t => selectedTopics.includes(t))
      )
    }

    // Difficulty filter
    if (selectedDifficulty !== null) {
      filtered = filtered.filter(r => r.difficulty === selectedDifficulty)
    }

    // Sort alphabetically by title
    filtered.sort((a, b) => a.title.localeCompare(b.title, 'es'))

    return filtered
  }, [searchQuery, selectedTypes, selectedTopics, selectedDifficulty])

  const getDifficultyBrains = (difficulty: DifficultyLevel) => {
    return "🧠".repeat(difficulty)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/50 bg-card/30 backdrop-blur-sm sticky top-0 z-10">
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
                <img
                  src="/images/udesa-png.svg"
                  alt="Universidad de San Andrés"
                  className="h-6 md:h-8 w-auto shrink-0"
                />
                <h1 className="text-sm md:text-xl font-semibold text-foreground truncate">
                  <span className="hidden md:inline">Recursos Adicionales</span>
                  <span className="md:hidden">Recursos</span>
                </h1>
              </div>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              size="sm"
              className="text-muted-foreground hover:text-foreground shrink-0 ml-2"
            >
              <LogOut className="h-4 w-4 md:mr-2" />
              <span className="hidden sm:inline">Cerrar sesión</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-3 md:px-4 py-6 md:py-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="mb-6 md:mb-8">
            <div className="flex items-start gap-3 mb-4">
              <div className="p-3 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                  Biblioteca de Recursos
                </h2>
                <p className="text-muted-foreground text-base md:text-lg">
                  Explora nuestra colección curada de recursos para profundizar tu aprendizaje
                </p>
              </div>
            </div>
          </div>


          {/* Filter Toggle Button (Mobile) */}
          <div className="mb-4 md:hidden">
            <Button
              onClick={() => setShowFilters(!showFilters)}
              variant="outline"
              className="w-full"
            >
              <Filter className="h-4 w-4 mr-2" />
              {showFilters ? "Ocultar Filtros" : "Mostrar Filtros"}
              {hasActiveFilters && (
                <Badge className="ml-2 bg-primary">
                  {(selectedTypes.length + selectedTopics.length + (selectedDifficulty ? 1 : 0))}
                </Badge>
              )}
            </Button>
          </div>

          {/* Filters Section */}
          <div className={`mb-4 ${showFilters || 'hidden md:block'}`}>
            <Card className="border-border/50">
              <CardContent className="p-3">
                <div className="flex flex-col lg:flex-row lg:items-start gap-3">
                  {/* Filters Title and Clear Button */}
                  <div className="flex items-center justify-between lg:justify-start lg:flex-col lg:items-start gap-2 lg:min-w-[80px]">
                    <div className="flex items-center gap-1.5">
                      <Filter className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="text-xs font-semibold text-muted-foreground">Filtros:</span>
                    </div>
                    {hasActiveFilters && (
                      <Button
                        onClick={clearFilters}
                        variant="ghost"
                        size="sm"
                        className="text-muted-foreground hover:text-foreground h-6 px-2 text-xs"
                      >
                        <X className="h-3 w-3 mr-1" />
                        Limpiar
                      </Button>
                    )}
                  </div>

                  {/* Filters Grid */}
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
                    {/* Type Filter */}
                    <div className="space-y-1.5">
                      <h4 className="font-medium text-xs text-muted-foreground">Tipo de Recurso</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {(Object.keys(typeLabels) as ResourceType[]).map(type => {
                          const Icon = typeIcons[type]
                          const isSelected = selectedTypes.includes(type)
                          return (
                            <Button
                              key={type}
                              onClick={() => toggleType(type)}
                              variant={isSelected ? "default" : "outline"}
                              size="sm"
                              className="h-7 px-2.5 text-xs"
                            >
                              <Icon className="h-3.5 w-3.5 mr-1" />
                              {typeLabels[type]}
                            </Button>
                          )
                        })}
                      </div>
                    </div>

                    {/* Topic Filter */}
                    <div className="space-y-1.5">
                      <h4 className="font-medium text-xs text-muted-foreground">Tema</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {(Object.keys(topicLabels) as ResourceTopic[]).map(topic => {
                          const isSelected = selectedTopics.includes(topic)
                          return (
                            <Button
                              key={topic}
                              onClick={() => toggleTopic(topic)}
                              variant={isSelected ? "default" : "outline"}
                              size="sm"
                              className="h-7 px-2.5 text-xs"
                            >
                              {topicLabels[topic]}
                            </Button>
                          )
                        })}
                      </div>
                    </div>

                    {/* Difficulty Filter */}
                    <div className="space-y-1.5">
                      <h4 className="font-medium text-xs text-muted-foreground flex items-center gap-1.5">
                        <Brain className="h-3.5 w-3.5" />
                        Nivel de Dificultad
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {[1, 2, 3].map(level => {
                          const isSelected = selectedDifficulty === level
                          return (
                            <Button
                              key={level}
                              onClick={() => toggleDifficulty(level as DifficultyLevel)}
                              variant={isSelected ? "default" : "outline"}
                              size="sm"
                              className="h-7 px-2.5 text-xs"
                            >
                              {getDifficultyBrains(level as DifficultyLevel)}
                              <span className="ml-1.5">
                                {level === 1 ? "Principiante" : level === 2 ? "Intermedio" : "Avanzado"}
                              </span>
                            </Button>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Search Bar */}
          <div className="mb-6 border bold rounded-lg">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                          type="text"
                          placeholder="Buscar por título, descripción, etiquetas..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-10 pr-10 h-12 text-base"
                        />
                        {searchQuery && (
                          <button
                            onClick={() => setSearchQuery("")}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                          >
                            <X className="h-5 w-5" />
                          </button>
                        )}
                      </div>
                    </div>
                    
          {/* Results Count */}
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {filteredResources.length === resources.length ? (
                <>Mostrando <strong>{resources.length}</strong> recursos</>
              ) : (
                <>Se encontraron <strong>{filteredResources.length}</strong> recursos</>
              )}
            </p>
          </div>

          {/* Resources Grid */}
          {filteredResources.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {filteredResources.map(resource => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center">
              <div className="flex flex-col items-center gap-4">
                <div className="p-4 bg-muted rounded-full">
                  <Search className="h-8 w-8 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">No se encontraron recursos</h3>
                  <p className="text-muted-foreground mb-4">
                    Intenta ajustar los filtros o buscar con otros términos
                  </p>
                  {hasActiveFilters && (
                    <Button onClick={clearFilters} variant="outline">
                      Limpiar filtros
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

function ResourceCard({ resource }: { resource: Resource }) {
  const Icon = typeIcons[resource.type]
  const [isExpanded, setIsExpanded] = useState(false)
  
  // Check if description is long enough to need expansion (roughly 3 lines worth of text)
  const needsExpansion = resource.description.length > 150
  
  return (
    <Card 
      className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Icon className="h-5 w-5 text-primary" />
          </div>
        </div>
        <CardTitle className="text-base md:text-lg line-clamp-2 group-hover:text-primary transition-colors">
          {resource.title}
        </CardTitle>
        <div className="flex items-center gap-2 mt-2">
          <Badge variant="secondary" className="text-xs">
            {typeLabels[resource.type]}
          </Badge>
          <span className="text-xs" title="Nivel de dificultad">
            {getDifficultyBrains(resource.difficulty)}
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <p className={`text-sm text-muted-foreground ${isExpanded ? '' : 'line-clamp-3'}`}>
            {resource.description}
          </p>
          {needsExpansion && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-xs text-primary hover:text-primary/80 mt-1 font-medium transition-colors"
            >
              {isExpanded ? 'Ver menos' : 'Ver más...'}
            </button>
          )}
        </div>
        
        {/* Topics */}
        <div className="flex flex-wrap gap-1.5">
          {resource.topic.map(topic => (
            <Badge 
              key={topic} 
              variant="outline" 
              className={`text-xs ${topicColors[topic]}`}
            >
              {topicLabels[topic]}
            </Badge>
          ))}
        </div>

        {/* Metadata */}
        <div className="flex flex-wrap gap-3 text-xs text-muted-foreground pt-2 border-t border-border/50">
          {resource.duration && (
            <div className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {resource.duration}
            </div>
          )}
          {resource.author && (
            <div className="flex items-center gap-1">
              <User className="h-3.5 w-3.5" />
              {resource.author}
            </div>
          )}
          {resource.language && (
            <Badge variant="outline" className="text-xs h-5">
              {resource.language.toUpperCase()}
            </Badge>
          )}
        </div>

        {/* Action Button */}
        <Button 
          asChild 
          className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
          variant="outline"
        >
          <a href={resource.url} target="_blank" rel="noopener noreferrer">
            Ver Recurso
            <ExternalLink className="h-4 w-4 ml-2" />
          </a>
        </Button>
      </CardContent>
    </Card>
  )
}

function getDifficultyBrains(difficulty: DifficultyLevel) {
  return "🧠".repeat(difficulty)
}

