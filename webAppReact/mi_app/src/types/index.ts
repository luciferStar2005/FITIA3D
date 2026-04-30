export interface PlanHoyData {
  id: number;
  nombre: string;
  repeticiones: number;
  series: number;
}

export interface TrainingRecord {
  id: number;
  ejercicio: string;
  series: number;
  repeticiones: number;
  peso: number;
  tiempo: number;
  fecha: string;
}