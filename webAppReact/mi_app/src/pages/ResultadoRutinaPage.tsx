import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Footer } from '../components/footer/footer';
import '../styles/ResultadoRutinaPage.css';

const ResultadoRutinaPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Recuperamos la rutina enviada desde ConfiguracionPage
  const { rutina } = location.state || { rutina: null };

  // Estados para la agenda
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [esRecurrente, setEsRecurrente] = useState(false);

  if (!rutina) {
    return <div className="error-container">No se encontró ninguna rutina. Regresa al inicio.</div>;
  }

   const obtenerNombreDia = (fechaInput: string) => {
  if (!fechaInput) return "semana"; // Texto por defecto
  
  const dias = [
    'Domingo', 'Lunes', 'Martes', 'Miércoles', 
    'Jueves', 'Viernes', 'Sábado'
  ];
  
  // Creamos el objeto fecha (ajustando por zona horaria para evitar desfases)
  const fechaObj = new Date(fechaInput + 'T00:00:00');
  return dias[fechaObj.getDay()];
};


  const handleAgendar = () => {
    if (!fecha || !hora) {
      alert("Por favor selecciona fecha y hora para agendar.");
      return;
    }
    const nombreDelDia = obtenerNombreDia(fecha);

    const eventoCargado = {
      ...rutina,
      fecha,
      hora,
      esRecurrente,
      diaSemna: nombreDelDia,
      idAgendamiento: Date.now() // ID único para este evento
    };

    console.log("Guardando en el calendario:", eventoCargado);
    // Aquí iría la lógica para guardar en LocalStorage o base de datos
    const mensajeFinal = esRecurrente 
    ? `✅ Rutina programada para todos los ${nombreDelDia} a las ${hora}.`
    : `✅ Rutina agendada únicamente para el ${fecha} a las ${hora}.`;
    alert(mensajeFinal);
  };


 

const diaTexto = obtenerNombreDia(fecha);

  return (
    <div className='resultado-container'>
      <header className='resultado-header'>
        <button className='btn-back' onClick={() => navigate(-1)}>← Ajustar Selección</button>
        <h1>Tu Plan de <span className="highlight">Entrenamiento</span></h1>
        <p className='rutina-nombre'>{rutina.rutina_nombre}</p>
      </header>

      <div className='rutina-grid'>
        {rutina.ejercicios.map((ej: any, index: number) => (
          <div key={index} className='ejercicio-card'>
            <div className='ejercicio-info'>
              <h3>{ej.nombre}</h3>
              <div className='stats-row'>
                <span><strong>Series:</strong> {ej.series}</span>
                <span><strong>Reps:</strong> {ej.reps}</span>
                <span><strong>Descanso:</strong> {ej.descanso}</span>
              </div>
              <p className='ejercicio-tip'><strong>* Tip:</strong> {ej.tip}</p>
            </div>
          </div>
        ))}
      </div>

      <section className='agenda-section'>
        <h2>📅 ¿Cuándo vas a realizar esta rutina?</h2>
        <div className='agenda-inputs'>
          <input 
            type="date" 
            value={fecha} 
            onChange={(e) => setFecha(e.target.value)} 
            className='input-acero'
          />
          <input 
            type="time" 
            value={hora} 
            onChange={(e) => setHora(e.target.value)} 
            className='input-acero'
          />
          <label className="checkbox-container">
            <input 
              type="checkbox" 
              checked={esRecurrente} 
              onChange={(e) => setEsRecurrente(e.target.checked)} 
            />
            <span className="checkbox-text">Repetir cada {diaTexto} esta rutina</span>
          </label>

          <button className='btn-confirmar' onClick={handleAgendar}>
            CONFIRMAR Y AGENDAR
          </button>
        </div>
      </section>


        <footer>
        <Footer />
        </footer>
    </div>
  );
};

export default ResultadoRutinaPage;