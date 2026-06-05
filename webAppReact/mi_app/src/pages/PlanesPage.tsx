import { Navbar } from "../components/Nav/Navbar.tsx";
import { useState } from 'react';
// 1. Importación exacta con el nombre de tu archivo
import dataPlanes from '../data/planesPredeterminados.json'; 

// Interfaces estrictas basadas en tu estructura JSON
interface Ejercicio {
    nombre: string;
    series: number;
    reps: string;
    descanso: string;
    tip: string;
}

interface Dia {
    nombre_dia: string;
    ejercicios: Ejercicio[];
}

interface PlanPredeterminado {
    id_plan: string;
    nombre: string;
    descripcion: string;
    objetivo: string;
    dias: Dia[];
}

export default function PlanesPage() {
    const token = localStorage.getItem('token');
    const [cargandoPlanId, setCargandoPlanId] = useState<string | null>(null);
    
    // Estado para controlar qué plan tiene la vista extendida de ejercicios
    const [planExpandido, setPlanExpandido] = useState<string | null>(null);

    // Asignamos los datos importados tipándolos correctamente con la interfaz
    const planes: PlanPredeterminado[] = dataPlanes as PlanPredeterminado[];

    // Función auxiliar dinámica para asignar los íconos estéticos según el id_plan
    const obtenerIconoPlan = (id: string) => {
        if (id.includes('push-pull')) return '';
        if (id.includes('torso-pierna')) return '';
        return '';
    };

   const seleccionarPlan = async (idPlan: string) => {
    // 1. Buscamos el objeto completo del plan dentro de tu JSON importado
    const planElegido = planes.find(p => p.id_plan === idPlan);
    
    if (!planElegido) {
        alert("Error: No se encontró la información del plan seleccionado.");
        return;
    }

    const confirmar = window.confirm(
        `¿Estás seguro de que quieres asignar el plan "${planElegido.nombre}"?\nSe registrarán automáticamente todos los días de entrenamiento en tu calendario.`
    );
    if (!confirmar) return;

    setCargandoPlanId(idPlan);

    try {
        if (!token) {
            alert("Sesión expirada. Por favor vuelve a loguearte.");
            return;
        }

        // 2. Iteramos por cada día que contiene el plan en tu JSON
        for (const diaPlan of planElegido.dias) {
            
            // Limpiamos el texto del día. Si el JSON dice "Lunes: Empuje...", 
            // extraemos solo "Lunes" para enviarlo como espera tu Backend.
            const nombreDiaLimpio = diaPlan.nombre_dia.split(':')[0].trim(); 

            // 3. Estructuramos el Payload EXACTAMENTE igual a como lo pide tu API existente
            const payload = {
                dia: nombreDiaLimpio,        // Ej: "Lunes"
                ejercicios: diaPlan.ejercicios // El array completo de ejercicios del JSON
            };

            console.log(`Enviando al backend día ${nombreDiaLimpio}:`, payload);

            // 4. Hacemos el fetch a tu endpoint actual por cada iteración
            const response = await fetch('https://quentin-semipreserved-kaci.ngrok-free.dev/api/v1/rutinas/crear', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errorTexto = await response.text();
                throw new Error(`Error al procesar el ${nombreDiaLimpio}: ${errorTexto}`);
            }
        }

        // Si el bucle termina sin errores, significa que todos los días se guardaron con éxito
        alert("¡Plan predeterminado asignado con éxito! Se han configurado todos tus días de entrenamiento.");
        window.location.href = '/home'; // Redireccionamos a tu Dashboard

    } catch (error: any) {
        console.error("Hubo un problema asignando el plan completo:", error);
        alert(error.message || "Hubo un error al comunicar con el servidor.");
    } finally {
        setCargandoPlanId(null);
    }
};

    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-neutral-900 pt-24 pb-12">
                <div className="max-w-[1200px] mx-auto px-4 md:px-8">
                    
                    {/* ENCABEZADO */}
                    <div className="border-b border-neutral-800 pb-6 mb-10">
                        <h1 className="font-['Bebas_Neue'] text-5xl tracking-wider text-gray-100 leading-none mb-2">
                            Planes Predeterminados
                        </h1>
                        <p className="text-gray-400 text-sm max-w-xl">
                            Selecciona una plantilla diseñada por expertos. Se configurará automáticamente en tu calendario semanal de entrenamientos.
                        </p>
                    </div>

                    {/* GRILLA PRINCIPAL DISPARADA POR EL MAPEO */}
                    <div className="grid grid-cols-1 gap-8">
                        {planes.map((plan) => (
                            <div 
                                key={plan.id_plan}
                                className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-lg flex flex-col justify-between transition-all duration-300"
                            >
                                {/* Bloque de Información del Plan */}
                                <div className="border-b border-neutral-800/60 pb-5 mb-5">
                                    <div className="flex justify-between items-center mb-3">
                                        <span className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-full text-[10px] font-black tracking-[0.1em] uppercase px-3 py-1">
                                            {plan.objetivo}
                                        </span>
                                        <span className="text-3xl">{obtenerIconoPlan(plan.id_plan)}</span>
                                    </div>

                                    <h2 className="font-['Bebas_Neue'] text-3xl tracking-wide text-gray-100 mb-2">
                                        {plan.nombre}
                                    </h2>
                                    <p className="text-gray-400 text-sm leading-relaxed">
                                        {plan.descripcion}
                                    </p>
                                </div>

                                {/* Vista Previa de los Días y Rutinas que componen el JSON */}
                                <div className="mb-6">
                                    <button 
                                        onClick={() => setPlanExpandido(planExpandido === plan.id_plan ? null : plan.id_plan)}
                                        className="text-xs text-gray-500 hover:text-red-400 transition-colors flex items-center gap-1 font-bold uppercase tracking-wider mb-4 cursor-pointer"
                                    >
                                        {planExpandido === plan.id_plan ? '▼ Ocultar rutina completa' : '▶ Ver días y ejercicios'}
                                    </button>

                                    {/* Mapeo dinámico interno de los Días si está expandido */}
                                    {planExpandido === plan.id_plan && (
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2 bg-neutral-950/40 border border-neutral-800/50 rounded-xl p-4 animate-fadeIn">
                                            {plan.dias.map((dia, idx) => (
                                                <div key={idx} className="bg-neutral-900/50 border border-neutral-800 p-3 rounded-lg">
                                                    <h4 className="text-xs font-bold text-gray-300 border-b border-neutral-800 pb-1.5 mb-2 uppercase tracking-wide">
                                                        {dia.nombre_dia.split(":")[0]} 
                                                    </h4>
                                                    <p className="text-[11px] text-gray-500 italic mb-2">
                                                        {dia.nombre_dia.split(":")[1] || dia.nombre_dia}
                                                    </p>
                                                    <ul className="space-y-1">
                                                        {dia.ejercicios.map((ej, ejIdx) => (
                                                            <li key={ejIdx} className="text-[11px] text-gray-400 flex justify-between">
                                                                <span className="truncate max-w-[70%]">- {ej.nombre}</span>
                                                                <span className="text-red-400/80 font-mono">{ej.series}x{ej.reps.split(" ")[0]}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Fila de Estado final y Acción */}
                                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                                    <div className="flex gap-4 text-xs text-center sm:text-left w-full sm:w-auto">
                                        <div className="bg-neutral-800/40 border border-neutral-800 px-4 py-2 rounded-xl">
                                            <p className="text-gray-500 text-[9px] uppercase font-bold tracking-wider">Estructura</p>
                                            <p className="text-gray-300 font-semibold">{plan.dias.length} Días de entreno</p>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => seleccionarPlan(plan.id_plan)}
                                        disabled={cargandoPlanId !== null}
                                        className={`
                                            w-full sm:w-64 py-3 rounded-xl font-black uppercase tracking-[0.12em] text-sm
                                            transition-all duration-300 cursor-pointer border text-center
                                            ${cargandoPlanId === plan.id_plan
                                                ? 'bg-neutral-800 border-neutral-700 text-gray-500 cursor-wait'
                                                : 'bg-red-500/10 border-red-500/30 text-red-300 hover:bg-red-500 hover:text-white hover:border-red-500 shadow-sm'
                                            }
                                        `}
                                    >
                                        {cargandoPlanId === plan.id_plan ? 'Asignando Plan...' : 'Elegir este Plan'}
                                    </button>
                                </div>

                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </>
    );
}