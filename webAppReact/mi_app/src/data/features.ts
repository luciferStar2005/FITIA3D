export interface Tarjeta {
  id: string;
  numero: string;
  titulo: string;
  descripcion: string;
}

export const featuresData: Tarjeta[] = [
    {
    id: '1',
    numero: '01',
    titulo: 'RUTINAS CON IA',
    descripcion: 'Gemini analiza tu perfil y genera una rutina semanal única. Si la IA falla, una plantilla de calidad te respalda.'
  },

  {
    id: '2',
    numero: '02',
    titulo: 'CUERPO 3D INTERACTIVO',
    descripcion: 'Toca el músculo que quieres trabajar en el modelo 3D. Sin términos técnicos, perfecto para principiantes.'
  },

  {
    id: '3',
    numero: '03',
    titulo: 'RACHA DIARIA',
    descripcion: 'Sistema de streak para mantenerte consistente. Gráficas de barras para visualizar tu progreso día a día.'
  },

  {
    id: '4',
    numero: '04',
    titulo: 'PLANIFICADOR SEMANAL',
    descripcion: 'Organiza tu semana y recibe recordatorios vía navegador. Sin apps extra, sin fricción.'
  },

  {
    id: '5',
    numero: '05',
    titulo: 'SEGUIMIENTO DE PROGRESO',
    descripcion: 'Registra cada sesión y observa tu evolución. Datos concretos, gráficas claras.'

  },

    {
    id: '6',
    numero: '06',
    titulo: 'PERFIL Y OBJETIVO',
    descripcion: 'Configura metas, equipo disponible y ajusta tu perfil cuando cambien tus circunstancias.'
    }
];