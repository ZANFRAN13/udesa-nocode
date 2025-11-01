"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Sparkles, X } from "lucide-react"
import { GeminiPopup } from "./gemini-popup"
import { cn } from "@/lib/utils"
import "./gemini-markdown-styles.css"

export function GeminiHelper() {
  const [isActive, setIsActive] = useState(false)
  const [showPopup, setShowPopup] = useState(false)
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 })
  const [selectedText, setSelectedText] = useState("")
  const [hoveredElement, setHoveredElement] = useState<HTMLElement | null>(null)
  const [selectedElement, setSelectedElement] = useState<HTMLElement | null>(null)

  // Función para verificar si un elemento contiene texto significativo
  const hasSignificantText = (element: HTMLElement): boolean => {
    const text = element.innerText || element.textContent || ""
    return text.trim().length > 10 // Al menos 10 caracteres
  }

  // Función para encontrar el elemento padre con texto más apropiado
  const findTextContainer = (element: HTMLElement): HTMLElement | null => {
    let current: HTMLElement | null = element

    while (current && current !== document.body) {
      // Buscar elementos que típicamente contienen contenido de glosario
      if (
        current.classList.contains("space-y-2") ||
        current.classList.contains("space-y-3") ||
        current.tagName === "P" ||
        current.tagName === "DIV"
      ) {
        if (hasSignificantText(current)) {
          return current
        }
      }
      current = current.parentElement
    }

    return element
  }

  // Función para extraer texto relevante de un término del glosario
  const extractGlossaryContent = (element: HTMLElement): string | null => {
    // Buscar el Card completo del glosario (tiene las clases de Card y contiene un header clickeable)
    let glossaryCard = element.closest('[class*="overflow-hidden"][class*="border"]')
    
    // Si no encontramos el card directamente, buscar hacia arriba
    if (!glossaryCard) {
      glossaryCard = element.closest('div[class*="Card"]')
    }
    
    if (!glossaryCard) return null
    
    // Verificar que tiene un CardHeader con cursor-pointer (característico de términos del glosario)
    const cardHeader = glossaryCard.querySelector('[class*="cursor-pointer"]')
    if (!cardHeader) return null
    
    const parts: string[] = []
    
    // Extraer SOLO el nombre del término (h3), sin los badges
    const termNameElement = cardHeader.querySelector('h3')
    if (termNameElement) {
      const termName = termNameElement.textContent?.trim()
      if (termName) {
        parts.push(`**${termName}**\n`)
      }
    }
    
    // Buscar el CardContent expandido
    const cardContent = glossaryCard.querySelector('[class*="animate-in"]') || 
                        glossaryCard.querySelector('[class*="space-y-"]')
    
    if (!cardContent) return null
    
    // Buscar todas las divs que contienen secciones
    const sections = Array.from(cardContent.querySelectorAll('div > h4')) as HTMLElement[]
    
    for (const heading of sections) {
      const headingText = heading.textContent?.trim()
      const section = heading.parentElement
      
      if (!section) continue
      
      // Solo incluir: Descripción, Ejemplo, Ejemplo de Código
      if (headingText === 'Descripción') {
        const content = section.querySelector('p')?.textContent?.trim()
        if (content) {
          parts.push(`Descripción: ${content}\n`)
        }
      } else if (headingText === 'Ejemplo') {
        // Buscar el párrafo del ejemplo, no el StructuredExample
        const exampleP = section.querySelector('p:not([class*="structured"])')
        const content = exampleP?.textContent?.trim()
        if (content) {
          parts.push(`Ejemplo: ${content}\n`)
        }
      } else if (headingText === 'Ejemplo de Código') {
        const content = section.querySelector('pre')?.textContent?.trim()
        if (content) {
          parts.push(`Código:\n${content}\n`)
        }
      }
      // Ignorar: Ejemplo Visual, Términos relacionados, Cómo configurar, etc.
    }
    
    return parts.length > 1 ? parts.join('\n') : null
  }

  // Función para limpiar el estilo de un elemento
  const clearElementStyle = (element: HTMLElement | null) => {
    if (element) {
      element.style.outline = ""
      element.style.backgroundColor = ""
      element.style.cursor = ""
    }
  }

  // Manejador de click en elementos
  const handleElementClick = useCallback(
    (e: MouseEvent) => {
      if (!isActive) return

      const target = e.target as HTMLElement

      // Ignorar clicks en el botón flotante y en el popup
      if (
        target.closest('[data-gemini-button]') ||
        target.closest('[data-gemini-popup]')
      ) {
        return
      }

      // NO permitir nueva selección si el popup ya está abierto
      if (showPopup) {
        return
      }

      e.preventDefault()
      e.stopPropagation()

      // Primero verificar si el click fue en un término del glosario
      const glossaryCard = target.closest('[class*="overflow-hidden"][class*="border"][class*="shadow"]')
      
      let text = ""
      let container: HTMLElement | null = null
      
      if (glossaryCard) {
        // Es un término del glosario - extraer contenido específico
        const glossaryContent = extractGlossaryContent(target)
        
        if (glossaryContent) {
          console.log('✅ Contenido de glosario extraído')
          text = glossaryContent
          container = glossaryCard as HTMLElement
        } else {
          console.log('⚠️ Término de glosario pero no expandido o sin contenido')
          // Si no está expandido, usar solo el nombre
          const termNameElement = glossaryCard.querySelector('h3')
          if (termNameElement) {
            text = `**${termNameElement.textContent?.trim()}**`
            container = glossaryCard as HTMLElement
          }
        }
      }
      
      // Si no es un término del glosario, usar la lógica original
      if (!text) {
        console.log('ℹ️ No es término de glosario, usando selección normal')
        container = findTextContainer(target)
        if (container && hasSignificantText(container)) {
          text = container.innerText || container.textContent || ""
        }
      }
      
      if (container && text) {
        // Limpiar el elemento seleccionado anterior
        if (selectedElement && selectedElement !== container) {
          clearElementStyle(selectedElement)
        }
        
        setSelectedText(text.trim())

        // Aplicar estilo de selección (más prominente que hover)
        container.style.outline = "2px solid rgba(168, 85, 247, 0.8)"
        container.style.backgroundColor = "rgba(168, 85, 247, 0.15)"
        container.style.cursor = "pointer"

        // Posicionar el popup cerca del elemento clickeado
        const rect = container.getBoundingClientRect()
        setPopupPosition({
          x: rect.right + 10,
          y: rect.top,
        })

        setSelectedElement(container)
        setShowPopup(true)
      }
    },
    [isActive, selectedElement, showPopup]
  )

  // Manejador de hover en elementos
  const handleElementHover = useCallback(
    (e: MouseEvent) => {
      if (!isActive) return

      const target = e.target as HTMLElement

      // Ignorar hover en el botón flotante y en el popup
      if (
        target.closest('[data-gemini-button]') ||
        target.closest('[data-gemini-popup]')
      ) {
        return
      }

      // NO aplicar hover si el popup está abierto
      if (showPopup) {
        return
      }

      const container = findTextContainer(target)
      if (container && hasSignificantText(container)) {
        // No aplicar hover si es el elemento seleccionado
        if (selectedElement && selectedElement === container) {
          return
        }

        // Remover highlight del elemento anterior
        if (hoveredElement && hoveredElement !== container) {
          clearElementStyle(hoveredElement)
        }

        // Agregar highlight al nuevo elemento (solo si no está seleccionado)
        container.style.outline = "2px dashed rgba(168, 85, 247, 0.5)"
        container.style.backgroundColor = "rgba(168, 85, 247, 0.05)"
        container.style.cursor = "pointer"
        setHoveredElement(container)
      }
    },
    [isActive, hoveredElement, selectedElement, showPopup]
  )

  // Manejador de mouseout
  const handleMouseOut = useCallback(() => {
    if (hoveredElement && hoveredElement !== selectedElement) {
      clearElementStyle(hoveredElement)
      setHoveredElement(null)
    }
  }, [hoveredElement, selectedElement])

  // Agregar/remover event listeners cuando se activa/desactiva
  useEffect(() => {
    if (isActive) {
      document.addEventListener("click", handleElementClick, true)
      document.addEventListener("mouseover", handleElementHover, true)
      document.addEventListener("mouseout", handleMouseOut, true)
    } else {
      document.removeEventListener("click", handleElementClick, true)
      document.removeEventListener("mouseover", handleElementHover, true)
      document.removeEventListener("mouseout", handleMouseOut, true)
      
      // Limpiar todos los highlights cuando se desactiva
      clearElementStyle(hoveredElement)
      clearElementStyle(selectedElement)
      setHoveredElement(null)
      setSelectedElement(null)
    }

    return () => {
      document.removeEventListener("click", handleElementClick, true)
      document.removeEventListener("mouseover", handleElementHover, true)
      document.removeEventListener("mouseout", handleMouseOut, true)
    }
  }, [isActive, handleElementClick, handleElementHover, handleMouseOut, hoveredElement, selectedElement])

  const toggleActive = () => {
    const newActiveState = !isActive
    
    // Si se está desactivando, limpiar PRIMERO todas las selecciones
    if (!newActiveState) {
      clearElementStyle(hoveredElement)
      clearElementStyle(selectedElement)
      setHoveredElement(null)
      setSelectedElement(null)
      setShowPopup(false)
    }
    
    setIsActive(newActiveState)
  }

  return (
    <>
      {/* Floating Button */}
      <Button
        data-gemini-button
        onClick={toggleActive}
        className={cn(
          "fixed bottom-6 right-6 z-40 h-14 w-14 rounded-full shadow-lg transition-all duration-300",
          isActive
            ? "bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 scale-110"
            : "bg-accent hover:bg-accent/90 gemini-helper-glow"
        )}
        title={isActive ? "Desactivar asistente IA" : "Activar asistente IA"}
      >
        {isActive ? (
          <X className="h-6 w-6 text-white" />
        ) : (
          <Sparkles className="h-6 w-6 gemini-helper-sparkle" />
        )}
      </Button>

      {/* Active Indicator */}
      {isActive && (
        <div className="fixed bottom-24 right-6 z-40 bg-background border border-accent rounded-lg px-3 py-2 shadow-lg">
          <p className="text-xs font-medium text-accent">
            ✨ Modo asistente activo
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            Haz clic en cualquier texto para consultar
          </p>
        </div>
      )}

      {/* Popup */}
      {showPopup && (
        <div data-gemini-popup>
          <GeminiPopup
            position={popupPosition}
            selectedText={selectedText}
            onClose={() => {
              setShowPopup(false)
              // Limpiar la selección al cerrar el popup
              clearElementStyle(selectedElement)
              setSelectedElement(null)
            }}
          />
        </div>
      )}
    </>
  )
}

