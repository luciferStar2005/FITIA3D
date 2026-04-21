import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter,Routes,Route } from "react-router-dom"
import App from './pages/App.tsx'
import Home from "./pages/Home.tsx"
import Profile from "./pages/Profile.tsx"
import Login from "./pages/Login.tsx"
import Registro from './pages/register.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App/>} />
        <Route path="/perfil" element={<Profile />} />
        <Route path="/login" element={<Login />}/>
        <Route path="/registro" element={<Registro/>}/>
      </Routes>
    </BrowserRouter>

  </StrictMode>,
  
)