import { useState } from "react"
import Registro from "./formularios"
import {Login} from "./formularios"
export default function ventanaAcceso(){
    const [active, setActive] = useState('registro');

    return(
        <div className="relative min-h-screen overflow-hidden bg-neutral-950 flex items-center justify-center">
            <div className="fixed -inset-10 flex justify-center m-2 bg-gradient-to-br from-red-500/15 to-lime-900/15 blur-3xl" />
               <div className="relative z-10 bg-stone-500/15 p-2 border border-white/20 backdrop-blur-xl">
                    <div className="mt-8 mb-8">
                    <div className="flex items-center justify-center">
                        <div className="relative flex bg-neutral-900 p-1 rounded-full border border-white/5">
                    
                        <div 
                            className={`absolute h-[calc(100%-8px)] w-[calc(50%-4px)] bg-red-600 rounded-full transition-all duration-300 ease-in-out top-1
                            ${active === 'registro' ? 'left-1' : 'left-[50%]'}
                            `}
                        />
                    <button 
                        type="button" 
                        onClick={() => setActive('registro')}
                        className={`relative z-10 px-8 py-1.5 cursor-pointer text-sm font-medium transition-colors duration-300
                        ${active === 'registro' ? 'text-white' : 'text-neutral-400'}
                        `}
                    >
                        Registro
                    </button>

                    <button 
                        type="button" 
                        onClick={() => setActive('login')}
                        className={`relative z-10 px-8 py-1.5 cursor-pointer text-sm font-medium transition-colors duration-300
                        ${active === 'login' ? 'text-white' : 'text-neutral-400'}
                        `}
                    >
                        Login
                    </button>

                    </div>
                    </div>
                </div>
                    {active === 'registro' ? (
                        <div className="animate-in fade-in slide-in-from-left-4 duration-300">
                            <h1 className="font-bold mr-2 ml-0 mt-2 mb-2 text-3xl md:text-2xl">Listo para empezar?</h1>
                            <Registro />
                        </div>
                    ): (
                        <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                            <Login />
                        </div>
                    ) }
               </div>
        </div>
        
    )
}