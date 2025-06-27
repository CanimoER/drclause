import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useSupabase } from '@lib/supabase/provider'

interface ProtectedRouteProps {
  children: ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useSupabase()

  // Temporary: Allow access without authentication for UI testing
  // TODO: Remove this when Supabase is properly configured
  const isDevelopment = import.meta.env.DEV && 
    import.meta.env.VITE_SUPABASE_URL?.includes('placeholder')

  if (isDevelopment) {
    return <>{children}</>
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
} 