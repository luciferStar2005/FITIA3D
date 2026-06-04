import { useState } from "react";
import Button from "../Button/Button";

interface ProfileData {
  nombre: string;
  email: string;
  peso: string;
  altura: string;
  edad: string;
}

interface ProfileEditFormProps {
  initialData: ProfileData;
  onSave: (data: ProfileData) => void;
  onCancel: () => void;
}

export default function ProfileEditForm({ initialData, onSave, onCancel }: ProfileEditFormProps) {
  const [formData, setFormData] = useState<ProfileData>(initialData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full bg-neutral-800 p-4 rounded-lg border border-neutral-800/50 shadow-lg">
      <h2 className="text-xl font-bold text-white mb-2">Modificar Perfil</h2>

      <div className="flex flex-col">
        <label className="opacity-70 text-sm mb-1 text-white">Nombre completo</label>
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
          className="bg-neutral-900 border border-neutral-800 focus:border-double focus:border-neutral-500 h-8 px-2 text-white outline-none rounded transition-all"
        />
      </div>

      <div className="flex flex-col">
        <label className="opacity-70 text-sm mb-1 text-white">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="bg-neutral-900 border border-neutral-800 focus:border-double focus:border-neutral-500 h-8 px-2 text-white outline-none rounded transition-all"
        />
      </div>

      <div className="flex flex-col md:flex-row gap-3">
        <div className="flex flex-col w-full">
          <label className="opacity-70 text-sm mb-1 text-white">Peso (kg)</label>
          <input
            type="number"
            step="0.1"
            name="peso"
            value={formData.peso}
            onChange={handleChange}
            required
            className="bg-neutral-900 border border-neutral-800 focus:border-double focus:border-neutral-500 h-8 px-2 text-white outline-none rounded transition-all"
          />
        </div>

        <div className="flex flex-col w-full">
          <label className="opacity-70 text-sm mb-1 text-white">Estatura (metros)</label>
          <input
            type="number"
            step="0.01"
            name="altura"
            value={formData.altura}
            onChange={handleChange}
            required
            className="bg-neutral-900 border border-neutral-800 focus:border-double focus:border-neutral-500 h-8 px-2 text-white outline-none rounded transition-all"
          />
        </div>

        <div className="flex flex-col w-full">
          <label className="opacity-70 text-sm mb-1 text-white">Edad</label>
          <input
            type="number"
            name="edad"
            value={formData.edad}
            onChange={handleChange}
            required
            className="bg-neutral-900 border border-neutral-800 focus:border-double focus:border-neutral-500 h-8 px-2 text-white outline-none rounded transition-all"
          />
        </div>
      </div>

      <div className="flex justify-end gap-2 mt-4 items-center">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-1.5 text-sm bg-neutral-700 hover:bg-neutral-600 text-white rounded transition-colors cursor-pointer"
        >
          Cancelar
        </button>
        <Button accion="Guardar cambios" tipo="submit" />
      </div>
    </form>
  );
}
