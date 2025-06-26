import { useTranslation } from 'react-i18next'
import { Button } from '@components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card'
import { CheckCircle, Clock, AlertCircle, Download } from 'lucide-react'

export function ReviewPage() {
  const { t } = useTranslation()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {t('review.title')}
            </h1>
            <p className="text-gray-600 mt-2">
              {t('review.description')}
            </p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              {t('review.actions.exportAudit')}
            </Button>
            <Button>
              <CheckCircle className="h-4 w-4 mr-2" />
              {t('review.actions.markComplete')}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Audit Information */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>{t('review.auditInfo.title')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    {t('review.auditInfo.standard')}
                  </label>
                  <p className="text-sm">AS 9100 Section 8.3</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    {t('review.auditInfo.date')}
                  </label>
                  <p className="text-sm">December 15, 2024</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    {t('review.auditInfo.auditor')}
                  </label>
                  <p className="text-sm">Carlos Rodriguez</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    {t('review.auditInfo.status')}
                  </label>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    <Clock className="h-3 w-3 mr-1" />
                    {t('review.status.inProgress')}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Checklist Items */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>{t('review.checklist.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Sample Checklist Item */}
                  <div className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {t('review.checklist.clause')}: 8.3.1
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {t('review.checklist.requirement')}: Design and development planning
                        </p>
                      </div>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        {t('review.status.completed')}
                      </span>
                    </div>
                    
                    <div className="mb-3">
                      <label className="text-sm font-medium text-gray-500">
                        {t('review.checklist.response')}:
                      </label>
                      <p className="text-sm text-gray-900 mt-1">
                        The organization has established a documented procedure for design and development planning. 
                        The procedure includes design stages, review points, verification and validation activities, 
                        and responsibilities for design and development.
                      </p>
                    </div>
                    
                    <div className="mb-3">
                      <label className="text-sm font-medium text-gray-500">
                        {t('review.checklist.citations')}:
                      </label>
                      <div className="text-sm text-gray-600 mt-1">
                        <p>• Quality Manual, Section 4.2.1, Page 12</p>
                        <p>• Design Control Procedure, DCP-001, Section 3.2</p>
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        {t('review.checklist.notes')}:
                      </label>
                      <textarea 
                        className="w-full mt-1 p-2 border rounded-md text-sm"
                        rows={2}
                        placeholder="Add notes..."
                      />
                    </div>
                  </div>

                  {/* Another Sample Item */}
                  <div className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {t('review.checklist.clause')}: 8.3.2
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {t('review.checklist.requirement')}: Design and development inputs
                        </p>
                      </div>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        {t('review.status.needsAttention')}
                      </span>
                    </div>
                    
                    <div className="mb-3">
                      <label className="text-sm font-medium text-gray-500">
                        {t('review.checklist.response')}:
                      </label>
                      <p className="text-sm text-gray-900 mt-1">
                        Inputs are determined and documented. However, the procedure for determining 
                        inputs needs to be more clearly defined.
                      </p>
                    </div>
                    
                    <div className="mb-3">
                      <label className="text-sm font-medium text-gray-500">
                        {t('review.checklist.citations')}:
                      </label>
                      <div className="text-sm text-gray-600 mt-1">
                        <p>• Design Control Procedure, DCP-001, Section 4.1</p>
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        {t('review.checklist.notes')}:
                      </label>
                      <textarea 
                        className="w-full mt-1 p-2 border rounded-md text-sm"
                        rows={2}
                        placeholder="Add notes..."
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
} 