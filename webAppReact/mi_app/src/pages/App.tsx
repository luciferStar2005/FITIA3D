import { Routes, Route } from 'react-router-dom';
// Importamos las páginas desde sus nuevas ubicaciones
import RutinaPage from './RutinaPage.tsx';
import ConfiguracionPage from './ConfiguracionPage.tsx';
import ResultadoRutinaPage from './ResultadoRutinaPage.tsx';

function App() {
  return (
    <Routes>
      {/* Ruta 1: El modelo 3D (Página de inicio) */}
      <Route path="/" element={<RutinaPage />} />

      {/* Ruta 2: La nueva página de configuración */}
      <Route path="/configurar-rutina" element={<ConfiguracionPage />} />

      {/* Ruta 3: Página de resultado de rutina */}
      <Route path="/resultado-rutina" element={<ResultadoRutinaPage />} />
    </Routes>
  );
}


export default App