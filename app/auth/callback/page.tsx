"use client"

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, CheckCircle, XCircle, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function AuthCallbackPage() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createClient()

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const code = searchParams.get('code')
        
        if (!code) {
          setError('Código de autorización no encontrado')
          setStatus('error')
          return
        }

        // Exchange code for session
        const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)
        
        if (exchangeError) {
          console.error('Error exchanging code for session:', exchangeError)
          setError('No se pudo iniciar sesión. El código puede haber expirado o ser inválido.')
          setStatus('error')
          return
        }

        // Success - redirect to dashboard
        setStatus('success')
        
        // Small delay to show success state, then redirect
        setTimeout(() => {
          router.push('/dashboard')
        }, 1500)

      } catch (error: any) {
        console.error('Unexpected error in auth callback:', error)
        setError('Error inesperado. Intenta de nuevo.')
        setStatus('error')
      }
    }

    handleAuthCallback()
  }, [searchParams, supabase.auth, router])

  const handleRetry = () => {
    router.push('/login')
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al inicio
          </Link>
        </div>

        <Card className="border border-border/50 shadow-lg">
          <CardContent className="pt-6">
            {status === 'loading' && (
              <div className="text-center space-y-4">
                <div className="flex justify-center">
                  <Loader2 className="h-8 w-8 animate-spin text-accent" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-2">Iniciando sesión...</h2>
                  <p className="text-muted-foreground">
                    Procesando tu confirmación de email
                  </p>
                </div>
              </div>
            )}

            {status === 'success' && (
              <div className="text-center space-y-4">
                <div className="flex justify-center">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-2 text-green-600">
                    ¡Registro completado exitosamente!
                  </h2>
                  <p className="text-muted-foreground">
                    Tu cuenta ha sido verificada. Redirigiendo al dashboard...
                  </p>
                </div>
              </div>
            )}

            {status === 'error' && (
              <div className="text-center space-y-4">
                <div className="flex justify-center">
                  <XCircle className="h-8 w-8 text-destructive" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-2 text-destructive">
                    Error al iniciar sesión
                  </h2>
                  {error && (
                    <Alert variant="destructive" className="mt-4">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                </div>
                <div className="space-y-2">
                  <Button onClick={handleRetry} className="w-full">
                    Intentar de nuevo
                  </Button>
                  <Button variant="outline" onClick={() => router.push('/')} className="w-full">
                    Volver al inicio
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
