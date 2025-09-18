"use client"

import { useState, useEffect, Suspense } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  ChevronRight,
  ChevronDown,
  Users,
  Calendar,
  MessageCircle,
  Sparkles,
  Code,
  Zap,
  ArrowRight,
  ArrowLeft,
  TrendingUp,
  User,
  Camera,
  Palette,
  Music,
  Target,
  Database,
  Shield,
  BarChart3,
  CreditCard,
  Mail,
  GitBranch,
} from "lucide-react"

function PresentationLandingContent() {
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const [expandedClass, setExpandedClass] = useState<number | null>(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [currentAboutSlide, setCurrentAboutSlide] = useState(0)

  const toggleSection = (section: string) => {
    setActiveSection(activeSection === section ? null : section)
  }

  const toggleClass = (classNumber: number) => {
    setExpandedClass(expandedClass === classNumber ? null : classNumber)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slidesIntro.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slidesIntro.length) % slidesIntro.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const nextAboutSlide = () => {
    setCurrentAboutSlide((prev) => (prev + 1) % aboutSlides.length)
  }

  const prevAboutSlide = () => {
    setCurrentAboutSlide((prev) => (prev - 1 + aboutSlides.length) % aboutSlides.length)
  }

  const goToAboutSlide = (index: number) => {
    setCurrentAboutSlide(index)
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeSection === "intro") {
        if (e.key === "ArrowRight") nextSlide()
        if (e.key === "ArrowLeft") prevSlide()
      }
      if (activeSection === "about") {
        if (e.key === "ArrowRight") nextAboutSlide()
        if (e.key === "ArrowLeft") prevAboutSlide()
      }
    }

    if (typeof window !== "undefined") {
      window.addEventListener("keydown", handleKeyDown)
      return () => window.removeEventListener("keydown", handleKeyDown)
    }
  }, [activeSection, currentSlide, currentAboutSlide])

  const aboutSlides = [
    {
      id: 1,
      title: "La industria del software cambió",
      content: "simple_title",
    },
    {
      id: 2,
      title: "Por qué la industria del software cambió",
      subtitle: "Ya pasó con otros",
      examples: [
        { icon: Camera, old: "Canon", new: "Celular", category: "Fotos" },
        { icon: Palette, old: "Photoshop", new: "Canva", category: "Diseño" },
        { icon: Music, old: "Estudio", new: "Ableton", category: "Música" },
      ],
    },
    {
      id: 3,
      title: "Por qué la industria del software cambió",
      subtitle: "Más fácil hacer software",
      content: "simple_subtitle",
    },
    {
      id: 4,
      title: "Infraestructura para la escalabilidad del producto",
      content: "infrastructure",
    },
    {
      id: 5,
      title: "Hay mucho más oportunidades para generalistas",
      subtitle: "La industria requiere saber de tecnología, negocio y usuario al mismo tiempo",
      content: "opportunities",
    },
    {
      id: 6,
      title: "Trabajar en producto hoy",
      subtitle: "Qué cambió",
      comparison: {
        "2017": {
          research: "1.5 meses",
          design: "1 mes",
          dev: "3 meses",
          roles: "diferenciados",
          generalista: "100% gestión",
          distribution: "compleja",
          opportunities: "VC",
        },
        "2025": {
          research: "semanas",
          design: "semanas",
          dev: "semanas",
          roles: "integrados",
          generalista: "hands-on",
          distribution: "más difícil aún",
          opportunities: "+ VC + bootstrapped",
        },
      },
    },
    {
      id: 7,
      title: "Full-stack: más simple, menos flexible",
      subtitle: "Vibe coding*",
      note: "*término creado por Karpathy",
      description: "Diseño funcional, front-end",
      tools: ["Cursor", "Windsurf", "Lovable", "Replit"],
      vs: "Full-stack: menos simple, más flexible",
      concept: "Desarrollar con prompts en lenguaje natural, definir producto",
    },
    {
      id: 8,
      title: "Fases de desarrollo vibe coding",
      phases: [
        { number: 1, title: "Estructura funcional", desc: "Diseño y desarrollo front" },
        { number: 2, title: "Acceder y guardar info", desc: "Autenticación, base de datos, deploy" },
        { number: 3, title: "Integraciones", desc: "LLMs, analytics, pagos, mensajes" },
      ],
    },
    {
      id: 9,
      title: "Esqueleto de un producto",
      components: [
        { name: "Autenticación", icon: Shield },
        { name: "Hosting & Deploy", icon: Zap },
        { name: "Automation", icon: Target },
        { name: "Pagos", icon: CreditCard },
        { name: "Diseño & Dev", icon: Palette },
        { name: "Mensajes", icon: Mail },
        { name: "Analytics", icon: BarChart3 },
        { name: "Base de datos", icon: Database },
        { name: "Repositorio", icon: GitBranch },
        { name: "LLMs", icon: Sparkles },
      ],
    },
  ]

  const slidesIntro = [
    { id: 1, image: "/images/slide-1.jpeg", alt: "La industria del software cambió" },
    {
      id: 2,
      image: "/images/slide-2.jpeg",
      alt: "Por qué la industria del software cambió - ejemplos con fotos, diseño, música",
    },
    { id: 3, image: "/images/slide-4.jpeg", alt: "Design thinking process - 6 fases" },
    { id: 4, image: "/images/slide-5.jpeg", alt: "Design thinking iterativo" },
    { id: 5, image: "/images/slide-6.jpeg", alt: "Trabajar en producto hoy - oportunidades para generalistas" },
    { id: 6, image: "/images/slide-7.jpeg", alt: "Tweet de Andrej Karpathy sobre vibe coding" },
    { id: 7, image: "/images/slide-8.jpeg", alt: "Qué cambió - MVP 2017 vs MVP 2025" },
    { id: 8, image: "/images/slide-9.jpeg", alt: "Vibe coding - herramientas y comparación" },
    { id: 9, image: "/images/slide-10.jpeg", alt: "Fases de desarrollo vibe coding" },
    { id: 10, image: "/images/slide-11.jpeg", alt: "Esqueleto de un producto" },
  ]

  const programClasses = [
    {
      number: 1,
      title: "La revolución de Producto",
      date: "9 de octubre",
      description: [
        "Qué es vibe-coding y cómo impacta en el desarrollo de productos digitales.",
        "Nuevos procesos: de idea a producto sin escalas.",
        "Nuevos perfiles: democratización del desarrollo de software.",
        "Benchmark de herramientas y cómo aprovecharlas.",
        "Taller en vivo: creación y publicación de una One-feature app.",
      ],
    },
    {
      number: 2,
      title: "Definamos IA",
      date: "17 de octubre",
      description: [
        "Definición de IA y sus tipos.",
        "Large Language Models: Qué es un GPT y cómo funciona.",
        "Asistentes vs Agentes.",
        "Fundamentos de programación para no programadores: lenguajes, estructuras de datos, funciones, entornos, Git/GitHub.",
      ],
    },
    {
      number: 3,
      title: "De idea a Producto",
      date: "24 de octubre",
      description: [
        "Hacia el MVP I.",
        "Definición de Producto: problema, objetivo, funcionalidades, alcance.",
        "Inicio de una aplicación completa con tres funcionalidades clave.",
        "Desarrollo de Landing Page, App y propuesta de valor.",
      ],
    },
    {
      number: 4,
      title: "Haciendo que funcione",
      date: "31 de octubre",
      description: [
        "Hacia el MVP II.",
        "Configuración de base de datos y autenticación.",
        "Conexión con servicios externos.",
        "Integración front-end / back-end y mejora continua.",
      ],
    },
    {
      number: 5,
      title: "Lanzamiento y luego qué?",
      date: "7 de noviembre",
      description: [
        "Lanzamiento y buenas prácticas para escalar.",
        "Testing con usuarios y criterios de calidad.",
        "Publicar proyecto en internet.",
        "Buenas prácticas para escalar: arquitectura de datos, prompting, gestión de datos sensibles, auditoría de seguridad, refactoring, debugging y branching/merging.",
        "Consideraciones éticas y de privacidad en proyectos No-Code & IA.",
      ],
    },
    {
      number: 6,
      title: "Demo y futuro",
      date: "14 de noviembre",
      description: [
        "Demo Day & Cierre.",
        "Presentación de proyectos y lecciones aprendidas.",
        "Feedback: expectativas vs. resultados.",
        "Tendencias emergentes y próximos pasos del desarrollo asistido por IA.",
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="relative bg-background overflow-hidden">
        <div className="absolute top-6 left-6 z-10 flex items-center gap-8">
          <img
            src="/images/udesa-png.svg"
            alt="Universidad de San Andrés"
            className="h-10 w-auto opacity-90 hover:opacity-100 transition-opacity"
          />
          <div className="flex items-center gap-3">
            <span className="text-sm text-white font-light">con el apoyo de: </span>
            <img
              src="/images/v0-logo-dark.webp"
              alt="v0 Logo"
              className="h-8 w-auto opacity-90 hover:opacity-100 transition-opacity"
            />
          </div>
        </div>

        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-accent/20 rounded-full blur-xl animate-float" />
          <div
            className="absolute top-40 right-20 w-24 h-24 bg-secondary/20 rounded-full blur-xl animate-float"
            style={{ animationDelay: "2s" }}
          />
          <div
            className="absolute bottom-40 left-1/4 w-40 h-40 bg-primary/10 rounded-full blur-xl animate-float"
            style={{ animationDelay: "4s" }}
          />
          <div
            className="absolute bottom-20 right-1/3 w-28 h-28 bg-accent/15 rounded-full blur-xl animate-float"
            style={{ animationDelay: "1s" }}
          />
        </div>

        <div className="absolute inset-0 bg-grid-pattern opacity-30" />

        <div className="relative container mx-auto px-4 py-20 text-center">
          <div className="max-w-5xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-background rounded-full text-sm font-medium mb-8 border border-accent/20 animate-glow">
              <Sparkles className="h-4 w-4" />
              Universidad de San Andrés
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance text-foreground">Programa NO-CODE & AI</h1>
            <h2 className="text-2xl md:text-3xl mb-8 text-accent font-semibold">Charla Informativa</h2>
            <p className="text-xl md:text-2xl mb-16 text-muted-foreground text-pretty max-w-3xl mx-auto leading-relaxed">
              Aprendé a desarrollar aplicaciones sin saber programar
            </p>

            <div className="max-w-6xl mx-auto space-y-8">
              {/* Primera fila - 3 botones */}
              <div className="grid md:grid-cols-3 gap-6">
                <Button
                  onClick={() => toggleSection("about")}
                  variant="outline"
                  size="lg"
                  className="h-24 text-base font-semibold hover:scale-105 transition-all duration-300 border-2 border-border hover:border-accent hover:bg-accent/10 hover:text-accent group px-4 bg-card/50 backdrop-blur-sm"
                >
                  <div className="flex flex-col items-center gap-2">
                    <User className="h-6 w-6 group-hover:scale-110 transition-transform flex-shrink-0" />
                    <span className="text-center leading-tight">About Us</span>
                  </div>
                </Button>
                <Button
                  onClick={() => toggleSection("intro")}
                  variant="outline"
                  size="lg"
                  className="h-24 text-base font-semibold hover:scale-105 transition-all duration-300 border-2 border-border hover:border-accent hover:bg-accent/10 hover:text-accent group px-4 bg-card/50 backdrop-blur-sm"
                >
                  <div className="flex flex-col items-center gap-2">
                    <Users className="h-6 w-6 group-hover:scale-110 transition-transform flex-shrink-0" />
                    <span className="text-center leading-tight">Introducción al Vibe Coding</span>
                  </div>
                </Button>
                <Button
                  onClick={() => toggleSection("programa")}
                  variant="outline"
                  size="lg"
                  className="h-24 text-base font-semibold hover:scale-105 transition-all duration-300 border-2 border-border hover:border-accent hover:bg-accent/10 hover:text-accent group px-4 bg-card/50 backdrop-blur-sm"
                >
                  <div className="flex flex-col items-center gap-2">
                    <Calendar className="h-6 w-6 group-hover:scale-110 transition-transform flex-shrink-0" />
                    <span className="text-center leading-tight">Qué haremos en el Programa</span>
                  </div>
                </Button>
              </div>

              {/* Segunda fila - 2 botones centrados */}
              <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                <Button
                  onClick={() => toggleSection("comercial")}
                  variant="outline"
                  size="lg"
                  className="h-24 text-base font-semibold hover:scale-105 transition-all duration-300 border-2 border-border hover:border-accent hover:bg-accent/10 hover:text-accent group px-4 bg-card/50 backdrop-blur-sm"
                >
                  <div className="flex flex-col items-center gap-2">
                    <TrendingUp className="h-6 w-6 group-hover:scale-110 transition-transform flex-shrink-0" />
                    <span className="text-center leading-tight">Información Comercial</span>
                  </div>
                </Button>
                <Button
                  onClick={() => toggleSection("preguntas")}
                  variant="outline"
                  size="lg"
                  className="h-24 text-base font-semibold hover:scale-105 transition-all duration-300 border-2 border-border hover:border-accent hover:bg-accent/10 hover:text-accent group px-4 bg-card/50 backdrop-blur-sm"
                >
                  <div className="flex flex-col items-center gap-2">
                    <MessageCircle className="h-6 w-6 group-hover:scale-110 transition-transform flex-shrink-0" />
                    <span className="text-center leading-tight">Preguntas & Cierre</span>
                  </div>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          {activeSection === "about" && (
            <Card className="mb-8 animate-in slide-in-from-top-4 duration-500 border border-border/50 shadow-2xl bg-card/80 backdrop-blur-sm">
              <CardContent className="p-10">
                <div className="flex items-center gap-3 mb-8">
                  <h3 className="text-4xl font-bold text-card-foreground">About Us</h3>
                </div>

                <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
                  {/* Franco Profile */}
                  <div className="text-center">
                    <div className="relative mb-6">
                      <img
                        src="/images/franco-new.png"
                        alt="Franco Zan"
                        className="w-48 h-48 rounded-full mx-auto object-cover border-4 border-accent/20"
                      />
                    </div>
                    <h4 className="text-2xl font-bold text-card-foreground mb-4">Franco Zan</h4>
                    <div className="space-y-4 text-muted-foreground leading-relaxed">
                      <p>
                        Emprendedor en tecnología y ciencia con experiencia en diseño y liderazgo de productos y
                        estrategias digitales.
                      </p>
                      <p>
                        Responsable de Product & DLT Strategy en Ruuts. Lic. Negocios Digitales, Universidad de San
                        Andrés.
                      </p>
                      <p>Especializado en DeFi en Duke University.</p>
                    </div>
                  </div>

                  {/* Greta Profile */}
                  <div className="text-center">
                    <div className="relative mb-6">
                      <img
                        src="/images/greta-new.png"
                        alt="Greta Gawianski"
                        className="w-48 h-48 rounded-full mx-auto object-cover border-4 border-accent/20"
                      />
                    </div>
                    <h4 className="text-2xl font-bold text-card-foreground mb-4">Greta Gawianski</h4>
                    <div className="space-y-4 text-muted-foreground leading-relaxed">
                      <p>
                        Especialista en Diseño Estratégico de Negocios con experiencia en Metodologías Ágiles, Productos
                        Digitales y tecnología Blockchain.
                      </p>
                      <p>Impact Officer Global Shapers Community y Product Owner en Open Earth Foundation.</p>
                      <p>
                        Lic. Comunicación Universidad de San Andrés, donde coordinó los programas Blockchain y
                        Criptoactivos.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeSection === "intro" && (
            <Card className="mb-8 animate-in slide-in-from-top-4 duration-500 border border-border/50 shadow-2xl bg-card/80 backdrop-blur-sm">
              <CardContent className="p-10">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-accent/10 rounded-lg border border-accent/20">
                      <Code className="h-6 w-6 text-accent" />
                    </div>
                    <h3 className="text-4xl font-bold text-card-foreground">Introducción al Vibe Coding</h3>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>
                      {currentSlide + 1} / {slidesIntro.length}
                    </span>
                  </div>
                </div>

                <div className="min-h-[500px] mb-8">
                  <div className="animate-in fade-in-0 duration-300 flex items-center justify-center">
                    <img
                      src={slidesIntro[currentSlide].image || "/placeholder.svg"}
                      alt={slidesIntro[currentSlide].alt}
                      className="max-w-full max-h-[500px] object-contain rounded-lg shadow-lg"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Button
                    onClick={prevSlide}
                    variant="outline"
                    size="lg"
                    className="flex items-center gap-2 bg-card/50 border-border hover:border-accent hover:bg-accent/10 hover:text-accent"
                    disabled={currentSlide === 0}
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Anterior
                  </Button>

                  <div className="flex items-center gap-2">
                    {slidesIntro.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-3 h-3 rounded-full transition-colors ${
                          index === currentSlide ? "bg-accent" : "bg-muted-foreground/30"
                        }`}
                      />
                    ))}
                  </div>

                  <Button
                    onClick={nextSlide}
                    variant="outline"
                    size="lg"
                    className="flex items-center gap-2 bg-card/50 border-border hover:border-accent hover:bg-accent/10 hover:text-accent"
                    disabled={currentSlide === slidesIntro.length - 1}
                  >
                    Siguiente
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>

                <div className="mt-6 text-center text-sm text-muted-foreground">
                  <p>Usa las flechas del teclado ← → para navegar</p>
                </div>
              </CardContent>
            </Card>
          )}

          {activeSection === "programa" && (
            <Card className="mb-8 animate-in slide-in-from-top-4 duration-500 border border-border/50 shadow-2xl bg-card/80 backdrop-blur-sm">
              <CardContent className="p-10">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2 bg-accent/10 rounded-lg border border-accent/20">
                    <Calendar className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="text-4xl font-bold text-card-foreground">Qué haremos en el Programa</h3>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-12">
                  <div className="p-6 bg-accent/5 rounded-xl border border-accent/20">
                    <h4 className="text-xl font-semibold mb-4 text-accent">Destinado a</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      Emprendedores, líderes de producto y diseño, intrapreneurs y profesionales no-técnicos que quieran
                      innovar en su sector y multiplicar su impacto apalancándose en herramientas No-Code e IA para
                      lanzar prototipos funcionales y agilizar la dinámica de sus equipos, reduciendo tiempos y costos
                      de desarrollo, validando ideas en días en lugar de meses y generando resultados tangibles que
                      fortalezcan su posición competitiva y profesional.
                    </p>
                  </div>
                  <div className="p-6 bg-accent/5 rounded-xl border border-accent/20">
                    <h4 className="text-xl font-semibold mb-4 text-accent">Modalidad</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      En 6 encuentros de 2,5 hs teórico-prácticos online sincrónicos, contaremos con material de estudio
                      asincrónico complementario, y desarrollaremos un MVP de una web app funcional utilizando
                      herramientas no-code e inteligencia artificial.
                    </p>
                  </div>
                </div>

                <div className="p-6 bg-accent/5 rounded-xl border border-accent/20">
                  <h4 className="text-xl font-semibold mb-4 text-accent">Roadmap</h4>
                  <div className="flex justify-between items-center">
                    <div className="flex-1">
                      <div className="text-center">
                        <div className="w-8 h-8 bg-accent rounded-full mx-auto mb-2 flex items-center justify-center">
                          <User className="h-4 w-4 text-white" />
                        </div>
                        <p className="text-muted-foreground">Zero</p>
                      </div>
                    </div>
                    <div className="flex-1 border-t-2 border-accent"></div>
                    <div className="flex-1">
                      <div className="text-center">
                        <div className="w-8 h-8 bg-accent rounded-full mx-auto mb-2 flex items-center justify-center">
                          <Code className="h-4 w-4 text-white" />
                        </div>
                        <p className="text-muted-foreground">Vibe-coding</p>
                      </div>
                    </div>
                    <div className="flex-1 border-t-2 border-accent"></div>
                    <div className="flex-1">
                      <div className="text-center">
                        <div className="w-8 h-8 bg-accent rounded-full mx-auto mb-2 flex items-center justify-center">
                          <Sparkles className="h-4 w-4 text-white" />
                        </div>
                        <p className="text-muted-foreground">AI-Assisted Product Engineer</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {programClasses.map((classItem) => (
                    <div key={classItem.number} className="border border-border/50 rounded-xl overflow-hidden">
                      <button
                        onClick={() => toggleClass(classItem.number)}
                        className="w-full p-6 text-left hover:bg-muted/50 transition-colors flex items-center justify-between group"
                      >
                        <div className="flex items-center gap-4">
                          <div className="flex-shrink-0 w-10 h-10 bg-accent text-accent-foreground rounded-full flex items-center justify-center font-bold text-lg">
                            {classItem.number}
                          </div>
                          <div>
                            <h4 className="text-xl font-semibold text-card-foreground group-hover:text-accent transition-colors">
                              Clase {classItem.number}: {classItem.title}
                            </h4>
                            <p className="text-muted-foreground text-sm mt-1">{classItem.date}</p>
                          </div>
                        </div>
                        <div className="flex-shrink-0">
                          {expandedClass === classItem.number ? (
                            <ChevronDown className="h-5 w-5 text-muted-foreground group-hover:text-accent transition-colors" />
                          ) : (
                            <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-accent transition-colors" />
                          )}
                        </div>
                      </button>

                      {expandedClass === classItem.number && (
                        <div className="px-6 pb-6 animate-in slide-in-from-top-2 duration-300">
                          <div className="pl-14 space-y-3">
                            {classItem.description.map((item, index) => (
                              <div key={index} className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                                <p className="text-muted-foreground leading-relaxed">{item}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-6 bg-accent/5 rounded-xl border border-accent/20">
                  <h4 className="text-xl font-semibold mb-4 text-accent text-center">Entregable Final</h4>
                  <p className="text-muted-foreground leading-relaxed text-center max-w-4xl mx-auto">
                    <strong>MVP funcional</strong> que incluye: Landing page profesional, Dashboard interactivo, Base de
                    datos configurada, Hosting en producción, y Sistema de autenticación completo.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {activeSection === "comercial" && (
            <Card className="mb-8 animate-in slide-in-from-top-4 duration-500 border border-border/50 shadow-2xl bg-card/80 backdrop-blur-sm">
              <CardContent className="p-10">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2 bg-accent/10 rounded-lg border border-accent/20">
                    <TrendingUp className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="text-4xl font-bold text-card-foreground">Información Comercial</h3>
                </div>

                <div className="max-w-5xl mx-auto">
                  <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-border/20">
                    <img
                      src="/images/commercial-info.png"
                      alt="Información comercial del programa NO-CODE & AI"
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeSection === "preguntas" && (
            <Card className="mb-8 animate-in slide-in-from-top-4 duration-500 border border-border/50 shadow-2xl bg-card/80 backdrop-blur-sm">
              <CardContent className="p-10 text-center">
                <div className="max-w-3xl mx-auto">
                  <div className="p-4 bg-accent/10 rounded-full w-fit mx-auto mb-8">
                    <MessageCircle className="h-12 w-12 text-accent" />
                  </div>
                  <h3 className="text-5xl font-bold mb-8 text-card-foreground">¿Preguntas?</h3>

                  <p className="text-xl text-muted-foreground leading-relaxed mb-12">
                    Este es el momento perfecto para resolver todas tus dudas sobre el programa, la metodología Vibe
                    Coding, y cómo puedes aplicar estas herramientas en tus proyectos.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <footer className="bg-card/30 py-12 mt-20 border-t border-border/50 backdrop-blur-sm">
          <div className="container mx-auto px-4 text-center">
            <p className="text-muted-foreground text-lg">Universidad de San Andrés - Programa NO-CODE & AI</p>
            <p className="text-muted-foreground mt-2">Programación para No Programadores</p>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default function PresentationLanding() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mb-4"></div>
            <p className="text-gray-400">Cargando...</p>
          </div>
        </div>
      }
    >
      <PresentationLandingContent />
    </Suspense>
  )
}
