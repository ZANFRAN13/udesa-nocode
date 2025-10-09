"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  ArrowLeft, 
  Copy, 
  Check,
  Gift,
  Sparkles
} from "lucide-react"

export default function BenefitsPage() {
  const router = useRouter()
  const [copied, setCopied] = useState(false)
  const code = "VIBEUDESA"

  const handleBackToDashboard = () => {
    router.push('/dashboard')
  }

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Error copying to clipboard:', err)
    }
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
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Gift className="h-6 w-6 text-primary" />
              </div>
              <div className="bg-black dark:bg-white rounded-lg p-1">
                <img
                  src="/images/v0-logo-dark.webp"
                  alt="v0 Logo"
                  className="h-8 w-auto"
                />
              </div>
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-foreground">
                    Créditos Gratuitos | Programa <span className="text-primary">No-Code & AI</span> UdeSA
                  </h2>
                  <p className="text-muted-foreground italic">
                    "Everyone can cook"
                  </p>
                </div>
            </div>
          </div>

         
          {/* Description */}
          {/* <div className="text-center mb-8">
            <p className="text-muted-foreground text-lg">
              v0 es una herramienta de Vercel que genera interfaces de usuario usando IA. 
              Describe lo que quieres y obtén código React listo para usar.
            </p>
          </div> */}

          {/* Code Section */}
          <div className="bg-slate-900 rounded-lg p-4 mb-6 max-w-md mx-auto">
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
                onClick={handleCopyCode}
                variant={copied ? "default" : "outline"}
                size="sm"
                className="flex items-center gap-1 bg-black text-white hover:bg-slate-800 border-slate-600"
              >
                {copied ? (
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
              <li>1. Ve a <a href="https://v0.app/chat/settings/billing" target="_blank" rel="noopener noreferrer" className="underline">v0.app</a></li>
              <li>2. Haz clic en "Get Started" o "Sign Up"</li>
              <li>3. Usa el código <strong>{code}</strong> en "Redeem a Usage Code"</li>
              <li>4. ¡Comienza a generar con IA!</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}
