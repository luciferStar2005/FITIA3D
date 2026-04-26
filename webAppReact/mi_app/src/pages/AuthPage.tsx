import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Registro, { Login } from "./AuthForms";

export default function AuthPage() {
    const location = useLocation();
    
    // Iniciar dependiendo de si la URL es /login o /formfill
    const [isLoginView, setIsLoginView] = useState(() => {
        return location.pathname === '/login';
    });
    
    // Si la ruta cambia desde el Navbar (LandingPage), forzar sync
    useEffect(() => {
        setIsLoginView(location.pathname === '/login');
    }, [location.pathname]);

    return (
        <div className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-xl bg-neutral-900/50 border border-neutral-800 rounded-lg p-6 md:p-8 shadow-xl">
                
                {/* Título dinámico que no recarga todo */}
                <h1 className="font-bold text-white mb-6 text-3xl text-center tracking-tight">
                    {isLoginView ? "Iniciar Sesión" : "Crear cuenta"}
                </h1>
                
                {/* Contenedor estático, contenido dinámico */}
                <div className="w-full flex justify-center">
                   {isLoginView ? <Login /> : <Registro />}
                </div>
                
                {/* Swapper Link sin Router */}
                <div className="mt-6 text-center text-sm text-neutral-400">
                    {isLoginView ? (
                        <p>
                            ¿No tienes cuenta?{" "}
                            <button 
                                type="button" 
                                onClick={() => setIsLoginView(false)} 
                                className="text-red-500 hover:text-red-400 font-medium ml-1 cursor-pointer outline-none"
                            >
                                Regístrate
                            </button>
                        </p>
                    ) : (
                        <p>
                            ¿Ya tienes cuenta?{" "}
                            <button 
                                type="button" 
                                onClick={() => setIsLoginView(true)} 
                                className="text-red-500 hover:text-red-400 font-medium ml-1 cursor-pointer outline-none"
                            >
                                Inicia sesión
                            </button>
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}