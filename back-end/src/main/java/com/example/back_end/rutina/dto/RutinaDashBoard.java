package com.example.back_end.rutina.dto;

import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
@AllArgsConstructor
public class RutinaDashBoard {
    private String objetivo;
    private Map<String, Object> ejercicios;
    private int usuarioId;
}
