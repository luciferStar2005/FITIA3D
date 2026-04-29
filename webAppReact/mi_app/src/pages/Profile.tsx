import { useState } from "react";
import { Navbar } from "../components/Nav/Navbar.tsx";
import ProfileEditForm from "../components/ProfileEditForm/ProfileEditForm";
import "../styles/Profile.css";

import { perfilData as initialPerfil, rachaData as racha } from "../data/mockData";
import { calcularIMC } from "../utils/helpers";

const diasSemana = ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"];
const hoy = new Date().toISOString().slice(0, 10);

type EditableProfileData = {
  nombre: string;
  email: string;
  peso: string;
  altura: string;
  edad: string;
};

export default function Profile() {
  const [perfil, setPerfil] = useState(initialPerfil);
  const [isEditing, setIsEditing] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const currentProfile = perfil[0];
  const imc = calcularIMC(currentProfile.peso, currentProfile.altura);
  const completedDays = racha.filter((item) => item.completado).length;
  const completionPercent = Math.round((completedDays / racha.length) * 100);
  const initials = currentProfile.nombre
    .split(" ")
    .map((name) => name[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const handleSave = (data: EditableProfileData) => {
    const updatedPerfil = [...perfil];
    updatedPerfil[0] = { ...updatedPerfil[0], ...data };
    setPerfil(updatedPerfil);
    setIsEditing(false);
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setAvatarPreview(URL.createObjectURL(file));
  };

  return (
    <>
      <Navbar />
      <main className="profile-page min-h-screen px-4 pb-10 pt-24 md:px-8 lg:pt-16">
        {isEditing ? (
          <div className="profile-edit-shell">
            <ProfileEditForm
              initialData={{
                nombre: currentProfile.nombre,
                email: currentProfile.email,
                peso: currentProfile.peso,
                altura: currentProfile.altura,
                edad: currentProfile.edad,
              }}
              onSave={handleSave}
              onCancel={() => setIsEditing(false)}
            />
          </div>
        ) : (
          <div className="profile-grid">
            <section className="profile-hero profile-panel">
              <button
                onClick={() => setIsEditing(true)}
                className="profile-edit-button"
                title="Editar perfil"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                  <path d="M2.695 14.763l-1.262 3.154a.5.5 0 0 0 .65.65l3.155-1.262a4 4 0 0 0 1.343-.885L17.5 5.5a2.121 2.121 0 0 0-3-3L3.58 13.42a4 4 0 0 0-.885 1.343Z" />
                </svg>
                <span>Editar</span>
              </button>

              <div className="profile-avatar-wrap">
                <div className="profile-avatar" aria-label="Foto de perfil">
                  {avatarPreview ? (
                    <img src={avatarPreview} alt={`Foto de ${currentProfile.nombre}`} />
                  ) : (
                    <span>{initials}</span>
                  )}
                </div>

                <label className="upload-action" title="Subir foto de perfil">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    aria-label="Subir foto de perfil"
                  />
                  <span className="upload-icon" aria-hidden="true">
                    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="32" cy="32" r="29" />
                      <path d="M32 43V18" />
                      <path d="M22 28L32 18L42 28" />
                      <path d="M18 38V47H46V38" />
                    </svg>
                  </span>
                </label>
              </div>

              <div className="profile-copy">
                <p className="profile-kicker">Perfil activo</p>
                <h1>{currentProfile.nombre}</h1>
                <p>{currentProfile.email}</p>
              </div>

              <div className="profile-progress">
                <div>
                  <span>Racha semanal</span>
                  <strong>{completionPercent}%</strong>
                </div>
                <div className="progress-track">
                  <span style={{ width: `${completionPercent}%` }} />
                </div>
              </div>
            </section>

            <section className="profile-panel profile-info">
              <div className="panel-heading">
                <p>Resumen</p>
                <h2>Info adicional</h2>
              </div>

              <div className="profile-stats">
                {[
                  { label: "Peso", valor: `${currentProfile.peso} kg` },
                  { label: "Estatura", valor: `${currentProfile.altura} m` },
                  { label: "Edad", valor: `${currentProfile.edad} anos` },
                  { label: "IMC", valor: imc },
                ].map(({ label, valor }) => (
                  <div className="stat-card" key={label}>
                    <h3>{label}</h3>
                    <span>{valor}</span>
                  </div>
                ))}
              </div>

              <div className="streak-section">
                <div className="panel-heading compact">
                  <p>{completedDays} de {racha.length} dias completos</p>
                  <h2>Racha</h2>
                </div>

                <div className="streak-list">
                  {racha.map((item) => {
                    const esHoy = item.fecha === hoy;
                    const esFuturo = item.fecha > hoy;
                    const diaSemana = diasSemana[new Date(item.fecha + "T12:00:00").getDay()];
                    const diaMes = item.fecha.slice(8, 10);
                    const statusClass = esFuturo
                      ? "future"
                      : item.completado
                        ? "done"
                        : "rest";

                    return (
                      <div
                        key={item.fecha}
                        className={`streak-day ${statusClass} ${esHoy ? "today" : ""}`}
                      >
                        {esHoy && <span className="today-badge">hoy</span>}

                        <div className="streak-dot">
                          {item.completado ? (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                              <path fillRule="evenodd" d="M12.963 2.286a.75.75 0 0 0-1.071-.136 9.742 9.742 0 0 0-3.539 6.176 7.547 7.547 0 0 1-1.705-1.715.75.75 0 0 0-1.152-.082A9 9 0 1 0 15.68 4.534a7.46 7.46 0 0 1-2.717-2.248ZM15.75 14.25a3.75 3.75 0 1 1-7.313-1.172c.628.465 1.35.81 2.133 1a5.99 5.99 0 0 1 1.925-3.546 3.75 3.75 0 0 1 3.255 3.718Z" clipRule="evenodd" />
                            </svg>
                          ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM7.5 12a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM18.894 6.166a.75.75 0 0 0-1.06-1.06l-1.591 1.59a.75.75 0 1 0 1.06 1.061l1.591-1.59ZM21.75 12a.75.75 0 0 1-.75.75h-2.25a.75.75 0 0 1 0-1.5H21a.75.75 0 0 1 .75.75ZM17.834 18.894a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 1 0-1.061 1.06l1.59 1.591ZM12 18a.75.75 0 0 1 .75.75V21a.75.75 0 0 1-1.5 0v-2.25A.75.75 0 0 1 12 18ZM7.758 17.303a.75.75 0 0 0-1.061-1.06l-1.591 1.59a.75.75 0 0 0 1.06 1.061l1.591-1.59ZM6 12a.75.75 0 0 1-.75.75H3a.75.75 0 0 1 0-1.5h2.25A.75.75 0 0 1 6 12ZM6.697 7.757a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 0 0-1.061 1.06l1.59 1.591Z" />
                            </svg>
                          )}
                        </div>

                        <span>{diaSemana}</span>
                        <small>{diaMes}</small>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          </div>
        )}
      </main>
    </>
  );
}
