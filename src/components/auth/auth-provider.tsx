import { ReactNode } from 'react'

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  // This component uses the SupabaseProvider from lib/supabase/provider
  // It's a wrapper to maintain consistency with the app structure
  return <>{children}</>
} 