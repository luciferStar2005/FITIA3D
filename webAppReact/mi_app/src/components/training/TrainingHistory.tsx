import type { TrainingRecord } from "../../types";

type Props = {
  trainings: TrainingRecord[];
};

export default function HistorialEntrenos({ trainings }: Props) {
  return (
    <div className="bg-neutral-800 p-6 rounded-lg h-full">
      <h2 className="text-2xl font-bold text-white mb-5">
        Historial
      </h2>

      {trainings.length === 0 ? (
        <p className="text-gray-400">
          No has registrado entrenamientos todavía.
        </p>
      ) : (
        <div className="space-y-3 max-h-[450px] overflow-y-auto pr-2">
          {trainings
            .slice()
            .reverse()
            .map((training) => (
              <div
                key={training.id}
                className="bg-neutral-700 rounded-lg p-4"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-bold text-lg text-lime-400">
                    {training.ejercicio}
                  </h3>

                  <span className="text-sm text-gray-300">
                    {training.fecha}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-3 text-sm">
                  <div>
                    <span className="text-gray-400">Series</span>
                    <p>{training.series}</p>
                  </div>

                  <div>
                    <span className="text-gray-400">Reps</span>
                    <p>{training.repeticiones}</p>
                  </div>

                  <div>
                    <span className="text-gray-400">Peso</span>
                    <p>{training.peso} kg</p>
                  </div>

                  <div>
                    <span className="text-gray-400">Tiempo</span>
                    <p>{training.tiempo} min</p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}