import Button from "../components/button/button.tsx"
import {Link} from "react-router-dom"

export default function formularioRegistro(){

    return(
        <form className="flex flex-col gap-2 w-full md:w-md lg:w-xl">
                        <div className="flex flex-col">
                            <label htmlFor="" className="opacity-70">Nombres</label>
                            <div className="md:flex md:justify-between md:gap-2">
                                <input type="text"  className="bg-stone-800 border border-lime-900 focus:border-double focus:border-lime-300 h-8 mb-2 md:w-md w-full" placeholder="Primer nombre"/>
                                <input type="text"  className="bg-stone-800 border border-lime-900 focus:border-double focus:border-lime-300 h-8 md:w-md w-full" placeholder="Primer apellido"/>
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
        </form>
    )
}

export function Login(){
    return(
        <form className="flex flex-col gap-2 w-full">
                        <div className="flex flex-col">
                            <label htmlFor="" className="opacity-70">Email</label>
                            <input type="email" required className="bg-stone-800 border border-lime-900 focus:border-double focus:border-lime-300 h-8" placeholder="@example.com"/>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="" className="opacity-70">Contraseña</label>
                            <input type="password" required className="bg-stone-800 border border-lime-900 focus:border-md focus:border-graylime h-8"/>
                        </div>
                        
                        <div className="flex md:justify-end mt-2">
                            <Button accion="Iniciar Sesion" tipo="submit"/>
                        </div>
        </form>
    )
}