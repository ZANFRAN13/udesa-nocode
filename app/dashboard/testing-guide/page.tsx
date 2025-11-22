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
  Target,
  Users,
  TrendingUp,
  BarChart,
  TestTube,
  Search,
  RefreshCw,
  CheckCircle,
  Sparkles,
  ExternalLink,
  Info,
} from "lucide-react"

// Helper component for inline info tooltips
function InfoTooltip({ content }: { content: string }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Info className="inline h-4 w-4 text-primary/70 hover:text-primary cursor-help ml-0.5" />
        </TooltipTrigger>
        <TooltipContent className="max-w-xs">
          <p className="text-sm">{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default function TestingGuidePage() {
  const router = useRouter()
  const supabase = createClient()
  const [activeStep, setActiveStep] = useState<string>("step-1")
  const [isLoading, setIsLoading] = useState(true)

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

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sectionIds = [...steps.map(s => s.id), 'success-section']
      const scrollPosition = window.scrollY + 200

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const section = document.getElementById(sectionIds[i])
        if (section && section.offsetTop <= scrollPosition) {
          setActiveStep(sectionIds[i])
          break
        }
      }
    }

    handleScroll() // Check initial position
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToStep = (stepId: string) => {
    const element = document.getElementById(stepId)
    if (element) {
      const offset = 100
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

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

  // Tool URLs mapping
  const toolUrls: Record<string, string> = {
    "FigJam": "https://www.figma.com/figjam/",
    "Miro": "https://miro.com",
    "Google Forms": "https://www.google.com/forms/about/",
    "Typeform": "https://www.typeform.com",
    "Calendly": "https://calendly.com",
    "Google Calendar": "https://calendar.google.com",
    "Google Sheets": "https://www.google.com/sheets/about/",
    "Airtable": "https://www.airtable.com",
    "Mixpanel": "https://mixpanel.com",
    "Amplitude": "https://amplitude.com",
    "PostHog": "https://posthog.com",
    "Google Analytics": "https://analytics.google.com",
    "Hotjar": "https://www.hotjar.com",
    "Microsoft Clarity": "https://clarity.microsoft.com",
    "Zoom": "https://zoom.us",
    "Google Meet": "https://meet.google.com",
    "Maze": "https://maze.co",
    "Useberry": "https://www.useberry.com",
    "Google Optimize": "https://optimize.google.com",
    "Loom": "https://www.loom.com",
    "Excel": "https://www.microsoft.com/en-us/microsoft-365/excel",
    "Notion": "https://www.notion.so",
    "Confluence": "https://www.atlassian.com/software/confluence",
    "Trello": "https://trello.com",
    "Jira": "https://www.atlassian.com/software/jira",
    "Linear": "https://linear.app",
    "Asana": "https://asana.com",
    "ClickUp": "https://clickup.com",
    "Google Docs": "https://www.google.com/docs/about/",
  }

  const steps = [
    {
      id: "step-1",
      number: "1",
      title: "Define qué querés aprender y tu tarea clave",
      icon: Target,
      subsections: [
        {
          subtitle: "1.1. Anotá en una frase el problema que querés validar",
          description: (
            <div className="space-y-2">
              <p>"Ayudar a [tipo de usuario] a [resultado deseado] sin tener que [solución actual molesta]."</p>
              <div className="mt-3 p-3 bg-accent/5 rounded-lg border border-accent/10">
                <p className="text-xs font-semibold mb-1">Ejemplo:</p>
                <p className="text-xs italic">"Ayudar a freelancers a agendar reuniones con clientes sin tener que coordinar por WhatsApp."</p>
              </div>
            </div>
          ),
        },
        {
          subtitle: (
            <span>
              1.2. Define la <em>tarea clave</em> (acción principal en tu app)
            </span>
          ),
          description: (
            <div className="space-y-2">
              <p>Preguntate:</p>
              <p className="italic">"¿Qué acción, si el usuario la hace, significa que mi producto le dio valor?"</p>
              <div className="mt-3 p-3 bg-accent/5 rounded-lg border border-accent/10">
                <p className="text-xs font-semibold mb-2">Ejemplos de tarea clave:</p>
                <ul className="text-xs space-y-1 list-disc list-inside">
                  <li>Crear y enviar un link de reunión.</li>
                  <li>Crear y compartir un proyecto.</li>
                  <li>Subir un archivo y compartirlo.</li>
                  <li>Completar una reserva.</li>
                </ul>
                <p className="text-xs mt-3"><strong>Qué NO es tarea clave:</strong> solo entrar al dashboard.</p>
              </div>
            </div>
          ),
        },
      ],
      tools: ["FigJam", "Miro"],
      color: "from-purple-500/10 to-purple-600/5",
      iconColor: "text-purple-600",
      detail: "Para dibujar el flujo y la tarea clave, usá FigJam o Miro."
    },
    {
      id: "step-2",
      number: "2",
      title: "Elige a quién vas a testear (usuarios)",
      icon: Users,
      subsections: [
        {
          subtitle: (
            <span>
              2.1. Define tu usuario ideal en 3 líneas (tus <em>early adopters</em> <InfoTooltip content="Aquellos más propensos a usar y pagar por tu producto apenas lanzado antes que el resto" />)
            </span>
          ),
          description: (
            <div className="space-y-2">
              <ul className="text-sm space-y-1 list-disc list-inside">
                <li><strong>Rol:</strong> "freelancers de diseño", "dueños de pequeños negocios", etc.</li>
                <li><strong>Problema actual:</strong> qué usan hoy (Excel, WhatsApp, nada…).</li>
                <li><strong>Frecuencia:</strong> ¿lo hacen seguido? (semanal, diario, mensual).</li>
              </ul>
            </div>
          ),
        },
        {
          subtitle: "2.2. Consigue 5–8 personas que cumplan ese perfil",
          description: (
            <div className="space-y-2">
              <p className="font-semibold text-sm">Lugares:</p>
              <ul className="text-sm space-y-1 list-disc list-inside">
                <li>Gente que ya conocés.</li>
                <li>Comunidades, grupos, foros.</li>
                <li>LinkedIn / redes, con mensajes personalizados.</li>
              </ul>
              <p className="text-sm mt-2">No hace falta más para empezar.</p>
            </div>
          ),
        },
      ],
      tools: ["Google Forms", "Typeform", "Calendly", "Google Calendar", "Google Sheets", "Airtable"],
      color: "from-blue-500/10 to-blue-600/5",
      iconColor: "text-blue-600",
      detail: (
        <span>
          Para armar un formulario corto para identificar early adopters <InfoTooltip content="No hace falta que hagas un form si ya los identificaste" />: Google Forms, Typeform. Para agendar las entrevistas: Calendly, Google Calendar. Para llevar lista de candidatos: Google Sheets, Airtable.
        </span>
      )
    },
    {
      id: "step-3",
      number: "3",
      title: "Define tu North Star Metric (NSM) y 3 métricas básicas",
      icon: TrendingUp,
      subsections: [
        {
          subtitle: "3.1. NSM (tu métrica principal)",
          description: (
            <div className="space-y-2">
              <p>Esta es tu métrica principal. Debe generar ingresos, reflejar el valor para el cliente y medir el progreso.</p>
              <p>Puede ser:</p>
              <p className="italic">"Cantidad de usuarios que completan la <strong>tarea clave</strong> en la primera semana."</p>
              <div className="mt-3 p-3 bg-accent/5 rounded-lg border border-accent/10">
                <p className="text-xs font-semibold mb-2">Ejemplos:</p>
                <ul className="text-xs space-y-1 list-disc list-inside">
                  <li>"Usuarios que crean y envían al menos 1 link de reunión."</li>
                  <li>"Usuarios que crean y comparten al menos 1 proyecto."</li>
                </ul>
              </div>
            </div>
          ),
        },
        {
          subtitle: "3.2. Métricas básicas (no más de 3–4)",
          description: (
            <div className="space-y-2">
              <div className="space-y-3">
                <div>
                  <p className="font-semibold text-sm">1. Adquisición</p>
                  <p className="text-sm ml-4">• Cantidad de usuarios que llegan a mi producto.</p>
                </div>
                <div>
                  <p className="font-semibold text-sm">
                    2. Activación <InfoTooltip content="'Ahá! moment': momento en que el usuario se da cuenta que tu producto le entrega valor" />
                  </p>
                  <p className="text-sm ml-4">• Cantidad de usuarios que completan la <strong>tarea clave</strong> (%).</p>
                </div>
                <div>
                  <p className="font-semibold text-sm">3. Retención temprana</p>
                  <p className="text-sm ml-4">• % de usuarios que vuelven a entrar a la app dentro de 7 días.</p>
                </div>
                <div>
                  <p className="font-semibold text-sm">Opcional si tenés pagos: 4. Pago</p>
                  <p className="text-sm ml-4">• % de usuarios que pagan o piden una demo.</p>
                </div>
              </div>
            </div>
          ),
        },
      ],
      tools: ["Google Analytics", "Mixpanel", "Amplitude", "PostHog"],
      resources: [
        {
          text: "Definición de North Star Metric",
          url: "https://mixpanel.com/blog/north-star-metric/"
        },
        {
          text: "Qué es el funnel AARRR",
          url: "https://pablomarketer.es/que-es-funnel-aarrr/"
        }
      ],
      color: "from-green-500/10 to-green-600/5",
      iconColor: "text-green-600",
      detail: "Para esta y otras métricas de producto: Google Analytics, Mixpanel, Amplitude, PostHog."
    },
    {
      id: "step-4",
      number: "4",
      title: "Configura analytics mínimo",
      icon: BarChart,
      subsections: [
        {
          subtitle: "4.1. Páginas clave",
          description: (
            <div className="space-y-2">
              <ul className="text-sm space-y-1 font-mono text-xs bg-slate-900 text-slate-100 p-3 rounded-lg list-disc list-inside">
                <li>visit_home</li>
                <li>visit_sign_up</li>
                <li>visit_dashboard</li>
              </ul>
            </div>
          ),
        },
        {
          subtitle: (
            <span>
              4.2. Eventos clave <InfoTooltip content="Los eventos permiten medir interacciones o repeticiones concretas en un sitio web o aplicación." />
            </span>
          ),
          description: (
            <div className="space-y-2">
              <ul className="text-sm space-y-1 font-mono text-xs bg-slate-900 text-slate-100 p-3 rounded-lg list-disc list-inside">
                <li>sign_up</li>
                <li>login</li>
                <li>tarea_clave_iniciada (ej: crear_proyecto)</li>
                <li>tarea_clave_completada (ej: proyecto_compartido)</li>
              </ul>
              <p className="text-sm mt-3 font-semibold">Opcional:</p>
              <ul className="text-sm space-y-1 font-mono text-xs bg-slate-900 text-slate-100 p-3 rounded-lg list-disc list-inside">
                <li>
                  click_cta_principal <InfoTooltip content="CTA = Call To Action; formas en las que atraes a tu usuario hacia realizar la tarea clave. Ej: botón que dice 'Descargá ahora'" />
                </li>
                <li>pago_exitoso (si aplica)</li>
              </ul>
            </div>
          ),
        },
        {
          subtitle: "4.3. Funnels básicos",
          description: (
            <div className="space-y-2">
              <ul className="text-sm space-y-1 font-mono text-xs bg-slate-900 text-slate-100 p-3 rounded-lg list-disc list-inside">
                <li>visit_home → sign_up</li>
                <li>sign_up → tarea_clave_completada</li>
              </ul>
              <p className="text-sm mt-2">Con eso ya podés ver dónde se cae la gente.</p>
            </div>
          ),
        },
      ],
      tools: ["Google Analytics", "Mixpanel", "PostHog", "Amplitude", "Hotjar", "Microsoft Clarity"],
      resources: [
        {
          text: "What is User Analytics",
          url: "https://userpilot.com/blog/user-analytics/#what-is-user-analytics"
        },
        {
          text: "Comprehensive Guide to User Analytics",
          url: "https://userpilot.medium.com/a-comprehensive-guide-to-user-analytics-tools-methods-7a7f6954ba52"
        }
      ],
      color: "from-emerald-500/10 to-emerald-600/5",
      iconColor: "text-emerald-600",
      detail: "Para tráfico, páginas y eventos: Google Analytics, Mixpanel, PostHog, Amplitude. Para ver grabaciones y mapas de calor: Hotjar, Microsoft Clarity."
    },
    {
      id: "step-5",
      number: "5",
      title: "Elige el tipo de prueba",
      icon: TestTube,
      subsections: [
        {
          subtitle: "Según tu situación:",
          description: (
            <div className="space-y-3">
              <div>
                <p className="font-semibold text-sm">1. Solo tenés una versión muy inicial / fea pero funcional</p>
                <p className="text-sm ml-4">• Usa <strong>test de usabilidad moderado</strong> (videollamada): mirás cómo usan la app y les das tareas para realizar.</p>
              </div>
              <div>
                <p className="font-semibold text-sm">2. Tenés pocos usuarios, sin mucho tráfico</p>
                <p className="text-sm ml-4">• Test de usabilidad moderado + algunos tests no moderados (mandar link + encuesta corta).</p>
              </div>
              <div>
                <p className="font-semibold text-sm">3. Ya tenés tráfico decente</p>
                <p className="text-sm ml-4">• Podés sumar <strong>A/B tests</strong> (distintas versiones de una pantalla) + entrevistas cortas.</p>
              </div>
              <div className="mt-4 p-3 bg-accent/5 rounded-lg border border-accent/10">
                <p className="text-sm"><strong>Si estás empezando, casi siempre te alcanza con:</strong></p>
                <p className="text-sm mt-1">5–8 tests de usabilidad moderados + analytics básico.</p>
              </div>
            </div>
          ),
        },
      ],
      tools: ["Zoom", "Google Meet", "Maze", "Useberry", "Google Optimize"],
      resources: [
        {
          text: "User Feedback Survey for SaaS",
          url: "https://userpilot.com/blog/user-feedback-survey-saas/"
        },
        {
          text: "Moderated vs Unmoderated Usability Testing",
          url: "https://www.usertesting.com/blog/moderated-vs-unmoderated-usability-testing"
        },
        {
          text: "Remote Usability Tests",
          url: "https://www.nngroup.com/articles/remote-usability-tests/"
        }
      ],
      color: "from-orange-500/10 to-orange-600/5",
      iconColor: "text-orange-600",
      detail: "Para tests moderados (videollamada): Zoom, Google Meet. Para tests no moderados y encuestas in‑app: Maze, Useberry. Para A/B tests: Google Optimize o herramientas de experimentación de tu stack."
    },
    {
      id: "step-6",
      number: "6",
      title: "Corre sesiones simples con usuarios",
      icon: Users,
      subsections: [
        {
          subtitle: "Duración sugerida: 30–40 minutos por persona",
          description: (
            <div className="space-y-3">
              <div>
                <p className="font-semibold text-sm">1. Inicio (5 min)</p>
                <ul className="text-sm ml-4 space-y-1 list-disc list-inside">
                  <li>Gracias por el tiempo.</li>
                  <li>"Estamos probando el producto, no a vos."</li>
                  <li>Pedir permiso para grabar (si grabás).</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-sm">2. Contexto (5–10 min)</p>
                <ul className="text-sm ml-4 space-y-1 list-disc list-inside">
                  <li>¿Cómo resolvés hoy [problema]?</li>
                  <li>¿Qué herramientas usás?</li>
                  <li>¿Qué es lo más molesto de ese proceso?</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-sm">
                  3. Prueba en la app (15–20 min)
                </p>
                <p className="text-sm ml-4 mt-1">
                  Pedí que hagan la <strong>tarea clave</strong> <InfoTooltip content="No le muestres cómo hacerlo. La idea es ver si logra hacerlo y con qué esfuerzo." />, por ejemplo:
                </p>
                <ul className="text-sm ml-4 space-y-1 list-disc list-inside mt-2">
                  <li>"Registrate y creá [X]."</li>
                  <li>"Compartí [X] con alguien."</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-sm">4. Indicaciones:</p>
                <ul className="text-sm ml-4 space-y-1 list-disc list-inside">
                  <li>Pediles: "Pensá en voz alta, contame qué estás esperando que pase."</li>
                  <li>Evitá guiarlos. Si se traban, preguntá: "¿Qué harías ahora?" en vez de decirles dónde hacer clic.</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-sm">5. Cierre (5–10 min)</p>
                <ul className="text-sm ml-4 space-y-1 list-disc list-inside">
                  <li>¿Qué te gustó más?</li>
                  <li>¿Qué fue lo más confuso?</li>
                  <li>"Si mañana esto desaparece, ¿te importaría? ¿Por qué?"</li>
                </ul>
              </div>
            </div>
          ),
        },
        {
          subtitle: "6.2. Qué anotar mientras tanto",
          description: (
            <div className="space-y-2">
              <ul className="text-sm space-y-1 list-disc list-inside">
                <li>Dónde se traban.</li>
                <li>Qué no entienden.</li>
                <li>Frases textuales (ej: "No sé qué hacer ahora", "No entiendo esta parte").</li>
                <li>Momento exacto en que logran (o no) la tarea clave.</li>
              </ul>
            </div>
          ),
        },
      ],
      tools: ["Zoom", "Google Meet", "Loom"],
      color: "from-amber-500/10 to-amber-600/5",
      iconColor: "text-amber-600",
      detail: "Para videollamadas y compartir pantalla: Zoom, Google Meet. Para grabar sesiones rápidas: Loom."
    },
    {
      id: "step-7",
      number: "7",
      title: "Analiza lo que pasó (sin volverte loco)",
      icon: Search,
      subsections: [
        {
          subtitle: "7.1. Mira números básicos",
          description: (
            <div className="space-y-2">
              <p className="font-semibold text-sm">Respuestas que querés:</p>
              <ul className="text-sm space-y-1 list-disc list-inside">
                <li>De 100 visitas, ¿cuántos se registran?</li>
                <li>De los que se registran, ¿cuántos completan la tarea clave?</li>
                <li>De los que completan la tarea clave, ¿cuántos vuelven en 7 días?</li>
              </ul>
              <p className="text-sm mt-2">Con eso ya ves tu "embudo".</p>
            </div>
          ),
        },
        {
          subtitle: "7.2. Junta lo numérico con lo que viste en las sesiones",
          description: (
            <div className="space-y-2">
              <div className="p-3 bg-accent/5 rounded-lg border border-accent/10">
                <p className="text-xs font-semibold mb-2">Ejemplo:</p>
                <p className="text-xs">• <strong>Dato:</strong> "Solo el 25% de los registrados completan la tarea clave."</p>
                <p className="text-xs mt-1">• <strong>Observación:</strong> "En las sesiones, 4 de 6 personas se traban en el paso 2 del formulario."</p>
                <p className="text-xs mt-2">
                  De ahí sale un <strong>insight</strong> <InfoTooltip content="Un descubrimiento o idea reveladora que nos da la clave para poder resolver un problema." />:
                </p>
                <p className="text-xs italic mt-1">"El formulario de registro es una fricción grande; la gente se cansa antes de llegar a la tarea clave."</p>
              </div>
            </div>
          ),
        },
      ],
      tools: ["Google Sheets", "Excel", "Notion", "Airtable", "Google Analytics", "Mixpanel", "Amplitude", "PostHog"],
      color: "from-yellow-500/10 to-yellow-600/5",
      iconColor: "text-yellow-600",
      detail: "Para analizar datos básicos: Google Sheets, Excel. Para consolidar insights de entrevistas: Notion, Airtable. Para ver funnels y cohortes: Google Analytics, Mixpanel, Amplitude, PostHog."
    },
    {
      id: "step-8",
      number: "8",
      title: "Decide qué cambiar (y en qué orden)",
      icon: Target,
      subsections: [
        {
          subtitle: "Usá este mini filtro para cada idea de cambio:",
          description: (
            <div className="space-y-3">
              <div>
                <p className="font-semibold text-sm">1. Impacto:</p>
                <p className="text-sm ml-4">¿Cuánto podría ayudar a que más usuarios completen la tarea clave? (Bajo / Medio / Alto)</p>
              </div>
              <div>
                <p className="font-semibold text-sm">2. Esfuerzo:</p>
                <p className="text-sm ml-4">¿Cuánto tiempo les lleva al equipo? (Bajo / Medio / Alto)</p>
              </div>
              <div>
                <p className="font-semibold text-sm">3. Confianza:</p>
                <p className="text-sm ml-4">¿Qué tan fuerte es la evidencia de que esto ayuda? (Baja / Media / Alta)</p>
              </div>
              <div className="mt-4 p-3 bg-accent/5 rounded-lg border border-accent/10">
                <p className="text-sm font-semibold mb-2">Prioriza cosas de:</p>
                <ul className="text-sm space-y-1 list-disc list-inside">
                  <li><strong>Alto impacto</strong></li>
                  <li><strong>Bajo esfuerzo</strong></li>
                  <li><strong>Confianza media/alta</strong></li>
                </ul>
              </div>
              <div className="mt-4 p-3 bg-primary/5 rounded-lg border border-primary/10">
                <p className="text-sm font-semibold mb-2">Ejemplos típicos de cambios fáciles y útiles:</p>
                <ul className="text-sm space-y-1 list-disc list-inside">
                  <li>Mejorar textos ("microcopy") en los pasos clave.</li>
                  <li>Sacar campos innecesarios del registro.</li>
                  <li>Agregar un ejemplo visual de la tarea clave ya hecha.</li>
                  <li>Hacer más visible el botón que lleva a la tarea clave.</li>
                </ul>
              </div>
            </div>
          ),
        },
      ],
      tools: ["Trello", "Jira", "Linear", "Notion", "Confluence"],
      color: "from-cyan-500/10 to-cyan-600/5",
      iconColor: "text-cyan-600",
      detail: "Para organizar el backlog: Trello, Jira, Linear. Para registrar hipótesis y decisiones: Notion, Confluence."
    },
    {
      id: "step-9",
      number: "9",
      title: "Repite el ciclo",
      icon: RefreshCw,
      subsections: [
        {
          subtitle: "Pensalo como un loop:",
          description: (
            <div className="space-y-3">
              <div>
                <p className="font-semibold text-sm">1. Defino hipótesis</p>
                <p className="text-sm ml-4 italic">"Si simplifico el registro, más gente va a llegar a la tarea clave."</p>
              </div>
              <div>
                <p className="font-semibold text-sm">2. Hago cambios pequeños</p>
                <p className="text-sm ml-4">Ej: menos campos, mejor texto.</p>
              </div>
              <div>
                <p className="font-semibold text-sm">3. Mido 1–2 métricas</p>
                <p className="text-sm ml-4">Ej: % registro → tarea clave.</p>
              </div>
              <div>
                <p className="font-semibold text-sm">4. Aprendo</p>
                <ul className="text-sm ml-4 space-y-1 list-disc list-inside">
                  <li>¿Subió, bajó o quedó igual?</li>
                  <li>¿Qué dicen ahora los usuarios?</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-sm">5. Decido</p>
                <ul className="text-sm ml-4 space-y-1 list-disc list-inside">
                  <li>¿Escalar este cambio?</li>
                  <li>¿Probar otra cosa?</li>
                </ul>
              </div>
              <div className="mt-4 p-3 bg-accent/5 rounded-lg border border-accent/10">
                <p className="text-sm">No hace falta hacerlo perfecto, solo <strong>iterar</strong>.</p>
              </div>
            </div>
          ),
        },
      ],
      tools: ["Asana", "ClickUp", "Jira", "Notion", "Google Docs"],
      color: "from-indigo-500/10 to-indigo-600/5",
      iconColor: "text-indigo-600",
      detail: "Para planificar y trackear ciclos (sprints): Asana, ClickUp, Jira. Para documentar aprendizajes por iteración: Notion, Google Docs."
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
                  <span className="hidden md:inline">Guía Rápida de Testing con Usuarios</span>
                  <span className="md:hidden">Guía Testing</span>
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

      {/* Main Content with Sidebar */}
      <div className="container mx-auto px-3 md:px-4 py-6 md:py-8">
        <div className="flex gap-8 max-w-7xl mx-auto">
          {/* Sidebar - Hidden on mobile */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="fixed top-24 w-64 h-[calc(100vh-7rem)] space-y-1 overflow-y-auto">
              <div className="text-sm font-semibold text-muted-foreground mb-3 px-3">
                Paso a Paso
              </div>
              {steps.map((step) => (
                <button
                  key={step.id}
                  onClick={() => scrollToStep(step.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                    activeStep === step.id
                      ? 'bg-primary/10 text-primary font-medium'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs opacity-70">
                      {step.number}
                    </span>
                    <span className="truncate">{step.title}</span>
                  </div>
                </button>
              ))}

              <div className="pt-4 mt-4 border-t border-border">
                <button
                  onClick={() => scrollToStep('success-section')}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                    activeStep === 'success-section'
                      ? 'bg-primary/10 text-primary font-medium'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    <span>¡Listo para Iterar!</span>
                  </div>
                </button>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0 max-w-4xl">
          {/* Introduction */}
          <div className="mb-8 md:mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl">
                <Sparkles className="h-6 w-6 md:h-8 md:w-8 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  Guía Rápida de Testing con Usuarios
                </h2>
                <p className="text-sm md:text-base text-muted-foreground mt-1">
                  Validá tu MVP y aprendé qué mejorar
                </p>
              </div>
            </div>

            <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-background">
              <CardContent className="pt-6">
                <p className="text-muted-foreground leading-relaxed">
                  <strong>Objetivo:</strong> validar si tu producto entrega valor real y qué hay que mejorar,
                  sin volverte loco con miles de métricas.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Steps */}
          <div className="space-y-6">
            {steps.map((step, index) => {
              const Icon = step.icon

              return (
                <Card
                  key={step.id}
                  id={step.id}
                >
                  <CardHeader className={`bg-gradient-to-br ${step.color} p-4 md:p-6`}>
                    <div className="flex items-start gap-3 md:gap-4">
                      <div className={`p-2 md:p-3 bg-background rounded-lg shrink-0 ${step.iconColor}`}>
                        <Icon className="h-5 w-5 md:h-6 md:w-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline" className="font-mono">
                            Paso {step.number}
                          </Badge>
                        </div>
                        <CardTitle className="text-lg md:text-xl mb-2">
                          {step.title}
                        </CardTitle>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="p-4 md:p-6 space-y-4">
                    {/* Subsections */}
                    {step.subsections && step.subsections.map((subsection, idx) => (
                      <div key={idx} className="space-y-2">
                        <h4 className="text-sm font-semibold text-foreground">
                          {subsection.subtitle}
                        </h4>
                        <div className="text-sm text-muted-foreground leading-relaxed">
                          {subsection.description}
                        </div>
                      </div>
                    ))}

                    {/* Detail */}
                    {step.detail && (
                      <div className="p-3 md:p-4 bg-accent/5 rounded-lg border border-accent/10">
                        <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                          💡 <strong>Herramientas útiles:</strong> {step.detail}
                        </p>
                      </div>
                    )}

                    {/* Tools */}
                    {step.tools && step.tools.length > 0 && (
                      <div>
                        <h4 className="text-sm font-semibold text-foreground mb-2">
                          🛠️ Herramientas recomendadas:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {step.tools.map((tool) => {
                            const url = toolUrls[tool]
                            if (url) {
                              return (
                                <a
                                  key={tool}
                                  href={url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 transition-transform hover:scale-105"
                                >
                                  <Badge
                                    variant="secondary"
                                    className="text-xs cursor-pointer hover:bg-secondary/80"
                                  >
                                    {tool}
                                    <ExternalLink className="h-3 w-3 ml-1 inline" />
                                  </Badge>
                                </a>
                              )
                            }
                            return (
                              <Badge
                                key={tool}
                                variant="secondary"
                                className="text-xs"
                              >
                                {tool}
                              </Badge>
                            )
                          })}
                        </div>
                      </div>
                    )}

                    {/* Resources */}
                    {step.resources && step.resources.length > 0 && (
                      <div>
                        <h4 className="text-sm font-semibold text-foreground mb-2">
                          📚 Recursos útiles:
                        </h4>
                        <div className="space-y-2">
                          {step.resources.map((resource, idx) => (
                            <a
                              key={idx}
                              href={resource.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-xs md:text-sm text-primary hover:text-primary/80 transition-colors"
                            >
                              <ExternalLink className="h-3 w-3 md:h-4 md:w-4" />
                              {resource.text}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Success Card */}
          <Card id="success-section" className="mt-8 scroll-mt-24 border-2 border-green-500/20 bg-gradient-to-br from-green-500/10 to-background">
            <CardHeader className="text-center p-6 md:p-8">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-green-500/10 rounded-full">
                  <CheckCircle className="h-12 w-12 md:h-16 md:w-16 text-green-600" />
                </div>
              </div>
              <CardTitle className="text-2xl md:text-3xl mb-3">
                ¡Listo para Iterar!
              </CardTitle>
              <p className="text-muted-foreground text-sm md:text-base">
                Esta guía rápida está pensada como paso a paso para empezar. Podés adaptarla a tu producto
                marcando en cada sección tus propias respuestas (problema, tarea clave, métricas, cambios, etc.).
              </p>
            </CardHeader>
          </Card>

          {/* Additional Resources */}
          <Card className="mt-6 border-primary/20">
            <CardHeader>
              <CardTitle className="text-lg">📚 Recursos adicionales</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => router.push('/dashboard/vibecoding-guide')}
              >
                Ver Guía de Vibecoding →
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => router.push('/dashboard/nocode-tools')}
              >
                Ver todas las Herramientas No-Code →
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => router.push('/dashboard/glossary/product')}
              >
                Glosario de Producto (MVP, PRD, etc.) →
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => router.push('/dashboard/heuristics')}
              >
                Heurísticas y Buenas Prácticas →
              </Button>
            </CardContent>
          </Card>
        </div>
        </div>
      </div>
    </div>
  )
}
