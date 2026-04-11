import { Navbar } from "../components/NavBar/Navbar";


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
        "actual": 10,
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

const porcentaje = (actual: number, meta: number, nombre: string) => {
    if (meta === 0) return 0; // Evitar división por cero
    return (actual / meta) * 100;

};

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
                                    <button className="bg-red-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-red-600 transition-colors">
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
                        <h3 className="text-orange-200 font-bold m-2">Kalorias</h3>
                        <div className="lg:flex lg:items-center lg:justify-center h-full">
                            <h4 className="text-yellow-600 font-bold m-2 text-3xl">{kaloriasData.caloriasTotales} kcal</h4>
                        </div>
                </div>
                <div className="col-span-1 md:col-span-6 lg:col-span-2 bg-neutral-800 rounded-md">
                    <h3 className="text-blue-200 font-bold m-2">Analisis IA</h3>
                    <form action="submit" className="w-full p-2">
                        <input type="text" placeholder="Escribe tu pregunta..." className="w-full p-2 rounded-md bg-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 " />
                        <button type="submit" className="mt-2 w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition-colors">
                            Preguntar
                        </button>
                    </form>
                </div>
                <div className="col-span-1 md:col-span-6 lg:col-span-4 bg-neutral-800 rounded-md ">
                    <h3 className="text-green-200 font-bold m-2">Metas</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 m-2 max-h-[300px] overflow-auto">
                        {metasData.map((meta) => (
                            <div key={meta.id} className="bg-neutral-700 rounded-md p-4 border border-gray-600">
                                <h4 className="text-lg font-bold text-gray-200">{meta.nombre}</h4>
                                <p className="text-gray-300">Progreso: {meta.actual} / {meta.meta}</p>
                                <div className="w-full bg-gray-600 rounded-full h-4 mt-2">
                                    <div className="bg-green-500 h-4 rounded-full" style={{ width: `${porcentaje(meta.actual, meta.meta, meta.nombre)}%` }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="col-span-1 md:col-span-6 lg:col-span-8 bg-neutral-800 rounded-md">
                    <h3 className="text-purple-200 font-bold m-2">Progreso</h3>
                </div>
            </div>
        </>
    )
}