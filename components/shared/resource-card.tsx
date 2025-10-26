import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Clock, User } from "lucide-react"
import type { CatalogItem, BadgeVariant } from "@/lib/types/shared-types"

export interface ResourceCardAction {
  label: string
  href?: string
  onClick?: () => void
  variant?: "default" | "outline" | "ghost"
  icon?: React.ReactNode
}

export interface ResourceCardProps {
  item: CatalogItem
  typeIcon?: React.ReactNode
  typeLabel?: string
  typeBadgeVariant?: BadgeVariant
  topicLabels?: Record<string, string>
  topicColors?: Record<string, string>
  difficultyDisplay?: React.ReactNode
  duration?: string
  actions?: ResourceCardAction[]
  expandable?: boolean
  maxDescriptionLength?: number
  className?: string
  onExpand?: (id: string) => void
}

/**
 * Generic reusable card component for displaying catalog items
 * Can be used for resources, articles, tools, etc.
 */
export function ResourceCard({
  item,
  typeIcon,
  typeLabel,
  typeBadgeVariant = "secondary",
  topicLabels,
  topicColors,
  difficultyDisplay,
  duration,
  actions,
  expandable = true,
  maxDescriptionLength = 150,
  className = "",
  onExpand,
}: ResourceCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const needsExpansion =
    expandable && item.description.length > maxDescriptionLength

  const handleExpand = () => {
    setIsExpanded(!isExpanded)
    onExpand?.(item.id)
  }

  const topics = Array.isArray(item.topic)
    ? item.topic
    : item.topic
      ? [item.topic]
      : []

  return (
    <Card
      className={`group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${className}`}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2 mb-2">
          {typeIcon && (
            <div className="p-2 bg-primary/10 rounded-lg">{typeIcon}</div>
          )}
        </div>
        <CardTitle className="text-base md:text-lg line-clamp-2 group-hover:text-primary transition-colors">
          {item.title}
        </CardTitle>
        <div className="flex items-center gap-2 mt-2">
          {typeLabel && (
            <Badge variant={typeBadgeVariant} className="text-xs">
              {typeLabel}
            </Badge>
          )}
          {difficultyDisplay && (
            <span className="text-xs" title="Nivel de dificultad">
              {difficultyDisplay}
            </span>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <p
            className={`text-sm text-muted-foreground ${
              isExpanded ? "" : "line-clamp-3"
            }`}
          >
            {item.description}
          </p>
          {needsExpansion && (
            <button
              onClick={handleExpand}
              className="text-xs text-primary hover:text-primary/80 mt-1 font-medium transition-colors"
            >
              {isExpanded ? "Ver menos" : "Ver más..."}
            </button>
          )}
        </div>

        {/* Topics */}
        {topics.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {topics.map((topic) => (
              <Badge
                key={topic}
                variant="outline"
                className={`text-xs ${topicColors?.[topic] || ""}`}
              >
                {topicLabels?.[topic] || topic}
              </Badge>
            ))}
          </div>
        )}

        {/* Metadata */}
        {(duration || item.author || item.language) && (
          <div className="flex flex-wrap gap-3 text-xs text-muted-foreground pt-2 border-t border-border/50">
            {duration && (
              <div className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {duration}
              </div>
            )}
            {item.author && (
              <div className="flex items-center gap-1">
                <User className="h-3.5 w-3.5" />
                {item.author}
              </div>
            )}
            {item.language && (
              <Badge variant="outline" className="text-xs h-5">
                {item.language.toUpperCase()}
              </Badge>
            )}
          </div>
        )}

        {/* Tags */}
        {item.tags && item.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-2">
            {item.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        {actions && actions.length > 0 && (
          <div className="flex gap-2 pt-2">
            {actions.map((action, index) => (
              <Button
                key={index}
                asChild={!!action.href}
                className="flex-1 group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                variant={action.variant || "outline"}
              >
                {action.href ? (
                  <a
                    href={action.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {action.label}
                    {action.icon || <ExternalLink className="h-4 w-4 ml-2" />}
                  </a>
                ) : (
                  <button onClick={action.onClick}>
                    {action.label}
                    {action.icon}
                  </button>
                )}
              </Button>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

/**
 * Default difficulty display component (can be customized per use case)
 */
export function DifficultyBrains({
  level,
}: {
  level: number
}): React.ReactElement {
  const total = 3
  const filled = "🧠"
  const empty = "🧠"

  return (
    <span title={`Nivel de dificultad: ${level}/3`}>
      {Array.from({ length: level }, (_, i) => (
        <span key={i} className="opacity-100">
          {filled}
        </span>
      ))}
      {Array.from({ length: total - level }, (_, i) => (
        <span key={i + level} className="opacity-20">
          {empty}
        </span>
      ))}
    </span>
  )
}

