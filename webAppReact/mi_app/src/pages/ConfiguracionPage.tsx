import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SelectorCard from '../components/configuracion/SelectorCard';
import { color } from 'three/tsl';
import '../styles/ConfiguracionPage.css';

const ConfiguracionPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [nivel, setNivel] = useState('intermedio');
  const [objetivo, setObjetivo] = useState('hipertrofia');
  const [equipos, setEquipos] = useState<string[]>([]);

 const niveles = [
    { id: 'novato', title: 'Novato', desc: '0-3 meses', color: '#a8e6cf' },
    { id: 'iniciado', title: 'Iniciado', desc: '3-12 meses',  color: '#dcedc1' },
    { id: 'intermedio', title: 'Intermedio', desc: '1-3 años', color: '#ffd3b6' },
    { id: 'avanzado', title: 'Avanzado', desc: '3-5 años',  color: '#ffaaa5' },
    { id: 'elite', title: 'Elite', desc: '+5 años',  color: '#ff8b94' },
  ];

  const objetivos = [
    { id: 'fuerza', title: 'Fuerza', desc: 'Potencia y cargas máximas',  color: '#3498db' },
    { id: 'hipertrofia', title: 'Hipertrofia', desc: 'Ganancia de masa muscular', color: '#9b59b6' },
    { id: 'resistencia', title: 'Resistencia', desc: 'Quema de grasa y fondo', color: '#e67e22' },
    { id: 'definicion', title: 'Definición', desc: 'Mantenimiento y detalle', color: '#f1c40f' }
  ];

  const listaEquipamiento = [
  { id: 'mancuernas', title: 'Mancuernas', color: '#00ff88' },
  { id: 'barra', title: 'Barra Olímpica', color: '#00ff88' },
  { id: 'kettlebell', title: 'Kettlebells', color: '#00ff88' },
  { id: 'bandas', title: 'Bandas Elásticas', color: '#00ff88' },
  { id: 'maquinas', title: 'Máquinas de Gym', color: '#00ff88' },
  { id: 'peso-corporal', title: 'Peso Corporal', color: '#00ff88' },
];


const handleEquipamientoSelect = (id: string) => {
  setEquipos(prev => 
    prev.includes(id) 
      ? prev.filter(item => item !== id) // Lo quita
      : [...prev, id] // Lo agrega
  );
};

  // Esto recupera los músculos que enviaremos desde el modelo
  const muscles = location.state?.muscles || [];



  const handleGenerarRutina = async () => {
    setIsLoading(true);
    // Buscamos el objeto completo del nivel seleccionado
    const instruccionesIA = `
        Generar rutina para: ${muscles.join(', ')}.
        Nivel: ${nivel} (${niveles.find(n => n.id === nivel)?.desc}).
        Objetivo: ${objetivo} (${objetivos.find(o => o.id === objetivo)?.desc}).
        Equipo: ${equipos.join(', ')}.
        Formato: JSON estricto.
    `;
    const N8N_WEBHOOK_URL = "https://juansemodelo3d.app.n8n.cloud/webhook-test/67ae595e-a53d-45ba-a0e1-2bad0e55d3e0";
   
  
    try {
      console.log("Instrucciones para IA:", instruccionesIA);
      const response = await fetch(N8N_WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: instruccionesIA })
            
        });
        const data = await response.json();
        setTimeout(() => {
            setIsLoading(false);
            // Navegamos a la nueva página pasando la "rutina" (simulada por ahora)
            navigate('/resultado-rutina', { state: { rutina: data } });
            console.log("Respuesta de IA:", data);
        }, 2000);
       

    } catch (error) {
        console.error("Error al generar:", error);
        setIsLoading(false);
    }
};

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
      {/* SECCIÓN 1: NIVEL DE EXPERIENCIA */}
      <section className='config-section'>
        <p className='pSeleccionNivel' style={{ fontWeight: 'bold' }}>Selecciona tu nivel:</p>
        <div className="niveles-container" style={{ display: 'flex', gap: '20px', justifyContent: 'center', padding: '20px' }}>
            {niveles.map((n) => (
              <SelectorCard
                key={n.id}
                id={n.id}
                title={n.title}
                description={n.desc}
               
                color={n.color}
                isSelected={nivel === n.id}
                onSelect={setNivel}
              />
            ))}
        </div>
      </section>
      {/* SECCIÓN 2: OBJETIVO PRINCIPAL */}
      <section className='config-section'>
        <p className='pSeleccionObjetivo' style={{ fontWeight: 'bold' }}>Selecciona tu objetivo:</p>
        <div className="objetivos-container" style={{ display: 'flex', gap: '20px', justifyContent: 'center', padding: '20px' }}>
            {objetivos.map((o) => (
              <SelectorCard
                key={o.id}
                id={o.id}
                title={o.title}
                description={o.desc}
               
                color={o.color}
                isSelected={objetivo === o.id}
                onSelect={setObjetivo}
              />
            ))}
        </div>
      </section>


      {/* SECCIÓN 3: EQUIPAMIENTO */}
      <section className='config-section'>
        <p className='pSeleccionLabel' style={{ fontWeight: 'bold' }}>3. ¿Con qué equipo cuentas?</p>
        <div className="equipos-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', justifyContent: 'center' }}>
          {listaEquipamiento.map((e) => (
            <SelectorCard
              key={e.id}
              id={e.id}
              title={e.title}
              description="" // Dejamos la descripción vacía para que sea más compacto
              color={e.color}
              isSelected={equipos.includes(e.id)} // Verifica si el ID está en el array
              onSelect={handleEquipamientoSelect}
            />
          ))}
        </div>
      </section>

      <div className="div-final">
        <button 
          className={`btn-generar-final ${isLoading ? 'loading' : ''}`} 
          onClick={handleGenerarRutina}
          disabled={isLoading} // Evita múltiples clics
                              >
          {isLoading ? (
            <div className="spinner-contenedor">
              <div className="spinner-neon"></div>
              <span>PROCESANDO...</span>
            </div>
          ) : (
            "GENERAR MI RUTINA PERSONALIZADA"
          )}
      </button>
      </div>
        
        
    </div>
  
);
  
};

export default ConfiguracionPage; // <--- ESTO es lo que permite la importación en App.tsx