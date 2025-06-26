import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Button } from '@components/ui/button'
import { FileText, CheckCircle, Clock, Users } from 'lucide-react'

export function HomePage() {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FileText className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">drclause</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/dashboard">
              <Button variant="ghost">{t('navigation.dashboard')}</Button>
            </Link>
            <Link to="/upload">
              <Button>{t('navigation.upload')}</Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            {t('home.title')}
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            {t('home.description')}
          </p>
          <div className="flex justify-center space-x-4">
            <Link to="/upload">
              <Button size="lg" className="text-lg px-8 py-3">
                {t('home.getStarted')}
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="text-lg px-8 py-3">
              {t('home.learnMore')}
            </Button>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            {t('home.features.title')}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <FileText className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                {t('home.features.automatedAnalysis')}
              </h3>
              <p className="text-gray-600">
                AI-powered document analysis extracts key information from your quality system documents.
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                {t('home.features.citationGeneration')}
              </h3>
              <p className="text-gray-600">
                Every answer includes proper citations to source documents and specific sections.
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <Clock className="h-12 w-12 text-orange-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                {t('home.features.gapIdentification')}
              </h3>
              <p className="text-gray-600">
                Automatically identify compliance gaps and areas that need attention.
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <Users className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                {t('home.features.exportFormats')}
              </h3>
              <p className="text-gray-600">
                Export completed checklists in multiple formats for easy sharing and review.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-24 text-center">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to streamline your audit process?
            </h2>
            <p className="text-gray-600 mb-6">
              Join quality management professionals who are saving hours on every audit.
            </p>
            <Link to="/upload">
              <Button size="lg" className="text-lg px-8 py-3">
                Start Your First Audit
              </Button>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 mt-24">
        <div className="text-center text-gray-600">
          <p>&copy; 2024 drclause. Built with ❤️ for quality management professionals.</p>
        </div>
      </footer>
    </div>
  )
} 