import { Routes, Route } from 'react-router-dom';
import RutinaPage from './RutinaPage.tsx';
import ConfiguracionPage from './ConfiguracionPage.tsx';
import ResultadoRutinaPage from './ResultadoRutinaPage.tsx';
import LandingPage from './LandingPage.tsx';
import AuthPage from './AuthPage.tsx';
import Home from './Home.tsx';
import Profile from './Profile.tsx';
import BibliotecaPage from './BibliotecaPage.tsx';
import PlanesPage from './PlanesPage.tsx';

function App() {
  return (
    <Routes>
      {/* Ruta Inicial: Landing Page */}
      <Route path="/" element={<LandingPage />} />

      {/* Autenticación */}
      <Route path="/login" element={<AuthPage />} />
      <Route path="/formFill" element={<AuthPage />} />

      {/* Dashboard y Perfil */}
      <Route path="/home" element={<Home />} />
      <Route path="/perfil" element={<Profile />} />
      <Route path="/biblioteca" element={<BibliotecaPage />} />
      <Route path="/planes" element={<PlanesPage />} />

      {/* Flujo de Generación de Rutina */}
      <Route path="/rutina" element={<RutinaPage />} />
      <Route path="/configurar-rutina" element={<ConfiguracionPage />} />
      <Route path="/resultado-rutina" element={<ResultadoRutinaPage />} />
      <Route path='/biblioteca-animaciones' element={<BibliotecaPage/>}/>

      <Route path="*" element={<LandingPage />} />

    </Routes>
  );
}

export default App;