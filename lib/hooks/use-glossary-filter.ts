import { useState, useMemo } from "react"
import { BaseGlossaryTerm, SortOrder } from "../glossary-types"

interface UseGlossaryFilterProps<T extends BaseGlossaryTerm> {
  termsData: T[]
  showBasicsFilter?: boolean
}

interface UseGlossaryFilterReturn<T extends BaseGlossaryTerm> {
  // Filter states
  searchTerm: string
  setSearchTerm: (value: string) => void
  selectedCategory: string
  setSelectedCategory: (value: string) => void
  showBasicsOnly: boolean
  setShowBasicsOnly: (value: boolean) => void
  sortOrder: SortOrder
  setSortOrder: (value: SortOrder) => void
  expandedTerm: string | null
  setExpandedTerm: (value: string | null) => void

  // Filtered and sorted results
  filteredAndSortedTerms: T[]
  termsByCategory: { [key: string]: T[] } | null

  // Helper functions
  toggleTerm: (termId: string) => void
  handleTermClick: (termId: string) => void
}

export function useGlossaryFilter<T extends BaseGlossaryTerm>({
  termsData,
  showBasicsFilter = false,
}: UseGlossaryFilterProps<T>): UseGlossaryFilterReturn<T> {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Todos")
  const [showBasicsOnly, setShowBasicsOnly] = useState(false)
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc")
  const [expandedTerm, setExpandedTerm] = useState<string | null>(null)

  const filteredAndSortedTerms = useMemo(() => {
    let filtered = termsData.filter((term) => {
      const matchesSearch =
        term.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        term.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory =
        selectedCategory === "Todos" || term.category === selectedCategory
      const matchesBasics =
        !showBasicsFilter ||
        !showBasicsOnly ||
        (term.tags && term.tags.includes("basics"))
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
  }, [searchTerm, selectedCategory, showBasicsOnly, sortOrder, termsData, showBasicsFilter])

  const termsByCategory = useMemo(() => {
    if (sortOrder !== "category") return null

    const grouped: { [key: string]: T[] } = {}
    filteredAndSortedTerms.forEach((term) => {
      if (!grouped[term.category]) {
        grouped[term.category] = []
      }
      grouped[term.category].push(term)
    })
    return grouped
  }, [filteredAndSortedTerms, sortOrder])

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
        element.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    }, 100)
  }

  return {
    // States
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    showBasicsOnly,
    setShowBasicsOnly,
    sortOrder,
    setSortOrder,
    expandedTerm,
    setExpandedTerm,

    // Results
    filteredAndSortedTerms,
    termsByCategory,

    // Helpers
    toggleTerm,
    handleTermClick,
  }
}

