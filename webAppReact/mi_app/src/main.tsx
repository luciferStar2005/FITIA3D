import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './pages/App.tsx'
import PruebaLanding from './pages/pruebaLanding.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PruebaLanding />
  </StrictMode>,
)
