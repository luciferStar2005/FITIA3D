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
public class FinalizarRutinaRequest {
    private LocalDate fecha;
    private List<Integer> ejerciciosCompletados;
}
