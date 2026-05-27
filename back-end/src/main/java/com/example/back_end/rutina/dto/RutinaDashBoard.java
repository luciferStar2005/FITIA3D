package com.example.back_end.rutina.dto;

import java.util.List;
import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RutinaDashBoard {
    private String dia;
    private List<Map<String, Object>> ejercicios;
    private Integer usuarioId;
}
