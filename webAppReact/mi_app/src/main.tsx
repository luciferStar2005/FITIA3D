import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom"
import App from './pages/App.tsx'
import RutinaPage from './pages/RutinaPage.tsx'
import BibliotecaPage from './pages/BibliotecaPage.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
     
       <BibliotecaPage /> 
      
    </BrowserRouter>
  </StrictMode>,
)
