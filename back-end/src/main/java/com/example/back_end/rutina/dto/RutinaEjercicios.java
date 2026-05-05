package com.example.back_end.rutina.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RutinaEjercicios {
    private int id;
    private String nombre;
    private String series;
    private String repeticiones;
}
