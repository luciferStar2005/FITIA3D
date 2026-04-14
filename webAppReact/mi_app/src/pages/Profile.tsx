import { Navbar } from "../components/NavBar/Navbar.tsx";

const perfil = [
  {
    id: "1",
    nombre: "Juan Perez",
    email: "example@gmail.com",
    peso: "70",
    altura: "1.75",
    edad: "30",
  },
];

const racha = [
  { fecha: "2026-04-07", completado: true },
  { fecha: "2026-04-08", completado: true },
  { fecha: "2026-04-09", completado: true },
  { fecha: "2026-04-10", completado: true },
  { fecha: "2026-04-11", completado: false },
  { fecha: "2026-04-12", completado: true },
  { fecha: "2026-04-13", completado: true },
];

const diasSemana = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

const hoy = new Date().toISOString().slice(0, 10);

let calcularIMC = (peso: string, altura: string) => {
  let peso1: number = Number(peso);
  let altura1: number = Number(altura);
  if (!altura) return 0;
  return (peso1 / (altura1 * altura1)).toFixed(2);
};

export default function Profile() {
  return (
    <>
      <Navbar />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 auto-rows-min gap-4 m-4 md:m-8 min-h-screen pt-20 lg:pt-10">
        {/* Tarjeta perfil */}
        <div className="flex flex-col items-center bg-neutral-800 p-4 rounded-lg">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4 text-white">{perfil[0].nombre}</h2>
            <i>{perfil[0].email}</i>
          </div>
          <div className="w-50 h-50 bg-orange-500 rounded-full mt-4 mb-4" />
        </div>

        {/* Tarjeta info */}
        <div className="bg-neutral-800 p-4 rounded-lg">
          <h2 className="text-2xl font-bold mb-4 text-white">Info adicional</h2>
          <div className="flex justify-between">
            {[
              { label: "Peso", valor: `${perfil[0].peso} kg` },
              { label: "Estatura", valor: `${perfil[0].altura} m` },
              { label: "Edad", valor: `${perfil[0].edad} años` },
              { label: "IMC", valor: calcularIMC(perfil[0].peso, perfil[0].altura) },
            ].map(({ label, valor }) => (
              <div key={label}>
                <h3 className="font-bold">{label}</h3>
                <span className="opacity-50">{valor}</span>
              </div>
            ))}
          </div>

          <hr className="my-4" />


          <div>
            <h2 className="text-white font-bold mb-3">Racha</h2>
            <div className="flex justify-between items-end gap-1 px-2">
              {racha.map((item) => {
                const esHoy = item.fecha === hoy;
                const esFuturo = item.fecha > hoy;
                const diaSemana = diasSemana[new Date(item.fecha + "T12:00:00").getDay()];
                const diaMes = item.fecha.slice(8, 10);


                const size = esHoy ? "w-14 h-14" : "w-9 h-9";
                const iconSize = esHoy ? "size-7" : "size-4";

                const circleBg = esFuturo
                  ? "bg-neutral-700"
                  : item.completado
                  ? esHoy
                    ? "bg-red-500 ring-2 ring-red-400 ring-offset-2 ring-offset-neutral-800"
                    : "bg-red-700"
                  : "bg-blue-900";

                // Opacidad del día
                const opacidad = esFuturo ? "opacity-30" : esHoy ? "opacity-100" : "opacity-75";

                return (
                  <div
                    key={item.fecha}
                    className={`flex flex-col items-center gap-1 transition-all ${opacidad}`}
                  >
                    {/* Badge "hoy" */}
                    {esHoy && (
                      <span className="text-[10px] bg-red-500/20 text-red-400 rounded px-1.5 py-0.5 leading-none">
                        hoy
                      </span>
                    )}

                    <div
                      className={`${size} ${circleBg} rounded-full flex items-center justify-center`}
                    >
                      {item.completado ? (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={iconSize}>
                          <path fillRule="evenodd" d="M12.963 2.286a.75.75 0 0 0-1.071-.136 9.742 9.742 0 0 0-3.539 6.176 7.547 7.547 0 0 1-1.705-1.715.75.75 0 0 0-1.152-.082A9 9 0 1 0 15.68 4.534a7.46 7.46 0 0 1-2.717-2.248ZM15.75 14.25a3.75 3.75 0 1 1-7.313-1.172c.628.465 1.35.81 2.133 1a5.99 5.99 0 0 1 1.925-3.546 3.75 3.75 0 0 1 3.255 3.718Z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={iconSize}>
                          <path d="M12 2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM7.5 12a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM18.894 6.166a.75.75 0 0 0-1.06-1.06l-1.591 1.59a.75.75 0 1 0 1.06 1.061l1.591-1.59ZM21.75 12a.75.75 0 0 1-.75.75h-2.25a.75.75 0 0 1 0-1.5H21a.75.75 0 0 1 .75.75ZM17.834 18.894a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 1 0-1.061 1.06l1.59 1.591ZM12 18a.75.75 0 0 1 .75.75V21a.75.75 0 0 1-1.5 0v-2.25A.75.75 0 0 1 12 18ZM7.758 17.303a.75.75 0 0 0-1.061-1.06l-1.591 1.59a.75.75 0 0 0 1.06 1.061l1.591-1.59ZM6 12a.75.75 0 0 1-.75.75H3a.75.75 0 0 1 0-1.5h2.25A.75.75 0 0 1 6 12ZM6.697 7.757a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 0 0-1.061 1.06l1.59 1.591Z" />
                        </svg>
                      )}
                    </div>

                    <span className={`text-[11px] ${esHoy ? "text-white font-medium" : "text-gray-500"}`}>
                      {diaSemana}
                    </span>
                    <span className={`text-[10px] ${esHoy ? "text-gray-300" : "text-gray-600"}`}>
                      {diaMes}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}