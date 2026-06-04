import React from 'react';

// Definimos la interfaz de las propiedades que recibirá el modal desde el Dashboard
interface PlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToPlanes: () => void; // Función para redirigir a la nueva página de planes
}

export default function PlanModal({ isOpen, onClose, onNavigateToPlanes }: PlanModalProps) {
  // Si el modal está configurado como cerrado, no renderizamos absolutamente nada en el DOM
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm select-none animate-fadeIn">
      
      {/* Contenedor principal de la tarjeta del Modal */}
      <div className="relative w-full max-w-lg bg-neutral-950 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl p-6 md:p-8 transform scale-100 transition-all duration-300">
        
        {/* Botón de cerrar ("X") en la esquina superior derecha */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-500 hover:text-white bg-neutral-900/50 hover:bg-neutral-800 p-2 rounded-full transition-colors duration-200"
          aria-label="Cerrar modal"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Ícono de Alerta Visual / Fuego */}
        <div className="flex justify-center mb-5">
          <div className="w-16 h-16 bg-red-500/10 border border-red-500/20 rounded-full flex items-center justify-center text-red-500 animate-bounce">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 0 0 .495-7.467 5.99 5.99 0 0 0-1.925 3.546 5.974 5.974 0 0 1-2.133-1A3.75 3.75 0 0 0 12 18Z" />
            </svg>
          </div>
        </div>

        {/* Textos Informativos */}
        <div className="text-center mb-8">
          <h2 className="font-['Bebas_Neue'] text-4xl tracking-wider text-white">
            ¿No sabes por dónde <span className="text-red-500">empezar</span>?
          </h2>
          <p className="text-neutral-400 text-sm mt-3 leading-relaxed">
            Hemos detectado que aún no tienes rutinas agendadas para esta semana. No te preocupes, puedes usar uno de nuestros planes predeterminados estructurados por profesionales para activar tu calendario al instante.
          </p>
        </div>

        {/* Botones de Acción */}
        <div className="flex flex-col gap-3">
          <button
            onClick={onNavigateToPlanes}
            className="w-full font-['Bebas_Neue'] text-xl tracking-wider bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl shadow-lg shadow-red-500/10 transition-all duration-300 active:scale-98 uppercase"
          >
            🔥 Ver Planes Predeterminados
          </button>
          
          <button
            onClick={onClose}
            className="w-full font-['Bebas_Neue'] text-xl tracking-wider bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-400 hover:text-white py-3 rounded-xl transition-all duration-300 uppercase"
          >
            Prefiero usar el generador IA / Crear Manual
          </button>
        </div>

        {/* Footer del Modal */}
        <p className="text-center text-[10px] text-neutral-600 font-bold uppercase tracking-widest mt-5">
          Puedes cambiar de plan cuando quieras desde la configuración
        </p>

      </div>
    </div>
  );
}