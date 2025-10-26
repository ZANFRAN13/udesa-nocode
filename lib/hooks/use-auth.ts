import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

export function useAuth() {
  const router = useRouter()
  const supabase = createClient()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_OUT') {
          router.push('/login')
        }
        setIsLoading(false)
      }
    )

    // Check initial session
    supabase.auth.getSession().then(() => {
      setIsLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [router, supabase])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  const handleBackToDashboard = () => {
    router.push('/dashboard')
  }

  return {
    isLoading,
    handleLogout,
    handleBackToDashboard,
    supabase,
    router,
  }
}

