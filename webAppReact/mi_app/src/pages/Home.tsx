import { Navbar } from "../components/NavBar/Navbar";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const planHoyData=[
    {
        "id": 1,
        "nombre": "sentadilla",
        "series": 4,
        "repeticiones": 12
    },
    {
        "id": 2,
        "nombre": "press de banca",
        "series": 4,
        "repeticiones": 10
    },
    {
        "id": 3,
        "nombre": "peso muerto",
        "series": 4,
        "repeticiones": 8
    },
    {
        "id": 4,
        "nombre": "dominadas",
        "series": 4,
        "repeticiones": 6
    },
    {
        "id": 5,
        "nombre": "curl de bíceps",
        "series": 3,
        "repeticiones": 15
    },
    {
        "id": 6,
        "nombre": "extensiones de tríceps",
        "series": 3,
        "repeticiones": 15
    }
]

const kaloriasData ={
    "caloriasTotales": 500
}

const metasData = [
    {
        "id": 1,
        "nombre": "Perder peso",
        "actual": 70,
        "meta": 70
    },
    {
        "id": 2,
        "nombre": "Ganar músculo",
        "actual": 20,
        "meta": 30
    },
    {
        "id": 3,
        "nombre": "Mejorar resistencia",
        "actual": 5,
        "meta": 10
    }
]

const porcentaje = (actual: number, meta: number) => {
    if (meta === 0) return 0; // Evitar división por cero
    return (actual / meta) * 100;
};
const progresoData=[
    { semana: 'Semana 1', peso: 80 },
    { semana: 'Semana 2', peso: 78 },
    { semana: 'Semana 3', peso: 77 },
    { semana: 'Semana 4', peso: 75 },
    { semana: 'Semana 5', peso: 74 },
]
interface PlanHoyData {
    id: number;
    nombre: string;
    repeticiones: number;
    series: number;
}

export default function Home(){
    return(
        <>
            <header className="relative">
                <Navbar />
            </header>

            <div className="grid grid-cols-1 md:grid-cols-12 auto-rows-min gap-4 m-4 md:m-8 min-h-screen pt-20 lg:pt-10">
                <div className="col-span-1 md:col-span-12 lg:col-span-8 bg-red-400 rounded-md">
                    <h1 className="text-red-200 m-2 font-bold">Plan de hoy</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-2 max-h-[300px] overflow-auto lg:max-h-[200px] lg:flex">
                        {planHoyData.map((ejercicio: PlanHoyData) => (
                            <div key={ejercicio.id} className="bg-neutral-800 rounded-md p-4 border border-gray-700 min-w-[300px] flex flex-row justify-between hover:border-gray-400 transition-colors">
                                <div>
                                    <h2 className="text-xl font-bold text-gray-200">{ejercicio.nombre}</h2>
                                    <p className="text-gray-300">Series: {ejercicio.series}</p>
                                    <p className="text-gray-300">Repeticiones: {ejercicio.repeticiones}</p>
                                </div>
                                <div>
                                    <button className="cursor-pointer bg-red-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-red-600 transition-colors">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z" />
                                        </svg>
                                    </button>
                                </div>

                            </div>
                        ))}
                    </div>
                </div>
                <div className="col-span-1 md:col-span-6 lg:col-span-2 bg-neutral-800 rounded-md">
                        <h3 className="flex text-orange-200 font-bold m-2">
                            Kalorias 
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                            <path fill-rule="evenodd" d="M12.963 2.286a.75.75 0 0 0-1.071-.136 9.742 9.742 0 0 0-3.539 6.176 7.547 7.547 0 0 1-1.705-1.715.75.75 0 0 0-1.152-.082A9 9 0 1 0 15.68 4.534a7.46 7.46 0 0 1-2.717-2.248ZM15.75 14.25a3.75 3.75 0 1 1-7.313-1.172c.628.465 1.35.81 2.133 1a5.99 5.99 0 0 1 1.925-3.546 3.75 3.75 0 0 1 3.255 3.718Z" clip-rule="evenodd" />
                            </svg>
                        </h3>
                        <div className="lg:flex lg:items-center lg:justify-center h-full">
                            <h4 className="text-yellow-600 font-bold m-2 text-3xl">{kaloriasData.caloriasTotales} kcal</h4>
                        </div>
                </div>
                <div className="col-span-1 md:col-span-6 lg:col-span-2 bg-neutral-800 rounded-md">
                    <h3 className="flex text-blue-200 font-bold m-2">Analisis IA
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                            <path fill-rule="evenodd" d="M9 4.5a.75.75 0 0 1 .721.544l.813 2.846a3.75 3.75 0 0 0 2.576 2.576l2.846.813a.75.75 0 0 1 0 1.442l-2.846.813a3.75 3.75 0 0 0-2.576 2.576l-.813 2.846a.75.75 0 0 1-1.442 0l-.813-2.846a3.75 3.75 0 0 0-2.576-2.576l-2.846-.813a.75.75 0 0 1 0-1.442l2.846-.813A3.75 3.75 0 0 0 7.466 7.89l.813-2.846A.75.75 0 0 1 9 4.5ZM18 1.5a.75.75 0 0 1 .728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 0 1 0 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 0 1-1.456 0l-.258-1.036a2.625 2.625 0 0 0-1.91-1.91l-1.036-.258a.75.75 0 0 1 0-1.456l1.036-.258a2.625 2.625 0 0 0 1.91-1.91l.258-1.036A.75.75 0 0 1 18 1.5ZM16.5 15a.75.75 0 0 1 .712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 0 1 0 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 0 1-1.422 0l-.395-1.183a1.5 1.5 0 0 0-.948-.948l-1.183-.395a.75.75 0 0 1 0-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0 1 16.5 15Z" clip-rule="evenodd" />
                        </svg>
                    </h3>
                    <form action="submit" className="w-full p-2">
                        <input type="text" placeholder="Escribe tu pregunta..." className="w-full p-2 rounded-md bg-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 " />
                        <button type="submit" className="mt-2 w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition-colors">
                            Preguntar
                        </button>
                    </form>
                </div>
                <div className="col-span-1 md:col-span-6 lg:col-span-4 bg-neutral-800 rounded-md ">
                    <h3 className="flex text-green-200 font-bold m-2">Metas
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                            <path fill-rule="evenodd" d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clip-rule="evenodd" />
                        </svg>

                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 m-2 max-h-[300px] overflow-auto">
                        {metasData.map((meta) => (
                            <div key={meta.id} className="bg-neutral-700 rounded-md p-4 border border-gray-600 hover:border-gray-400 transition-colors">
                                <h4 className="text-lg font-bold text-gray-200">{meta.nombre}</h4>
                                <p className="text-gray-300">Progreso: {meta.actual} / {meta.meta}</p>
                                <div className="w-full bg-gray-600 rounded-full h-4 mt-2">
                                    <div className="bg-green-500 h-4 rounded-full" style={{ width: `${porcentaje(meta.actual, meta.meta)}%` }}></div>
                                </div>
                                {porcentaje(meta.actual, meta.meta) === 100 && <h5 className="text-green-200 font-bold">Completado</h5>}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="col-span-1 md:col-span-6 lg:col-span-8 bg-neutral-800 rounded-md">
                    <h3 className="text-purple-200 font-bold m-2">Progreso</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={progresoData}>
                            <XAxis dataKey="semana" stroke="#8884d8" />
                            <YAxis stroke="#8884d8" />
                            <Tooltip />
                            <Line type="monotone" dataKey="peso" stroke="#82ca9d" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </>
    )
}