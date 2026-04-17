import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './pages/App.tsx'
import PruebaLanding from './pages/pruebaLanding.tsx'
import RutinaPage from './pages/RutinaPage.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RutinaPage />
  </StrictMode>,
)
