package com.example.back_end.rutina.progreso.dto;

import lombok.Data;

@Data
public class ProgresoRequest {

    private Integer ejerciciosTotales;

    private Integer ejerciciosCompletados;

    private Integer porcentaje;

    private Boolean rachaValida;

    private String fecha; 
}