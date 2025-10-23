"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, LogOut, Code2, Info, Monitor } from "lucide-react"

export default function DevToolsPage() {
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_OUT') {
          router.push('/login')
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [router, supabase])

  const handleBackToGlossary = () => {
    router.push('/dashboard/glossary/development')
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/50 bg-card/30 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-3 md:px-4 py-3 md:py-4">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 md:gap-4 min-w-0 flex-1">
              <Button
                onClick={handleBackToGlossary}
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground shrink-0"
              >
                <ArrowLeft className="h-4 w-4 md:mr-2" />
                <span className="hidden sm:inline">Volver al Glosario</span>
              </Button>
              <div className="hidden sm:block h-6 w-px bg-border" />
              <div className="flex items-center gap-2 md:gap-3 min-w-0">
                <img
                  src="/images/udesa-png.svg"
                  alt="Universidad de San Andrés"
                  className="h-6 md:h-8 w-auto shrink-0"
                />
                <h1 className="text-sm md:text-xl font-semibold text-foreground truncate">
                  <span className="hidden md:inline">Dev Tools del Navegador</span>
                  <span className="md:hidden">Dev Tools</span>
                </h1>
              </div>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              size="sm"
              className="text-muted-foreground hover:text-foreground shrink-0 ml-2"
            >
              <LogOut className="h-4 w-4 md:mr-2" />
              <span className="hidden sm:inline">Cerrar sesión</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-3 md:px-4 py-6 md:py-8">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="mb-6 md:mb-8">
            <div className="flex items-center gap-3 mb-3 md:mb-4">
              <div className="p-2 md:p-3 bg-primary/10 rounded-lg">
                <Code2 className="h-6 w-6 md:h-8 md:w-8 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  🔧 Guía Básica: Dev Tools del Navegador
                </h2>
                <Badge variant="secondary" className="bg-primary/10 text-primary text-xs mt-2">
                  Esencial para VibeCoding
                </Badge>
              </div>
            </div>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              Herramientas esenciales para ver errores y entender qué pasa en tu aplicación web
            </p>
          </div>

          {/* Content */}
          <div className="space-y-4 md:space-y-6">
            {/* Introduction */}
            <Card>
              <CardContent className="p-4 md:p-6">
                <h3 className="font-semibold text-base md:text-lg mb-2">¿Qué son las Dev Tools?</h3>
                <p className="text-muted-foreground mb-2 md:mb-3 text-sm md:text-base">
                  Las Developer Tools (Herramientas de Desarrollo) son un conjunto de herramientas integradas en tu navegador que te permiten ver "detrás de escena" de cualquier sitio web. 
                  Son como una ventana de inspección que te ayuda a entender qué está pasando en tu aplicación.
                </p>
                <p className="text-xs md:text-sm text-muted-foreground">
                  💡 <strong>¿Por qué son importantes?</strong> Cuando trabajas con IA para crear aplicaciones web, las Dev Tools te muestran los errores que pueden estar rompiendo tu app. 
                  Sin ellas, sería como tratar de arreglar un auto con el capó cerrado.
                </p>
              </CardContent>
            </Card>

            {/* Cómo Abrir las Dev Tools */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                  <Monitor className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                  Cómo Abrir las Dev Tools
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Windows */}
                <div className="bg-accent/5 rounded-lg p-3 md:p-4 border border-accent/20">
                  <div className="flex items-start gap-2 md:gap-3 mb-3">
                    <Badge className="bg-blue-100 text-blue-800 border-blue-200 shrink-0">Windows</Badge>
                    <h4 className="font-semibold text-sm md:text-base">En computadoras Windows</h4>
                  </div>
                  <div className="space-y-2 text-xs md:text-sm text-muted-foreground">
                    <div className="flex items-start gap-2">
                      <span className="text-primary font-semibold shrink-0">Opción 1:</span>
                      <div>
                        Presiona la tecla <kbd className="px-1.5 md:px-2 py-0.5 md:py-1 bg-background border border-border rounded text-xs font-mono">F12</kbd>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-primary font-semibold shrink-0">Opción 2:</span>
                      <div>
                        Presiona <kbd className="px-1.5 md:px-2 py-0.5 md:py-1 bg-background border border-border rounded text-xs font-mono">Ctrl</kbd> + 
                        <kbd className="px-1.5 md:px-2 py-0.5 md:py-1 bg-background border border-border rounded text-xs font-mono ml-1">Shift</kbd> + 
                        <kbd className="px-1.5 md:px-2 py-0.5 md:py-1 bg-background border border-border rounded text-xs font-mono ml-1">I</kbd>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-primary font-semibold shrink-0">Opción 3:</span>
                      <div>
                        Haz clic derecho en cualquier parte de la página → Selecciona <strong>"Inspeccionar"</strong> o <strong>"Inspect"</strong>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mac */}
                <div className="bg-accent/5 rounded-lg p-3 md:p-4 border border-accent/20">
                  <div className="flex items-start gap-2 md:gap-3 mb-3">
                    <Badge className="bg-purple-100 text-purple-800 border-purple-200 shrink-0">Mac</Badge>
                    <h4 className="font-semibold text-sm md:text-base">En computadoras Mac</h4>
                  </div>
                  <div className="space-y-2 text-xs md:text-sm text-muted-foreground">
                    <div className="flex items-start gap-2">
                      <span className="text-primary font-semibold shrink-0">Opción 1:</span>
                      <div>
                        Presiona <kbd className="px-1.5 md:px-2 py-0.5 md:py-1 bg-background border border-border rounded text-xs font-mono">Cmd</kbd> + 
                        <kbd className="px-1.5 md:px-2 py-0.5 md:py-1 bg-background border border-border rounded text-xs font-mono ml-1">Option</kbd> + 
                        <kbd className="px-1.5 md:px-2 py-0.5 md:py-1 bg-background border border-border rounded text-xs font-mono ml-1">I</kbd>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-primary font-semibold shrink-0">Opción 2:</span>
                      <div>
                        Presiona <kbd className="px-1.5 md:px-2 py-0.5 md:py-1 bg-background border border-border rounded text-xs font-mono">Cmd</kbd> + 
                        <kbd className="px-1.5 md:px-2 py-0.5 md:py-1 bg-background border border-border rounded text-xs font-mono ml-1">Option</kbd> + 
                        <kbd className="px-1.5 md:px-2 py-0.5 md:py-1 bg-background border border-border rounded text-xs font-mono ml-1">J</kbd> (para abrir directo en la Consola)
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-primary font-semibold shrink-0">Opción 3:</span>
                      <div>
                        Haz clic derecho en cualquier parte de la página → Selecciona <strong>"Inspeccionar"</strong> o <strong>"Inspect Element"</strong>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Importante Info */}
            <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 rounded-lg p-3 md:p-4">
              <div className="flex items-start gap-2 md:gap-3">
                <Info className="h-4 w-4 md:h-5 md:w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                <div className="text-xs md:text-sm">
                  <p className="text-amber-900 dark:text-amber-100 mb-2">
                    <strong>Nota importante:</strong> Estas instrucciones funcionan en los navegadores más comunes (Chrome, Edge, Firefox, Safari). 
                    Si no te funciona alguna combinación de teclas, usa la opción del clic derecho → Inspeccionar.
                  </p>
                </div>
              </div>
            </div>

            {/* Pestañas Principales */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg md:text-xl">Pestañas que Debes Conocer</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Console */}
                <div className="bg-background rounded-lg p-3 md:p-4 border border-border/50">
                  <div className="flex items-start gap-2 md:gap-3">
                    <div className="bg-red-100 dark:bg-red-950/30 rounded-lg p-2 shrink-0">
                      <span className="text-red-600 dark:text-red-400 font-mono text-xs md:text-sm font-bold">❯_</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm md:text-base mb-1 md:mb-2">Console (Consola)</h4>
                      <p className="text-xs md:text-sm text-muted-foreground mb-2">
                        <strong>La más importante para vibecoding.</strong> Aquí aparecen los errores de tu aplicación. 
                        Los errores en rojo son problemas que debes solucionar. Las advertencias en amarillo son menos urgentes.
                      </p>
                      <div className="bg-muted/30 rounded p-2 text-xs md:text-sm border border-border/30">
                        <p className="text-muted-foreground mb-1">
                          <strong>Úsala para:</strong>
                        </p>
                        <ul className="text-muted-foreground space-y-0.5 pl-4 list-disc">
                          <li>Ver mensajes de error que te diga tu código o la IA</li>
                          <li>Copiar el error completo para dárselo a la IA y que lo arregle</li>
                          <li>Ver mensajes que pusiste con <code className="px-1 py-0.5 bg-background rounded text-xs">console.log()</code></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Elements */}
                <div className="bg-background rounded-lg p-3 md:p-4 border border-border/50">
                  <div className="flex items-start gap-2 md:gap-3">
                    <div className="bg-blue-100 dark:bg-blue-950/30 rounded-lg p-2 shrink-0">
                      <span className="text-blue-600 dark:text-blue-400 font-mono text-xs md:text-sm font-bold">&lt;/&gt;</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm md:text-base mb-1 md:mb-2">Elements (Elementos) o Inspector</h4>
                      <p className="text-xs md:text-sm text-muted-foreground mb-2">
                        Te muestra el HTML y CSS de la página. Puedes ver cómo está estructurada tu app y qué estilos tiene cada elemento.
                      </p>
                      <div className="bg-muted/30 rounded p-2 text-xs md:text-sm border border-border/30">
                        <p className="text-muted-foreground mb-1">
                          <strong>Úsala para:</strong>
                        </p>
                        <ul className="text-muted-foreground space-y-0.5 pl-4 list-disc">
                          <li>Ver si los elementos existen en tu página</li>
                          <li>Inspeccionar colores, tamaños y estilos</li>
                          <li>Copiar el HTML/CSS para mostrárselo a la IA</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Network */}
                <div className="bg-background rounded-lg p-3 md:p-4 border border-border/50">
                  <div className="flex items-start gap-2 md:gap-3">
                    <div className="bg-green-100 dark:bg-green-950/30 rounded-lg p-2 shrink-0">
                      <span className="text-green-600 dark:text-green-400 font-mono text-xs md:text-sm font-bold">⚡</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm md:text-base mb-1 md:mb-2">Network (Red)</h4>
                      <p className="text-xs md:text-sm text-muted-foreground mb-2">
                        Muestra todas las peticiones que hace tu app (a APIs, bases de datos, etc.). 
                        Si algo no carga, aquí verás qué falló.
                      </p>
                      <div className="bg-muted/30 rounded p-2 text-xs md:text-sm border border-border/30">
                        <p className="text-muted-foreground mb-1">
                          <strong>Úsala para:</strong>
                        </p>
                        <ul className="text-muted-foreground space-y-0.5 pl-4 list-disc">
                          <li>Ver si las peticiones a tu API funcionan</li>
                          <li>Identificar errores 404 (no encontrado) o 500 (error del servidor)</li>
                          <li>Ver qué datos está enviando y recibiendo tu app</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Application/Storage */}
                <div className="bg-background rounded-lg p-3 md:p-4 border border-border/50">
                  <div className="flex items-start gap-2 md:gap-3">
                    <div className="bg-purple-100 dark:bg-purple-950/30 rounded-lg p-2 shrink-0">
                      <span className="text-purple-600 dark:text-purple-400 font-mono text-xs md:text-sm font-bold">💾</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm md:text-base mb-1 md:mb-2">Application (Chrome) o Storage (Firefox)</h4>
                      <p className="text-xs md:text-sm text-muted-foreground mb-2">
                        Te permite ver y gestionar datos que tu app guarda en el navegador: cookies, localStorage, sesiones, etc.
                      </p>
                      <div className="bg-muted/30 rounded p-2 text-xs md:text-sm border border-border/30">
                        <p className="text-muted-foreground mb-1">
                          <strong>Úsala para:</strong>
                        </p>
                        <ul className="text-muted-foreground space-y-0.5 pl-4 list-disc">
                          <li>Ver si tu app está guardando datos correctamente</li>
                          <li>Borrar datos guardados para probar de nuevo</li>
                          <li>Ver cookies y tokens de autenticación</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Workflow con IA */}
            <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary/20">
              <CardHeader>
                <CardTitle className="text-lg md:text-xl flex items-center gap-2">
                  <span>🤖</span>
                  Workflow: Cómo usar Dev Tools con tu IA
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 md:space-y-3 text-xs md:text-sm">
                <div className="flex items-start gap-2">
                  <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 md:w-6 md:h-6 flex items-center justify-center text-xs md:text-sm font-bold shrink-0">1</span>
                  <p className="text-muted-foreground pt-0.5">
                    <strong>Abre tu app en el navegador</strong> y presiona <kbd className="px-1.5 py-0.5 bg-background border border-border rounded text-xs">F12</kbd> para abrir Dev Tools
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 md:w-6 md:h-6 flex items-center justify-center text-xs md:text-sm font-bold shrink-0">2</span>
                  <p className="text-muted-foreground pt-0.5">
                    <strong>Ve a la pestaña Console</strong> (Consola) y busca mensajes en rojo (errores)
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 md:w-6 md:h-6 flex items-center justify-center text-xs md:text-sm font-bold shrink-0">3</span>
                  <p className="text-muted-foreground pt-0.5">
                    <strong>Si ves un error,</strong> selecciónalo y cópialo completo (clic derecho → Copy)
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 md:w-6 md:h-6 flex items-center justify-center text-xs md:text-sm font-bold shrink-0">4</span>
                  <p className="text-muted-foreground pt-0.5">
                    <strong>Pégale el error a tu IA</strong> (Cursor, ChatGPT, Claude, etc.) y pídele que lo arregle: <em>"Tengo este error en la consola, ¿puedes ayudarme a solucionarlo?"</em>
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 md:w-6 md:h-6 flex items-center justify-center text-xs md:text-sm font-bold shrink-0">5</span>
                  <p className="text-muted-foreground pt-0.5">
                    <strong>Aplica la solución</strong> que te dé la IA y recarga la página para verificar que el error desapareció
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Tips Finales */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base md:text-lg">💡 Tips Importantes</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1.5 md:space-y-2 text-xs md:text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary shrink-0">•</span>
                    <span><strong>No te asustes</strong> si ves muchos mensajes en la consola. Enfócate solo en los errores en rojo.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary shrink-0">•</span>
                    <span><strong>Recarga la página</strong> después de hacer cambios para ver si los errores desaparecieron.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary shrink-0">•</span>
                    <span><strong>Las Dev Tools no rompen nada.</strong> Puedes explorar tranquilo, no vas a dañar tu app desde ahí.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary shrink-0">•</span>
                    <span><strong>Usa Ctrl+Shift+C</strong> (Windows) o <strong>Cmd+Shift+C</strong> (Mac) para activar el modo inspector y hacer clic en cualquier elemento de la página para ver su código.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary shrink-0">•</span>
                    <span><strong>Limpia la consola</strong> haciendo clic en el ícono de 🚫 o escribiendo <code className="px-1 py-0.5 bg-background rounded text-xs">clear()</code> y presionando Enter.</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Footer Note */}
            <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 rounded-lg p-3 md:p-4">
              <div className="flex items-start gap-2 md:gap-3">
                <Info className="h-4 w-4 md:h-5 md:w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <div className="text-xs md:text-sm">
                  <p className="text-blue-900 dark:text-blue-100">
                    <strong>Recuerda:</strong> Las Dev Tools son tu mejor amigo cuando trabajas con IA en desarrollo web. 
                    La mayoría de los problemas se pueden identificar rápidamente mirando la consola. 
                    ¡Acostúmbrate a tenerlas siempre abiertas mientras desarrollas!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

