"use client"

import { useState, useEffect } from "react"
import { Copy, Check } from "lucide-react"

const PREVIEW_LINES = 14

interface MarkdownMaterialBoxProps {
  src: string
  title: string
}

export function MarkdownMaterialBox({ src, title }: MarkdownMaterialBoxProps) {
  const [content, setContent] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [expanded, setExpanded] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    let cancelled = false

    const fetchUrl = src.startsWith("/")
      ? src
      : `/api/drive-file?id=${encodeURIComponent(src)}`

    fetch(fetchUrl)
      .then(async (res) => {
        if (!res.ok) {
          const data = await res.json().catch(() => ({}))
          throw new Error(data.error ?? "No se pudo cargar el archivo")
        }
        return res.text()
      })
      .then((text) => {
        if (!cancelled) setContent(text)
      })
      .catch((err: Error) => {
        if (!cancelled) setError(err.message)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [src])

  const copyToClipboard = async () => {
    if (!content) return
    try {
      await navigator.clipboard.writeText(content)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* ignore */
    }
  }

  const lines = content?.split("\n") ?? []
  const needsExpansion = lines.length > PREVIEW_LINES
  const previewText =
    needsExpansion && !expanded
      ? lines.slice(0, PREVIEW_LINES).join("\n") + "\n…"
      : content

  return (
    <div className="p-3 md:p-4 bg-accent/5 rounded-lg border border-accent/20">
      <div className="flex items-start justify-between gap-2 mb-2 md:mb-3">
        <h4 className="text-xs md:text-sm font-medium text-foreground">{title}</h4>
        {content && (
          <button
            type="button"
            onClick={copyToClipboard}
            className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-accent/20 hover:bg-accent/40 transition-colors shrink-0 text-xs text-foreground"
            title="Copiar contenido"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-green-600" />
                <span className="hidden sm:inline">Copiado</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="hidden sm:inline">Copiar</span>
              </>
            )}
          </button>
        )}
      </div>

      {loading && (
        <p className="text-xs md:text-sm text-muted-foreground">Cargando especificación…</p>
      )}

      {error && (
        <p className="text-xs md:text-sm text-destructive">{error}</p>
      )}

      {previewText && (
        <>
          <pre
            className={`text-[11px] md:text-xs font-mono leading-relaxed bg-zinc-950 text-zinc-100 p-3 md:p-4 rounded-lg border border-zinc-800 overflow-x-auto whitespace-pre-wrap ${
              !expanded && needsExpansion ? "max-h-52 overflow-hidden" : ""
            }`}
          >
            {previewText}
          </pre>
          {needsExpansion && (
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              className="text-xs text-primary hover:text-primary/80 mt-2 font-medium transition-colors"
            >
              {expanded ? "Ver menos" : "Ver más…"}
            </button>
          )}
        </>
      )}
    </div>
  )
}
