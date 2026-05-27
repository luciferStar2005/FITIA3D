export interface PlanHoyData {
    id: number;
    nombre: string;
    repeticiones: number | string;
    series: number | string;
}

export interface ProgresoRutinaData {
    fecha: string;
    ejerciciosTotales: number;
    ejerciciosCompletados: number;
    ejerciciosCompletadosIds: number[];
    porcentaje: number;
    cumplioMeta: boolean;
    diaPerfecto: boolean;
    rachaActual: number;
}
