package com.example.back_end.rutina.progreso.model;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "progreso_rutina")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProgresoRutinaEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer usuarioId;

    private LocalDate fecha;

    private Integer ejerciciosTotales;

    private Integer ejerciciosCompletados;

    private Integer porcentaje;

    private Boolean rachaValida;
}