import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, X, Filter } from "lucide-react"
import type { DifficultyLevel } from "@/lib/types/shared-types"

export interface FilterOption<T extends string = string> {
  value: T
  label: string
  icon?: React.ReactNode
  color?: string
  count?: number
}

export interface FilterGroup<T extends string = string> {
  id: string
  title: string
  options: FilterOption<T>[]
  selectedValues: T[]
  onToggle: (value: T) => void
  multiSelect?: boolean
}

export interface FilterPanelProps {
  searchQuery?: string
  onSearchChange?: (query: string) => void
  searchPlaceholder?: string
  filterGroups?: FilterGroup[]
  difficultyFilter?: {
    selected: DifficultyLevel | null
    onChange: (level: DifficultyLevel | null) => void
    labels?: Record<DifficultyLevel, string>
  }
  onClearAll?: () => void
  resultCount?: number
  className?: string
  collapsible?: boolean
}

/**
 * Generic reusable filter panel component
 * Supports search, multiple filter groups, and difficulty filters
 */
export function FilterPanel({
  searchQuery,
  onSearchChange,
  searchPlaceholder = "Buscar...",
  filterGroups = [],
  difficultyFilter,
  onClearAll,
  resultCount,
  className = "",
  collapsible = false,
}: FilterPanelProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(collapsible)

  const hasActiveFilters =
    (searchQuery && searchQuery.length > 0) ||
    filterGroups.some((group) => group.selectedValues.length > 0) ||
    (difficultyFilter && difficultyFilter.selected !== null)

  const activeFilterCount =
    (searchQuery && searchQuery.length > 0 ? 1 : 0) +
    filterGroups.reduce((acc, group) => acc + group.selectedValues.length, 0) +
    (difficultyFilter && difficultyFilter.selected !== null ? 1 : 0)

  return (
    <Card className={`${className}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-muted-foreground" />
            <CardTitle className="text-lg">Filtros</CardTitle>
            {activeFilterCount > 0 && (
              <Badge variant="secondary" className="text-xs">
                {activeFilterCount}
              </Badge>
            )}
          </div>
          {collapsible && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              {isCollapsed ? "Mostrar" : "Ocultar"}
            </Button>
          )}
        </div>
        {resultCount !== undefined && (
          <p className="text-sm text-muted-foreground mt-1">
            {resultCount} resultado{resultCount !== 1 ? "s" : ""} encontrado
            {resultCount !== 1 ? "s" : ""}
          </p>
        )}
      </CardHeader>

      {!isCollapsed && (
        <CardContent className="space-y-4">
          {/* Search Input */}
          {onSearchChange && (
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder={searchPlaceholder}
                value={searchQuery || ""}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-9"
              />
              {searchQuery && searchQuery.length > 0 && (
                <button
                  onClick={() => onSearchChange("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          )}

          {/* Filter Groups */}
          {filterGroups.map((group) => (
            <div key={group.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold text-foreground">
                  {group.title}
                </h4>
                {group.selectedValues.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      group.selectedValues.forEach((value) =>
                        group.onToggle(value)
                      )
                    }
                    className="h-auto py-0 px-2 text-xs"
                  >
                    Limpiar
                  </Button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {group.options.map((option) => {
                  const isSelected = group.selectedValues.includes(option.value)
                  return (
                    <button
                      key={option.value}
                      onClick={() => group.onToggle(option.value)}
                      className={`
                        flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium
                        transition-all duration-200 border
                        ${
                          isSelected
                            ? "bg-primary text-primary-foreground border-primary shadow-sm"
                            : "bg-background text-muted-foreground border-border hover:bg-accent hover:text-accent-foreground"
                        }
                        ${option.color || ""}
                      `}
                    >
                      {option.icon && (
                        <span className="flex-shrink-0">{option.icon}</span>
                      )}
                      <span>{option.label}</span>
                      {option.count !== undefined && (
                        <Badge
                          variant={isSelected ? "secondary" : "outline"}
                          className="ml-1 h-4 px-1 text-xs"
                        >
                          {option.count}
                        </Badge>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
          ))}

          {/* Difficulty Filter */}
          {difficultyFilter && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold text-foreground">
                  Dificultad
                </h4>
                {difficultyFilter.selected !== null && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => difficultyFilter.onChange(null)}
                    className="h-auto py-0 px-2 text-xs"
                  >
                    Limpiar
                  </Button>
                )}
              </div>
              <div className="flex gap-2">
                {([1, 2, 3] as DifficultyLevel[]).map((level) => {
                  const isSelected = difficultyFilter.selected === level
                  const label = difficultyFilter.labels?.[level] || `Nivel ${level}`
                  return (
                    <button
                      key={level}
                      onClick={() =>
                        difficultyFilter.onChange(
                          isSelected ? null : level
                        )
                      }
                      className={`
                        flex-1 px-3 py-2 rounded-lg text-sm font-medium
                        transition-all duration-200 border
                        ${
                          isSelected
                            ? "bg-primary text-primary-foreground border-primary shadow-sm"
                            : "bg-background text-muted-foreground border-border hover:bg-accent hover:text-accent-foreground"
                        }
                      `}
                    >
                      {label}
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* Clear All Button */}
          {hasActiveFilters && onClearAll && (
            <Button
              variant="outline"
              className="w-full"
              onClick={onClearAll}
            >
              <X className="h-4 w-4 mr-2" />
              Limpiar todos los filtros
            </Button>
          )}
        </CardContent>
      )}
    </Card>
  )
}

/**
 * Hook for managing filter state
 */
export function useFilterState<T extends string>(initialValues: T[] = []) {
  const [selectedValues, setSelectedValues] = React.useState<T[]>(initialValues)

  const toggle = (value: T) => {
    setSelectedValues((prev) =>
      prev.includes(value)
        ? prev.filter((v) => v !== value)
        : [...prev, value]
    )
  }

  const clear = () => setSelectedValues([])

  const set = (values: T[]) => setSelectedValues(values)

  return {
    selectedValues,
    toggle,
    clear,
    set,
  }
}

