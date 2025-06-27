import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { UploadCloud, FileText, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToaster } from '@/components/ui/toaster';
import { supabase } from '@/lib/supabase/client';

interface UploadedFile {
  name: string;
  size: number;
  path: string;
  status: 'uploading' | 'success' | 'error';
}

/**
 * Componente para subir documentos al bucket 'audit-docs' y guardar metadatos en Supabase.
 * @example <UploadDocuments onUpload={refetchDocs} />
 */
export const UploadDocuments = () => {
  const { t } = useTranslation();
  const { addToast } = useToaster();
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const validateFile = (file: File) => {
    const MAX_SIZE = 10 * 1024 * 1024; // 10MB
    const ALLOWED_TYPES = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/msword',
      'application/vnd.ms-excel'
    ];

    if (!ALLOWED_TYPES.includes(file.type)) {
      throw new Error(t('upload.errors.type'));
    }
    
    if (file.size > MAX_SIZE) {
      throw new Error(t('upload.errors.size'));
    }
  };

  const uploadToSupabase = async (file: File): Promise<string> => {
    const fileName = `${Date.now()}_${file.name}`;
    
    // Upload file to storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('audit_documents')
      .upload(`uploads/${fileName}`, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) throw uploadError;

    // Get current user
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    // Save document metadata to database
    const { data: documentData, error: dbError } = await supabase
      .from('documents')
      .insert({
        user_id: user.id,
        file_name: file.name,
        storage_path: uploadData.path,
        mime_type: file.type,
        file_size: file.size,
        processing_status: 'pending'
      })
      .select()
      .single();

    if (dbError) throw dbError;

    // Trigger document processing
    const { error: processError } = await supabase.functions.invoke('process-document', {
      body: {
        document_id: documentData.id,
        storage_path: uploadData.path
      }
    });

    if (processError) {
      console.warn('[AuditAssistant] Document processing failed to start:', processError);
      // Don't throw error here as upload was successful
    }

    return uploadData.path;
  };

  const handleUpload = useCallback(async (files: FileList) => {
    setIsUploading(true);
    
    try {
      const fileArray = Array.from(files);
      
      // Add files to state with uploading status
      const newFiles: UploadedFile[] = fileArray.map(file => ({
        name: file.name,
        size: file.size,
        path: '',
        status: 'uploading'
      }));
      
      setUploadedFiles(prev => [...prev, ...newFiles]);

      // Upload each file
      for (let i = 0; i < fileArray.length; i++) {
        const file = fileArray[i];
        
        try {
          validateFile(file);
          const path = await uploadToSupabase(file);
          
          // Update file status to success
          setUploadedFiles(prev => 
            prev.map((f, index) => 
              index === prev.length - fileArray.length + i 
                ? { ...f, path, status: 'success' }
                : f
            )
          );
          
          addToast({
            title: t('upload.success'),
            description: `${file.name} ${t('upload.uploaded_successfully')}`,
            type: 'success'
          });
          
        } catch (error) {
          // Update file status to error
          setUploadedFiles(prev => 
            prev.map((f, index) => 
              index === prev.length - fileArray.length + i 
                ? { ...f, status: 'error' }
                : f
            )
          );
          
          addToast({
            title: t('upload.error'),
            description: error instanceof Error ? error.message : t('upload.errors.general'),
            type: 'error'
          });
        }
      }
         } finally {
       setIsUploading(false);
     }
   }, [t, addToast]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    if (e.dataTransfer.files) {
      handleUpload(e.dataTransfer.files);
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          isDragOver 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          id="file-upload"
          accept=".pdf,.docx,.xlsx,.doc,.xls"
          multiple
          className="hidden"
          onChange={(e) => e.target.files && handleUpload(e.target.files)}
          disabled={isUploading}
        />
        
        <div className="space-y-4">
          <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
          <div>
            <p className="text-lg font-medium text-gray-900">
              {t('upload.drag_drop')}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              {t('upload.supported_formats')}
            </p>
          </div>
          <Button 
            variant="outline" 
            onClick={() => document.getElementById('file-upload')?.click()}
            disabled={isUploading}
          >
            {isUploading ? t('upload.uploading') : t('upload.select_files')}
          </Button>
        </div>
      </div>

      {/* Uploaded Files List */}
      {uploadedFiles.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-900">
            {t('upload.uploaded_files')}
          </h3>
          <div className="space-y-2">
            {uploadedFiles.map((file, index) => (
              <Card key={index} className="p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {file.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      file.status === 'success' 
                        ? 'bg-green-100 text-green-800'
                        : file.status === 'error'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {t(`upload.status.${file.status}`)}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadDocuments; 