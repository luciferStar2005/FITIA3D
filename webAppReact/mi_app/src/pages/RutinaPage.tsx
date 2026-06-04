import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, ContactShadows } from '@react-three/drei';
import { Model as MaleModel } from '../components/threeModel/Male_MuscleWiki';
import '../styles/RutinaPage.css'; // Puedes mantenerlo si maneja estilos internos del modelo, pero Tailwind controlará el layout
import { useNavigate } from 'react-router-dom';

const RutinaPage = () => {
  const navigate = useNavigate();
  const [selectedMuscle, setSelectedMuscle] = useState("Toca la anatomía");
  const [showAiPanel, setShowAiPanel] = useState(false);
  const [aiContent, setAiContent] = useState("Selecciona un grupo muscular para generar recomendaciones personalizadas.");
  const [selectedMuscles, setSelectedMuscles] = useState<string[]>([]);

  const handleMuscleSelect = (muscles: string[]) => {
    setSelectedMuscles(muscles);
    if (muscles.length > 0) {
      setSelectedMuscle(muscles[muscles.length - 1]);
      setShowAiPanel(true);
      setAiContent(`Has seleccionado: <b>${muscles.join(', ')}</b>. Haz clic en 'Generar Rutina' para crear un entrenamiento combinado.`);
    } else {
      setShowAiPanel(false);
    }
  };

  const handleContinuar = () => {
    console.log("Botón presionado, intentando navegar...");
    if (selectedMuscles.length === 0) {
      alert("Por favor, selecciona al menos un músculo en el modelo 3D.");
      return;
    }
    navigate('/configurar-rutina', {
      state: {
        muscles: selectedMuscles,
        fechaSeleccion: new Date().toISOString()
      }
    });
  };

  return (
    // Contenedor principal ocupando toda la pantalla fija
    <div className="relative w-screen h-screen overflow-hidden bg-[#1f2220] flex flex-col md:block select-none">

      {/* UI Superior (Título y Músculos seleccionados) */}
      {/* En móvil se adapta al ancho total superior, en desktop flota a la izquierda */}
      <div className="absolute top-0 left-0 w-full md:w-auto md:top-6 md:left-6 z-10 p-4 md:p-0 flex flex-col gap-2 pointer-events-none">
        <h1 className="text-xl md:text-3xl font-extrabold text-white tracking-wider pointer-events-auto text-center md:text-left drop-shadow-lg">
          FIT<span className="text-[#E03E36] ml-1">IA</span> 3D
        </h1>
        
        <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-xl p-3 md:p-4 pointer-events-auto text-center md:text-left max-w-sm mx-auto md:mx-0 shadow-2xl">
          <small className="text-gray-400 text-xs uppercase tracking-widest block mb-1">Músculos Seleccionados</small>
          <div className="text-white font-semibold text-sm md:text-base break-words">
            {selectedMuscles.length > 0 ? selectedMuscles.join(' + ') : "Selecciona uno o varios"}
          </div>
        </div>
      </div>

      {/* CONTENEDOR 3D (Ocupa todo el fondo) */}
      <div className="w-full h-full absolute inset-0 z-0">
        <Canvas shadows camera={{ position: [0, 1.6, 4], fov: 45 }} dpr={[1, 2]}>
          <Suspense fallback={null}>
            <Stage intensity={0.5} environment="city" adjustCamera={false} shadows="contact">
              <MaleModel onSelectMuscles={handleMuscleSelect} />
            </Stage>
            <ContactShadows opacity={0.4} scale={10} blur={2} far={4.5} />
          </Suspense>
          <OrbitControls
            makeDefault
            enableDamping
            minPolarAngle={0}
            maxPolarAngle={Math.PI / 1.75}
          />
        </Canvas>
      </div>

      {/* PANEL IA / ENTRENAMIENTO */}
      {/* Móvil: Se posiciona abajo tipo "modal de abajo" | Desktop: Flota a la derecha */}
      <div 
        className={`absolute z-20 bg-[#262927]/95 backdrop-blur-lg border border-white/10 p-5 shadow-2xl transition-all duration-300 ease-in-out
          ${showAiPanel ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 md:translate-y-0 md:translate-x-full md:opacity-0'}
          bottom-0 left-0 w-full rounded-t-3xl h-[40vh] flex flex-col justify-between
          md:bottom-auto md:top-6 md:right-6 md:left-auto md:w-80 md:h-[calc(100vh-3rem)] md:rounded-2xl md:translate-y-0 md:translate-x-0
          ${showAiPanel ? 'md:block' : 'md:hidden'}`}
      >
        {/* Botón Cerrar */}
        <button 
          onClick={() => setShowAiPanel(false)}
          className="absolute top-3 right-4 text-gray-400 hover:text-white text-2xl font-bold transition-colors"
        >
          ×
        </button>

        {/* Contenido del Panel */}
        <div className="overflow-y-auto pr-1 flex-1 mb-4 mt-2">
          <h2 className="text-[#E03E36] text-lg font-bold tracking-wide uppercase border-b border-white/10 pb-2 mb-3">
            Entrenamiento
          </h2>
          <div 
            className="text-gray-200 text-sm leading-relaxed"
            dangerouslySetInnerHTML={{ __html: aiContent }} 
          />
        </div>

        {/* Botón de acción */}
        <button 
          className="w-full bg-[#E03E36] hover:bg-[#c0352d] text-white font-bold py-3 px-4 rounded-xl shadow-lg transition-all transform active:scale-95 text-center text-sm uppercase tracking-wider"
          onClick={handleContinuar}
        >
          Configurar Rutina
        </button>
      </div>

      {/* AYUDA / HINTS (Oculto en celulares pequeños para no saturar, visible abajo en computadoras) */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/40 backdrop-blur-sm text-gray-400 text-xxs md:text-xs py-1.5 px-4 rounded-full pointer-events-none hidden sm:block border border-white/5 shadow-md">
        Click: Seleccionar | Arrastrar: Rotar | Scroll: Zoom
      </div>
    </div>
  );
};

export default RutinaPage;