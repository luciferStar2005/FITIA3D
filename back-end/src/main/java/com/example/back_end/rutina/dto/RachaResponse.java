package com.example.back_end.rutina.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RachaResponse {
    private int rachaActual;
    private LocalDate calculadaHasta;
}
