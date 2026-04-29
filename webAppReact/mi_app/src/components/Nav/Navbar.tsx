import { useState } from 'react';
import { Link } from 'react-router-dom';

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="relative">
            <nav className="flex items-center justify-between fixed top-0 left-0 right-0 bg-neutral-800 p-4 z-50">
                <div className="flex items-center gap-8">
                    <Link to="/home" className="text-2xl font-['Bebas_Neue'] tracking-wider italic">
                        FIT<span className="text-red-600">AI</span>3D
                    </Link>
                    <ul className="hidden md:flex space-x-6 items-center">
                        <li><Link to="/home" className="text-white hover:text-red-400 font-bold uppercase text-xs tracking-widest transition-colors">Dashboard</Link></li>
                        <li><Link to="/rutina" className="text-white hover:text-red-400 font-bold uppercase text-xs tracking-widest transition-colors">Entrenador</Link></li>
                        <li><Link to="/perfil" className="text-white hover:text-red-400 font-bold uppercase text-xs tracking-widest transition-colors">Perfil</Link></li>
                    </ul>
                </div>
                <div className="flex border-2 border-neutral-800 hover:border-red-950 rounded-md h-10 w-10 items-center justify-center cursor-pointer md:hidden">
                    <button className="text-white px-4 py-2" onClick={() => setIsOpen(!isOpen)}>
                        {/* Hamburguesa o X */}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                            <path fillRule="evenodd" d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
                {isOpen && (
                    <ul className="absolute top-full left-0 right-0 bg-neutral-800 md:hidden z-50 shadow-lg border-t border-neutral-700">
                        <li><Link to="/home" className="text-white hover:text-red-400 block p-4 border-b border-neutral-700 font-bold uppercase text-xs tracking-widest">Dashboard</Link></li>
                        <li><Link to="/rutina" className="text-white hover:text-red-400 block p-4 border-b border-neutral-700 font-bold uppercase text-xs tracking-widest">Entrenador</Link></li>
                        <li><Link to="/perfil" className="text-white hover:text-red-400 block p-4 font-bold uppercase text-xs tracking-widest">Perfil</Link></li>
                    </ul>
                )}
            </nav>
        </header>
    )
}