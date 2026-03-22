let list=[
{
    "id": 1,
    "titulo": "Press de Banca",
    "musculo": "Pecho",
    "series": 4,
    "reps": "12",
    "imagen": "https://link-a-tu-imagen.com/bench.jpg",
    "dificultad": "Intermedio"
  },
  {
    "id": 2,
    "titulo": "Sentadilla Búlgara",
    "musculo": "Pierna",
    "series": 3,
    "reps": "10 por pierna",
    "imagen": "https://link-a-tu-imagen.com/bulgarian.jpg",
    "dificultad": "Avanzado"
  },
  {
    "id": 3,
    "titulo": "Plancha Abdominal",
    "musculo": "Core",
    "series": 3,
    "reps": "45 segundos",
    "imagen": "https://link-a-tu-imagen.com/plank.jpg",
    "dificultad": "Principiante"
  },
  {
    "id": 4,
    "titulo": "Plancha Abdominal",
    "musculo": "Core",
    "series": 3,
    "reps": "45 segundos",
    "imagen": "https://link-a-tu-imagen.com/plank.jpg",
    "dificultad": "Principiante"
  },
  {
    "id": 5,
    "titulo": "Sentadilla Búlgara",
    "musculo": "Pierna",
    "series": 3,
    "reps": "10 por pierna",
    "imagen": "https://link-a-tu-imagen.com/bulgarian.jpg",
    "dificultad": "Avanzado"
  },
  {
    "id": 6,
    "titulo": "Sentadilla Búlgara",
    "musculo": "Pierna",
    "series": 3,
    "reps": "10 por pierna",
    "imagen": "https://link-a-tu-imagen.com/bulgarian.jpg",
    "dificultad": "Avanzado"
  }
]

const content=document.getElementById("plans")

const showList=(list)=>{
    content.innerHTML=list.map(p=>
        `<div class="card card-premium flex-shrink-0 min-vw-25 mx-2 p-3 text-white">
                <div class="card-body d-flex justify-content-between align-items-center">
                    <div class="me-3">
                        <h5 class="card-title text-uppercase" >${p.titulo}</h5>
                        <h6 class="card-subtitle mb-2 text-white-50">${p.musculo}</h6>
                        <p class="card-text">
                            <strong>Series:</strong> ${p.series}<br>
                            <strong>Repeticiones:</strong> ${p.reps}
                        </p>
                    </div>
                        <a href="#" class="btn btn-danger rounded-5 "><i class="bi bi-play-circle fs-4"></i></a>
                </div>
        </div>`
    ).join('')
}

showList(list)


const ctx = document.getElementById('myChart').getContext('2d');

const myChart = new Chart(ctx, {
    type: 'line', // Puede ser 'line', 'pie', 'doughnut'
    data: {
        labels: ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'],
        datasets: [{
            label: 'Calorías Quemadas',
            data: [1200, 1900, 3000, 500, 2000, 2300, 1500],
            backgroundColor: '#508c67',
            borderColor: '#508c67',
            borderWidth: 2,
            borderRadius: 5 
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        },
        plugins: {
            legend: {
                display: false // Ocultar la leyenda para un look más limpio
            }
        }
    }
});


let metas=[
    {
    "id": "meta_001",
    "titulo": "Quema Calórica Semanal",
    "icono": "bi-fire",
    "color": "warning",
    "valorActual": 1250,
    "valorObjetivo": 5000,
    "unidad": "kcal",
    "categoria": "Salud",
    "fechaLimite": "2026-03-29"
  },
  {
    "id": "meta_002",
    "titulo": "Consumo de Agua Diario",
    "icono": "bi-droplet-fill",
    "color": "info",
    "valorActual": 1.5,
    "valorObjetivo": 3.0,
    "unidad": "Litros",
    "categoria": "Nutrición",
    "fechaLimite": "2026-03-22"
  },

  {
    "id": "meta_003",
    "titulo": "Asistencia Perfecta",
    "descripcion": "Ir al gimnasio 5 días a la semana",
    "icono": "bi-calendar-check",
    "completado": false,
    "diasLogrados": 3,
    "totalDias": 5,
    "recompensa": "Cheat meal permitido"
  },

  {
    "id": "meta_004",
    "titulo": "Récord en Press de Banca",
    "icono": "bi-trophy",
    "pesoAnterior": 60,
    "pesoObjetivo": 80,
    "unidad": "kg",
    "dificultad": "Alta",
    "estado": "En progreso"
  },

  {
    "id": "meta_004",
    "titulo": "Récord en Press de Banca",
    "icono": "bi-trophy",
    "pesoAnterior": 60,
    "pesoObjetivo": 80,
    "unidad": "kg",
    "dificultad": "Alta",
    "estado": "En progreso"
  }
]

const meta=document.getElementById("metaContent")

const showMetas=(metas)=>{
    meta.innerHTML = metas.map(m => {
        const porcentaje = Math.round((m.valorActual / m.valorObjetivo) * 100);
        
        return `
        <div class="text-white  card card-premium flex-shrink-0 mx-2 p-3 mb-3" 
             style="background-color: #2a2e2b;">
            <div class="card-body p-1">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <div class="bg-${m.color} bg-opacity-10 p-2 rounded-circle">
                        <i class="bi ${m.icono} text-${m.color} fs-4"></i>
                    </div>
                    <span class="badge rounded-pill bg-dark border border-secondary">${porcentaje}%</span>
                </div>
                
                <h6 class="text-uppercase fw-bold mb-1" style="font-size: 0.85rem;">${m.titulo}</h6>
                <p class="text-white-50 small mb-3">
                    ${m.valorActual} / ${m.valorObjetivo} ${m.unidad}
                </p>
                <div class="progress bg-secondary bg-opacity-25" style="height: 6px;">
                    <div class="progress-bar bg-${m.color}" 
                         role="progressbar" 
                         style="width: ${porcentaje}%" 
                         aria-valuenow="${porcentaje}" 
                         aria-valuemin="0" 
                         aria-valuemax="100">
                    </div>
                </div>
            </div>
        </div>
        `;
    }).join('');
}

showMetas(metas)


