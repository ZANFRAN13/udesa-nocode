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
        // Check for hash fragment parameters (used by password recovery)
        const hashParams = new URLSearchParams(window.location.hash.substring(1))
        const accessToken = hashParams.get('access_token')
        const type = hashParams.get('type')
        
        // Check for query parameters (used by email confirmation)
        const code = searchParams.get('code')
        const error = searchParams.get('error')
        const errorDescription = searchParams.get('error_description')
        
        console.log('Callback params:', { 
          hasAccessToken: !!accessToken, 
          type, 
          hasCode: !!code,
          hasHash: !!window.location.hash 
        })
        
        // Handle error from Supabase
        if (error) {
          setError(errorDescription || error)
          setStatus('error')
          return
        }
        
        // Handle password recovery flow FIRST (has priority)
        if (type === 'recovery' && accessToken) {
          console.log('Password recovery detected, redirecting to reset-password')
          // Redirect to reset password page with hash params preserved
          router.push(`/reset-password${window.location.hash}`)
          return
        }
        
        // Handle email confirmation flow (only if NOT a recovery)
        if (code && !type) {
          console.log('Processing email confirmation with code:', code)
          
          // Exchange code for session
          const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)
          console.log('Exchange result:', { data, error: exchangeError })
          
          if (exchangeError) {
            console.error('Exchange error:', exchangeError)
            
            // Handle specific error cases
            const errorMsg = exchangeError.message || ''
            
            if (errorMsg.includes('Email link is invalid') || errorMsg.includes('expired')) {
              setError('El enlace de confirmación ha expirado o ya fue usado. Por favor, intenta registrarte de nuevo.')
            } else if (errorMsg.includes('User already registered')) {
              setError('Esta cuenta ya fue confirmada. Por favor, inicia sesión.')
            } else if (errorMsg.includes('redirect')) {
              setError('Error de configuración: La URL de callback no está autorizada en Supabase. Verifica que http://localhost:3000/auth/callback esté en las Redirect URLs.')
            } else {
              setError(`Error al confirmar el email: ${errorMsg}`)
            }
            
            setStatus('error')
            return
          }
          
          if (data?.session) {
            console.log('Session created successfully:', data.session.user.email)
            setStatus('success')
            
            // Small delay to show success state, then redirect to dashboard
            setTimeout(() => {
              router.push('/dashboard')
            }, 2000)
          } else {
            setError('No se pudo crear la sesión. Por favor, intenta iniciar sesión directamente.')
            setStatus('error')
          }
          
          return
        }
        
        // No code or token found
        setError('Enlace de confirmación inválido')
        setStatus('error')

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
