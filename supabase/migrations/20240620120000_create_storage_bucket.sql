-- Create the audit_documents storage bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'audit_documents',
  'audit_documents',
  false,
  10485760, -- 10MB limit
  ARRAY[
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/msword',
    'application/vnd.ms-excel'
  ]
);

-- Create RLS policies for the audit_documents bucket
CREATE POLICY "Authenticated users can upload audit documents"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'audit_documents' AND
  auth.role() = 'authenticated'
);

CREATE POLICY "Users can view their own uploaded documents"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'audit_documents' AND
  auth.role() = 'authenticated'
);

CREATE POLICY "Users can delete their own uploaded documents"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'audit_documents' AND
  auth.role() = 'authenticated'
); 