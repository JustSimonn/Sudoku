import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import sdk from '@farcaster/frame-sdk'

// Initialize Farcaster Frame SDK
sdk.actions.ready()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
