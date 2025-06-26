import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { I18nextProvider } from 'react-i18next'
import App from './App.tsx'
import './index.css'
import { i18n } from './i18n/config'
import { SupabaseProvider } from './lib/supabase/provider'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <SupabaseProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </SupabaseProvider>
    </I18nextProvider>
  </React.StrictMode>,
) 