package com.example.back_end.rutina.dto;

import java.time.LocalDate;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProgresoRutinaResponse {
    private LocalDate fecha;
    private int ejerciciosTotales;
    private int ejerciciosCompletados;
    private List<Integer> ejerciciosCompletadosIds;
    private int porcentaje;
    private boolean cumplioMeta;
    private boolean diaPerfecto;
    private int rachaActual;
}
