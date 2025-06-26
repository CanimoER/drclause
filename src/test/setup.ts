import '@testing-library/jest-dom'

// Mock environment variables for tests
Object.defineProperty(import.meta.env, 'VITE_SUPABASE_URL', {
  value: 'https://test.supabase.co',
  writable: true,
})

Object.defineProperty(import.meta.env, 'VITE_SUPABASE_ANON_KEY', {
  value: 'test-anon-key',
  writable: true,
})

Object.defineProperty(import.meta.env, 'VITE_OPENAI_API_KEY', {
  value: 'test-openai-key',
  writable: true,
}) 