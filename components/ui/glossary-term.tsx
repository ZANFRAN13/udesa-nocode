"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, ChevronRight, ExternalLink } from "lucide-react"
import { UITerm } from "@/lib/ui-glossary-data"

interface GlossaryTermProps {
  term: UITerm
  isExpanded?: boolean
  onToggle?: () => void
  onTermClick?: (termId: string) => void
}

// Function to generate Nielsen Norman Group URL with anchor
function getNielsenNormanGroupUrl(termId: string): string {
  // Map term IDs to Nielsen Norman Group anchor format
  // NNG uses Title Case for most anchors, and some have shorter names
  const anchorMap: Record<string, string> = {
    // Controls
    'button': 'Button',
    'checkbox': 'Checkbox',
    'radio-button': 'Radio-Button',
    'slider': 'Slider',
    'toggle': 'Toggle',
    'textbox': 'Textbox',
    'dropdown-list': 'Dropdown-List',
    'combo-box': 'Combo-Box',
    'date-picker': 'Date-Picker',
    'calendar-picker': 'Calendar-Picker',
    'wheel-style-date-picker': 'Wheel-Style-Date-Picker',
    'wheel-picker': 'Wheel-Picker',
    'picker': 'Picker',
    'input-control': 'Input-Control',
    'input-stepper': 'Input-Stepper',
    'range-control': 'Range-Control',
    'knob': 'Knob',
    'scrollbar': 'Scrollbar',
    'floating-button': 'Floating-Button',
    'back-to-top-button': 'Back-to-Top-Button',
    'split-button': 'Split-Button',
    'segmented-button': 'Segmented-Button',
    'state-switch-control': 'State-Switch-Control',
    'control': 'Control',
    '2d-matrix': '2D-Matrix',
    'listbox': 'Listbox',
    
    // Navigation
    'link': 'Link',
    'anchor-link': 'Anchor',
    'menu': 'Menu',
    'dropdown-menu': 'Dropdown-Menu',
    'contextual-menu': 'Contextual-Menu',
    'navigation-menu': 'Navigation-Menu',
    'drawer-menu': 'Drawer-Menu',
    'expandable-menu': 'Expandable-Menu',
    'megamenu': 'Megamenu',
    'pie-menu': 'Pie-Menu',
    'submenu': 'Submenu',
    'menu-bar': 'Menu-Bar',
    'navigation-bar': 'Navigation-Bar',
    'breadcrumbs': 'Breadcrumbs',
    'tab-bar': 'Tab-Bar',
    'ribbon': 'Ribbon',
    
    // Layout
    'card': 'Card',
    'accordion': 'Accordion',
    'carousel': 'Carousel',
    'container': 'Container',
    'list': 'List',
    
    // Indicators
    'badge': 'Badge',
    'notification': 'Notification',
    'progress-bar': 'Progress-Bar',
    'progress-indicator': 'Progress-Indicator',
    'spinner': 'Spinner',
    'skeleton-screen': 'Skeleton-Screen',
    'snackbar': 'Toast',
    'alert': 'Alert',
    'toast': 'Toast',
    
    // Overlays
    'overlay': 'Overlay',
    'dialog': 'Dialog',
    'tooltip': 'Tooltip',
    'popup': 'Popup',
    'popup-tip': 'Popup-Tip',
    'lightbox': 'Lightbox',
    'bottom-sheet': 'Bottom-Sheet',
    'side-sheet': 'Side-Sheet',
    
    // Visual Elements
    'icon': 'Icon'
  };
  
  // Use mapped anchor or fallback to title case conversion
  const anchor = anchorMap[termId] || termId.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join('-');
  
  return `https://www.nngroup.com/articles/ui-elements-glossary/#${anchor}`;
}

// Function to process text with internal links
function processTextWithLinks(text: string, onTermClick?: (termId: string) => void) {
  const linkRegex = /\*\[([^\]]+)\]\(#([^)]+)\)\*/g
  const parts = []
  let lastIndex = 0
  let match

  while ((match = linkRegex.exec(text)) !== null) {
    // Add text before the link
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index))
    }
    
    // Add the clickable link
    const linkText = match[1]
    const termId = match[2]
    parts.push(
      <button
        key={match.index}
        onClick={() => onTermClick?.(termId)}
        className="text-accent hover:text-accent/80 underline italic font-medium transition-colors"
      >
        {linkText}
      </button>
    )
    
    lastIndex = match.index + match[0].length
  }
  
  // Add remaining text
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex))
  }
  
  // Process remaining italic text (without links)
  return parts.map((part, index) => {
    if (typeof part === 'string') {
      return part.replace(/\*([^*]+)\*/g, (_, italicText) => italicText)
    }
    return part
  })
}

export function GlossaryTerm({ term, isExpanded = false, onToggle, onTermClick }: GlossaryTermProps) {
  return (
    <Card className="overflow-hidden border border-border/50 shadow-sm hover:shadow-md transition-shadow">
      <CardHeader 
        className="cursor-pointer hover:bg-accent/5 transition-colors p-4"
        onClick={onToggle}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold text-foreground">{term.name}</h3>
              <Badge variant="secondary" className="text-xs">
                {term.category}
              </Badge>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {isExpanded ? (
              <ChevronDown className="h-5 w-5 text-muted-foreground" />
            ) : (
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            )}
          </div>
        </div>
      </CardHeader>
      
      {isExpanded && (
        <CardContent className="pt-0 pb-4 px-4 animate-in slide-in-from-top-2 duration-200">
          <div className="space-y-4">
            {/* Description */}
            <div>
              <h4 className="text-sm font-medium text-foreground mb-2">Descripción</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {processTextWithLinks(term.description, onTermClick)}
              </p>
            </div>

            {/* Example */}
            {term.example && (
              <div>
                <h4 className="text-sm font-medium text-foreground mb-2">Ejemplo</h4>
                <p className="text-sm text-muted-foreground leading-relaxed italic">
                  {processTextWithLinks(term.example, onTermClick)}
                </p>
              </div>
            )}

            {/* Visual Example */}
            {term.imageUrl && (
              <div>
                <h4 className="text-sm font-medium text-foreground mb-2">Ejemplo Visual</h4>
                <div className="rounded-lg overflow-hidden border border-border/30 bg-accent/5 p-4">
                  <img
                    src={term.imageUrl}
                    alt={`Ejemplo visual de ${term.name}`}
                    className="w-full max-w-md mx-auto rounded-md shadow-sm"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                </div>
              </div>
            )}

            {/* Related Terms */}
            {term.relatedTerms && term.relatedTerms.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-foreground mb-2">Términos relacionados</h4>
                <div className="flex flex-wrap gap-2">
                  {term.relatedTerms.map((relatedTerm, index) => (
                    <Badge 
                      key={index} 
                      variant="outline" 
                      className="text-xs cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        onTermClick?.(relatedTerm);
                      }}
                    >
                      {relatedTerm}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Reference Link */}
            <div className="pt-2 border-t border-border/30">
              <Button
                variant="ghost"
                size="sm"
                className="text-xs text-muted-foreground hover:text-accent"
                asChild
              >
                <a 
                  href={getNielsenNormanGroupUrl(term.id)} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1"
                >
                  <ExternalLink className="h-3 w-3" />
                  Ver en Nielsen Norman Group
                </a>
              </Button>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  )
}
