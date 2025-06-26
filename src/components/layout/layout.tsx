import { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Button } from '@components/ui/button'
import { 
  FileText, 
  BarChart3, 
  Upload, 
  Settings, 
  User,
  LogOut 
} from 'lucide-react'
import { useSupabase } from '@lib/supabase/provider'

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  const { t } = useTranslation()
  const location = useLocation()
  const { user, signOut } = useSupabase()

  const navigation = [
    {
      name: t('navigation.dashboard'),
      href: '/dashboard',
      icon: BarChart3,
      current: location.pathname === '/dashboard',
    },
    {
      name: t('navigation.upload'),
      href: '/upload',
      icon: Upload,
      current: location.pathname === '/upload',
    },
    {
      name: t('navigation.settings'),
      href: '/settings',
      icon: Settings,
      current: location.pathname === '/settings',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-2">
                <FileText className="h-8 w-8 text-blue-600" />
                <span className="text-xl font-bold text-gray-900">drclause</span>
              </Link>
            </div>

            {user && (
              <nav className="hidden md:flex items-center space-x-1">
                {navigation.map((item) => (
                  <Link key={item.name} to={item.href}>
                    <Button
                      variant={item.current ? 'default' : 'ghost'}
                      className="flex items-center space-x-2"
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.name}</span>
                    </Button>
                  </Link>
                ))}
              </nav>
            )}

            <div className="flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-700">
                      {user.email}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={signOut}
                    className="flex items-center space-x-2"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>{t('navigation.logout')}</span>
                  </Button>
                </div>
              ) : (
                <Link to="/">
                  <Button>Sign In</Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      {user && (
        <div className="md:hidden bg-white border-t">
          <nav className="flex justify-around py-2">
            {navigation.map((item) => (
              <Link key={item.name} to={item.href}>
                <Button
                  variant={item.current ? 'default' : 'ghost'}
                  size="sm"
                  className="flex flex-col items-center space-y-1"
                >
                  <item.icon className="h-4 w-4" />
                  <span className="text-xs">{item.name}</span>
                </Button>
              </Link>
            ))}
          </nav>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>
    </div>
  )
} 