import { Routes, Route } from 'react-router-dom'
import { Toaster, ToasterProvider } from '@components/ui/toaster'
import { AuthProvider } from '@components/auth/auth-provider'
import { ProtectedRoute } from '@components/auth/protected-route'
import { Layout } from '@components/layout/layout'
import { HomePage } from '@pages/home'
import { DashboardPage } from '@pages/dashboard'
import { UploadPage } from '@pages/upload'
import { ReviewPage } from '@pages/review'
import { SettingsPage } from '@pages/settings'
import { NotFoundPage } from '@pages/not-found'

function App() {
  return (
    <ToasterProvider>
      <AuthProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/upload"
              element={
                <ProtectedRoute>
                  <UploadPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/review/:auditId"
              element={
                <ProtectedRoute>
                  <ReviewPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <SettingsPage />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Layout>
      </AuthProvider>
      <Toaster />
    </ToasterProvider>
  )
}

export default App 