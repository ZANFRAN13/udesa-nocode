import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"

export type UserRole = "free" | "premium" | "admin" | null

export function useUserRole() {
  const [role, setRole] = useState<UserRole>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()

  useEffect(() => {
    async function fetchUserRole() {
      try {
        // Get current user
        const { data: { user }, error: userError } = await supabase.auth.getUser()
        
        if (userError || !user) {
          console.log('[useUserRole] No user found or error:', userError)
          setRole(null)
          setError('No authenticated user')
          setIsLoading(false)
          return
        }

        console.log('[useUserRole] Fetching role for user:', user.id)
        console.log('[useUserRole] User email:', user.email)

        // Fetch user role from user_roles mapping table
        const { data, error: queryError } = await supabase
          .from('user_roles')
          .select('role_name')
          .eq('user_id', user.id)
          .maybeSingle() // Use maybeSingle() instead of single() to handle no results gracefully

        console.log('[useUserRole] Query response:', { data, error: queryError })

        if (queryError) {
          // Log detailed error information
          console.error('[useUserRole] Query error:', {
            message: queryError.message,
            details: queryError.details,
            hint: queryError.hint,
            code: queryError.code
          })
          
          // Check if it's a permissions error (code 42501 or message contains permission/policy)
          if (queryError.code === '42501' || 
              queryError.message?.toLowerCase().includes('permission') ||
              queryError.message?.toLowerCase().includes('policy')) {
            setError('RLS_PERMISSION_ERROR')
            console.error('[useUserRole] ⚠️ RLS PERMISSION ERROR - Check Supabase policies!')
            console.error('[useUserRole] Run SUPABASE_RLS_SETUP.sql to fix permissions')
          }
          
          // Default to premium for safety (avoid blocking all users)
          console.log('[useUserRole] Defaulting to premium due to error')
          setRole("premium")
        } else if (!data || !data.role_name) {
          // No role found in database
          console.log('[useUserRole] No role found in user_roles table - defaulting to premium')
          setRole("premium")
        } else {
          // Role found successfully
          console.log('[useUserRole] ✓ Role found:', data.role_name)
          const userRole = data.role_name.toLowerCase() as UserRole
          setRole(userRole)
          setError(null)
        }
      } catch (error: any) {
        console.error('[useUserRole] Unexpected error:', error)
        setError('UNEXPECTED_ERROR')
        // On unexpected errors, default to premium to avoid blocking access
        setRole("premium")
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserRole()
  }, [supabase])

  return { 
    role, 
    isLoading, 
    error,
    isFreeUser: role === "free", 
    isPremiumUser: role === "premium" || role === "admin",
    isAdmin: role === "admin"
  }
}

