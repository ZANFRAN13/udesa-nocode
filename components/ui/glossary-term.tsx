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

// Function to process configuration text with better visual formatting
function processConfigurationText(text: string, onTermClick?: (termId: string) => void) {
  const lines = text.split('\n')
  const sections = []
  let currentSection = null
  
  // Group lines into sections
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()
    
    if (line.startsWith('**') && line.endsWith('**')) {
      // Main section headers
      if (currentSection) {
        sections.push(currentSection)
      }
      currentSection = {
        title: line.replace(/\*\*/g, ''),
        items: []
      }
    } else if (line.startsWith('- `') && line.includes('`')) {
      // Code examples with descriptions
      const match = line.match(/^- `([^`]+)` \(([^)]+)\)/)
      if (match && currentSection) {
        const [, code, description] = match
        currentSection.items.push({
          type: 'code-with-desc',
          code,
          description
        })
      } else if (currentSection) {
        // Simple code examples
        const code = line.replace(/^- `|`$/, '').replace(/^`|`$/, '')
        currentSection.items.push({
          type: 'code',
          code
        })
      }
    } else if (line.startsWith('**') && line.includes(':**')) {
      // Subsection headers
      if (currentSection) {
        currentSection.items.push({
          type: 'subsection',
          title: line.replace(/\*\*/g, '').replace(/:\*\*$/, '')
        })
      }
    } else if (line.includes('`') && !line.startsWith('-') && currentSection) {
      // Inline code examples
      currentSection.items.push({
        type: 'inline-code',
        content: line
      })
    } else if (line && !line.startsWith('**') && !line.startsWith('-') && currentSection) {
      // Regular text
      currentSection.items.push({
        type: 'text',
        content: line
      })
    }
  }
  
  if (currentSection) {
    sections.push(currentSection)
  }
  
  // Render sections in columns
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {sections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="space-y-3">
          {/* Section Header */}
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 bg-accent rounded-full"></div>
            <h5 className="font-semibold text-accent text-base">{section.title}</h5>
          </div>
          
          {/* Section Items */}
          <div className="space-y-2">
            {section.items.map((item, itemIndex) => {
              if (item.type === 'code-with-desc') {
                return (
                  <div key={itemIndex} className="flex items-start gap-2 p-2 bg-background/50 rounded-lg border border-border/30">
                    <code className="bg-accent/10 text-accent px-2 py-1 rounded text-xs font-mono flex-shrink-0">
                      {item.code}
                    </code>
                    <span className="text-muted-foreground text-xs">{item.description}</span>
                  </div>
                )
              } else if (item.type === 'code') {
                return (
                  <div key={itemIndex} className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                    <code className="bg-accent/10 text-accent px-2 py-1 rounded text-xs font-mono">
                      {item.code}
                    </code>
                  </div>
                )
              } else if (item.type === 'subsection') {
                return (
                  <div key={itemIndex} className="flex items-center gap-2 mt-3">
                    <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                    <h6 className="font-medium text-foreground text-sm">{item.title}</h6>
                  </div>
                )
              } else if (item.type === 'inline-code') {
                const processedLine = item.content.replace(/`([^`]+)`/g, '<code class="bg-accent/10 text-accent px-1 py-0.5 rounded text-xs font-mono">$1</code>')
                return (
                  <div key={itemIndex} className="text-xs text-muted-foreground" dangerouslySetInnerHTML={{ __html: processedLine }} />
                )
              } else if (item.type === 'text') {
                return (
                  <p key={itemIndex} className="text-xs text-muted-foreground leading-relaxed">
                    {item.content}
                  </p>
                )
              }
              return null
            })}
          </div>
        </div>
      ))}
    </div>
  )
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
              {term.tags && term.tags.includes('basics') && (
                <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                  Basics
                </Badge>
              )}
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

            {/* Configuration */}
            {term.configuration && (
              <div>
                <h4 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
                  <span className="text-yellow-500">💡</span>
                  Cómo configurar
                </h4>
                <div className="bg-gradient-to-r from-accent/5 to-accent/10 border border-accent/30 rounded-xl p-4 space-y-4">
                  <div className="text-sm text-foreground leading-relaxed">
                    {processConfigurationText(term.configuration, onTermClick)}
                  </div>
                </div>
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
