"use client"

import { useState, useEffect, Suspense, useRef } from "react"
import dynamic from "next/dynamic"
import { useRouter } from "next/navigation"

// Declare Twitter widgets type
declare global {
  interface Window {
    twttr?: {
      widgets: {
        load: () => void
      }
    }
  }
}
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
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
  Bot,
  Wrench,
  Play,
  LogIn,
} from "lucide-react"

// Client-only Twitter component to avoid hydration issues
const TwitterEmbed = dynamic(() => Promise.resolve(function TwitterEmbed() {
  const [currentTweet, setCurrentTweet] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [tweetsLoaded, setTweetsLoaded] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Detect mobile on mount and resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    handleResize() // Initial check
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  
  const tweets = [
    {
      id: 0,
      url: "https://twitter.com/karpathy/status/1617979122625712128",
      text: "The hottest new programming language is English",
      author: "Andrej Karpathy",
      handle: "@karpathy",
      date: "January 24, 2023"
    },
    {
      id: 1,
      url: "https://twitter.com/rauchg/status/1687460501771689984",
      text: "The AI-assisted product engineer of the future",
      author: "Guillermo Rauch",
      handle: "@rauchg",
      date: "August 4, 2023"
    },
    {
      id: 2,
      url: "https://twitter.com/karpathy/status/1886192184808149383",
      text: "There's a new kind of coding I call \"vibe coding\", where you fully give in to the vibes, embrace exponentials, and forget that the code even exists. It's possible because the LLMs (e.g. Cursor Composer w Sonnet) are getting too good. Also I just talk to Composer with SuperWhisper…",
      author: "Andrej Karpathy",
      handle: "@karpathy",
      date: "February 2, 2025"
    },
    {
      id: 3,
      url: "https://twitter.com/rauchg/status/1917594199693877446",
      text: "Given enough tokens, all bugs are shallow",
      author: "Guillermo Rauch",
      handle: "@rauchg",
      date: "April 30, 2025"
    }
  ]

  // Ensure twitter script is present and load all tweets initially
  useEffect(() => {
    if (typeof window === 'undefined') return
    
    const loadTweets = () => {
      if (window.twttr?.widgets) {
        window.twttr.widgets.load()
        // Wait for tweets to fully render
        setTimeout(() => {
          setTweetsLoaded(true)
        }, 1500)
      }
    }
    
    const hasWidgets = document.querySelector('script[src^="https://platform.twitter.com/widgets.js"]')
    if (!hasWidgets) {
      const script = document.createElement('script')
      script.src = 'https://platform.twitter.com/widgets.js'
      script.async = true
      script.charset = 'utf-8'
      script.onload = () => {
        setTimeout(loadTweets, 500)
      }
      document.body.appendChild(script)
    } else {
      loadTweets()
    }
  }, [])

  useEffect(() => {
    // Auto-rotate tweets every 6 seconds, but only if not paused and tweets are loaded
    if (isPaused || !tweetsLoaded) return
    
    const interval = setInterval(() => {
      setCurrentTweet((prev) => (prev + 1) % tweets.length)
    }, 6000)
    
    return () => {
      clearInterval(interval)
    }
  }, [isPaused, tweetsLoaded, tweets.length])

  const getVisibleTweets = () => {
    const prev = (currentTweet - 1 + tweets.length) % tweets.length
    const next = (currentTweet + 1) % tweets.length
    return [prev, currentTweet, next]
  }

  const visibleIndices = getVisibleTweets()

  const handleMouseEnter = () => {
    setIsPaused(true)
  }

  const handleMouseLeave = () => {
    setIsPaused(false)
  }

  const handleTweetClick = (index: number) => {
    if (index !== currentTweet) {
      setCurrentTweet(index)
    }
  }

  return (
    <>
      {/* Loading placeholder */}
      {!tweetsLoaded && (
        <div className="relative mb-8 min-h-[400px] md:min-h-[500px] flex items-center justify-center py-4">
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 border-4 border-accent/30 border-t-accent rounded-full animate-spin"></div>
            <p className="text-sm text-muted-foreground">Cargando tweets...</p>
          </div>
        </div>
      )}
      
      <div 
        ref={containerRef}
        className="relative mb-8 min-h-[400px] md:min-h-[500px] flex items-center justify-center overflow-visible py-4"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          opacity: tweetsLoaded ? 1 : 0,
          transition: 'opacity 600ms ease-in',
          display: tweetsLoaded ? 'flex' : 'none',
        }}
      >
        <div className="relative w-full max-w-7xl mx-auto px-2 md:px-4">
        {/* Render all tweets - keep them mounted to avoid reloading */}
        {tweets.map((tweet, index) => {
          const position = visibleIndices.indexOf(index)
          const isVisible = position !== -1
          const isCenter = position === 1
          const isLeft = position === 0
          const isRight = position === 2
          
          // Adjusted spacing: closer to center but not overlapping
          // Mobile: hide side tweets, Desktop: show all three
          let translateX = '0%'
          if (isLeft) translateX = '-85%'  // Closer than -120%
          if (isRight) translateX = '85%'   // Closer than 120%
          
          // Special scaling for tweet id: 1 (vibe coding with video)
          const isLargeTweet = tweet.id === 1
          // Mobile: smaller center tweet, Desktop: normal size
          const centerScaleMobile = isLargeTweet ? 0.7 : 0.85
          const centerScaleDesktop = isLargeTweet ? 0.85 : 1.1
          const sideScale = isLargeTweet ? 0.58 : 0.75
          
          // Align all tweets by their top edge when centered
          // Use transform-origin: top to scale from top edge
          // Background tweets are positioned slightly higher for better visual balance
          const verticalOffsetMobile = isCenter ? '-180px' : '-120px'
          const verticalOffsetDesktop = isCenter ? '-240px' : '-180px'
          
          // Calculate responsive values based on state
          const verticalOffset = isMobile ? verticalOffsetMobile : verticalOffsetDesktop
          const scale = isCenter 
            ? (isMobile ? centerScaleMobile : centerScaleDesktop) 
            : sideScale
          
          // Mobile-specific smoother transitions
          const transitionDuration = isMobile ? '1200ms' : '1000ms'
          const opacityDuration = isMobile ? '1000ms' : '800ms'
          
          return (
            <div
              key={index}
              className={`absolute left-1/2 top-1/2 ${
                isCenter ? 'z-20' : 'z-10 md:block'
              }`}
              style={{
                transform: `translate(-50%, 0%) translateX(${translateX}) translateY(${verticalOffset}) scale(${scale})`,
                transformOrigin: 'top center',
                width: 'min(450px, 90vw)',
                maxWidth: '450px',
                opacity: isVisible ? 1 : 0,
                pointerEvents: isVisible ? 'auto' : 'none',
                transition: `opacity ${opacityDuration} ease-in-out, transform ${transitionDuration} ease-in-out`,
                // In mobile, hide non-center tweets by setting display none after transition
                display: isMobile && !isCenter && !isVisible ? 'none' : 'block',
              }}
              onClick={() => !isCenter && handleTweetClick(index)}
            >
              <div 
                className={`transition-opacity ${isMobile ? 'duration-700' : 'duration-500'} ${!isCenter ? 'opacity-40 cursor-pointer hover:opacity-60' : 'opacity-100'}`}
                style={{ pointerEvents: isCenter ? 'auto' : 'none' }}
              >
                <blockquote 
                  className="twitter-tweet" 
                  data-theme="dark" 
                  data-dnt="true"
                  data-conversation="none"
                >
                  <p lang="en" dir="ltr">{tweet.text}</p>
                  &mdash; {tweet.author} ({tweet.handle}){' '}
                  <a href={tweet.url} target="_blank" rel="noopener noreferrer">
                    {tweet.date}
                  </a>
      </blockquote>
              </div>
            </div>
          )
        })}
        </div>
      </div>
    </>
  )
}), { ssr: false })

