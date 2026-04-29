interface BotonProps {
    accion: string;
    tipo: "submit" | "reset" | "button";
}

export default function Boton({ accion, tipo }: BotonProps) {
    const style = () => {
        if (tipo === "submit") {
            return "w-full bg-red-600 rounded-md hover:bg-red-800 p-2 cursor-pointer md:w-3xs"
        } else if (tipo === "reset") {
            return "w-full bg-yellow-600 rounded-md hover:bg-yellow-800 p-2 cursor-pointer md:w-3xs"
        } else {
            return "w-full bg-red-600 rounded-md hover:bg-red-800 p-2 cursor-pointer md:w-3xs"
        }
    }
    return (
        <button type={tipo} className={`${style()}`}>{accion}</button>
    )
}