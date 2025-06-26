import { ReactNode } from 'react'
import { useSupabase } from '@lib/supabase/provider'

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  // This component uses the SupabaseProvider from lib/supabase/provider
  // It's a wrapper to maintain consistency with the app structure
  return <>{children}</>
} 