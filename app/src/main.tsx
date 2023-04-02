import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { ApiContextProvider } from './contexts/api-context'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ApiContextProvider apiBase={import.meta.env.VITE_API_BASE}>
      <App />
    </ApiContextProvider>
  </React.StrictMode>,
)
