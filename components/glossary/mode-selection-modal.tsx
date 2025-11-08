"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X, Sparkles, Compass } from "lucide-react"

interface ModeSelectionModalProps {
  onSelectMode: (mode: 'tutor' | 'brujula') => void
  onClose: () => void
  showTutorMode?: boolean
}

export function ModeSelectionModal({ onSelectMode, onClose, showTutorMode = true }: ModeSelectionModalProps) {
  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl bg-background shadow-2xl border-2 border-accent/20 relative">
          {/* Close Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="absolute top-4 right-4 h-8 w-8 p-0 rounded-full hover:bg-accent/10"
          >
            <X className="h-4 w-4" />
          </Button>

          {/* Content */}
          <div className="p-6 md:p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              {showTutorMode ? '¿Cómo te puedo ayudar?' : 'Buscador de Contenido'}
            </h2>
            <p className="text-muted-foreground text-sm md:text-base">
              {showTutorMode ? 'Elegí el tipo de asistencia que necesitás' : 'Te ayudo a encontrar lo que buscás en la plataforma'}
            </p>
          </div>

            {/* Mode Cards */}
          <div className={`grid ${showTutorMode ? 'md:grid-cols-2' : 'md:grid-cols-1 max-w-md mx-auto'} gap-4 md:gap-6`}>
              {/* Tutor Mode - Solo mostrar si showTutorMode es true */}
              {showTutorMode && (
                <button
                onClick={() => onSelectMode('tutor')}
                className="group relative overflow-hidden rounded-lg border-2 border-border hover:border-purple-500 transition-all duration-300 hover:shadow-xl hover:scale-105 p-6 text-left bg-card hover:bg-accent/5"
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl group-hover:scale-110 transition-transform">
                    <Sparkles className="h-8 w-8 text-white" />
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Tutor IA
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Seleccioná cualquier contenido de la página y hacele preguntas a la IA sobre ese tema específico
                    </p>
                  </div>

                  <div className="space-y-2 text-xs text-muted-foreground w-full">
                    <div className="flex items-start gap-2">
                      <span className="text-purple-500 mt-0.5">✓</span>
                      <span className="text-left">Explicaciones detalladas</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-purple-500 mt-0.5">✓</span>
                      <span className="text-left">Ejemplos prácticos</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-purple-500 mt-0.5">✓</span>
                      <span className="text-left">Contexto personalizado</span>
                    </div>
                  </div>
                </div>

                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-purple-500 text-white text-xs px-2 py-1 rounded">
                  Seleccionar
                </div>
              </div>
            </button>
              )}

            {/* Brújula Mode */}
              <button
                onClick={() => onSelectMode('brujula')}
                className="group relative overflow-hidden rounded-lg border-2 border-border hover:border-blue-500 transition-all duration-300 hover:shadow-xl hover:scale-105 p-6 text-left bg-card hover:bg-accent/5"
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl group-hover:scale-110 transition-transform">
                    <Compass className="h-8 w-8 text-white" />
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Brújula
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Describí lo que necesitás y la IA te guiará hacia el contenido relevante de la plataforma
                    </p>
                  </div>

                  <div className="space-y-2 text-xs text-muted-foreground w-full">
                    <div className="flex items-start gap-2">
                      <span className="text-blue-500 mt-0.5">✓</span>
                      <span className="text-left">Navegación inteligente</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-blue-500 mt-0.5">✓</span>
                      <span className="text-left">Links directos al contenido</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-blue-500 mt-0.5">✓</span>
                      <span className="text-left">Busca en toda la app</span>
                    </div>
                  </div>
                </div>

                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-blue-500 text-white text-xs px-2 py-1 rounded">
                    Seleccionar
                  </div>
                </div>
              </button>
            </div>

            {/* Footer hint */}
            {showTutorMode && (
              <div className="mt-6 text-center">
                <p className="text-xs text-muted-foreground">
                  Podés cambiar de modo en cualquier momento
                </p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </>
  )
}

