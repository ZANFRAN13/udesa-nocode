// Base type for all glossary terms
export interface BaseGlossaryTerm {
  id: string
  name: string
  category: string
  description: string
  relatedTerms?: string[]
  example?: string
  imageUrl?: string
  imageUrls?: string[]
  tags?: string[]
}

// CSS-specific term (extends base with configuration)
export interface CSSTerm extends BaseGlossaryTerm {
  configuration?: string
}

// Development-specific term (extends base with code examples)
export interface DevTerm extends BaseGlossaryTerm {
  codeExample?: string
}

// UI-specific term (extends base with configuration)
export interface UITerm extends BaseGlossaryTerm {
  configuration?: string
}

// Generic term that supports all fields
export interface GenericGlossaryTerm extends BaseGlossaryTerm {
  configuration?: string
  codeExample?: string
}

// Type for sort order
export type SortOrder = "asc" | "desc" | "category"

// Type for glossary configuration
export interface GlossaryConfig {
  title: string
  subtitle: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  termsData: BaseGlossaryTerm[]
  categories: string[]
  showBasicsFilter?: boolean
  externalLinkGenerator?: (termId: string) => string
}

