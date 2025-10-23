"use client"

interface StructuredExampleProps {
  content: string
}

interface Section {
  title: string
  whatItIs?: string
  howItWorks?: string
  useCase?: string
  whatItIsUsedFor?: string
  howItLooks?: string
}

export function StructuredExample({ content }: StructuredExampleProps) {
  // Parse the content into sections
  const sections: Section[] = []
  const parts = content.split('---').map(p => p.trim()).filter(p => p)

  parts.forEach(part => {
    const lines = part.split('\n').filter(l => l.trim())
    if (lines.length === 0) return

    const title = lines[0].trim()
    let whatItIs = ''
    let howItWorks = ''
    let useCase = ''
    let whatItIsUsedFor = ''
    let howItLooks = ''
    let currentSection = ''
    let inCodeBlock = false

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim()
      
      if (line.startsWith('Qué es:')) {
        currentSection = 'whatItIs'
        continue
      } else if (line.startsWith('Cómo funciona:')) {
        currentSection = 'howItWorks'
        continue
      } else if (line.startsWith('Caso de uso:')) {
        currentSection = 'useCase'
        continue
      } else if (line.startsWith('Para qué se usa:')) {
        currentSection = 'whatItIsUsedFor'
        continue
      } else if (line.startsWith('Cómo se ve:')) {
        currentSection = 'howItLooks'
        continue
      }

      // Handle code blocks
      if (line.includes('```')) {
        inCodeBlock = !inCodeBlock
        if (currentSection === 'howItLooks') {
          howItLooks += (howItLooks ? '\n' : '') + line
        }
        continue
      }

      if (currentSection === 'whatItIs') {
        whatItIs += (whatItIs ? ' ' : '') + line
      } else if (currentSection === 'howItWorks') {
        howItWorks += (howItWorks ? ' ' : '') + line
      } else if (currentSection === 'useCase') {
        useCase += (useCase ? ' ' : '') + line
      } else if (currentSection === 'whatItIsUsedFor') {
        whatItIsUsedFor += (whatItIsUsedFor ? ' ' : '') + line
      } else if (currentSection === 'howItLooks') {
        howItLooks += (howItLooks ? '\n' : '') + line
      }
    }

    if (title && (whatItIs || howItWorks || useCase || whatItIsUsedFor || howItLooks)) {
      sections.push({ title, whatItIs, howItWorks, useCase, whatItIsUsedFor, howItLooks })
    }
  })

  return (
    <div className="space-y-4 md:space-y-5">
      {sections.map((section, index) => (
        <div 
          key={index} 
          className="bg-gradient-to-r from-accent/5 to-accent/10 border border-accent/30 rounded-xl p-3 md:p-4 space-y-2 md:space-y-3"
        >
          {/* Title with emoji */}
          <h5 className="text-sm md:text-base font-semibold text-foreground flex items-center gap-2">
            {section.title}
          </h5>

          {/* What it is */}
          {section.whatItIs && (
            <div className="space-y-1">
              <p className="text-xs font-medium text-accent">
                Qué es:
              </p>
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed pl-3 border-l-2 border-accent/30">
                {section.whatItIs}
              </p>
            </div>
          )}

          {/* How it works */}
          {section.howItWorks && (
            <div className="space-y-1">
              <p className="text-xs font-medium text-accent">
                Cómo funciona:
              </p>
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed pl-3 border-l-2 border-accent/30">
                {section.howItWorks}
              </p>
            </div>
          )}

          {/* What it is used for */}
          {section.whatItIsUsedFor && (
            <div className="space-y-1">
              <p className="text-xs font-medium text-accent">
                Para qué se usa:
              </p>
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed pl-3 border-l-2 border-accent/30">
                {section.whatItIsUsedFor}
              </p>
            </div>
          )}

          {/* Use case */}
          {section.useCase && (
            <div className="space-y-1">
              <p className="text-xs font-medium text-accent">
                Caso de uso:
              </p>
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed pl-3 border-l-2 border-accent/30">
                {section.useCase}
              </p>
            </div>
          )}

          {/* How it looks (code) */}
          {section.howItLooks && (
            <div className="space-y-1">
              <p className="text-xs font-medium text-accent">
                Cómo se ve:
              </p>
              <div className="bg-slate-900 text-slate-100 p-3 md:p-4 rounded-lg overflow-x-auto">
                <pre className="text-xs md:text-sm font-mono whitespace-pre-wrap">
                  {section.howItLooks.replace(/```javascript\n?/g, '').replace(/```\n?/g, '').trim()}
                </pre>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