function PresentationLandingContent() {
  const router = useRouter()
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const [expandedClass, setExpandedClass] = useState<number | null>(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [currentAboutSlide, setCurrentAboutSlide] = useState(0)

  const handleLogin = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('navigate-with-splash', { detail: { href: '/login' } }))
    } else {
      router.push('/login')
    }
  }

  const toggleSection = (section: string) => {
    const isClosing = activeSection === section
    setActiveSection(isClosing ? null : section)
    
    // Si estamos abriendo una sección, hacer scroll
    if (!isClosing) {
      // Intentar hacer scroll con reintentos
      let attempts = 0
      const maxAttempts = 10
      
      const tryScroll = () => {
        const element = document.getElementById(`section-${section}`)
        if (element) {
          const yOffset = -100
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
          
          window.scrollTo({
            top: y,
            behavior: 'smooth'
          })
        } else {
          attempts++
          if (attempts < maxAttempts) {
            setTimeout(tryScroll, 100)
          }
        }
      }
      
      // Iniciar después de un pequeño delay
      setTimeout(tryScroll, 50)
    }
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
    {
      id: 6,
      image: "/images/slide-6-new.jpeg",
      alt: "Tweet de Andrej Karpathy sobre vibe coding - definición y explicación",
    },
    { id: 7, image: "/images/slide-8.jpeg", alt: "Qué cambió - MVP 2017 vs MVP 2025" },
    { id: 8, image: "/images/slide-9.jpeg", alt: "Vibe coding - herramientas y comparación" },
    { id: 9, image: "/images/slide-10-new.jpeg", alt: "Qué, cómo y cuándo usarlo - perspectivas sobre vibe coding" },
    { id: 10, image: "/images/slide-10.jpeg", alt: "Fases de desarrollo vibe coding" },
    { id: 11, image: "/images/slide-11.jpeg", alt: "Esqueleto de un producto" },
  ]

  const roadmapSteps = [
    {
      id: 1,
      title: "Cero",
      subtitle: "Pensador/Diseñador",
      icon: Play,
      description: "Punto de partida para profesionales no-técnicos",
    },
    {
      id: 2,
      title: "Vibe-coding",
      subtitle: "Creador aficionado",
      icon: Code,
      description: "Crear aplicaciones simples usando lenguaje natural e IA",
    },
    {
      id: 3,
      title: "AI-Assisted Product Engineer",
      subtitle: "Creador competente",
      icon: Bot,
      description: "Dominio de No-Code e IA para aportes funcionales y escalables",
    },
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
        <div className="absolute top-4 md:top-6 left-3 md:left-6 z-10 flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-8">
          <img
            src="/images/udesa-png.svg"
            alt="Universidad de San Andrés"
            className="h-8 md:h-10 w-auto opacity-90 hover:opacity-100 transition-opacity"
          />
          <div className="flex items-center gap-2 md:gap-3">
            <span className="text-xs md:text-sm text-white font-light">CON EL APOYO DE:</span>
            <img
              src="/images/v0-logo-dark.webp"
              alt="v0 Logo"
              className="h-6 md:h-8 w-auto opacity-90 hover:opacity-100 transition-opacity"
            />
          </div>
        </div>

        <div className="absolute top-4 md:top-6 right-3 md:right-6 z-10">
          <Button
            onClick={handleLogin}
            variant="outline"
            size="lg"
            className="bg-black/50 backdrop-blur-sm border-white/20 text-white hover:bg-white/10 hover:border-accent hover:text-accent transition-all duration-300 text-sm md:text-base h-9 md:h-11 px-3 md:px-4"
          >
            <LogIn className="h-3 w-3 md:h-4 md:w-4 md:mr-2" />
            <span className="hidden sm:inline">Ingresar</span>
          </Button>
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

        <div className="relative container mx-auto px-3 md:px-4 py-8 md:py-12 text-center">
          <div className="max-w-5xl mx-auto">
            {/* <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-background rounded-full text-sm font-medium mb-8 border border-accent/20 animate-glow">
              <Sparkles className="h-4 w-4" />
              Universidad de San Andrés
            </div> */}

            <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-3 md:mb-4 text-balance text-foreground mt-24 md:mt-16 px-2">Programa NO-CODE & AI</h1>
            <p className="text-base md:text-lg lg:text-xl mb-4 md:mb-6 text-muted-foreground text-pretty max-w-3xl mx-auto leading-relaxed px-2">
              Aprendé a desarrollar aplicaciones sin saber programar
            </p>
            <TwitterEmbed />

            <div className="max-w-6xl mx-auto space-y-4 md:space-y-8">
              {/* Primera fila - 3 botones */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                <Button
                  onClick={() => toggleSection("about")}
                  variant="outline"
                  size="lg"
                  className="h-20 md:h-24 text-sm md:text-base font-semibold hover:scale-105 transition-all duration-300 border-2 border-white hover:border-accent hover:bg-accent/20 hover:text-accent group px-3 md:px-4 bg-black text-white shadow-lg"
                >
                  <div className="flex flex-col items-center gap-1.5 md:gap-2">
                    <User className="h-5 w-5 md:h-6 md:w-6 group-hover:scale-110 transition-transform flex-shrink-0" />
                    <span className="text-center leading-tight">Sobre nosotros</span>
                  </div>
                </Button>
                <Button
                  onClick={() => toggleSection("intro")}
                  variant="outline"
                  size="lg"
                  className="h-20 md:h-24 text-sm md:text-base font-semibold hover:scale-105 transition-all duration-300 border-2 border-white hover:border-accent hover:bg-accent/20 hover:text-accent group px-3 md:px-4 bg-black text-white shadow-lg"
                >
                  <div className="flex flex-col items-center gap-1.5 md:gap-2">
                    <Users className="h-5 w-5 md:h-6 md:w-6 group-hover:scale-110 transition-transform flex-shrink-0" />
                    <span className="text-center leading-tight">Introducción al Vibe Coding</span>
                  </div>
                </Button>
                <Button
                  onClick={() => toggleSection("programa")}
                  variant="outline"
                  size="lg"
                  className="h-20 md:h-24 text-sm md:text-base font-semibold hover:scale-105 transition-all duration-300 border-2 border-white hover:border-accent hover:bg-accent/20 hover:text-accent group px-3 md:px-4 bg-black text-white shadow-lg"
                >
                  <div className="flex flex-col items-center gap-1.5 md:gap-2">
                    <Calendar className="h-5 w-5 md:h-6 md:w-6 group-hover:scale-110 transition-transform flex-shrink-0" />
                    <span className="text-center leading-tight">Qué haremos en el Programa</span>
                  </div>
                </Button>
              </div>

              {/* Segunda fila - 2 botones centrados */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-2xl mx-auto">
                <Button
                  onClick={() => toggleSection("comercial")}
                  variant="outline"
                  size="lg"
                  className="h-20 md:h-24 text-sm md:text-base font-semibold hover:scale-105 transition-all duration-300 border-2 border-white hover:border-accent hover:bg-accent/20 hover:text-accent group px-3 md:px-4 bg-black text-white shadow-lg"
                >
                  <div className="flex flex-col items-center gap-1.5 md:gap-2">
                    <TrendingUp className="h-5 w-5 md:h-6 md:w-6 group-hover:scale-110 transition-transform flex-shrink-0" />
                    <span className="text-center leading-tight">Información Comercial</span>
                  </div>
                </Button>
                <Button
                  onClick={() => toggleSection("preguntas")}
                  variant="outline"
                  size="lg"
                  className="h-20 md:h-24 text-sm md:text-base font-semibold hover:scale-105 transition-all duration-300 border-2 border-white hover:border-accent hover:bg-accent/20 hover:text-accent group px-3 md:px-4 bg-black text-white shadow-lg"
                >
                  <div className="flex flex-col items-center gap-1.5 md:gap-2">
                    <MessageCircle className="h-5 w-5 md:h-6 md:w-6 group-hover:scale-110 transition-transform flex-shrink-0" />
                    <span className="text-center leading-tight">Preguntas & Cierre</span>
                  </div>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-3 md:px-4 py-8 md:py-12">
          {activeSection === "about" && (
            <Card id="section-about" className="mb-8 animate-in slide-in-from-top-4 duration-500 border border-border/50 shadow-2xl bg-card/80 backdrop-blur-sm">
              <CardContent className="p-10">
                <div className="flex items-center gap-3 mb-8">
                  <h3 className="text-4xl font-bold text-card-foreground">Coordinadores Académicos	</h3>
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
                    <div className="space-y-4 text-card-foreground leading-relaxed max-w-md mx-auto">
                      <p>
                        Emprendedor en tecnología y ciencia con experiencia en diseño y liderazgo de productos y
                        estrategias digitales.
                      </p>
                      <p>
                        Responsable de Product & DLT Strategy en Ruuts.
                      </p>
                      <p>Negocios Digitales, Universidad de San
                      Andrés. Especializado en DeFi en Duke University.</p>
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
                    <div className="space-y-4 text-card-foreground leading-relaxed max-w-md mx-auto">
                      <p>
                        Especialista en Diseño Estratégico de Negocios con experiencia en Metodologías Ágiles, Productos
                        Digitales y tecnología Blockchain.
                      </p>
                      <p>Impact Officer Global Shapers Community y Product Manager en Open Earth Foundation.</p>
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
            <Card id="section-intro" className="mb-8 animate-in slide-in-from-top-4 duration-500 border border-border/50 shadow-2xl bg-card/80 backdrop-blur-sm">
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
            <Card id="section-programa" className="mb-8 animate-in slide-in-from-top-4 duration-500 border border-border/50 shadow-2xl bg-card/80 backdrop-blur-sm">
              <CardContent className="p-10">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2 bg-accent/10 rounded-lg border border-accent/20">
                    <Calendar className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="text-4xl font-bold text-card-foreground">Qué haremos en el Programa</h3>
                </div>

                <div className="space-y-8 mb-12">
                  {/* Destinado a and Modalidad side by side */}
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Destinado a */}
                    <div className="p-6 bg-accent/5 rounded-xl border border-accent/20">
                      <h4 className="text-xl font-semibold mb-4 text-accent">Destinado a</h4>
                      <ul className="space-y-2 text-card-foreground leading-relaxed">
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                          <span>Emprendedores</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                          <span>Líderes de producto y diseño</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                          <span>Intrapreneurs</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                          <span>Profesionales no-técnicos</span>
                        </li>
                      </ul>
                    </div>

                    {/* Modalidad */}
                    <div className="p-6 bg-accent/5 rounded-xl border border-accent/20">
                      <h4 className="text-xl font-semibold mb-4 text-accent">Modalidad</h4>
                      <ul className="space-y-2 text-card-foreground leading-relaxed">
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                          <span>6 encuentros de 2,5 hs teórico-prácticos online sincrónicos</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                          <span>Contaremos con material de estudio asincrónico complementario</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                          <span>
                            Desarrollaremos un MVP de una web app funcional utilizando herramientas no-code e
                            inteligencia artificial
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Objetivo - full width */}
                  <div className="p-6 bg-accent/5 rounded-xl border border-accent/20">
                    <h4 className="text-xl font-semibold mb-4 text-accent">Objetivo</h4>
                    <p className="text-card-foreground leading-relaxed">
                      Aprender a innovar y multiplicar el impacto apalancándose en herramientas No-Code e IA para lanzar
                      prototipos funcionales y agilizar la dinámica de sus equipos, reduciendo tiempos y costos de
                      desarrollo, validando ideas en días en lugar de meses y generando resultados tangibles que
                      fortalezcan su posición competitiva y profesional.
                    </p>
                  </div>

                  {/* Roadmap */}
                  <div className="p-6 bg-accent/5 rounded-xl border border-accent/20">
                    <h4 className="text-xl font-semibold mb-4 text-accent">Roadmap</h4>
                    <div className="max-w-3xl mx-auto">
                      <div className="relative">
                        {/* Pasos del roadmap */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                          {/* Línea de conexión horizontal - desde el centro del primer icono al último */}
                          <div className="hidden md:block absolute top-8 h-0.5 bg-gradient-to-r from-accent/60 via-accent/40 to-accent/60 z-0" style={{left: '12.5%', right: '12.5%'}}></div>
                          {roadmapSteps.map((step, index) => {
                            const IconComponent = step.icon
                            return (
                              <div key={step.id} className="text-center relative">
                                {/* Contenedor del icono con número integrado */}
                                <div className="relative mb-3 flex justify-center">
                                  <div className="w-16 h-16 bg-card rounded-full border-3 border-accent/30 flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 group relative z-10">
                                    <IconComponent className="h-6 w-6 text-accent group-hover:text-accent/80 transition-colors" />
                                    {/* Número del paso - más pegado al icono */}
                                    <div className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-accent text-background rounded-full flex items-center justify-center font-bold text-xs shadow-sm border border-background">
                                      {step.id}
                                    </div>
                                  </div>
                                </div>
                                
                                {/* Contenido del paso */}
                                <div className="space-y-1">
                                  <h5 className="text-base font-bold text-card-foreground">{step.title}</h5>
                                  <p className="text-xs font-medium text-accent">{step.subtitle}</p>
                                  <p className="text-xs text-muted-foreground leading-relaxed max-w-xs mx-auto">
                                    {step.description}
                                  </p>
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Cronograma Clase a Clase */}
                  <div className="p-6 bg-accent/5 rounded-xl border border-accent/20">
                    <h4 className="text-xl font-semibold mb-6 text-accent">Cronograma Clase a Clase</h4>
                    <div className="space-y-4">
                      {programClasses.map((classItem) => (
                        <div key={classItem.number} className="border border-border/30 rounded-lg overflow-hidden">
                          <button
                            onClick={() => toggleClass(classItem.number)}
                            className="w-full p-4 text-left bg-card/50 hover:bg-card/70 transition-colors flex items-center justify-between"
                          >
                            <div className="flex items-center gap-4">
                              <div className="w-8 h-8 bg-accent text-background rounded-full flex items-center justify-center font-semibold text-sm">
                                {classItem.number}
                              </div>
                              <div>
                                <h5 className="font-semibold text-card-foreground">{classItem.title}</h5>
                                <p className="text-sm text-muted-foreground">{classItem.date}</p>
                              </div>
                            </div>
                            <div
                              className={`transform transition-transform ${expandedClass === classItem.number ? "rotate-180" : ""}`}
                            >
                              <ArrowRight className="h-4 w-4 text-muted-foreground" />
                            </div>
                          </button>
                          {expandedClass === classItem.number && (
                            <div className="p-4 bg-card/30 border-t border-border/30 animate-in slide-in-from-top-2 duration-200">
                              <ul className="space-y-2">
                                {classItem.description.map((item, index) => (
                                  <li key={index} className="flex items-start gap-3 text-card-foreground">
                                    <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0" />
                                    <span className="text-sm leading-relaxed">{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Profesores */}
                  <div className="p-6 bg-accent/5 rounded-xl border border-accent/20">
                    <h4 className="text-xl font-semibold mb-6 text-accent">Profesores</h4>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {/* Maria Frances Gaska */}
                      <div className="text-center">
                        <div className="relative mb-4">
                          <img
                            src="/images/maria-frances-gaska.png"
                            alt="Maria Frances Gaska"
                            className="w-24 h-24 rounded-full mx-auto object-cover border-2 border-accent/20"
                          />
                        </div>
                        <h5 className="text-lg font-semibold text-card-foreground mb-2">Maria Frances Gaska</h5>
                        <p className="text-sm text-card-foreground leading-relaxed">
                          CTO & cofounder en Instituto Humai. Docente de datos, machine learning e IA. Trabajó en
                          diversas startups como AI engineer y como arquitecta de soluciones de IA en AWS.
                        </p>
                      </div>

                      {/* Greta Gawianski */}
                      <div className="text-center">
                        <div className="relative mb-4">
                          <img
                            src="/images/greta-new.png"
                            alt="Greta Gawianski"
                            className="w-24 h-24 rounded-full mx-auto object-cover border-2 border-accent/20"
                          />
                        </div>
                        <h5 className="text-lg font-semibold text-card-foreground mb-2">Greta Gawianski</h5>
                        <p className="text-sm text-card-foreground leading-relaxed">
                          Especialista en Diseño Estratégico de Negocios con experiencia en Metodologías Ágiles,
                          Productos Digitales y tecnología Blockchain. Impact Officer Global Shapers Community y Product
                          Manager en Open Earth Foundation. Lic. Comunicación Universidad de San Andrés, donde coordinó
                          los programas Blockchain y Criptoactivos.
                        </p>
                      </div>

                      {/* Ariel Mathov */}
                      <div className="text-center">
                        <div className="relative mb-4">
                          <img
                            src="/images/ariel-mathov.png"
                            alt="Ariel Mathov"
                            className="w-24 h-24 rounded-full mx-auto object-cover border-2 border-accent/20"
                          />
                        </div>
                        <h5 className="text-lg font-semibold text-card-foreground mb-2">Ariel Mathov</h5>
                        <p className="text-sm text-card-foreground leading-relaxed">
                          Fundador from021.io. Especialista en productos digitales (mobile apps & SaaS), fundó Almaya, y
                          previamente trabajó en Wolox, creando el área Diseño de Negocios Digitales. Ingeniero
                          Industrial UBA.
                        </p>
                      </div>

                      {/* Pablo Sciolla */}
                      <div className="text-center">
                        <div className="relative mb-4">
                          <img
                            src="/images/pablo-sciolla.png"
                            alt="Pablo Sciolla"
                            className="w-24 h-24 rounded-full mx-auto object-cover border-2 border-accent/20"
                          />
                        </div>
                        <h5 className="text-lg font-semibold text-card-foreground mb-2">Pablo Sciolla</h5>
                        <p className="text-sm text-card-foreground leading-relaxed">
                          Especialista en datos, inteligencia artificial y tecnologías emergentes. Profesor de Cátedra
                          de la Universidad de San Andrés. Coordinador académico del programa IA para Negocios.
                          Ingeniero en Sistemas de Información, UTN. Se desempeñó como Senior Manager de la división de
                          Advisory de EY.
                        </p>
                      </div>

                      {/* Esteban Suárez */}
                      <div className="text-center">
                        <div className="relative mb-4">
                          <img
                            src="/images/esteban-suarez.png"
                            alt="Esteban Suárez"
                            className="w-24 h-24 rounded-full mx-auto object-cover border-2 border-accent/20"
                          />
                        </div>
                        <h5 className="text-lg font-semibold text-card-foreground mb-2">Esteban Suárez</h5>
                        <p className="text-sm text-card-foreground leading-relaxed">
                          Developer Relations en v0 (Vercel), en donde posibilita que las personas conviertan ideas en
                          aplicaciones web, desarrollando integraciones, plantillas y recursos para la comunidad que
                          muestran cómo v0 elimina las barreras técnicas.
                        </p>
                      </div>

                      {/* Franco Zan */}
                      <div className="text-center">
                        <div className="relative mb-4">
                          <img
                            src="/images/franco-new.png"
                            alt="Franco Zan"
                            className="w-24 h-24 rounded-full mx-auto object-cover border-2 border-accent/20"
                          />
                        </div>
                        <h5 className="text-lg font-semibold text-card-foreground mb-2">Franco Zan</h5>
                        <p className="text-sm text-card-foreground leading-relaxed">
                          Emprendedor en tecnología y ciencia con experiencia en diseño y liderazgo de productos y
                          estrategias digitales. Responsable de Product & DLT Strategy en Ruuts. Negocios
                          Digitales, Universidad de San Andrés. Especializado en DeFi en Duke University.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-accent/5 rounded-xl border border-accent/20">
                  <h4 className="text-xl font-semibold mb-4 text-accent text-center">Entregable Final</h4>
                  <p className="text-muted-foreground leading-relaxed text-center max-w-4xl mx-auto">
                    <strong>MVP funcional</strong> que incluye: Landing page profesional, funcionalidades principales, Base de
                    datos configurada, Hosting en producción, y Sistema de autenticación completo.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {activeSection === "comercial" && (
            <Card id="section-comercial" className="mb-8 animate-in slide-in-from-top-4 duration-500 border border-border/50 shadow-2xl bg-card/80 backdrop-blur-sm">
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
            <Card id="section-preguntas" className="mb-8 animate-in slide-in-from-top-4 duration-500 border border-border/50 shadow-2xl bg-card/80 backdrop-blur-sm">
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
  const [showSplash, setShowSplash] = useState(true)
  const [fadeOutSplash, setFadeOutSplash] = useState(false)
  const [contentVisible, setContentVisible] = useState(false)

  useEffect(() => {
    let mounted = true
    // Show splash at least 1.8s, then fade out and reveal content
    const minDelay = setTimeout(() => {
      if (!mounted) return
      setFadeOutSplash(true)
      setContentVisible(true)
      // wait fade-out transition then unmount splash
      setTimeout(() => {
        if (mounted) setShowSplash(false)
      }, 600)
    }, 1800)

    // If twitter is ready earlier, we still keep min 800ms
    if (typeof window !== 'undefined') {
      const checkTwttr = () => {
        if (window.twttr && !showSplash) {
          window.twttr.widgets.load()
        }
      }
      const readyInterval = setInterval(checkTwttr, 300)
      return () => { mounted = false; clearTimeout(minDelay); clearInterval(readyInterval) }
    }
    return () => { mounted = false; clearTimeout(minDelay) }
  }, [showSplash])

  return (
    <>
      {showSplash && (
        <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-500 ${fadeOutSplash ? 'opacity-0' : 'opacity-100'}`}>
          <div className="text-center">
            <img src="/images/udesa-logo-black-v.jpg" alt="UdeSA" className="h-28 w-auto animate-udesa-in" />
            <p className="text-gray-300 mt-4">Cargando...</p>
          </div>
        </div>
      )}
      {/* Listen for programmatic navigations that should show splash */}
      <SplashNavigator />
      <Suspense>
        <div className={`transition-opacity duration-700 ${contentVisible ? 'opacity-100' : 'opacity-0'}`}>
          <PresentationLandingContent />
        </div>
      </Suspense>
    </>
  )
}

function SplashNavigator() {
  const router = useRouter()
  const [active, setActive] = useState(false)
  const [fade, setFade] = useState(false)
  const targetRef = useRef<string | null>(null)

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail as { href: string }
      targetRef.current = detail?.href || '/'
      setActive(true)
      setTimeout(() => setFade(true), 50)
      setTimeout(() => {
        const to = targetRef.current || '/'
        router.push(to)
      }, 600)
    }
    window.addEventListener('navigate-with-splash', handler as EventListener)
    return () => window.removeEventListener('navigate-with-splash', handler as EventListener)
  }, [router])

  if (!active) return null
  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-500 ${fade ? 'opacity-100' : 'opacity-0'}`}>
      <div className="text-center">
        <img src="/images/udesa-logo-black-v.jpg" alt="UdeSA" className="h-28 w-auto animate-udesa-in" />
        <p className="text-gray-300 mt-4">Entrando...</p>
      </div>
    </div>
  )
}
