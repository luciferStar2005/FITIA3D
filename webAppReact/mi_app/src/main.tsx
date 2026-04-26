import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter,Routes,Route } from "react-router-dom"
import App from './pages/App.tsx'
import Home from "./pages/Home.tsx"
import Profile from "./pages/Profile.tsx"
import {Login} from "./pages/formularios.tsx"
import Form from './pages/formFill.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App/>} />
        <Route path="/perfil" element={<Profile />} />
        <Route path="/login" element={<Login />}/>
        <Route path="/formfill" element={<Form/>}/>
      </Routes>
    </BrowserRouter>

  </StrictMode>,
  
)