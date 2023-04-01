import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { AuthContextProvider } from "./contexts/auth-context";
import { ApiContextProvider } from "./contexts/api-context";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthContextProvider>
      <ApiContextProvider>
        <App  />
      </ApiContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
)
