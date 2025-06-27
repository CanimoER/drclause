import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.8';
import { corsHeaders } from '../_shared/cors.ts';

interface ProcessDocumentRequest {
  document_id: string;
  storage_path: string;
}

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const openaiApiKey = Deno.env.get('OPENAI_API_KEY')!;

Deno.serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const { document_id, storage_path }: ProcessDocumentRequest = await req.json();

    console.log(`[AuditAssistant] Processing document: ${document_id}`);

    // Update document status to processing
    await supabase
      .from('documents')
      .update({ processing_status: 'processing' })
      .eq('id', document_id);

    // Download file from storage
    const { data: fileData, error: downloadError } = await supabase.storage
      .from('audit_documents')
      .download(storage_path);

    if (downloadError) {
      throw new Error(`Failed to download file: ${downloadError.message}`);
    }

    // Extract text based on file type
    let extractedText = '';
    const fileName = storage_path.split('/').pop() || '';
    
    if (fileName.toLowerCase().endsWith('.pdf')) {
      extractedText = await extractTextFromPDF(fileData);
    } else if (fileName.toLowerCase().endsWith('.docx')) {
      extractedText = await extractTextFromDocx(fileData);
    } else if (fileName.toLowerCase().endsWith('.xlsx')) {
      extractedText = await extractTextFromXlsx(fileData);
    } else {
      throw new Error('Unsupported file type');
    }

    // Update document with extracted text
    await supabase
      .from('documents')
      .update({ 
        extracted_text: extractedText,
        processing_status: 'processing'
      })
      .eq('id', document_id);

    // Generate embeddings
    await generateEmbeddings(supabase, document_id, extractedText);

    // Update document status to completed
    await supabase
      .from('documents')
      .update({ processing_status: 'completed' })
      .eq('id', document_id);

    console.log(`[AuditAssistant] Successfully processed document: ${document_id}`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Document processed successfully',
        document_id 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    console.error('[AuditAssistant] Error processing document:', error);
    
    // Update document status to failed if we have document_id
    try {
      const { document_id } = await req.json();
      if (document_id) {
        const supabase = createClient(supabaseUrl, supabaseServiceKey);
        await supabase
          .from('documents')
          .update({ processing_status: 'failed' })
          .eq('id', document_id);
      }
    } catch (updateError) {
      console.error('[AuditAssistant] Failed to update document status:', updateError);
    }

    return new Response(
      JSON.stringify({ 
        error: error.message || 'Internal server error' 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});

async function extractTextFromPDF(fileData: Blob): Promise<string> {
  // For now, return a placeholder - would need PDF parsing library
  // In production, use pdf-parse or similar
  return `[PDF content extraction not implemented yet - file size: ${fileData.size} bytes]`;
}

async function extractTextFromDocx(fileData: Blob): Promise<string> {
  // For now, return a placeholder - would need DOCX parsing library
  // In production, use mammoth or similar
  return `[DOCX content extraction not implemented yet - file size: ${fileData.size} bytes]`;
}

async function extractTextFromXlsx(fileData: Blob): Promise<string> {
  // For now, return a placeholder - would need XLSX parsing library
  // In production, use xlsx or similar
  return `[XLSX content extraction not implemented yet - file size: ${fileData.size} bytes]`;
}

async function generateEmbeddings(supabase: any, documentId: string, text: string): Promise<void> {
  // Split text into chunks (simple implementation)
  const chunks = splitTextIntoChunks(text, 1000);
  
  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];
    
    // Generate embedding using OpenAI
    const embeddingResponse = await fetch('https://api.openai.com/v1/embeddings', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        input: chunk,
        model: 'text-embedding-ada-002',
      }),
    });

    if (!embeddingResponse.ok) {
      throw new Error(`OpenAI API error: ${embeddingResponse.statusText}`);
    }

    const embeddingData = await embeddingResponse.json();
    const embedding = embeddingData.data[0].embedding;

    // Store embedding in database
    await supabase
      .from('document_embeddings')
      .insert({
        document_id: documentId,
        content: chunk,
        embedding: embedding,
        metadata: {
          chunk_index: i,
          total_chunks: chunks.length,
        },
      });
  }
}

function splitTextIntoChunks(text: string, chunkSize: number): string[] {
  const chunks: string[] = [];
  const words = text.split(' ');
  
  for (let i = 0; i < words.length; i += chunkSize) {
    chunks.push(words.slice(i, i + chunkSize).join(' '));
  }
  
  return chunks;
} 