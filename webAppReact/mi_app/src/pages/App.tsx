import { Routes, Route } from 'react-router-dom';
// Importamos las páginas desde sus nuevas ubicaciones
import RutinaPage from './RutinaPage.tsx'; 
import ConfiguracionPage from './ConfiguracionPage.tsx'; 

function App() {
  return (
    <Routes>
      {/* Ruta 1: El modelo 3D (Página de inicio) */}
      <Route path="/" element={<RutinaPage />} />

      {/* Ruta 2: La nueva página de configuración */}
      <Route path="/configurar-rutina" element={<ConfiguracionPage />} />
    </Routes>
  );
}


export default App