"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  ArrowLeft,
  LogOut,
  Monitor,
  CheckCircle,
  Play,
  Sparkles,
  Terminal,
  FolderOpen,
  Download,
  Settings,
  Globe,
  Copy,
  Check,
} from "lucide-react"

export default function CursorIntroPage() {
  const router = useRouter()
  const supabase = createClient()
  const [isLoading, setIsLoading] = useState(true)
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  // Setup auth listener only for sign out events
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

  const handleBackToDashboard = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    router.push('/dashboard')
  }

  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    await supabase.auth.signOut()
    router.push('/')
  }

  const copyToClipboard = async (code: string, identifier: string) => {
    try {
      await navigator.clipboard.writeText(code)
      setCopiedCode(identifier)
      setTimeout(() => setCopiedCode(null), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const setupSteps = [
    {
      number: 1,
      title: "Instalar Cursor, Git y NodeJS en mi computadora",
      icon: Download,
      description: "Descarga e instala las herramientas necesarias para empezar a programar. Git nos va a permitir sincronizar nuestro proyecto con GitHub y mantener un control de versiones de nuestro código. NodeJS nos va a permitir instalar librerías y ejecutar el proyecto localmente.",
      links: [
        { name: "Descargar Cursor", url: "https://cursor.com/" },
        { name: "Descargar Git", url: "https://git-scm.com/downloads/" },
        { name: "Descargar NodeJS", url: "https://nodejs.org/en/download" }
      ]
    },
    {
      number: 2,
      title: "Sincronizar Cursor con GitHub",
      icon: Settings,
      description: (
        <>
          Conecta tu cuenta de GitHub con Cursor para poder trabajar con repositorios remotos. Ve a la configuración de Cursor y conecta tu cuenta de GitHub. Para esto les recomendamos directamente registrarse con el{" "}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="underline decoration-dotted cursor-help text-primary font-medium">
                  SSO
                </span>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p className="text-xs">
                  <strong>SSO (Single Sign-On):</strong> Es un método que te permite iniciar sesión en Cursor usando tu cuenta de GitHub directamente, sin necesidad de crear una contraseña nueva. Es como entrar usando tu cuenta de GitHub.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          {" "}de GitHub en Cursor.
          <br /><br />
          <strong>¿No tenés cuenta de GitHub todavía?</strong> Creá una gratis en{" "}
          <a
            href="https://github.com/signup"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline hover:no-underline"
          >
            github.com/signup
          </a>
          {" "}antes de este paso.
        </>
      )
    },
    {
      number: 3,
      title: "Crear una carpeta vacía en mis documentos",
      icon: FolderOpen,
      description: "Esta carpeta será el lugar donde guardarás tu proyecto en tu computadora. Cuando abras Cursor te pedirá que abras una carpeta. Esa será la carpeta para abrir."
    },
    {
      number: 4,
      title: "Abrir nueva terminal bash en Cursor",
      icon: Terminal,
      description: 'La terminal es donde le das órdenes a tu computadora para ejecutar procesos como correr el proyecto localmente (en el navegador) o instalar librerías o enviar/traer cambios a GitHub. No confundir con el chat de IA. En Cursor la abrís desde el menú superior: Terminal → New Terminal (o con el atajo Ctrl + `).'
    },
    {
      number: 5,
      title: "Configurar tu identidad en Git",
      icon: Settings,
      description: (
        <>
          Este paso le dice a Git <strong>quién eres</strong>, para que cada cambio que guardes en GitHub quede firmado con tu nombre y email. Solo se hace <strong>una vez</strong> por computadora.
          <br /><br />
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="underline decoration-dotted cursor-help text-primary font-medium inline-flex items-center gap-1">
                  🤔 Pero, ¿acaso no me vinculé ya con GitHub en el paso 2?
                </span>
              </TooltipTrigger>
              <TooltipContent className="max-w-sm">
                <div className="text-xs space-y-2">
                  <p>¡Buena observación! Parecen lo mismo pero son <strong>dos cosas distintas</strong>:</p>
                  <p>
                    <strong>• Sincronizar con GitHub (paso 2 / SSO):</strong> Le da permiso a <em>Cursor</em> para hablar con tu cuenta de GitHub (ver tus repos, clonar, subir cambios). Es como darle a Cursor la llave de tu casa en GitHub.
                  </p>
                  <p>
                    <strong>• git config (este paso):</strong> Git es <em>otro</em> programa que vive en tu computadora y todavía no sabe quién sos. Cada vez que guardes un cambio, Git lo <strong>firma</strong> con el nombre y email que pongas acá. Sin esto, los cambios aparecerían sin autor o con un autor genérico.
                  </p>
                  <p className="pt-2 border-t border-border/50">
                    <strong>En criollo:</strong> uno conecta <em>Cursor ↔ GitHub</em>, el otro le pone <em>tu firma</em> a los cambios. Los dos hacen falta.
                  </p>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <br /><br />
          <strong>¿Dónde lo escribo?</strong> En la misma terminal que abriste en Cursor (la del paso 4). Copiá cada comando con el botón de copiar, pegalo en la terminal y presioná <kbd className="px-1.5 py-0.5 text-xs bg-accent/30 border border-border rounded">Enter</kbd>. Después hacé lo mismo con el segundo.
          <br /><br />
          <strong>Importante:</strong> reemplazá el texto entre comillas por tu nombre (o alias) y tu email real (usá el mismo email de tu cuenta de GitHub). Las comillas <code className="px-1 text-xs bg-accent/20 rounded">" "</code> deben quedar en el comando.
        </>
      ),
      codes: [
        'git config --global user.name "tu nombre o alias"',
        'git config --global user.email "tu@email.com"'
      ]
    },
    {
      number: 6,
      title: 'Posicionarse en la carpeta raíz',
      icon: FolderOpen,
      description: "Verificá que estás parado en la carpeta que creaste. Si no, usá la opción file/archivo en la barra de herramientas para abrir la carpeta nueva y posicionarte en ella.",
    },
    {
      number: 7,
      title: "Copiar el URL del repositorio en GitHub y clonarlo en Cursor",
      icon: Download,
      description: (
        <>
          Esto descarga el código del proyecto desde GitHub a tu computadora. El <strong>URL</strong> lo sacás del repositorio en GitHub haciendo click en el botón verde <strong>"Code"</strong> → pestaña <strong>HTTPS</strong> → copiar.
          <br /><br />
          Reemplazá la palabra <code className="px-1 text-xs bg-accent/20 rounded">URL</code> en el comando por el link que copiaste (algo como <code className="px-1 text-xs bg-accent/20 rounded">https://github.com/usuario/proyecto.git</code>).
        </>
      ),
      code: "git clone URL"
    },
    {
      number: 8,
      title: "Entrar en la carpeta del proyecto clonado",
      icon: FolderOpen,
      description: (
        <>
          Cuando clonaste el repositorio, Git creó una <strong>nueva carpeta</strong> con el nombre del proyecto dentro de la carpeta donde estabas. Ahora tenés que meterte en esa nueva carpeta para poder trabajar con ella.
          <br /><br />
          El nombre del proyecto lo ves en el panel de archivos de Cursor (a la izquierda), o es la última parte del URL que clonaste. Reemplazá <code className="px-1 text-xs bg-accent/20 rounded">nombreDelProyecto</code> en el comando.
        </>
      ),
      code: "cd nombreDelProyecto"
    },
    {
      number: 9,
      title: "Instalar librerías",
      icon: Settings,
      description: "Las librerías son paquetes de código que tu proyecto necesita para funcionar. Este comando lee la lista de librerías del proyecto y las descarga todas de una. Puede tardar unos minutos la primera vez.",
      code: "npm install"
    }
  ]

  const additionalSteps = [
    {
      number: 10,
      title: "Determinar reglas de usuario y de proyecto en Cursor",
      icon: Settings,
      description: "Define cómo quieres que la IA te ayude en tu proyecto."
    },
    {
      number: 11,
      title: "Correr proyecto en el navegador para hacer pruebas",
      icon: Globe,
      description: "Inicia el servidor local para ver tu proyecto en acción.",
      code: "npm run dev",
      extra: 'Luego en el navegador entra a "http://localhost:3000/" o el número de puerto que aparezca en la terminal.'
    }
  ]

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
        <div className="text-center">
          <img src="/images/udesa-logo-black-v.jpg" alt="UdeSA" className="h-28 w-auto animate-udesa-in" />
          <p className="text-gray-300 mt-4">Cargando...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/50 bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto px-3 md:px-4 py-3 md:py-4">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 md:gap-4 min-w-0 flex-1">
              <Button
                type="button"
                onClick={handleBackToDashboard}
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground shrink-0"
              >
                <ArrowLeft className="h-4 w-4 md:mr-2" />
                <span className="hidden sm:inline">Volver al Dashboard</span>
              </Button>
              <div className="hidden sm:block h-6 w-px bg-border" />
              <div className="flex items-center gap-2 md:gap-3 min-w-0">
                <img
                  src="/images/udesa-png.svg"
                  alt="Universidad de San Andrés"
                  className="h-6 md:h-8 w-auto shrink-0"
                />
                <h1 className="text-sm md:text-xl font-semibold text-foreground truncate">
                  <span className="hidden md:inline">Introducción Básica a Cursor</span>
                  <span className="md:hidden">Intro a Cursor</span>
                </h1>
              </div>
            </div>
            <Button
              type="button"
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
          {/* Introduction */}
          <div className="mb-8 md:mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl">
                <Monitor className="h-6 w-6 md:h-8 md:w-8 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  ¿Qué es Cursor?
                </h2>
                <p className="text-sm md:text-base text-muted-foreground mt-1">
                  Tu editor de código potenciado con inteligencia artificial
                </p>
              </div>
            </div>
            
            <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-background">
              <CardContent className="pt-6">
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Cursor es tu entorno de trabajo para crear productos digitales robustos y complejos. Piénsalo como un editor de texto 
                  muy avanzado que entiende código y, además, tiene una IA incorporada que te ayuda a programar. 
                  Es similar a chatear con ChatGPT o v0, pero directamente en tu computadora, trabajando con tus archivos locales.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Se diferencia de herramientas web-based como v0 en que ofrece más funcionalidades y control sobre el proyecto. Es más potente, completo y versátil, lo que nos permite crear funcionalidades más complejas y trabajar de manera más eficiente. 
                  Además, su arquitectura de IA nos permite elegir entre una amplia gama de modelos de IA y nos permite configurar reglas y contexto inteligentemente para maximizar su rendimiento.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Video Tutorial */}
          <Card className="mb-8 md:mb-12 border-primary/20">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Play className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg md:text-xl">Video Tutorial</CardTitle>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Mira este video para entender cómo usar Cursor paso a paso
              </p>
            </CardHeader>
            <CardContent>
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  src="https://www.youtube.com/embed/FjGmmEWj4NU"
                  className="absolute top-0 left-0 w-full h-full rounded-lg border border-border/20"
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  title="Tutorial de Cursor"
                />
              </div>
            </CardContent>
          </Card>

          {/* Setup Steps */}
          <div className="mb-8 md:mb-12">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="h-6 w-6 text-primary" />
              <h3 className="text-xl md:text-2xl font-bold text-foreground">
                Configurar Cursor y Proyecto
              </h3>
            </div>

            <div className="space-y-4">
              {setupSteps.map((step, index) => {
                const Icon = step.icon
                return (
                  <Card key={step.number} className="border-2 border-primary/10 hover:border-primary/30 transition-all">
                    <CardContent className="p-4 md:p-6">
                      <div className="flex items-start gap-3 md:gap-4">
                        <div className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary/10 text-primary font-bold shrink-0">
                          {step.number}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start gap-2 mb-2">
                            <Icon className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                            <h4 className="font-semibold text-foreground text-sm md:text-base">
                              {step.title}
                            </h4>
                          </div>
                          <p className="text-xs md:text-sm text-muted-foreground mb-3">
                            {step.description}
                          </p>
                          {step.links && (
                            <div className="space-y-2 mb-3">
                              {step.links.map((link, linkIndex) => (
                                <a
                                  key={linkIndex}
                                  href={link.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-2 p-2.5 bg-blue-500/5 hover:bg-blue-500/10 rounded-lg border border-blue-500/20 hover:border-blue-500/40 transition-all group"
                                >
                                  <Download className="h-4 w-4 text-blue-600 shrink-0" />
                                  <span className="text-xs md:text-sm text-foreground font-medium">
                                    {link.name}
                                  </span>
                                  <span className="ml-auto text-xs text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                                    Abrir →
                                  </span>
                                </a>
                              ))}
                            </div>
                          )}
                          {step.code && (
                            <div className="inline-flex items-center gap-2 p-2 bg-accent/10 rounded-lg border border-accent/20">
                              <code className="text-xs md:text-sm font-mono text-foreground">
                                {step.code}
                              </code>
                              <button
                                onClick={() => copyToClipboard(step.code!, `step-${step.number}`)}
                                className="p-1.5 rounded-md bg-accent/50 hover:bg-accent transition-colors shrink-0"
                                title="Copiar código"
                              >
                                {copiedCode === `step-${step.number}` ? (
                                  <Check className="h-3.5 w-3.5 text-green-600" />
                                ) : (
                                  <Copy className="h-3.5 w-3.5 text-muted-foreground" />
                                )}
                              </button>
                            </div>
                          )}
                          {step.codes && (
                            <div className="space-y-2">
                              {step.codes.map((cmd, cmdIndex) => {
                                const cmdId = `step-${step.number}-${cmdIndex}`
                                return (
                                  <div
                                    key={cmdIndex}
                                    className="flex items-center gap-2 p-2 bg-accent/10 rounded-lg border border-accent/20 w-full"
                                  >
                                    <code className="text-xs md:text-sm font-mono text-foreground flex-1 break-all">
                                      {cmd}
                                    </code>
                                    <button
                                      onClick={() => copyToClipboard(cmd, cmdId)}
                                      className="p-1.5 rounded-md bg-accent/50 hover:bg-accent transition-colors shrink-0"
                                      title="Copiar comando"
                                    >
                                      {copiedCode === cmdId ? (
                                        <Check className="h-3.5 w-3.5 text-green-600" />
                                      ) : (
                                        <Copy className="h-3.5 w-3.5 text-muted-foreground" />
                                      )}
                                    </button>
                                  </div>
                                )
                              })}
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Success Message */}
          <Card className="mb-8 md:mb-12 border-2 border-green-500/20 bg-gradient-to-br from-green-500/10 to-background">
            <CardContent className="p-6 md:p-8 text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-green-500/10 rounded-full">
                  <CheckCircle className="h-10 w-10 md:h-12 md:w-12 text-green-600" />
                </div>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">
                ¡Ya puedes empezar a chatear como en v0! 🥳
              </h3>
              <p className="text-sm md:text-base text-muted-foreground">
                Has completado la configuración inicial. Ahora puedes comenzar a trabajar con Cursor.
              </p>
            </CardContent>
          </Card>

          {/* Additional Steps */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-6">
              <Settings className="h-6 w-6 text-primary" />
              <h3 className="text-xl md:text-2xl font-bold text-foreground">
                Pasos Adicionales
              </h3>
            </div>
            <p className="text-sm md:text-base text-muted-foreground mb-6">
              Una vez que hayas completado la configuración básica, estos pasos te ayudarán a trabajar de manera más eficiente:
            </p>

            <div className="space-y-4">
              {additionalSteps.map((step) => {
                const Icon = step.icon
                return (
                  <Card key={step.number} className="border-2 border-primary/10 hover:border-primary/30 transition-all">
                    <CardContent className="p-4 md:p-6">
                      <div className="flex items-start gap-3 md:gap-4">
                        <div className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary/10 text-primary font-bold shrink-0">
                          {step.number}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start gap-2 mb-2">
                            <Icon className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                            <h4 className="font-semibold text-foreground text-sm md:text-base">
                              {step.title}
                            </h4>
                          </div>
                          <p className="text-xs md:text-sm text-muted-foreground mb-3">
                            {step.description}
                          </p>
                          {step.code && (
                            <div className="inline-flex items-center gap-2 p-2 bg-accent/10 rounded-lg border border-accent/20 mb-3">
                              <code className="text-xs md:text-sm font-mono text-foreground">
                                {step.code}
                              </code>
                              <button
                                onClick={() => copyToClipboard(step.code!, `additional-${step.number}`)}
                                className="p-1.5 rounded-md bg-accent/50 hover:bg-accent transition-colors shrink-0"
                                title="Copiar código"
                              >
                                {copiedCode === `additional-${step.number}` ? (
                                  <Check className="h-3.5 w-3.5 text-green-600" />
                                ) : (
                                  <Copy className="h-3.5 w-3.5 text-muted-foreground" />
                                )}
                              </button>
                            </div>
                          )}
                          {step.extra && (
                            <div className="p-3 bg-blue-500/5 rounded-lg border border-blue-500/20">
                              <p className="text-xs md:text-sm text-muted-foreground">
                                💡 <strong>Nota:</strong> {step.extra}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Tips Card */}
          {/* <Card className="border-primary/20 bg-gradient-to-br from-blue-500/5 to-background">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-blue-600" />
                Tips para usar Cursor
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex gap-3">
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-blue-600 rounded-full flex-shrink-0 mt-2" />
                <p className="text-sm md:text-base text-muted-foreground">
                  <strong>Chatea con tu código:</strong> Puedes preguntarle a la IA de Cursor sobre tu código, 
                  pedirle que explique algo que no entiendas o que te ayude a resolver un problema.
                </p>
              </div>
              <div className="flex gap-3">
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-blue-600 rounded-full flex-shrink-0 mt-2" />
                <p className="text-sm md:text-base text-muted-foreground">
                  <strong>Pide cambios específicos:</strong> Si necesitas modificar algo, simplemente descríbelo 
                  en lenguaje natural, como "cambia el color del botón a azul" o "agrega un margen arriba".
                </p>
              </div>
              <div className="flex gap-3">
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-blue-600 rounded-full flex-shrink-0 mt-2" />
                <p className="text-sm md:text-base text-muted-foreground">
                  <strong>Aprovecha las reglas:</strong> Las reglas de usuario y de proyecto (paso 10) le indican 
                  a Cursor cómo quieres que trabaje. Por ejemplo, puedes pedirle que use cierto estilo de código o que siempre explique lo que hace.
                </p>
              </div>
              <div className="flex gap-3">
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-blue-600 rounded-full flex-shrink-0 mt-2" />
                <p className="text-sm md:text-base text-muted-foreground">
                  <strong>Revisa en el navegador:</strong> Siempre prueba tus cambios corriendo el proyecto 
                  localmente (paso 11) para ver cómo se ve y funciona en tiempo real.
                </p>
              </div>
            </CardContent>
          </Card> */}

          {/* Additional Resources */}
          <Card className="mt-6 border-primary/20">
            <CardHeader>
              <CardTitle className="text-lg">📚 Recursos relacionados</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => router.push('/dashboard/vibecoding-guide')}
              >
                Ver Guía Rápida de Vibecoding: de idea a MVP →
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => router.push('/dashboard/glossary/development')}
              >
                Vocabulario de Desarrollo →
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => router.push('/dashboard/nocode-tools')}
              >
                Ver Herramientas No-Code →
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

