import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Nav/Navbar';
import Modal, { useModal } from '../components/Modal/Modal';

const ResultadoRutinaPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { rutina } = location.state || { rutina: null };

  const [fecha, setFecha] = useState('');
  const [esRecurrente, setEsRecurrente] = useState(false);

  const [showAuthModal, setShowAuthModal] = useState(false);
  const { modal, showModal, closeModal } = useModal();

  if (!rutina) {
    return <div className="min-h-screen bg-neutral-900 flex items-center justify-center text-white">No se encontró ninguna rutina. Regresa al inicio.</div>;
  }

  const obtenerNombreDia = (fechaInput: string) => {
    if (!fechaInput) return "semana";
    const dias = [
      'Domingo', 'Lunes', 'Martes', 'Miércoles',
      'Jueves', 'Viernes', 'Sábado'
    ];
    const fechaObj = new Date(fechaInput + 'T00:00:00');
    return dias[fechaObj.getDay()];
  };

  const handleAgendar = async () => {
    if (!fecha) {
      showModal("Aviso", "Por favor selecciona una fecha para agendar.", "info");
      return;
    }
    const token = localStorage.getItem('token');

    if (!token) {
      setShowAuthModal(true);
      return;
    }

    const nombreDelDia = obtenerNombreDia(fecha);

    console.log("Guardando en el calendario:", { rutina, fecha, esRecurrente, dia: nombreDelDia });

    // Guardado en API
    try {
      const payload = {
        dia: nombreDelDia,
        ejercicios: rutina.ejercicios
      };

      const response = await fetch('http://localhost:8080/api/v1/rutinas/crear', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        console.log("Rutina guardada en el backend");
      } else {
        console.error("Error al guardar rutina:", await response.text());
      }
    } catch (error) {
      console.error("Error en la petición para guardar la rutina:", error);
    }

    const mensajeFinal = esRecurrente
      ? `✅ Rutina programada para todos los ${nombreDelDia}.`
      : `✅ Rutina agendada para el ${fecha}.`;
    showModal("Rutina Agendada", mensajeFinal, "success");
  };

  const diaTexto = obtenerNombreDia(fecha);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-neutral-900 pt-24 pb-12">
        <div className="max-w-[1100px] mx-auto px-4 md:px-8">

          {/* Header */}
          <div className="bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-8 shadow-[0_8px_32px_rgba(0,0,0,0.4)] mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6 border-t-4 border-t-red-600">
            <div>
              <h1 className="font-['Bebas_Neue'] text-4xl tracking-wider text-white leading-none">
                Tu Plan de <span className="text-red-500">Entrenamiento</span>
              </h1>
              <p className="text-gray-400 mt-2 text-sm">{rutina.rutina_nombre || "Rutina Generada"}</p>
            </div>
            <button
              className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-white/[0.06] border border-white/[0.1] text-white hover:bg-white/[0.1] hover:border-white/[0.2] transition-all text-xs font-bold uppercase tracking-widest cursor-pointer w-full md:w-auto"
              onClick={() => navigate(-1)}
            >
              ← Ajustar Selección
            </button>
          </div>

          {/* Rutina Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {rutina.ejercicios.map((ej: any, index: number) => (
              <div key={index} className="bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] border-t-4 border-t-orange-500 rounded-2xl p-6 shadow-[0_8px_32px_rgba(0,0,0,0.4)] flex flex-col gap-5">
                <h3 className="font-['Bebas_Neue'] text-2xl tracking-wider text-white leading-none">{ej.nombre}</h3>

                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-white/[0.03] rounded-lg p-2 text-center border border-white/[0.06]">
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Series</p>
                    <p className="text-white font-bold text-lg leading-none">{ej.series}</p>
                  </div>
                  <div className="bg-white/[0.03] rounded-lg p-2 text-center border border-white/[0.06]">
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Reps</p>
                    <p className="text-white font-bold text-lg leading-none">{ej.reps}</p>
                  </div>
                  <div className="bg-white/[0.03] rounded-lg p-2 text-center border border-white/[0.06]">
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Descanso</p>
                    <p className="text-white font-bold text-lg leading-none">{ej.descanso}</p>
                  </div>
                </div>

                <div className="mt-auto bg-orange-500/10 border border-orange-500/20 rounded-lg p-3">
                  <p className="text-xs text-orange-200"><strong>* Tip:</strong> {ej.tip}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Agenda Section */}
          <div className="bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-8 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
            <h2 className="font-['Bebas_Neue'] text-3xl tracking-wider text-red-200 leading-none mb-6">
              📅 ¿Cuándo vas a realizar esta rutina?
            </h2>

            <div className="flex flex-col md:flex-row gap-6 items-end">
              <div className="flex flex-col w-full md:w-auto flex-1">
                <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2">Fecha</label>
                <input
                  type="date"
                  value={fecha}
                  onChange={(e) => setFecha(e.target.value)}
                  className="bg-neutral-800 border border-white/[0.1] text-white rounded-lg px-4 py-3 focus:outline-none focus:border-red-500 transition-colors w-full"
                />
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto pb-3 flex-1">
                <input
                  type="checkbox"
                  id="recurrente"
                  checked={esRecurrente}
                  onChange={(e) => setEsRecurrente(e.target.checked)}
                  className="w-5 h-5 accent-red-600 rounded cursor-pointer"
                />
                <label htmlFor="recurrente" className="text-sm text-gray-300 cursor-pointer">
                  Repetir cada <strong className="text-white">{diaTexto}</strong> esta rutina
                </label>
              </div>

              <button
                className="mt-4 md:mt-0 w-full md:w-auto px-8 py-3 bg-red-600 hover:bg-red-500 text-white font-bold rounded-lg uppercase tracking-widest text-sm transition-colors cursor-pointer"
                onClick={handleAgendar}
              >
                CONFIRMAR Y AGENDAR
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Autenticación */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-neutral-900 border border-white/[0.1] rounded-2xl p-8 max-w-md w-full shadow-[0_8px_32px_rgba(0,0,0,0.8)] relative">
            <button
              onClick={() => setShowAuthModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h2 className="font-['Bebas_Neue'] text-3xl tracking-wider text-white mb-2">
              ¡ÚNETE A <span className="text-red-500 italic">FITAI3D</span>!
            </h2>
            <p className="text-gray-400 text-sm mb-6">
              Para guardar esta rutina en tu calendario y llevar un registro de tu progreso, necesitas crear una cuenta o iniciar sesión.
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => navigate('/login')}
                className="w-full py-3 bg-red-600 hover:bg-red-500 text-white font-bold rounded-lg uppercase tracking-widest text-sm transition-colors cursor-pointer"
              >
                Registrarme / Iniciar Sesión
              </button>
              <button
                onClick={() => setShowAuthModal(false)}
                className="w-full py-3 bg-white/[0.05] hover:bg-white/[0.1] text-white font-bold rounded-lg uppercase tracking-widest text-sm transition-colors cursor-pointer"
              >
                Continuar sin guardar
              </button>
            </div>
          </div>
        </div>
      )}
      <Modal {...modal} onClose={closeModal} />
    </>
  );
};

export default ResultadoRutinaPage;