import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SelectorCard from '../components/configuracion/SelectorCard';
import { color } from 'three/tsl';
import '../styles/ConfiguracionPage.css';

const ConfiguracionPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [nivel, setNivel] = useState('intermedio');
  const niveles = [
  { 
    id: 'novato', 
    title: 'Novato', 
    desc: 'Aprendiendo la técnica básica. (0-3 meses)', 
  },
  { 
    id: 'iniciado', 
    title: 'Iniciado', 
    desc: 'Adaptado al gimnasio, base sólida. (3-12 meses)', 
    
    color: '#dcedc1' 
  },
  { 
    id: 'intermedio', 
    title: 'Intermedio', 
    desc: 'Dominio de ejercicios básicos. (1-3 años)', 
  },
  { 
    id: 'avanzado', 
    title: 'Avanzado', 
    desc: 'Alta intensidad y volumen. (3-5 años)', 
  },
  { 
    id: 'elite', 
    title: 'Elite', 
    desc: 'Atleta con máxima exigencia. (+5 años)', 
  },
];

  // Esto recupera los músculos que enviaremos desde el modelo
  const muscles = location.state?.muscles || [];

  return (
    <div className='div-general'>
      <div className='div-superior'>
           <h1 className='tit-configuracion'>Configuración de Rutina</h1>
          <button className='btnvolver' onClick={() => navigate('/')}>
          Volver al Modelo
        </button>
      </div>
     
      {muscles.length > 0 ? (
        <div className='musculo-entrenar'>
          <p>Vas a entrenar: <strong>{muscles.join(', ')}</strong></p>
          {/* Aquí es donde empezaremos a poner los nuevos formularios */}
        </div>
      ) : (
        <p>No has seleccionado músculos todavía.</p>
      )}
      <br />
        <p className='pSeleccionNivel' style={{ fontWeight: 'bold' }}>Selecciona tu nivel:</p>
        <div className="niveles-container" style={{ display: 'flex', gap: '20px', justifyContent: 'center', padding: '20px' }}>
            {niveles.map((n) => (
              <SelectorCard
                key={n.id}
                id={n.id}
                title={n.title}
                description={n.desc}
                isSelected={nivel === n.id}
                onSelect={setNivel}
              />
            ))}
        </div>
        
    </div>
  
);
  
};

export default ConfiguracionPage; // <--- ESTO es lo que permite la importación en App.tsx