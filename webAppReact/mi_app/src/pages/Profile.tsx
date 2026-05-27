import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import { Navbar } from "../components/Nav/Navbar.tsx";
import ProfileEditForm from "../components/ProfileEditForm/ProfileEditForm";
import { perfilData as initialPerfil } from '../data/mockData';
import { calcularIMC } from '../utils/helpers';

type ProfileFormData = {
    nombre: string;
    email: string;
    peso: string;
    altura: string;
    edad: string;
};

/* ─── Iniciales del nombre para el avatar ─── */
function getInitials(nombre: string) {
    return nombre
        .split(' ')
        .map(w => w[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
}

/* ─── Clasificación IMC ─── */
function clasificarIMC(imc: number) {
    if (imc < 18.5) return { label: 'Bajo peso', color: 'text-blue-400' };
    if (imc < 25) return { label: 'Normal', color: 'text-green-400' };
    if (imc < 30) return { label: 'Sobrepeso', color: 'text-yellow-400' };
    return { label: 'Obesidad', color: 'text-red-400' };
}

export default function Profile() {
    const [perfil, setPerfil] = useState(initialPerfil);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) return;

                const response = await fetch('http://localhost:8080/api/v2/user/me', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setPerfil([{
                        id: "1",
                        nombre: `${data.firtsName || ''} ${data.lastName || ''}`.trim() || initialPerfil[0].nombre,
                        email: data.email || initialPerfil[0].email,
                        peso: data.weight ? data.weight.toString() : initialPerfil[0].peso,
                        altura: data.stature ? data.stature.toString() : initialPerfil[0].altura,
                        edad: data.age ? data.age.toString() : initialPerfil[0].edad,
                    }]);
                } else {
                    console.error("Error al obtener el perfil:", await response.text());
                }
            } catch (error) {
                console.error("Error de red al obtener el perfil:", error);
            }
        };

        fetchProfile();
    }, []);

    const p = perfil[0];
    const imc = parseFloat(calcularIMC(p.peso, p.altura) as string);
    const { label: imcLabel, color: imcColor } = clasificarIMC(imc);

    const handleSave = (data: ProfileFormData) => {
        setPerfil([{ ...perfil[0], ...data }]);
        setIsEditing(false);
    };

    const statIcons: Record<string, ReactNode> = {
        peso: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 text-gray-500"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v.75m0 0a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm0 .75H9.75M12 3.75H14.25M3 9.75h18M4.5 9.75v9a2.25 2.25 0 0 0 2.25 2.25h10.5A2.25 2.25 0 0 0 19.5 18.75v-9" /></svg>,
        altura: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 text-gray-500"><path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" /></svg>,
        edad: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 text-gray-500"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" /></svg>,
        nombre: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 text-gray-500"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" /></svg>,
        email: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 text-gray-500"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" /></svg>,
        imc: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 text-gray-500"><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" /></svg>,
    };

    const stats = [
        { label: 'Peso', valor: `${p.peso} kg`, iconKey: 'peso' },
        { label: 'Altura', valor: `${p.altura} m`, iconKey: 'altura' },
        { label: 'Edad', valor: `${p.edad} años`, iconKey: 'edad' },
    ];

    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-neutral-900 pt-20">
                <div className="max-w-[1100px] mx-auto px-4 md:px-8 py-8">

                    {/* ── MODO EDICIÓN ── */}
                    {isEditing ? (
                        <div className="bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-8 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
                            <ProfileEditForm
                                initialData={{
                                    nombre: p.nombre,
                                    email: p.email,
                                    peso: p.peso,
                                    altura: p.altura,
                                    edad: p.edad,
                                }}
                                onSave={handleSave}
                                onCancel={() => setIsEditing(false)}
                            />
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6 items-stretch">

                            {/* ────── COL IZQUIERDA: Avatar + Nombre ────── */}
                            <div className="bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] border-t-4 border-t-red-500 rounded-2xl p-8 shadow-[0_8px_32px_rgba(0,0,0,0.4)] flex flex-col items-center gap-5 relative h-full justify-between">

                                {/* Botón editar */}
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.06] border border-white/[0.1] text-lime-400 hover:bg-lime-400/10 hover:border-lime-400/30 transition-all text-xs font-bold uppercase tracking-widest cursor-pointer"
                                    title="Editar Perfil"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                                        <path d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z" />
                                    </svg>
                                    Editar
                                </button>

                                {/* Avatar circular con iniciales */}
                                <div className="w-28 h-28 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
                                    <span className="font-['Bebas_Neue'] text-4xl text-white tracking-wider leading-none">
                                        {getInitials(p.nombre)}
                                    </span>
                                </div>

                                {/* Nombre y email */}
                                <div className="text-center">
                                    <h1 className="font-['Bebas_Neue'] text-3xl tracking-wider text-white leading-none mb-1">
                                        {p.nombre}
                                    </h1>
                                    <p className="text-gray-500 text-sm">{p.email}</p>
                                </div>

                                {/* Badge objetivo (decorativo) */}
                                <span className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-full text-[10px] font-black tracking-[0.15em] uppercase px-4 py-1">
                                    Atleta Activo
                                </span>

                                {/* Divisor */}
                                <div className="w-full border-t border-white/[0.06]" />

                                {/* Stats rápidos verticales */}
                                <div className="w-full flex flex-col gap-3">
                                    {stats.map(({ label, valor, iconKey }) => (
                                        <div key={label} className="flex items-center justify-between px-1">
                                            <div className="flex items-center gap-2 text-gray-400 text-sm">
                                                {statIcons[iconKey]}
                                                {label}
                                            </div>
                                            <span className="text-white font-bold text-sm">{valor}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* ────── COL DERECHA ────── */}
                            <div className="flex flex-col gap-6">

                                {/* ── IMC Card ── */}
                                <div className="bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-6 shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.06)]">
                                    <h2 className="font-['Bebas_Neue'] text-2xl tracking-wider text-red-200 leading-none mb-5">
                                        Índice de Masa Corporal
                                    </h2>

                                    {/* Número IMC grande */}
                                    <div className="flex items-end gap-4 mb-4">
                                        <span className={`font-['Bebas_Neue'] text-7xl leading-none ${imcColor}`}>
                                            {isNaN(imc) ? '—' : imc.toFixed(1)}
                                        </span>
                                        <div className="mb-2">
                                            <p className={`font-bold text-lg leading-none ${imcColor}`}>{imcLabel}</p>
                                            <p className="text-gray-500 text-xs mt-1">kg / m²</p>
                                        </div>
                                    </div>

                                    {/* Barra visual de IMC */}
                                    <div className="relative w-full h-3 rounded-full overflow-hidden bg-white/[0.06] mb-2">
                                        <div className="absolute inset-0 flex">
                                            <div className="flex-1 bg-blue-500/50" />
                                            <div className="flex-1 bg-green-500/50" />
                                            <div className="flex-1 bg-yellow-500/50" />
                                            <div className="flex-1 bg-red-500/50" />
                                        </div>
                                        {/* Indicador */}
                                        {!isNaN(imc) && (
                                            <div
                                                className="absolute top-1/2 -translate-y-1/2 w-3 h-5 bg-white rounded-full shadow-lg"
                                                style={{ left: `clamp(0%, ${((imc - 15) / 25) * 100}%, 98%)` }}
                                            />
                                        )}
                                    </div>
                                    <div className="flex justify-between text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                                        <span>15</span><span>18.5</span><span>25</span><span>30</span><span>40</span>
                                    </div>
                                </div>

                                {/* ── Info adicional / grid de stats ── */}
                                <div className="bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-6 shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.06)]">
                                    <h2 className="font-['Bebas_Neue'] text-2xl tracking-wider text-purple-200 leading-none mb-5">
                                        Datos Personales
                                    </h2>

                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                        {[
                                            { label: 'Nombre', valor: p.nombre, iconKey: 'nombre' },
                                            { label: 'Email', valor: p.email, iconKey: 'email' },
                                            { label: 'Peso', valor: `${p.peso} kg`, iconKey: 'peso' },
                                            { label: 'Altura', valor: `${p.altura} m`, iconKey: 'altura' },
                                            { label: 'Edad', valor: `${p.edad} años`, iconKey: 'edad' },
                                            { label: 'IMC', valor: isNaN(imc) ? '—' : imc.toFixed(1), iconKey: 'imc' },
                                        ].map(({ label, valor, iconKey }) => (
                                            <div
                                                key={label}
                                                className="bg-white/[0.04] border border-white/[0.07] rounded-xl p-4 flex flex-col gap-2"
                                            >
                                                <div className="w-7 h-7 rounded-lg bg-white/[0.06] flex items-center justify-center">
                                                    {statIcons[iconKey]}
                                                </div>
                                                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{label}</p>
                                                <p className="text-white font-bold text-sm truncate">{valor}</p>

                                            </div>
                                        ))}
                                    </div>
                                </div>

                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
