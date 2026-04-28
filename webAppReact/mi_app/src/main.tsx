import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import LandingPage from './pages/LandingPage.tsx'
import Home from './pages/Home.tsx'
import Profile from "./pages/Profile.tsx"
import AuthPage from './pages/AuthPage.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/perfil" element={<Profile />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/formfill" element={<AuthPage />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>

  </StrictMode>,

)
