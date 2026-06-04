import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, ContactShadows } from '@react-three/drei';
import { Model as MaleModel } from '../components/threeModel/Male_MuscleWiki';
import '../styles/RutinaPage.css';
import { useNavigate } from 'react-router-dom';
import Modal, { useModal } from '../components/Modal/Modal';


const RutinaPage = () => {
  const navigate = useNavigate();
  const { modal, showModal, closeModal } = useModal();
  const [selectedMuscle, setSelectedMuscle] = useState("Toca la anatomía");
  const [showAiPanel, setShowAiPanel] = useState(false);
  const [aiContent, setAiContent] = useState("Selecciona un grupo muscular para generar recomendaciones personalizadas.");

  // --- UBICACIÓN EXACTA: DESPUÉS de tus estados y ANTES del return ---
  const [selectedMuscles, setSelectedMuscles] = useState<string[]>([]);

  const handleMuscleSelect = (muscles: string[]) => {
    setSelectedMuscles(muscles);
    if (muscles.length > 0) {
      setSelectedMuscle(muscles[muscles.length - 1]);
      setShowAiPanel(true);
      setAiContent(`Has seleccionado: <b>${muscles.join(', ')}</b>. Haz clic en 'Generar Rutina' para crear un entrenamiento combinado.`);
    } else {
      setShowAiPanel(false);
      // Opcional: puedes resetear el texto individual aquí si quieres
    }
  };

  const handleContinuar = () => {
    console.log("Botón presionado, intentando navegar...");
    if (selectedMuscles.length === 0) {
      showModal("Aviso", "Por favor, selecciona al menos un músculo en el modelo 3D.", "info");
      return;
    }

    // Navegamos a la ruta que definimos en App.tsx
    // Pasamos los músculos como un objeto de estado
    navigate('/configurar-rutina', {
      state: {
        muscles: selectedMuscles,
        fechaSeleccion: new Date().toISOString() // Opcional: para saber cuándo se hizo
      }
    });
  };

  return (
    <div className="rutinas-page" style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden', background: '#1f2220' }}>

      {/* UI Superior */}
      <div id="ui">
        <h1>PERSONAL<span className="highlight">TRAINER</span> 3D</h1>
        <div id="muscle-display">
          <small>Músculos Seleccionados</small>
          <div id="muscle-name">
            {selectedMuscles.length > 0 ? selectedMuscles.join(' + ') : "Selecciona uno o varios"}
          </div>
        </div>
      </div>

      {/* CONTENEDOR 3D (Sustituye a mountRef y useEffect) */}
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

      {/* PANEL IA */}
      <div id="ai-panel" className={showAiPanel ? 'active' : ''}>
        <button id="close-panel" onClick={() => setShowAiPanel(false)}>×</button>
        <h2 id="ai-title">Entrenamiento</h2>
        <div id="ai-content" dangerouslySetInnerHTML={{ __html: aiContent }} />
        <button className='btn-siguiente' onClick={handleContinuar}>
          Configurar Rutina
        </button>
      </div>

      <div className="controls-hint">Click: Seleccionar | Arrastrar: Rotar | Scroll: Zoom</div>
      <Modal {...modal} onClose={closeModal} />
    </div>
  );
};

export default RutinaPage;