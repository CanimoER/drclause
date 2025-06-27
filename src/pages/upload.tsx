import { useTranslation } from 'react-i18next'
import { Button } from '@components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card'
import { Upload, FileText, AlertCircle } from 'lucide-react'
import { UploadDocuments } from '@/components/ui/upload-documents'
import { DocumentStatus } from '@/components/document-status'

export function UploadPage() {
  const { t } = useTranslation()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {t('upload.title')}
          </h1>
          <p className="text-gray-600 mt-2">
            {t('upload.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Document Upload */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Upload className="h-5 w-5" />
                <span>{t('upload.documentsUpload.title')}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                {t('upload.documentsUpload.description')}
              </p>
              <UploadDocuments />
            </CardContent>
          </Card>

          {/* Document Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>{t('documents.title')}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <DocumentStatus />
            </CardContent>
          </Card>
        </div>

        {/* Processing Status */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>{t('upload.processing.title')}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              {t('upload.processing.description')}
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">{t('upload.processing.step1')}</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">{t('upload.processing.step2')}</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                <span className="text-sm">{t('upload.processing.step3')}</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                <span className="text-sm text-gray-500">{t('upload.processing.step4')}</span>
              </div>
            </div>
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                {t('upload.processing.estimatedTime', { time: '~2 min 45 sec' })}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 mt-8">
          <Button variant="outline">Cancel</Button>
          <Button>Start Processing</Button>
        </div>
      </div>
    </div>
  )
} 