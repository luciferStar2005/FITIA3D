import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './pages/App.tsx'
import PruebaLanding from './pages/pruebaLanding.tsx'
import RutinaPage from './pages/RutinaPage.tsx'
import ConfiguracionPage from './pages/ConfiguracionPage.tsx';
import { BrowserRouter } from 'react-router-dom'


createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <StrictMode>
      <App />
    </StrictMode>
  </BrowserRouter>
)
