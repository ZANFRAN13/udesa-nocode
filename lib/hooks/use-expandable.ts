import { useState, useCallback } from "react"

/**
 * Hook para gestionar el estado de expansión de múltiples elementos
 * Útil para acordeones, collapsibles, y otros componentes expandibles
 */
export function useExpandable(initialState: Record<string, boolean> = {}) {
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>(initialState)

  const toggle = useCallback((id: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }, [])

  const expand = useCallback((id: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: true
    }))
  }, [])

  const collapse = useCallback((id: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: false
    }))
  }, [])

  const expandAll = useCallback((ids: string[]) => {
    setExpandedItems(prev => {
      const newState = { ...prev }
      ids.forEach(id => {
        newState[id] = true
      })
      return newState
    })
  }, [])

  const collapseAll = useCallback(() => {
    setExpandedItems({})
  }, [])

  const isExpanded = useCallback((id: string) => {
    return expandedItems[id] || false
  }, [expandedItems])

  return {
    expandedItems,
    toggle,
    expand,
    collapse,
    expandAll,
    collapseAll,
    isExpanded,
  }
}

