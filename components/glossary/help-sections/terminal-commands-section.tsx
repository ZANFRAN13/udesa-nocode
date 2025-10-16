"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, ChevronRight, Terminal, Info } from "lucide-react"

export function TerminalCommandsSection() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Card className="mb-6 md:mb-8 border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-background overflow-hidden group hover:bg-primary/10 transition-all duration-200">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="w-full">
          <CardHeader className="cursor-pointer p-4 md:p-6">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 md:gap-3 min-w-0 flex-1">
                <div className="p-1.5 md:p-2 bg-primary/10 rounded-lg shrink-0">
                  <Terminal className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                </div>
                <div className="text-left min-w-0">
                  <CardTitle className="text-base md:text-xl">🚀 Guía Rápida: Comandos de Terminal</CardTitle>
                  <p className="text-xs md:text-sm text-muted-foreground mt-1 line-clamp-2">
                    Los comandos esenciales para trabajar con IA y crear aplicaciones
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 md:gap-2 shrink-0">
                <Badge variant="secondary" className="bg-primary/10 text-primary text-xs hidden sm:inline-flex">
                  Para VibeCoding
                </Badge>
                {isOpen ? (
                  <ChevronDown className="h-4 w-4 md:h-5 md:w-5 text-muted-foreground" />
                ) : (
                  <ChevronRight className="h-4 w-4 md:h-5 md:w-5 text-muted-foreground" />
                )}
              </div>
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <CardContent className="space-y-4 md:space-y-6 pt-4 md:pt-6 px-4 md:px-6 pb-4 md:pb-6">
            {/* Disclaimer */}
            <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 rounded-lg p-3 md:p-4">
              <div className="flex items-start gap-2 md:gap-3">
                <Info className="h-4 w-4 md:h-5 md:w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <div className="text-xs md:text-sm">
                  <p className="text-blue-900 dark:text-blue-100">
                    <strong>Importante:</strong> Estos comandos son necesarios cuando usas herramientas como <strong>Cursor</strong> o editores de código similares. 
                    Si trabajas con plataformas como <strong>v0</strong> o <strong>Lovable</strong> (basadas en web), no necesitarás usar la terminal ya que estas herramientas se encargan de todo automáticamente.
                  </p>
                </div>
              </div>
            </div>

            {/* Introduction */}
            <div className="bg-muted/30 rounded-lg p-3 md:p-4 border border-border/50">
              <h3 className="font-semibold text-base md:text-lg mb-2">¿Qué es la Terminal?</h3>
              <p className="text-muted-foreground mb-2 md:mb-3 text-sm md:text-base">
                La terminal (o consola) es una ventana donde escribes comandos de texto para controlar tu computadora. 
                Aunque parece intimidante al principio, solo necesitas conocer unos pocos comandos básicos para trabajar con IA y crear tus apps.
              </p>
              <p className="text-xs md:text-sm text-muted-foreground">
                💡 <strong>Tip:</strong> Copia y pega los comandos directamente. Presiona <kbd className="px-1.5 md:px-2 py-0.5 md:py-1 bg-background border border-border rounded text-xs">Enter</kbd> para ejecutarlos.
              </p>
            </div>

            {/* Commands Grid */}
            <div className="grid gap-3 md:gap-4 grid-cols-1 md:grid-cols-2">
              {/* Navegación */}
              <div className="space-y-2 md:space-y-3">
                <h4 className="font-semibold text-sm md:text-base flex items-center gap-2">
                  📁 Navegación
                </h4>
                
                <div className="bg-card border border-border rounded-lg p-2 md:p-3 space-y-2">
                  <div className="flex items-start gap-2">
                    <code className="text-xs md:text-sm bg-primary/10 px-1.5 md:px-2 py-0.5 md:py-1 rounded text-primary font-mono flex-shrink-0">ls</code>
                    <p className="text-xs md:text-sm text-muted-foreground">Ver qué archivos tienes en la carpeta actual</p>
                  </div>
                </div>

                <div className="bg-card border border-border rounded-lg p-2 md:p-3 space-y-2">
                  <div className="flex items-start gap-2">
                    <code className="text-xs md:text-sm bg-primary/10 px-1.5 md:px-2 py-0.5 md:py-1 rounded text-primary font-mono flex-shrink-0">cd carpeta</code>
                    <p className="text-xs md:text-sm text-muted-foreground">Entrar a una carpeta. Usa <code className="text-xs bg-muted px-1 rounded">cd ..</code> para volver atrás</p>
                  </div>
                </div>
              </div>

              {/* NPM */}
              <div className="space-y-2 md:space-y-3">
                <h4 className="font-semibold text-sm md:text-base flex items-center gap-2">
                  📦 Instalar y Ejecutar
                </h4>
                
                <div className="bg-card border border-border rounded-lg p-2 md:p-3 space-y-2">
                  <div className="flex items-start gap-2">
                    <code className="text-xs md:text-sm bg-primary/10 px-1.5 md:px-2 py-0.5 md:py-1 rounded text-primary font-mono flex-shrink-0">npm i</code>
                    <p className="text-xs md:text-sm text-muted-foreground">Instalar todo lo que el proyecto necesita (puede tardar unos minutos)</p>
                  </div>
                </div>

                <div className="bg-card border border-border rounded-lg p-2 md:p-3 space-y-2">
                  <div className="flex items-start gap-2">
                    <code className="text-xs md:text-sm bg-primary/10 px-1.5 md:px-2 py-0.5 md:py-1 rounded text-primary font-mono flex-shrink-0">npm run dev</code>
                    <p className="text-xs md:text-sm text-muted-foreground">Iniciar tu app para verla en el navegador (localhost:3000)</p>
                  </div>
                </div>
              </div>

              {/* Git - Status & Add */}
              <div className="space-y-2 md:space-y-3">
                <h4 className="font-semibold text-sm md:text-base flex items-center gap-2">
                  🔍 Revisar Cambios
                </h4>
                
                <div className="bg-card border border-border rounded-lg p-2 md:p-3 space-y-2">
                  <div className="flex items-start gap-2">
                    <code className="text-xs md:text-sm bg-primary/10 px-1.5 md:px-2 py-0.5 md:py-1 rounded text-primary font-mono flex-shrink-0">git status</code>
                    <p className="text-xs md:text-sm text-muted-foreground">Ver qué archivos modificaste</p>
                  </div>
                </div>

                <div className="bg-card border border-border rounded-lg p-2 md:p-3 space-y-2">
                  <div className="flex items-start gap-2">
                    <code className="text-xs md:text-sm bg-primary/10 px-1.5 md:px-2 py-0.5 md:py-1 rounded text-primary font-mono flex-shrink-0">git add .</code>
                    <p className="text-xs md:text-sm text-muted-foreground">Preparar TODOS tus cambios para guardarlos</p>
                  </div>
                </div>
              </div>

              {/* Git - Commit & Push */}
              <div className="space-y-2 md:space-y-3">
                <h4 className="font-semibold text-sm md:text-base flex items-center gap-2">
                  💾 Guardar y Compartir
                </h4>
                
                <div className="bg-card border border-border rounded-lg p-2 md:p-3 space-y-2">
                  <div className="flex flex-col gap-1">
                    <code className="text-xs md:text-sm bg-primary/10 px-1.5 md:px-2 py-0.5 md:py-1 rounded text-primary font-mono w-fit overflow-x-auto max-w-full">git commit -m "mensaje"</code>
                    <p className="text-xs md:text-sm text-muted-foreground">Guardar cambios con una descripción</p>
                    <p className="text-xs text-muted-foreground/70">Ej: "Agregué login" o "Corregí error del formulario"</p>
                  </div>
                </div>

                <div className="bg-card border border-border rounded-lg p-2 md:p-3 space-y-2">
                  <div className="flex items-start gap-2">
                    <code className="text-xs md:text-sm bg-primary/10 px-1.5 md:px-2 py-0.5 md:py-1 rounded text-primary font-mono flex-shrink-0">git push</code>
                    <p className="text-xs md:text-sm text-muted-foreground">Subir tus cambios a GitHub (la nube)</p>
                  </div>
                </div>

                <div className="bg-card border border-border rounded-lg p-2 md:p-3 space-y-2">
                  <div className="flex items-start gap-2">
                    <code className="text-xs md:text-sm bg-primary/10 px-1.5 md:px-2 py-0.5 md:py-1 rounded text-primary font-mono flex-shrink-0">git pull</code>
                    <p className="text-xs md:text-sm text-muted-foreground">Descargar los últimos cambios del equipo</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Workflow Example */}
            <div className="bg-primary/5 border-2 border-primary/20 rounded-lg p-3 md:p-4">
              <h4 className="font-semibold text-sm md:text-base mb-2 md:mb-3 flex items-center gap-2">
                🔄 Flujo de Trabajo Típico
              </h4>
              <div className="space-y-1.5 md:space-y-2 text-xs md:text-sm">
                <div className="flex items-start gap-2 md:gap-3">
                  <span className="text-primary font-bold flex-shrink-0">1.</span>
                  <p><code className="bg-background px-1.5 md:px-2 py-0.5 rounded text-xs mr-1 overflow-x-auto max-w-full inline-block">cd mi-proyecto</code> - Entrar a tu proyecto</p>
                </div>
                <div className="flex items-start gap-2 md:gap-3">
                  <span className="text-primary font-bold flex-shrink-0">2.</span>
                  <p><code className="bg-background px-1.5 md:px-2 py-0.5 rounded text-xs mr-1">git pull</code> - Traer últimos cambios</p>
                </div>
                <div className="flex items-start gap-2 md:gap-3">
                  <span className="text-primary font-bold flex-shrink-0">3.</span>
                  <p><code className="bg-background px-1.5 md:px-2 py-0.5 rounded text-xs mr-1">npm run dev</code> - Iniciar tu app</p>
                </div>
                <div className="flex items-start gap-2 md:gap-3">
                  <span className="text-primary font-bold flex-shrink-0">4.</span>
                  <p className="text-muted-foreground">Trabajar con la IA y hacer cambios... 🤖</p>
                </div>
                <div className="flex items-start gap-2 md:gap-3">
                  <span className="text-primary font-bold flex-shrink-0">5.</span>
                  <p><code className="bg-background px-1.5 md:px-2 py-0.5 rounded text-xs mr-1">git add .</code> - Preparar cambios</p>
                </div>
                <div className="flex items-start gap-2 md:gap-3">
                  <span className="text-primary font-bold flex-shrink-0">6.</span>
                  <p><code className="bg-background px-1.5 md:px-2 py-0.5 rounded text-xs mr-1 overflow-x-auto max-w-full inline-block">git commit -m "Descripción"</code> - Guardar</p>
                </div>
                <div className="flex items-start gap-2 md:gap-3">
                  <span className="text-primary font-bold flex-shrink-0">7.</span>
                  <p><code className="bg-background px-1.5 md:px-2 py-0.5 rounded text-xs mr-1">git push</code> - Subir a GitHub ✨</p>
                </div>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-900 rounded-lg p-3 md:p-4">
              <h4 className="font-semibold text-sm md:text-base mb-2 flex items-center gap-2">
                💡 Consejos
              </h4>
              <ul className="space-y-1 text-xs md:text-sm text-muted-foreground">
                <li>• Si un comando no funciona, verifica que estés en la carpeta correcta del proyecto</li>
                <li>• Usa <kbd className="px-1.5 py-0.5 bg-background border border-border rounded text-xs">Tab</kbd> para autocompletar nombres de carpetas y archivos</li>
                <li>• Presiona <kbd className="px-1.5 py-0.5 bg-background border border-border rounded text-xs">Ctrl + C</kbd> para detener un comando que está corriendo</li>
                <li>• Puedes copiar errores de la terminal y pegarlos en el chat de la IA para que te ayude</li>
              </ul>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  )
}

