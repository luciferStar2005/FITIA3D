import { useState } from "react"
import Button from "../components/button/button.tsx"
import {Link} from "react-router-dom"
export default function registro(){
    const [valid, setValid]=useState();
    const validar=()=>{

    }
    return(
        <div className="relative h-screen overflow-hidden bg-neutral-950 flex items-center justify-center">
            <div className="absolute -inset-10 flex justify-center m-2 bg-gradient-to-br from-red-500/15 to-lime-900/15 blur-3xl" />
                <div className="relative z-10 bg-stone-500/15 p-2 border border-white/20 backdrop-blur-xl">
                    <h1 className="font-bold mr-2 ml-0 mt-2 mb-2 text-3xl md:text-2xl">Listo para empezar?</h1>
                    <form className="flex flex-col gap-2 w-sm md:w-md lg:w-xl">
                        <div className="flex flex-col">
                            <label htmlFor="" className="opacity-70">Nombres</label>
                            <div className="md:flex md:justify-between md:gap-2">
                                <input type="text"  className="bg-stone-800 border border-lime-900 focus:border-double focus:border-lime-300 h-8 mb-2 md:w-md w-sm" placeholder="Primer nombre"/>
                                <input type="text"  className="bg-stone-800 border border-lime-900 focus:border-double focus:border-lime-300 h-8 md:w-md w-sm" placeholder="Primer apellido"/>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="" className="opacity-70">Email</label>
                            <input type="email" required className="bg-stone-800 border border-lime-900 focus:border-double focus:border-lime-300 h-8" placeholder="@example.com"/>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="" className="opacity-70">Contraseña</label>
                            <input type="password" required className="bg-stone-800 border border-lime-900 focus:border-md focus:border-graylime h-8"/>
                            <div>
                                <p>

                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="" className="opacity-70">Confirmar contraseña</label>
                            <input type="password" required className="bg-stone-800 border border-lime-900 focus:border-md focus:border-graylime h-8"/>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="" className="opacity-70">Estatura (cm)</label>
                            <input type="number" required className="bg-stone-800 border border-lime-900 focus:border-md focus:border-graylime h-8"/>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="" className="opacity-70">Peso (kg)</label>
                            <input type="number" required className="bg-stone-800 border border-lime-900 focus:border-md focus:border-graylime h-8"/>
                        </div>
                        <div className="flex flex-col">
                            <label className="opacity-70">Fecha de nacimiento</label>
                            <input type="date" className="bg-stone-800 border border-lime-900 focus:border-md focus:border-graylime h-8"/>
                        </div>
                        <div className="flex flex-col">
                            <div>
                                <label className="font-bold text-gray-400 mb-2 mr-2">Política de privacidad</label>
                                <input type="checkbox"/>
                            </div>
                            <div>
                                <label className="font-bold text-gray-400 mb-2 mr-2">Terminos y condiciones</label>
                                <input type="checkbox"/>
                            </div> 
                        </div>
                        
                        <div className="flex md:justify-end">
                            <Button accion="Registrarse" tipo="submit"/>
                        </div>
                        <p className="text-center">¿Ya tienes una cuenta? <Link to="/login"><i className="hover:underline text-red-500">Inicia sesion</i></Link></p>
                    </form>
                </div>

        </div>
        
    )
}