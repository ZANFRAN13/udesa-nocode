"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useUserRole } from "@/lib/hooks/use-user-role"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  ArrowLeft, 
  Copy, 
  Check,
  Gift,
  Sparkles,
  Lock
} from "lucide-react"

export default function BenefitsPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [copiedV0, setCopiedV0] = useState(false)
  const [copied021, setCopied021] = useState(false)
  const { role, isFreeUser, isLoading: isLoadingRole } = useUserRole()
  const code = "VIBEUDESA"

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  // Redirect free users to dashboard
  useEffect(() => {
    if (!isLoadingRole && isFreeUser) {
      router.push('/dashboard')
    }
  }, [isFreeUser, isLoadingRole, router])

  const handleBackToDashboard = () => {
    router.push('/dashboard')
  }

  const handleCopyCodeV0 = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopiedV0(true)
      setTimeout(() => setCopiedV0(false), 2000)
    } catch (err) {
      console.error('Error copying to clipboard:', err)
    }
  }

  const handleCopyCode021 = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied021(true)
      setTimeout(() => setCopied021(false), 2000)
    } catch (err) {
      console.error('Error copying to clipboard:', err)
    }
  }

  // Show loading screen while checking role or loading page
  if (isLoading || isLoadingRole) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
        <div className="text-center">
          <img src="/images/udesa-logo-black-v.jpg" alt="UdeSA" className="h-28 w-auto animate-udesa-in" />
          <p className="text-gray-300 mt-4">Cargando...</p>
        </div>
      </div>
    )
  }

  // Show access denied message for free users (just in case the redirect doesn't happen immediately)
  if (isFreeUser) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
              <Lock className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl">Acceso Restringido</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground">
              Esta sección es exclusiva para miembros premium. Actualiza tu plan para acceder a beneficios exclusivos.
            </p>
            <Button onClick={() => router.push('/dashboard')} className="w-full">
              Volver al Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/50 bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleBackToDashboard}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver al Dashboard
            </Button>
            <div className="h-6 w-px bg-border" />
            <div className="flex items-center gap-3">
              <img
                src="/images/udesa-png.svg"
                alt="Universidad de San Andrés"
                className="h-8 w-auto"
              />
              <h1 className="text-xl font-semibold text-foreground">
                Beneficios Exclusivos
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          {/* Header Section */}
          <div className="mb-8 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Gift className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-3xl font-bold text-foreground">
                Créditos Gratuitos | Programa <span className="text-primary">No-Code & AI</span> UdeSA
              </h2>
            </div>
            <p className="text-muted-foreground">
              Llevá tu idea a la realidad con No-Code & AI
            </p>
          </div>

          {/* Two Column Layout */}
          <div className="grid md:grid-cols-2 gap-6">
            

            {/* 021 Section */}
            <Card className="border-2 border-primary/20">
              <CardHeader>
                <div className="flex items-center justify-center gap-3 mb-2">
                  <div className="bg-white dark:bg-white rounded-lg p-2">
                    <img
                      src="/images/021logo.svg"
                      alt="021 Logo"
                      className="h-8 w-auto"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Code Section */}
                <div className="bg-slate-900 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-slate-300 text-sm font-medium">
                      Código de Descuento
                    </span>
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium">
                      FREE
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2 p-3 bg-slate-800 rounded-lg border border-slate-700">
                    <code className="flex-1 text-lg font-mono font-semibold text-white">
                      {code}
                    </code>
                    <Button
                      onClick={handleCopyCode021}
                      variant={copied021 ? "default" : "outline"}
                      size="sm"
                      className="flex items-center gap-1 bg-black text-white hover:bg-slate-800 border-slate-600"
                    >
                      {copied021 ? (
                        <>
                          <Check className="h-3 w-3" />
                          ¡Copiado!
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3" />
                          Copiar
                        </>
                      )}
                    </Button>
                  </div>
                  
                  <p className="text-xs text-slate-400 mt-2 text-center">
                    Usa este código en from021.io para obtener créditos gratuitos
                  </p>
                </div>

                {/* Instructions */}
                <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">
                    Cómo usar:
                  </h4>
                  <ol className="text-sm text-purple-800 dark:text-purple-200 space-y-1">
                    <li>1. Ve a <a href="https://from021.io" target="_blank" rel="noopener noreferrer" className="underline font-semibold">from021.io</a></li>
                    <li>2. Crea tu cuenta o inicia sesión</li>
                    <li>3. Usa el código <strong>{code}</strong> al seleccionar el plan Pro</li>
                    <li>4. ¡Bajá tu idea a producción con 021!</li>
                  </ol>
                </div>
              </CardContent>
            </Card>

            {/* v0 Section */}
            <Card className="border-2 border-primary/20">
              <CardHeader>
                <div className="flex items-center justify-center gap-3 mb-2">
                  <div className="bg-black dark:bg-white rounded-lg p-2">
                    <img
                      src="/images/v0-logo-dark.webp"
                      alt="v0 Logo"
                      className="h-8 w-auto"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Code Section */}
                <div className="bg-slate-900 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-slate-300 text-sm font-medium">
                      Código de Descuento
                    </span>
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium">
                      FREE
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2 p-3 bg-slate-800 rounded-lg border border-slate-700">
                    <code className="flex-1 text-lg font-mono font-semibold text-white">
                      {code}
                    </code>
                    <Button
                      onClick={handleCopyCodeV0}
                      variant={copiedV0 ? "default" : "outline"}
                      size="sm"
                      className="flex items-center gap-1 bg-black text-white hover:bg-slate-800 border-slate-600"
                    >
                      {copiedV0 ? (
                        <>
                          <Check className="h-3 w-3" />
                          ¡Copiado!
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3" />
                          Copiar
                        </>
                      )}
                    </Button>
                  </div>
                  
                  <p className="text-xs text-slate-400 mt-2 text-center">
                    Usa este código en v0.app para obtener créditos gratuitos
                  </p>
                </div>

                {/* Instructions */}
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                    Cómo usar:
                  </h4>
                  <ol className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                    <li>1. Ve a <a href="https://v0.app/chat/settings/billing" target="_blank" rel="noopener noreferrer" className="underline font-semibold">v0.app</a></li>
                    <li>2. Haz clic en "Get Started" o "Sign Up"</li>
                    <li>3. Usa el código <strong>{code}</strong> en "Redeem a Usage Code"</li>
                    <li>4. ¡Comienza a generar con IA!</li>
                  </ol>
                </div>
              </CardContent>
            </Card>

          </div>
        </div>
      </div>
    </div>
  )
}
