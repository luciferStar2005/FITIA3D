package com.example.back_end.rutina.dto;

import java.util.List;
import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class DiasConRutinaResponse {
    private List<String> dias;
    private List<String> fechasCompletadas;
    private List<String> fechasParciales;
    private Map<String, Integer> porcentajesPorFecha;

    public DiasConRutinaResponse(List<String> dias) {
        this.dias = dias;
    }
}
