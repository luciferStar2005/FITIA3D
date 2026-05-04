import type { PlanHoyData } from '../types';

export const planHoyData: PlanHoyData[] = [
  { id: 1, nombre: "sentadilla", series: 4, repeticiones: 12 },
  { id: 2, nombre: "press de banca", series: 4, repeticiones: 10 },
  { id: 3, nombre: "peso muerto", series: 4, repeticiones: 8 },
  { id: 4, nombre: "dominadas", series: 4, repeticiones: 6 },
  { id: 5, nombre: "curl de bíceps", series: 3, repeticiones: 15 },
  { id: 6, nombre: "extensiones de tríceps", series: 3, repeticiones: 15 }
];

export const perfilData = [
  {
    id: "1",
    nombre: "Juan Perez",
    email: "example@gmail.com",
    peso: "70",
    altura: "1.75",
    edad: "30",
  },
];

export const rachaData = [
  { fecha: "2026-04-07", completado: true },
  { fecha: "2026-04-08", completado: true },
  { fecha: "2026-04-09", completado: true },
  { fecha: "2026-04-10", completado: true },
  { fecha: "2026-04-11", completado: false },
  { fecha: "2026-04-12", completado: true },
  { fecha: "2026-04-13", completado: true },
];
