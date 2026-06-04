import { Navbar } from "../components/Nav/Navbar.tsx";
import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { format } from 'date-fns';
import type { PlanHoyData } from '../types';
import Modal, { useModal } from '../components/Modal/Modal';


export default function Home() {
    const [fecha, setFecha] = useState<Date>(new Date());
    const [completados, setCompletados] = useState<number[]>([]);
    const [planHoyData, setPlanHoyData] = useState<PlanHoyData[]>([]);
    const [diasConRutina, setDiasConRutina] = useState<string[]>([]);
    const [rachaActual, setRachaActual] = useState(0);
    const { modal, showModal, closeModal } = useModal();

    useEffect(() => {
        const fetchRacha = async () => {

            try {

                if (!token) return;

                const response = await fetch(
                    'http://localhost:8080/api/v1/progreso/racha',
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                if (response.ok) {

                    const data = await response.json();

                    setRachaActual(data.racha);
                }

            } catch (error) {

                console.error(
                    "Error obteniendo la racha",
                    error
                );
            }
        };

        fetchRacha();

    }, []);

    const porcentajeCompletado =
        planHoyData.length > 0
            ? (completados.length / planHoyData.length) * 100
            : 0;

    const token = localStorage.getItem('token');
    const tileContent = ({ date, view }: { date: Date; view: string }) => {
        if (view === 'month') {
            const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
            const nombreDia = diasSemana[date.getDay()];

            if (diasConRutina.includes(nombreDia)) {
                return <div className="w-1.5 h-1.5 bg-red-500 rounded-full mx-auto mt-0.5" />;
            }
        }
        return null;
    };

    useEffect(() => {
        const fetchFechasConRutina = async () => {
            try {
                if (!token) return;

                const response = await fetch('http://localhost:8080/api/v1/rutinas/misRutinas', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setDiasConRutina(data.dias);

                    console.log(data.dias)
                }
            }
            catch (error) {
                console.error("Error al obtener las fechas con rutina", error);
            }
        }
        fetchFechasConRutina();
    }, [])

    useEffect(() => {
        const fetchRutinaPorFecha = async () => {
            try {
                if (!token) return;
                const fechaFormateada = format(fecha, 'yyyy-MM-dd');
                const response = await fetch(
                    `http://localhost:8080/api/v1/rutinas/obtener?fecha=${fechaFormateada}`,
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    }
                );

                if (response.ok) {
                    const data = await response.json();
                    setPlanHoyData(data);
                    setCompletados([]);
                }
            } catch (error) {
                console.error("Error al obtener rutina:", error);
            }
        };
        fetchRutinaPorFecha();
    }, [fecha]);

    const toggleCompletado = (id: number) => {
        setCompletados(prev =>
            prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
        );
    };

    const finalizarRutina = async () => {
        if (planHoyData.length === 0) {
            showModal("Aviso", "No hay rutina programada para este día.", "info");
            return;
        }

        const porcentaje = Math.round(porcentajeCompletado);
        const cumplioMeta = porcentaje >= 60;
        const token = localStorage.getItem("token");

        if (!token) {
            showModal("Error", "Debes iniciar sesión.", "info");
            return;
        }

        try {
            const response = await fetch(
                "http://localhost:8080/api/v1/progreso/guardar",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        ejerciciosTotales: planHoyData.length,
                        ejerciciosCompletados: completados.length,
                        porcentaje,
                        rachaValida: cumplioMeta,
                        fecha: fecha.toISOString().split("T")[0]
                    })
                }
            );

            if (!response.ok) {
                throw new Error("Error guardando progreso");
            }

            const mensaje = cumplioMeta
                ? `🔥 ¡Excelente trabajo!\n\nCompletaste el ${porcentaje}% de tu rutina.\nTu racha se mantendrá activa.`
                : `😅 Completaste el ${porcentaje}% de la rutina.\n\nNecesitas al menos 60% para mantener la racha.`;

            showModal(cumplioMeta ? "¡Felicidades!" : "Atención", mensaje, "info");

        } catch (error) {
            console.error(error);
            showModal("Error", "Error al guardar el progreso", "info");
        }
    };

    const confirmarEliminarRutina = () => {
        showModal(
            "Eliminar Rutina",
            "¿Estás seguro de que deseas eliminar la rutina de este día?",
            "confirm",
            () => {
                eliminarRutina();
            }
        );
    };

    const eliminarRutina = async () => {
        if (!token) return;

        const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
        const nombreDia = diasSemana[fecha.getDay()];

        try {
            const response = await fetch(`http://localhost:8080/api/v1/rutinas/eliminar/${nombreDia}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                showModal("Éxito", "Rutina eliminada correctamente", "info");
                setPlanHoyData([]);
                setCompletados([]);
                setDiasConRutina(prev => prev.filter(dia => dia !== nombreDia));
            } else {
                showModal("Error", "Error al eliminar la rutina", "info");
            }
        } catch (error) {
            console.error("Error al eliminar la rutina:", error);
            showModal("Error", "Error al eliminar la rutina", "info");
        }
    };

    return (
        <>
            <Navbar />

            {/* Fondo base */}
            <div className="min-h-screen bg-neutral-900 pt-20">
                <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-8 grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-6 lg:items-stretch">

                    {/* ──────────── COL 1: PLAN DE HOY ──────────── */}
                    <div className="bg-neutral-900 border border-neutral-800 border-l-4 border-l-red-500 rounded-2xl p-6 shadow-lg flex flex-col min-h-0">

                        {/* Cabecera */}
                        <div className="flex items-center gap-3 mb-5">
                            <h1 className="font-['Bebas_Neue'] text-3xl tracking-wider text-red-200 leading-none">
                                Plan de Hoy
                            </h1>
                            <span className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-full text-[10px] font-black tracking-[0.12em] uppercase px-3 py-0.5">
                                {completados.length}/{planHoyData.length} completados
                            </span>
                        </div>

                        {/* Lista vertical con scroll */}
                        <div className="flex flex-col gap-3 overflow-y-auto pr-1 flex-1" style={{ maxHeight: 'calc(100vh - 220px)' }}>
                            {planHoyData.length > 0 ? (
                                planHoyData.map((ejercicio: PlanHoyData) => {
                                    const hecho = completados.includes(ejercicio.id);
                                    return (
                                        <div
                                            key={ejercicio.id}
                                            className={`
                                                flex flex-row justify-between items-center rounded-xl p-4 transition-colors
                                                ${hecho
                                                    ? 'bg-neutral-800/80 border border-red-500/30'
                                                    : 'bg-neutral-800/40 border border-neutral-800 hover:bg-neutral-800 hover:border-neutral-700'
                                                }
                                            `}
                                        >
                                            <div className="flex-1 min-w-0">
                                                <h2
                                                    className={`font-bold text-base mb-2 truncate transition-all duration-300 ${hecho
                                                        ? 'text-red-300 line-through opacity-60'
                                                        : 'text-gray-200'
                                                        }`}
                                                >
                                                    {ejercicio.nombre}
                                                </h2>
                                                <div className="flex gap-2 flex-wrap">
                                                    <span className="bg-white/[0.07] rounded-md px-2 py-0.5 text-[11px] text-gray-400 font-semibold">
                                                        {ejercicio.series} series
                                                    </span>
                                                    <span className="bg-white/[0.07] rounded-md px-2 py-0.5 text-[11px] text-gray-400 font-semibold">
                                                        {ejercicio.repeticiones} reps
                                                    </span>
                                                </div>
                                            </div>

                                            <button
                                                onClick={() => toggleCompletado(ejercicio.id)}
                                                title={hecho ? 'Desmarcar ejercicio' : 'Marcar como completado'}
                                                className={`
                                                    ml-3 shrink-0 w-10 h-10 rounded-full flex items-center justify-center
                                                    border transition-all duration-300 cursor-pointer
                                                    transform hover:scale-110 active:scale-95
                                                    ${hecho
                                                        ? 'bg-green-500 border-green-400 shadow-[0_0_15px_rgba(34,197,94,0.5)]'
                                                        : 'bg-red-500/10 border-red-500/40 hover:bg-red-500/20'
                                                    }
                                                `}
                                            >
                                                {hecho ? (
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth={3}
                                                        stroke="white"
                                                        className="size-5"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="m4.5 12.75 6 6 9-13.5"
                                                        />
                                                    </svg>
                                                ) : (
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth={2}
                                                        stroke="#f87171"
                                                        className="size-5"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M12 6v6l4 2"
                                                        />
                                                        <circle
                                                            cx="12"
                                                            cy="12"
                                                            r="9"
                                                        />
                                                    </svg>
                                                )}
                                            </button>
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="flex-1 flex flex-col items-center justify-center opacity-30 mt-12">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 mb-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                                    </svg>
                                    <h2 className="font-['Bebas_Neue'] text-3xl tracking-wider">DÍA DE DESCANSO</h2>
                                    <p className="text-sm font-semibold uppercase tracking-widest mt-2">No hay rutinas programadas</p>
                                </div>
                            )}
                        </div>

                        <div className="flex gap-4 mt-5">
                            {planHoyData.length > 0 && (
                                <button
                                    onClick={confirmarEliminarRutina}
                                    className="px-6 py-4 rounded-2xl font-black uppercase tracking-[0.15em] transition-all duration-300 cursor-pointer border bg-red-500/10 border-red-500/40 text-red-400 hover:bg-red-500/20"
                                >
                                    Eliminar
                                </button>
                            )}
                            
                            <button
                                onClick={finalizarRutina}
                                disabled={planHoyData.length === 0}
                                className={`
                                    flex-1 py-4 rounded-2xl font-black uppercase tracking-[0.15em]
                                    transition-all duration-300 cursor-pointer
                                    border
                                    ${planHoyData.length === 0
                                        ? 'bg-neutral-800 border-neutral-700 text-gray-500 cursor-not-allowed'
                                        : porcentajeCompletado >= 60
                                            ? 'bg-green-500/20 border-green-500/40 text-green-300 hover:bg-green-500/30'
                                            : 'bg-red-500/10 border-red-500/30 text-red-300 hover:bg-red-500/20'
                                    }
                                 `}
                            >Finalizar Rutina
                                <span className="ml-2 opacity-70">
                                    ({Math.round(porcentajeCompletado)}%)
                                </span>
                            </button>
                        </div>
                    </div>

                    {/* ──────────── COL 2: CALENDARIO + RACHA ──────────── */}
                    <div className="flex flex-col gap-6">

                        {/* CALENDARIO */}
                        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 shadow-lg">
                            <h3 className="font-['Bebas_Neue'] text-2xl tracking-wider text-purple-200 leading-none mb-4">
                                Calendario
                            </h3>

                            {/* Override CSS del calendario */}
                            <style>{`
                                .gym-calendar { background: transparent !important; border: none !important; width: 100% !important; font-family: inherit; }
                                .gym-calendar .react-calendar__navigation button { color: #e5e7eb; background: transparent; font-weight: 700; border-radius: 8px; }
                                .gym-calendar .react-calendar__navigation button:hover,
                                .gym-calendar .react-calendar__navigation button:focus { background: rgba(255,255,255,0.08) !important; }
                                .gym-calendar .react-calendar__navigation button:disabled { background: transparent !important; }
                                .gym-calendar .react-calendar__month-view__weekdays { color: #6b7280; font-size: 0.68rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; }
                                .gym-calendar .react-calendar__month-view__weekdays abbr { text-decoration: none; }
                                .gym-calendar .react-calendar__tile { color: #d1d5db; background: transparent; border-radius: 8px; font-size: 0.82rem; transition: background 0.15s; }
                                .gym-calendar .react-calendar__tile:hover { background: rgba(255,255,255,0.08) !important; color: #fff; }
                                .gym-calendar .react-calendar__tile--now { background: rgba(239,68,68,0.12) !important; color: #f87171 !important; font-weight: 700; box-shadow: inset 0 0 0 1px rgba(239,68,68,0.3); }
                                .gym-calendar .react-calendar__tile--active,
                                .gym-calendar .react-calendar__tile--active:hover { background: #ef4444 !important; color: #fff !important; }
                                .gym-calendar .react-calendar__month-view__days__day--neighboringMonth { color: #374151 !important; }
                            `}</style>

                            <Calendar
                                onChange={(v) => setFecha(v as Date)}
                                value={fecha}
                                tileContent={tileContent}
                                locale="es-ES"
                                className="gym-calendar"
                            />

                            {/* Fecha seleccionada */}
                            <div className="mt-3 flex items-center gap-2 px-3 py-2 bg-neutral-800/50 border border-neutral-800 rounded-xl text-xs text-gray-400">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#a78bfa" className="size-4 shrink-0">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                                </svg>
                                <span>
                                    Seleccionado: <strong className="text-purple-200">{format(fecha, 'dd/MM/yyyy')}</strong>
                                </span>
                                {diasConRutina.includes(format(fecha, 'yyyy-MM-dd')) && (
                                    <span className="ml-auto bg-red-500/10 border border-red-500/30 text-red-400 rounded-full text-[10px] font-black tracking-widest uppercase px-2 py-0.5">
                                        Rutina 🔥
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* RACHA — debajo del calendario */}
                        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 shadow-lg flex flex-row items-center gap-6 px-8">
                            <span className={`text-5xl leading-none ${rachaActual === 0 ? 'opacity-30 grayscale' : ''}`}>🔥</span>
                            <div className="flex flex-col">
                                <h3 className="font-['Bebas_Neue'] text-2xl tracking-wider text-purple-200 leading-none">
                                    Racha
                                </h3>
                                <span className={`font-['Bebas_Neue'] text-6xl leading-none ${rachaActual === 0 ? 'text-gray-500 opacity-50' : 'text-yellow-400'}`}>
                                    {rachaActual}
                                </span>
                                <p className="text-gray-500 text-[11px] font-bold uppercase tracking-widest mt-1">
                                    días seguidos
                                </p>
                            </div>
                            {/* Mini racha visual */}
                            {rachaActual > 0 && (
                                <div className="ml-auto flex gap-1.5 flex-wrap justify-end max-w-[140px]">
                                    {Array.from({ length: Math.min(rachaActual, 7) }).map((_, i) => (
                                        <div
                                            key={i}
                                            className="w-6 h-6 rounded-md bg-yellow-400/20 border border-yellow-400/40 flex items-center justify-center text-[10px]"
                                            title={`Día ${i + 1}`}
                                        >
                                            🔥
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>

            <Modal {...modal} onClose={closeModal} />
        </>
    );
}