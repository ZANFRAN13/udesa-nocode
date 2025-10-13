import { updateSession } from './lib/supabase/middleware'

export async function middleware(request: any) {
  return await updateSession(request)
}

export const config = {
  matcher: [
    /*
     * Match only dashboard and protected routes
     * Skip public routes, static files, and API routes for better performance
     */
    '/dashboard/:path*',
  ],
}
