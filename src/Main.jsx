import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { DescopeProvider } from '@descope/react-sdk'

const projectId = import.meta.env.VITE_DESCOPE_PROJECT_ID

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DescopeProvider projectId={projectId}>
      <App />
    </DescopeProvider>
  </React.StrictMode>
)
                sessionToken: result?.sessionJwt,       