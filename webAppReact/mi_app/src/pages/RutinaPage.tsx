import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, ContactShadows } from '@react-three/drei';
import { Model as MaleModel } from './Male_MuscleWiki'; 
import './RutinaPage.css';

const RutinaPage = () => {
  const [selectedMuscle, setSelectedMuscle] = useState("Toca la anatomía");
  const [showAiPanel, setShowAiPanel] = useState(false);
  const [aiContent, setAiContent] = useState("Selecciona un grupo muscular para generar recomendaciones personalizadas.");

  const handleMuscleSelect = (name: string) => {
    setSelectedMuscle(name);
    setShowAiPanel(true);
    // Aquí puedes disparar tu lógica de n8n o IA en el futuro
  };

  return (
    <div className="rutinas-page" style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden', background: '#202823' }}>
      
      {/* UI Superior */}
      <div id="ui">
        <h1>PERSONAL<span className="highlight">TRAINER</span> 3D</h1>
        <div id="muscle-display">
          <small>Músculo Seleccionado</small>
          <div id="muscle-name">{selectedMuscle}</div>
        </div>
      </div>

      {/* CONTENEDOR 3D (Sustituye a mountRef y useEffect) */}
      <Canvas shadows camera={{ position: [0, 1.6, 4], fov: 45 }} dpr={[1, 2]}>
        <Suspense fallback={null}>
          <Stage intensity={0.5} environment="city" adjustCamera={false} shadows="contact">
            <MaleModel onSelectMuscle={handleMuscleSelect} />
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
      </div>

      {/* HERRAMIENTAS */}
      <div className="div-herramientas">
        <p>Herramientas Disponibles</p>
        <ul>
          {['Mancuernas', 'Barra', 'Peso Corporal', 'Bandas'].map(h => (
            <li key={h}><label><input type="checkbox" /> {h}</label></li>
          ))}
        </ul>
      </div>

      {/* OBJETIVO */}
      <div className="div-objetivo">
        <p>Objetivo</p>
        <ul>
          {['Fuerza', 'Hipertrofia', 'Resistencia'].map(o => (
            <li key={o}><label><input type="checkbox" /> {o}</label></li>
          ))}
        </ul>
      </div>

      <button id="genera-rutina">Generar Rutina</button>
      
      <div className="controls-hint">Click: Seleccionar | Arrastrar: Rotar | Scroll: Zoom</div>
    </div>
  );
};

export default RutinaPage;