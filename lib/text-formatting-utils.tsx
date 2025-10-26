import React from "react"
import { Copy, Check } from "lucide-react"

/**
 * Process text with internal links in the format *[text](#id)*
 * Returns an array of text and React elements
 */
export function processTextWithLinks(
  text: string,
  onTermClick?: (termId: string) => void
): (string | React.ReactElement)[] {
  const linkRegex = /\*\[([^\]]+)\]\(#([^)]+)\)\*/g
  const parts: (string | React.ReactElement)[] = []
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
      React.createElement(
        "button",
        {
          key: match.index,
          onClick: () => onTermClick?.(termId),
          className:
            "text-accent hover:text-accent/80 underline italic font-medium transition-colors",
        },
        linkText
      )
    )

    lastIndex = match.index + match[0].length
  }

  // Add remaining text
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex))
  }

  // Process remaining italic text (without links)
  return parts.map((part, index) => {
    if (typeof part === "string") {
      return part.replace(/\*([^*]+)\*/g, (_, italicText) => italicText)
    }
    return part
  })
}

/**
 * Format text with inline code blocks, supporting command detection and copy functionality
 */
export function formatTextWithCode(
  text: string,
  copiedCommands: Record<string, boolean>,
  onCopy: (code: string, id: string) => void
) {
  const commandPrefixes = ['git ', 'npm ', 'cd ', 'npx ', 'yarn ', 'pnpm ']
  
  const isCommand = (text: string) => {
    return commandPrefixes.some(prefix => text.trim().startsWith(prefix))
  }

  const parts = text.split(/(`[^`]+`)/)
  return parts.map((part, index) => {
    if (part.startsWith('`') && part.endsWith('`')) {
      const code = part.slice(1, -1)
      const isCmd = isCommand(code)
      const commandId = `cmd-${index}-${code.substring(0, 10)}`
      const isCopied = copiedCommands[commandId]

      return (
        <span key={index} className="inline-flex items-center group relative">
          <code 
            className="px-2 py-1 mx-0.5 bg-black text-white rounded text-xs font-mono border border-gray-800 inline-block"
          >
            {code}
          </code>
          {isCmd && (
            <button
              onClick={() => onCopy(code, commandId)}
              className="ml-1 p-1 hover:bg-gray-800 rounded transition-colors opacity-0 group-hover:opacity-100"
              title="Copiar comando"
            >
              {isCopied ? (
                <Check className="h-3 w-3 text-green-400" />
              ) : (
                <Copy className="h-3 w-3 text-gray-400" />
              )}
            </button>
          )}
        </span>
      )
    }
    // Preservar saltos de línea en el texto normal
    return part.split('\n').map((line, i, arr) => (
      <span key={`${index}-${i}`}>
        {line}
        {i < arr.length - 1 && <br />}
      </span>
    ))
  })
}

/**
 * Process configuration text with better visual formatting
 * Returns a React element with the formatted configuration
 */
export function processConfigurationText(
  text: string,
  onTermClick?: (termId: string) => void
): React.ReactElement {
  const lines = text.split("\n")
  const sections: Array<{
    title: string
    items: Array<{
      type: string
      code?: string
      description?: string
      content?: string
      title?: string
    }>
  }> = []
  let currentSection: typeof sections[0] | null = null

  // Group lines into sections
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()

    if (line.startsWith("**") && line.endsWith("**")) {
      // Main section headers
      if (currentSection) {
        sections.push(currentSection)
      }
      currentSection = {
        title: line.replace(/\*\*/g, ""),
        items: [],
      }
    } else if (line.startsWith("- `") && line.includes("`")) {
      // Code examples with descriptions
      const match = line.match(/^- `([^`]+)` \(([^)]+)\)/)
      if (match && currentSection) {
        const [, code, description] = match
        currentSection.items.push({
          type: "code-with-desc",
          code,
          description,
        })
      } else if (currentSection) {
        // Simple code examples
        const code = line.replace(/^- `|`$/, "").replace(/^`|`$/, "")
        currentSection.items.push({
          type: "code",
          code,
        })
      }
    } else if (line.startsWith("**") && line.includes(":**")) {
      // Subsection headers
      if (currentSection) {
        currentSection.items.push({
          type: "subsection",
          title: line.replace(/\*\*/g, "").replace(/:\*\*$/, ""),
        })
      }
    } else if (line.includes("`") && !line.startsWith("-") && currentSection) {
      // Inline code examples
      currentSection.items.push({
        type: "inline-code",
        content: line,
      })
    } else if (
      line &&
      !line.startsWith("**") &&
      !line.startsWith("-") &&
      currentSection
    ) {
      // Regular text
      currentSection.items.push({
        type: "text",
        content: line,
      })
    }
  }

  if (currentSection) {
    sections.push(currentSection)
  }

  // Render sections in columns
  return React.createElement(
    "div",
    { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" },
    sections.map((section, sectionIndex) =>
      React.createElement(
        "div",
        { key: sectionIndex, className: "space-y-3" },
        // Section Header
        React.createElement(
          "div",
          { className: "flex items-center gap-2 mb-3" },
          React.createElement("div", {
            className: "w-2 h-2 bg-accent rounded-full",
          }),
          React.createElement(
            "h5",
            { className: "font-semibold text-accent text-base" },
            section.title
          )
        ),
        // Section Items
        React.createElement(
          "div",
          { className: "space-y-2" },
          section.items.map((item, itemIndex) => {
            if (item.type === "code-with-desc") {
              return React.createElement(
                "div",
                {
                  key: itemIndex,
                  className:
                    "flex items-start gap-2 p-2 bg-background/50 rounded-lg border border-border/30",
                },
                React.createElement(
                  "code",
                  {
                    className:
                      "bg-accent/10 text-accent px-2 py-1 rounded text-xs font-mono flex-shrink-0",
                  },
                  item.code
                ),
                React.createElement(
                  "span",
                  { className: "text-muted-foreground text-xs" },
                  item.description
                )
              )
            } else if (item.type === "code") {
              return React.createElement(
                "div",
                { key: itemIndex, className: "flex items-center gap-2" },
                React.createElement("div", {
                  className: "w-1 h-1 bg-muted-foreground rounded-full",
                }),
                React.createElement(
                  "code",
                  {
                    className:
                      "bg-accent/10 text-accent px-2 py-1 rounded text-xs font-mono",
                  },
                  item.code
                )
              )
            } else if (item.type === "subsection") {
              return React.createElement(
                "div",
                { key: itemIndex, className: "flex items-center gap-2 mt-3" },
                React.createElement("div", {
                  className: "w-1 h-1 bg-muted-foreground rounded-full",
                }),
                React.createElement(
                  "h6",
                  { className: "font-medium text-foreground text-sm" },
                  item.title
                )
              )
            } else if (item.type === "inline-code") {
              const processedLine = item.content!.replace(
                /`([^`]+)`/g,
                '<code class="bg-accent/10 text-accent px-1 py-0.5 rounded text-xs font-mono">$1</code>'
              )
              return React.createElement("div", {
                key: itemIndex,
                className: "text-xs text-muted-foreground",
                dangerouslySetInnerHTML: { __html: processedLine },
              })
            } else if (item.type === "text") {
              return React.createElement(
                "p",
                {
                  key: itemIndex,
                  className: "text-xs text-muted-foreground leading-relaxed",
                },
                item.content
              )
            }
            return null
          })
        )
      )
    )
  )
}

