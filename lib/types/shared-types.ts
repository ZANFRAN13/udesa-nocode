/**
 * Shared TypeScript types and interfaces used across the application
 */

// Base types for expandable/collapsible UI elements
export interface ExpandableState {
  [key: string]: boolean
}

// Base interface for items that can be filtered
export interface Filterable {
  id: string
  title: string
  description: string
  tags?: string[]
}

// Base interface for categorized items
export interface Categorized {
  type: string
  topic?: string | string[]
  difficulty?: number
}

// Combined interface for catalog items (resources, glossary terms, etc.)
export interface CatalogItem extends Filterable, Categorized {
  url?: string
  author?: string
  language?: "es" | "en"
}

// Base filter configuration
export interface FilterConfig<T extends string> {
  types: T[]
  activeTypes: T[]
  onTypeChange: (type: T) => void
}

// Search configuration
export interface SearchConfig {
  query: string
  onQueryChange: (query: string) => void
  placeholder?: string
}

// Difficulty levels (standardized across the app)
export type DifficultyLevel = 1 | 2 | 3

export interface DifficultyConfig {
  level: DifficultyLevel | null
  onChange: (level: DifficultyLevel | null) => void
}

// Loading and error states
export interface AsyncState<T> {
  data: T | null
  loading: boolean
  error: string | null
}

// Auth-related types
export interface AuthUser {
  id: string
  email?: string
  [key: string]: any
}

export interface AuthState {
  user: AuthUser | null
  loading: boolean
  error: string | null
}

// Pagination types
export interface PaginationConfig {
  page: number
  pageSize: number
  total: number
  onPageChange: (page: number) => void
}

// Sort configuration
export type SortDirection = "asc" | "desc"

export interface SortConfig<T extends string> {
  field: T
  direction: SortDirection
  onSortChange: (field: T, direction: SortDirection) => void
}

// Card display variants
export type CardVariant = "default" | "outlined" | "elevated" | "ghost"

// Common UI element sizes
export type Size = "sm" | "md" | "lg" | "xl"

// Icon position in components
export type IconPosition = "left" | "right" | "top" | "bottom"

// Badge variants (matching shadcn/ui)
export type BadgeVariant =
  | "default"
  | "secondary"
  | "destructive"
  | "outline"

// Button variants (matching shadcn/ui)
export type ButtonVariant =
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | "link"

// Common action handlers
export type ClickHandler = () => void
export type ChangeHandler<T> = (value: T) => void

// Generic item with metadata
export interface ItemWithMetadata<T> {
  item: T
  createdAt?: Date
  updatedAt?: Date
  metadata?: Record<string, any>
}

// Navigation types
export interface NavigationItem {
  id: string
  label: string
  href?: string
  onClick?: ClickHandler
  icon?: React.ComponentType<any>
  disabled?: boolean
  badge?: string | number
}

export interface BreadcrumbItem {
  label: string
  href?: string
}

// Form field types
export interface FormField<T> {
  name: string
  value: T
  error?: string
  touched?: boolean
  onChange: ChangeHandler<T>
  onBlur?: () => void
}

// Data transformation helpers
export type Mapper<TInput, TOutput> = (input: TInput) => TOutput
export type Filter<T> = (item: T) => boolean
export type Comparator<T> = (a: T, b: T) => number

// Generic result type for operations that can fail
export type Result<T, E = Error> =
  | { success: true; data: T }
  | { success: false; error: E }

// Utility type for making specific properties optional
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

// Utility type for making specific properties required
export type RequiredBy<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>

