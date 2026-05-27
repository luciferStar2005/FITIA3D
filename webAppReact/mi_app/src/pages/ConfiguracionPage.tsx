import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SelectorCard from '../components/configuracion/SelectorCard';
import { Navbar } from '../components/Nav/Navbar';

const ConfiguracionPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [nivel, setNivel] = useState('intermedio');
  const [objetivo, setObjetivo] = useState('hipertrofia');
  const [equipos, setEquipos] = useState<string[]>([]);

  const niveles = [
    { id: 'novato', title: 'Novato', desc: '0-3 meses', color: '#a8e6cf' },
    { id: 'iniciado', title: 'Iniciado', desc: '3-12 meses', color: '#dcedc1' },
    { id: 'intermedio', title: 'Intermedio', desc: '1-3 años', color: '#ffd3b6' },
    { id: 'avanzado', title: 'Avanzado', desc: '3-5 años', color: '#ffaaa5' },
    { id: 'elite', title: 'Elite', desc: '+5 años', color: '#ff8b94' },
  ];

  const objetivos = [
    { id: 'fuerza', title: 'Fuerza', desc: 'Potencia y cargas máximas', color: '#3498db' },
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
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const muscles = location.state?.muscles || [];

  const handleGenerarRutina = async () => {
    setIsLoading(true);
    const instruccionesIA = `
        Generar rutina para: ${muscles.join(', ')}.
        Nivel: ${nivel} (${niveles.find(n => n.id === nivel)?.desc}).
        Objetivo: ${objetivo} (${objetivos.find(o => o.id === objetivo)?.desc}).
        Equipo: ${equipos.join(', ')}.
        Formato: JSON estricto.
    `;
    const N8N_WEBHOOK_URL = "https://juanredondorodriguez7gma.app.n8n.cloud/webhook/67ae595e-a53d-45ba-a0e1-2bad0e55d3e0";

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
        navigate('/resultado-rutina', { state: { rutina: data } });
        console.log("Respuesta de IA:", data);
      }, 2000);

    } catch (error) {
      console.error("Error al generar:", error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-neutral-900 pt-24 pb-12">
        <div className="max-w-[1100px] mx-auto px-4 md:px-8">

          <div className="bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-8 shadow-[0_8px_32px_rgba(0,0,0,0.4)] mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6 border-t-4 border-t-red-600">
            <div>
              <h1 className="font-['Bebas_Neue'] text-4xl tracking-wider text-white leading-none">
                Configuración de <span className="text-red-500">Rutina</span>
              </h1>
              {muscles.length > 0 ? (
                <p className="text-gray-400 mt-2 text-sm uppercase tracking-widest">
                  Músculos: <strong className="text-white">{muscles.join(', ')}</strong>
                </p>
              ) : (
                <p className="text-red-400 mt-2 text-sm">No has seleccionado músculos todavía.</p>
              )}
            </div>
            <button
              className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-white/[0.06] border border-white/[0.1] text-white hover:bg-white/[0.1] hover:border-white/[0.2] transition-all text-xs font-bold uppercase tracking-widest cursor-pointer w-full md:w-auto"
              onClick={() => navigate('/')}
            >
              ← Volver al Modelo
            </button>
          </div>

          <div className="flex flex-col gap-8">
            <section className="bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-8 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
              <h2 className="font-['Bebas_Neue'] text-3xl tracking-wider text-red-200 leading-none mb-6">
                1. Selecciona tu nivel
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
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

            <section className="bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-8 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
              <h2 className="font-['Bebas_Neue'] text-3xl tracking-wider text-red-200 leading-none mb-6">
                2. Selecciona tu objetivo
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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

            <section className="bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-8 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
              <h2 className="font-['Bebas_Neue'] text-3xl tracking-wider text-red-200 leading-none mb-6">
                3. ¿Con qué equipo cuentas?
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {listaEquipamiento.map((e) => (
                  <SelectorCard
                    key={e.id}
                    id={e.id}
                    title={e.title}
                    description=""
                    color={e.color}
                    isSelected={equipos.includes(e.id)}
                    onSelect={handleEquipamientoSelect}
                  />
                ))}
              </div>
            </section>
          </div>

          <div className="mt-12 flex justify-center">
            <button
              className="relative overflow-hidden group w-full md:w-auto px-12 py-5 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white font-['Bebas_Neue'] text-3xl tracking-widest rounded-xl shadow-[0_0_40px_rgba(220,38,38,0.4)] transition-all cursor-pointer hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
              onClick={handleGenerarRutina}
              disabled={isLoading || muscles.length === 0}
            >
              <div className="absolute inset-0 w-full h-full bg-white/20 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
              <span className="relative flex items-center justify-center gap-3">
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    PROCESANDO IA...
                  </>
                ) : (
                  "GENERAR MI RUTINA PERSONALIZADA"
                )}
              </span>
            </button>
          </div>

        </div>
      </div>
    </>
  );
};

export default ConfiguracionPage;
