"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Lock, CheckCircle, AlertCircle } from 'lucide-react'

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [isValidSession, setIsValidSession] = useState(false)
  const [checkingSession, setCheckingSession] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    // Check if we have a valid session from the password reset link
    const checkSession = async () => {
      try {
        // First, check for hash parameters (access_token from email link)
        const hashParams = new URLSearchParams(window.location.hash.substring(1))
        const accessToken = hashParams.get('access_token')
        const refreshToken = hashParams.get('refresh_token')
        const type = hashParams.get('type')
        
        console.log('Reset password page - Hash params:', { accessToken: !!accessToken, refreshToken: !!refreshToken, type })
        
        // If we have tokens in the URL, set the session
        if (accessToken && type === 'recovery') {
          console.log('Setting session from recovery link')
          const { data, error: sessionError } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken || ''
          })
          
          if (sessionError) {
            console.error('Error setting session:', sessionError)
            setError('Enlace inválido o expirado. Por favor solicita uno nuevo.')
            setIsValidSession(false)
          } else if (data.session) {
            console.log('Session set successfully')
            setIsValidSession(true)
          } else {
            setError('Enlace inválido o expirado. Por favor solicita uno nuevo.')
            setIsValidSession(false)
          }
        } else {
          // Check existing session
          const { data: { session }, error } = await supabase.auth.getSession()
          
          if (error) {
            console.error('Error checking session:', error)
            setError('Enlace inválido o expirado. Por favor solicita uno nuevo.')
            setIsValidSession(false)
          } else if (session) {
            console.log('Valid session found')
            setIsValidSession(true)
          } else {
            console.log('No valid session found')
            setError('Enlace inválido o expirado. Por favor solicita uno nuevo.')
            setIsValidSession(false)
          }
        }
      } catch (err) {
        console.error('Error:', err)
        setError('Error al validar el enlace')
        setIsValidSession(false)
      } finally {
        setCheckingSession(false)
      }
    }

    checkSession()
  }, [supabase])

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (loading) return
    
    // Validate passwords match
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden')
      return
    }

    // Validate password length
    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres')
      return
    }
    
    setLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.updateUser({
        password: password
      })
      
      if (error) throw error
      
      setSuccess(true)
      
      // Redirect to login after 2 seconds
      setTimeout(() => {
        router.push('/login')
      }, 2000)
    } catch (error: any) {
      setError(error.message || 'Error al restablecer la contraseña')
      setLoading(false)
    }
  }

  if (checkingSession) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md border border-border/50 shadow-lg">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center gap-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
              <p className="text-muted-foreground">Verificando enlace...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!isValidSession && !checkingSession) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Card className="border border-border/50 shadow-lg">
            <CardHeader className="text-center">
              <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-2" />
              <CardTitle className="text-2xl font-bold">
                Enlace inválido
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
              
              <Button
                onClick={() => router.push('/forgot-password')}
                className="w-full"
              >
                Solicitar nuevo enlace
              </Button>
              
              <Button
                variant="outline"
                onClick={() => router.push('/login')}
                className="w-full"
              >
                Volver al login
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="border border-border/50 shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">
              Restablecer contraseña
            </CardTitle>
            <p className="text-muted-foreground">
              Ingresa tu nueva contraseña
            </p>
          </CardHeader>
          <CardContent>
            {success ? (
              <div className="space-y-4">
                <Alert className="bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-900">
                  <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                  <AlertDescription className="text-green-900 dark:text-green-100">
                    ¡Contraseña actualizada! Redirigiendo al login...
                  </AlertDescription>
                </Alert>
              </div>
            ) : (
              <form onSubmit={handleResetPassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Nueva contraseña</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10"
                      required
                      minLength={6}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Mínimo 6 caracteres
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="pl-10"
                      required
                      minLength={6}
                    />
                  </div>
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <Button 
                  type="submit" 
                  className="w-full relative" 
                  disabled={loading}
                >
                  {loading && (
                    <div className="absolute left-4">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    </div>
                  )}
                  <span className={loading ? 'opacity-70' : ''}>
                    {loading ? 'Actualizando...' : 'Restablecer contraseña'}
                  </span>
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

