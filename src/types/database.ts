export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          role: string | null
          organization: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          role?: string | null
          organization?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          role?: string | null
          organization?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      audits: {
        Row: {
          id: string
          user_id: string
          title: string
          standard: string
          status: string
          checklist_file_path: string | null
          created_at: string
          updated_at: string
          completed_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          standard: string
          status?: string
          checklist_file_path?: string | null
          created_at?: string
          updated_at?: string
          completed_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          standard?: string
          status?: string
          checklist_file_path?: string | null
          created_at?: string
          updated_at?: string
          completed_at?: string | null
        }
      }
      documents: {
        Row: {
          id: string
          audit_id: string
          file_name: string
          file_path: string
          file_size: number
          file_type: string
          content: string | null
          embeddings_created: boolean
          created_at: string
        }
        Insert: {
          id?: string
          audit_id: string
          file_name: string
          file_path: string
          file_size: number
          file_type: string
          content?: string | null
          embeddings_created?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          audit_id?: string
          file_name?: string
          file_path?: string
          file_size?: number
          file_type?: string
          content?: string | null
          embeddings_created?: boolean
          created_at?: string
        }
      }
      checklist_items: {
        Row: {
          id: string
          audit_id: string
          clause: string
          requirement: string
          response: string | null
          status: string
          citations: Json | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          audit_id: string
          clause: string
          requirement: string
          response?: string | null
          status?: string
          citations?: Json | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          audit_id?: string
          clause?: string
          requirement?: string
          response?: string | null
          status?: string
          citations?: Json | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      document_embeddings: {
        Row: {
          id: string
          document_id: string
          content: string
          embedding: number[]
          metadata: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          document_id: string
          content: string
          embedding: number[]
          metadata?: Json | null
          created_at?: string
        }
        Update: {
          id?: string
          document_id?: string
          content?: string
          embedding?: number[]
          metadata?: Json | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
} 