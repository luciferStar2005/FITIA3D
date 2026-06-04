import { Navbar } from "../components/Nav/Navbar.tsx";
import '../styles/BibliotecaPage.css';
import { useState } from 'react';


const BibliotecaPage = () => {
   

        const ejerciciosAnimados = [
    // --- PECHO Y TRÍCEPS ---
    { nombre: "Barbell Bench Press", id: "4f340552dd9b4f428ef51a64888fd13e", musculoObjetivo: "Pecho / Tríceps", herramienta: "Barra" },
    { nombre: "The Body Weight Push up", id: "dec9cdfb7daa4361bd58daf1627daa10", musculoObjetivo: "Pecho / Triceps", herramienta: "Peso Corporal" },
    { nombre: "Close Grip Push up", id: "cce214e53367448fa72dea2e562923de", musculoObjetivo: "Tríceps", herramienta: "Peso Corporal" },
    { nombre: "The Incline Push Up", id: "7eeb551c908b4787b6249a3bdc3d8528", musculoObjetivo: "Pecho / Triceps", herramienta: "Peso Corporal" },
    {nombre: "Tricep Kickbacks Dumbbell", id: "06595704feb54f9491e1ccd622d49a9f", musculoObjetivo: "Tríceps", herramienta: "Mancuerna" },
    {nombre: "Dumbbell Flys", id: "73e5248313a64bb0b924525c46e755e8", musculoObjetivo: "Pecho", herramienta: "Mancuerna" },

    // --- ESPALDA Y BÍCEPS ---
    { nombre: "Dumbbell Rows", id: "90978df29f954acc81326a87d797b8a5", musculoObjetivo: "Laterales/ Trapecio Medio", herramienta: "Mancuerna" },
    { nombre: "Barbell Bicep Curl", id: "3f45ba2552684b50bd79dfb7bbc7d118", musculoObjetivo: "Bíceps", herramienta: "Barra" },
    { nombre: "Dumbbell Bicep Curls", id: "3b4d939326124b85b8cee593a7a06fae", musculoObjetivo: "Bíceps", herramienta: "Mancuerna" },
    { nombre: "Hammer Curls", id: "d7eee1e330a14828a79dce074b3142eb", musculoObjetivo: "Bíceps ", herramienta: "Mancuerna" },

    // --- PIERNAS (CORE & LOWER BODY) ---
    { nombre: "Barbell Back Squat", id: "11c53f93e3624519afb193ab34e35d01", musculoObjetivo: "Cuádriceps / Glúteos", herramienta: "Barra" },
    { nombre: "Conventional Deadlift", id: "fa15b0be93c5482690bca0ce4a30df2b", musculoObjetivo: "Cuádriceps", herramienta: "Barra" },
    { nombre: "The Sumo Deadlift", id: "ca6825d04b09478e8ac8f2810167c9e8", musculoObjetivo: "Cuádriceps / Glúteos", herramienta: "Barra" },
    { nombre: "Kettlebell RDL", id: "6f6ee459008e4f76b6495c476b180e17", musculoObjetivo: "Isquiotibiales", herramienta: "Kettlebell" },
    { nombre: "Kettlebell Squat", id: "18f5be3f531942c4a65a692efdd6324e", musculoObjetivo: "Cuádriceps", herramienta: "Mancuerna" },
    {nombre: "The HIP Hyperextension", id: "9337e8427375494fb378bf231793e6b5", musculoObjetivo: "Glúteos", herramienta: "Peso Corporal" },
    {nombre: "The Barbell Hip Thrust Gym Bench", id: "8776442444d448348cc4688b54faa3db", musculoObjetivo: "Glúteos", herramienta: "Barra" },
    {nombre: "Single Leg hip Thrust", id: "ddab28796fc346de9bd4d623986b5780", musculoObjetivo: "Glúteos", herramienta: "Peso Corporal" },
    {nombre: " Single Stiff Leg Kettlebell Deadlifts", id: "3fd8c6b999524e47afc3b27699d1fdeb", musculoObjetivo: "Isquiotibiales / Glúteos", herramienta: "Kettlebell" },
    {nombre: "Bodyweight Crunch", id: "b70eb4054ba946ad91eeec0a63145d02", musculoObjetivo: "Core", herramienta: "Peso Corporal" },
    {nombre: "Kettlebell Swing", id: "f5fd747e30044b57a79252a9ec3e1060", musculoObjetivo: "Core", herramienta: "Peso Corporal" },
    {nombre: "BC Strength Hip Thrust", id: "a1e251dbfeb4460a99ed5ac77ba8c4e9", musculoObjetivo: "Glúteos", herramienta: "Barra" },

    // --- HOMBROS ---
    { nombre: "Barbell Overhead Press", id: "3760ad8780e14bd4a4bdf22e48c9b87f", musculoObjetivo: "Hombros / Tríceps", herramienta: "Barra" },
    { nombre: "Dumbbell Lateral Raise", id: "5211a76ee22f46628175e6851ce0993e", musculoObjetivo: "Hombros", herramienta: "Mancuerna" },
    {nombre: "Single Arm Kettlebell Press", id: "31a93a9aac314357b91f7cf8213f4b10", musculoObjetivo: "Hombros", herramienta: "Kettlebell" },
    {nombre: "Kettlebell Upright Row", id: "b9f183ab17034cc9b3a06be08882ffa0", musculoObjetivo: "Isquiotibiales / Glúteos", herramienta: "Kettlebell" },
];
         const [ejercicio, setEjercicio] = useState('');
        const ejerciciosFiltrados = ejerciciosAnimados.filter(e=> 
            e.nombre.toLowerCase().includes(ejercicio.toLowerCase()) ||
            e.musculoObjetivo.toLowerCase().includes(ejercicio.toLowerCase())
        );



    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-neutral-900 pt-20">
                <div className="biblioteca-page max-w-7xl mx-auto px-6">
                    <h1 className="font-['Bebas_Neue'] text-5xl tracking-wider text-red-500 mb-4">Biblioteca de Ejercicios</h1>
                    <p className="text-gray-400 mb-8">Aquí encontrarás una colección de ejercicios animados para ayudarte a visualizar la ejecución correcta de cada movimiento.</p>
            <div className='buscador-container'>
                <input 
                    type="text" 
                    placeholder="Buscar por nombre o músculo..." 
                    value={ejercicio}
                    onChange={(e) => setEjercicio(e.target.value)}
                    className="buscador-input"
                />
            </div>
           

            {/* Contenedor Grid para las tarjetas */}
            <div className="biblioteca-grid">
            {ejerciciosFiltrados.length > 0 ? (
                ejerciciosFiltrados.map((e, index) => (
                    <div key={index} className="ejercicio-card">
                        <h2>{e.nombre}</h2>
                        
                        <div className="info-tags">
                            <span className="tag tag-musculo">{e.musculoObjetivo}</span>
                            <span className="tag tag-herramienta">{e.herramienta}</span>
                        </div>

                        <iframe
                            className="sketchfab-iframe"
                            title={e.nombre}
                            src={`https://sketchfab.com/models/${e.id}/embed?ui_infos=0&ui_watermark=0&transparent=1&autoplay=0`}
                            frameBorder="0"
                            allowFullScreen
                            allow="autoplay; fullscreen; xr-spatial-tracking"
                        ></iframe>
                    </div>
                ))
            ) : (
                <p>No hay resultados...</p>
            )}
               
            </div>
                </div>
            </div>
        </>
    );
}

export default BibliotecaPage;