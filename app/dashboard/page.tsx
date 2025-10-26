"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  BookOpen,
  GraduationCap,
  Video,
  Users,
  ChevronDown,
  ChevronRight,
  ArrowLeft,
  LogOut,
  HelpCircle,
} from "lucide-react"

export default function Dashboard() {
  const router = useRouter()
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({})
  const [expandedClass, setExpandedClass] = useState<string | null>(null)
  const [expandedSlide, setExpandedSlide] = useState<string | null>(null)
  const supabase = createClient()

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

  const toggleSection = (sectionId: string) => {
    setOpenSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }))
  }

  const handleBackToHome = () => {
    router.push('/')
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  const handleItemClick = (sectionId: string, item: string) => {
    if (sectionId === "material-complementario" && item === "Herramientas No-Code") {
      router.push('/dashboard/nocode-tools')
    }
    if (sectionId === "material-complementario" && item === "Herramientas de Apoyo") {
      router.push('/dashboard/support-tools')
    }
    if (sectionId === "material-complementario" && item === "Recursos Adicionales") {
      router.push('/dashboard/additional-resources')
    }
    if (sectionId === "material-complementario" && item === "Heurísticas y buenas prácticas") {
      router.push('/dashboard/heuristics')
    }
    if (sectionId === "material-complementario" && item === "Vocabulario de diseño: UI") {
      router.push('/dashboard/glossary')
    }
    if (sectionId === "material-complementario" && item === "Vocabulario de diseño: CSS") {
      router.push('/dashboard/glossary/css')
    }
    if (sectionId === "material-complementario" && item === "Vocabulario de desarrollo") {
      router.push('/dashboard/glossary/development')
    }
    if (sectionId === "material-complementario" && item === "Vocabulario de IA") {
      router.push('/dashboard/glossary/ai')
    }
    if (sectionId === "comunidad" && item === "Comunidad de WhatsApp") {
      window.open('https://chat.whatsapp.com/GKcXD6NINyJL36qbm3U6VX?mode=ems_qr_t', '_blank')
    }
    if (sectionId === "comunidad" && item === "Beneficios Exclusivos") {
      router.push('/dashboard/benefits')
    }
    // Handle class video toggles
    if (sectionId === "clases-grabadas") {
      setExpandedClass(expandedClass === item ? null : item)
    }
    // Handle slide toggles
    if (sectionId === "material-clase" && item === "Slides de presentaciones") {
      setExpandedSlide(expandedSlide === item ? null : item)
    }
    if (sectionId === "material-clase" && item === "Worksheets y actividades") {
      router.push('/dashboard/worksheets')
    }
  }

  const classVideos: Record<string, string> = {
    "Clase 1: La revolución de Producto": "https://udesa.hosted.panopto.com/Panopto/Pages/Embed.aspx?id=9c06e098-5483-4599-b0fd-b371010fca60&autoplay=false&offerviewer=true&showtitle=true&showbrand=true&captions=false&interactivity=all",
    "Clase 2: Definamos IA": "https://udesa.hosted.panopto.com/Panopto/Pages/Embed.aspx?id=1cd04b30-ff2a-4413-9ff5-b379010bfde7&autoplay=false&offerviewer=true&showtitle=true&showbrand=true&captions=false&interactivity=all",
    "Clase 3: De idea a Producto": "https://udesa.hosted.panopto.com/Panopto/Pages/Embed.aspx?id=013c1ae1-8455-4c36-bfd3-b380010cc54b&autoplay=false&offerviewer=true&showtitle=true&showbrand=true&captions=false&interactivity=all",
  }

  const classSlides: Record<string, string> = {
    "Clase 1: La revolución de Producto": "https://drive.google.com/file/d/1EH9IBNSBmIqZKyzolel0nJ-MomYX4ESH/preview",
  }

  const sections = [
    {
      id: "material-complementario",
      title: "Material Complementario",
      icon: BookOpen,
      description: "Recursos adicionales y lecturas recomendadas",
      content: [
        "Herramientas No-Code",
        "Herramientas de Apoyo",
        "Recursos Adicionales",
        "Templates y plantillas",
        "Heurísticas y buenas prácticas",
        "Vocabulario de diseño: UI",
        "Vocabulario de diseño: CSS",
        "Vocabulario de desarrollo",
        "Vocabulario de IA",
      ]
    },
    {
      id: "material-clase",
      title: "Material de Clase",
      icon: GraduationCap,
      description: "Presentaciones y contenido de las clases",
      content: [
        "Slides de presentaciones",
        // "Ejercicios prácticos",
        // "Casos de estudio",
        // "Ejemplos de código",
        "Worksheets y actividades"
      ]
    },
    {
      id: "clases-grabadas",
      title: "Clases Grabadas",
      icon: Video,
      description: "Grabaciones de todas las sesiones del programa",
      content: [
        "Clase 1: La revolución de Producto",
        "Clase 2: Definamos IA",
        "Clase 3: De idea a Producto",
        "Clase 4: Haciendo que funcione",
        "Clase 5: Lanzamiento y luego qué?",
        "Clase 6: Demo y futuro"
      ]
    },
    {
      id: "comunidad",
      title: "Comunidad",
      icon: Users,
      description: "Espacio de interacción con otros estudiantes",
      content: [
        "Comunidad de WhatsApp",
        "Beneficios Exclusivos"
        // "Foro de discusión",
        // "Grupos de trabajo",
        // "Proyectos colaborativos",
        // "Networking",
        // "Eventos y meetups"
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/50 bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto px-3 md:px-4 py-3 md:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 md:gap-4 min-w-0 flex-1">
              <Button
                onClick={handleBackToHome}
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground shrink-0"
              >
                <ArrowLeft className="h-4 w-4 md:mr-2" />
                <span className="hidden sm:inline">Volver al inicio</span>
              </Button>
              <div className="hidden sm:block h-6 w-px bg-border" />
              <div className="flex items-center gap-2 md:gap-3 min-w-0">
                <img
                  src="/images/udesa-png.svg"
                  alt="Universidad de San Andrés"
                  className="h-6 md:h-8 w-auto shrink-0"
                />
                <h1 className="text-sm md:text-xl font-semibold text-foreground truncate">
                  <span className="hidden lg:inline">Dashboard - Programa NO-CODE & AI</span>
                  <span className="lg:hidden">Dashboard</span>
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
          <div className="mb-6 md:mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              Bienvenido al Dashboard
            </h2>
            <p className="text-sm md:text-base text-muted-foreground">
              Accede a todo el contenido del programa, materiales de clase y conecta con la comunidad.
            </p>
          </div>

          <div className="grid gap-4 md:gap-6">
            {sections.map((section) => {
              const IconComponent = section.icon
              const isOpen = openSections[section.id]

              return (
                <Card key={section.id} className="overflow-hidden border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-background group hover:bg-primary/10 transition-all duration-200">
                  <Collapsible
                    open={isOpen}
                    onOpenChange={() => toggleSection(section.id)}
                  >
                    <CollapsibleTrigger asChild>
                      <CardHeader className="cursor-pointer p-4 md:p-6">
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2 md:gap-3 min-w-0 flex-1">
                            <div className="p-1.5 md:p-2 bg-primary/10 rounded-lg shrink-0">
                              <IconComponent className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <CardTitle className="text-base md:text-xl font-semibold text-foreground">
                                {section.title}
                              </CardTitle>
                              <p className="text-xs md:text-sm text-muted-foreground mt-1 line-clamp-2">
                                {section.description}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
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
                      <CardContent className="pt-0 px-4 md:px-6 pb-4 md:pb-6">
                        <div className="border-t border-border/30 pt-4 md:pt-6">
                          <div className="grid gap-2 md:gap-3">
                            {section.content.map((item, index) => {
                              const isClickable = (section.id === "material-complementario" && (item === "Herramientas No-Code" || item === "Herramientas de Apoyo" || item === "Recursos Adicionales" || item === "Heurísticas y buenas prácticas" || item === "Vocabulario de diseño: UI" || item === "Vocabulario de diseño: CSS" || item === "Vocabulario de desarrollo" || item === "Vocabulario de IA")) || 
                                                (section.id === "comunidad" && (item === "Comunidad de WhatsApp" || item === "Beneficios Exclusivos")) ||
                                                (section.id === "material-clase" && (item === "Slides de presentaciones" || item === "Worksheets y actividades"))
                              const isNoCode = item === "Herramientas No-Code"
                              const isSupportTools = item === "Herramientas de Apoyo"
                              const isAdditionalResources = item === "Recursos Adicionales"
                              const isHeuristics = item === "Heurísticas y buenas prácticas"
                              const isUI = item === "Vocabulario de diseño: UI"
                              const isCSS = item === "Vocabulario de diseño: CSS"
                              const isDev = item === "Vocabulario de desarrollo"
                              const isAI = item === "Vocabulario de IA"
                              const isWhatsApp = item === "Comunidad de WhatsApp"
                              const isBenefits = item === "Beneficios Exclusivos"
                              const isSlides = item === "Slides de presentaciones"
                              const isWorksheets = item === "Worksheets y actividades"
                              const hasVideo = section.id === "clases-grabadas" && classVideos[item]
                              const isExpanded = expandedClass === item
                              const isSlidesExpanded = expandedSlide === item
                              
                              return (
                                <div key={index}>
                                  <div
                                    onClick={() => handleItemClick(section.id, item)}
                                    className={`flex items-center gap-2 md:gap-3 p-2.5 md:p-3 rounded-lg transition-colors border border-transparent ${
                                      isClickable || hasVideo
                                        ? "bg-accent/10 hover:bg-accent/20 cursor-pointer hover:border-accent/30" 
                                        : "bg-accent/5 hover:bg-accent/10 cursor-pointer hover:border-accent/20"
                                    }`}
                                  >
                                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-accent rounded-full flex-shrink-0" />
                                    <span className={`text-sm md:text-base text-foreground min-w-0 flex-1 ${isClickable || hasVideo ? "font-medium" : ""}`}>
                                      {item}
                                    </span>
                                    {isClickable && !isSlides && (
                                      <span className="ml-auto text-xs text-accent shrink-0 hidden sm:inline">
                                        {isNoCode ? "Herramientas →" :
                                         isSupportTools ? "Apoyo →" :
                                         isAdditionalResources ? "Recursos →" :
                                         isHeuristics ? "Heurísticas →" :
                                         isUI ? "Glosario UI →" : 
                                         isCSS ? "Glosario CSS →" : 
                                         isDev ? "Glosario Dev →" :
                                         isAI ? "Vocabulario IA →" :
                                         isWhatsApp ? "WhatsApp →" :
                                         isBenefits ? "Beneficios →" :
                                         isWorksheets ? "Worksheets →" : ""}
                                      </span>
                                    )}
                                    {isSlides && (
                                      <span className="ml-auto text-xs text-accent flex items-center gap-1 shrink-0">
                                        <GraduationCap className="h-3 w-3" />
                                        <span className="hidden sm:inline">{isSlidesExpanded ? "Ocultar slides" : "Ver slides"}</span>
                                      </span>
                                    )}
                                    {hasVideo && (
                                      <span className="ml-auto text-xs text-accent flex items-center gap-1 shrink-0">
                                        <Video className="h-3 w-3" />
                                        <span className="hidden sm:inline">{isExpanded ? "Ocultar video" : "Ver video"}</span>
                                      </span>
                                    )}
                                  </div>
                                  
                                  {hasVideo && isExpanded && (
                                    <div className="mt-2 md:mt-3 p-3 md:p-4 bg-accent/5 rounded-lg border border-accent/20 animate-in slide-in-from-top-2 duration-200">
                                      <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                                        <iframe
                                          src={classVideos[item]}
                                          className="absolute top-0 left-0 w-full h-full rounded-lg border border-border/20"
                                          allowFullScreen
                                          allow="autoplay"
                                        />
                                      </div>
                                    </div>
                                  )}

                                  {isSlides && isSlidesExpanded && (
                                    <div className="mt-2 md:mt-3 space-y-2 md:space-y-3 animate-in slide-in-from-top-2 duration-200">
                                      {Object.entries(classSlides).map(([className, slideUrl]) => (
                                        <div key={className} className="p-3 md:p-4 bg-accent/5 rounded-lg border border-accent/20">
                                          <h4 className="text-xs md:text-sm font-medium text-foreground mb-2 md:mb-3">{className}</h4>
                                          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                                            <iframe
                                              src={slideUrl}
                                              className="absolute top-0 left-0 w-full h-full rounded-lg border border-border/20"
                                              allowFullScreen
                                              allow="autoplay"
                                            />
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      </CardContent>
                    </CollapsibleContent>
                  </Collapsible>
                </Card>
              )
            })}
          </div>

          {/* FAQ Card */}
          <div className="mt-8 md:mt-12">
            <Card 
              className="overflow-hidden border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-background group hover:bg-primary/10 transition-all duration-200 cursor-pointer"
              onClick={() => router.push('/dashboard/faq')}
            >
              <CardHeader className="p-4 md:p-6">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 md:gap-3 min-w-0 flex-1">
                    <div className="p-1.5 md:p-2 bg-primary/10 rounded-lg shrink-0">
                      <HelpCircle className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <CardTitle className="text-base md:text-xl font-semibold text-foreground">
                        Preguntas Frecuentes (FAQ)
                      </CardTitle>
                      <p className="text-xs md:text-sm text-muted-foreground mt-1 line-clamp-2">
                        Respuestas a las dudas más comunes sobre el programa NO-CODE & AI
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <ChevronRight className="h-4 w-4 md:h-5 md:w-5 text-muted-foreground" />
                  </div>
                </div>
              </CardHeader>
            </Card>
          </div>

          {/* Footer info */}
          <div className="mt-8 md:mt-12 text-center">
            <p className="text-muted-foreground text-xs md:text-sm px-2">
              ¿Necesitas ayuda? Contacta a los coordinadores académicos o utiliza el foro de la comunidad.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
