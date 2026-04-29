import type { PlanHoyData } from '../types';

export const planHoyData: PlanHoyData[] = [
    { id: 1, nombre: "sentadilla", series: 4, repeticiones: 12 },
    { id: 2, nombre: "press de banca", series: 4, repeticiones: 10 },
    { id: 3, nombre: "peso muerto", series: 4, repeticiones: 8 },
    { id: 4, nombre: "dominadas", series: 4, repeticiones: 6 },
    { id: 5, nombre: "curl de bíceps", series: 3, repeticiones: 15 },
    { id: 6, nombre: "extensiones de tríceps", series: 3, repeticiones: 15 }
];

export const kaloriasData ={
    caloriasTotales: 500
};

export const metasData = [
    { id: 1, nombre: "Perder peso", actual: 70, meta: 70 },
    { id: 2, nombre: "Ganar músculo", actual: 20, meta: 30 },
    { id: 3, nombre: "Mejorar resistencia", actual: 5, meta: 10 }
];

export const progresoData = [
    { semana: 'Semana 1', peso: 80 },
    { semana: 'Semana 2', peso: 78 },
    { semana: 'Semana 3', peso: 77 },
    { semana: 'Semana 4', peso: 75 },
    { semana: 'Semana 5', peso: 74 },
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
