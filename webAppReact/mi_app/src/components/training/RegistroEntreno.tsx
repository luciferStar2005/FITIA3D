import { useState } from "react";
import type { TrainingRecord } from "../../types";
import { saveTraining } from "../../data/trainingStorage";

type Props = {
  onTrainingSaved: () => void;
};

export default function RegistroEntreno({ onTrainingSaved }: Props) {
  const [form, setForm] = useState({
    ejercicio: "",
    series: "",
    repeticiones: "",
    peso: "",
    tiempo: "",
    fecha: new Date().toISOString().slice(0, 10),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.ejercicio.trim()) {
      alert("Escribe un ejercicio");
      return;
    }

    const nuevoRegistro: TrainingRecord = {
      id: Date.now(),
      ejercicio: form.ejercicio,
      series: Number(form.series),
      repeticiones: Number(form.repeticiones),
      peso: Number(form.peso),
      tiempo: Number(form.tiempo),
      fecha: form.fecha,
    };

    saveTraining(nuevoRegistro);

    setForm({
      ejercicio: "",
      series: "",
      repeticiones: "",
      peso: "",
      tiempo: "",
      fecha: new Date().toISOString().slice(0, 10),
    });

    onTrainingSaved();
  };

  return (
    <div className="bg-neutral-800 p-6 rounded-lg">
      <h2 className="text-2xl font-bold text-white mb-5">
        Registrar entrenamiento
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        <input
          name="ejercicio"
          value={form.ejercicio}
          onChange={handleChange}
          placeholder="Ejercicio"
          className="bg-neutral-700 rounded p-3 outline-none"
        />

        <input
          name="series"
          type="number"
          value={form.series}
          onChange={handleChange}
          placeholder="Series"
          className="bg-neutral-700 rounded p-3 outline-none"
        />

        <input
          name="repeticiones"
          type="number"
          value={form.repeticiones}
          onChange={handleChange}
          placeholder="Repeticiones"
          className="bg-neutral-700 rounded p-3 outline-none"
        />

        <input
          name="peso"
          type="number"
          value={form.peso}
          onChange={handleChange}
          placeholder="Peso (kg)"
          className="bg-neutral-700 rounded p-3 outline-none"
        />

        <input
          name="tiempo"
          type="number"
          value={form.tiempo}
          onChange={handleChange}
          placeholder="Tiempo (min)"
          className="bg-neutral-700 rounded p-3 outline-none"
        />

        <input
          name="fecha"
          type="date"
          value={form.fecha}
          onChange={handleChange}
          className="bg-neutral-700 rounded p-3 outline-none"
        />

        <button
          type="submit"
          className="bg-lime-500 hover:bg-lime-400 text-black font-bold rounded p-3 col-span-1 md:col-span-2 lg:col-span-3 cursor-pointer transition"
        >
          Guardar entrenamiento
        </button>
      </form>
    </div>
  );
}