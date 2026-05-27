package com.example.back_end.rutina.model;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.type.SqlTypes;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(
        name = "progreso_rutina",
        uniqueConstraints = @UniqueConstraint(
                name = "uk_progreso_usuario_fecha",
                columnNames = { "usuario", "fecha" }))
public class ProgresoRutinaEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "usuario", nullable = false)
    private int usuarioId;

    @Column(name = "rutina_id")
    private Integer rutinaId;

    @Column(name = "fecha", nullable = false)
    private LocalDate fecha;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "ejercicios_completados")
    private List<Integer> ejerciciosCompletados;

    @Column(name = "ejercicios_totales", nullable = false)
    private int ejerciciosTotales;

    @Column(name = "porcentaje", nullable = false)
    private int porcentaje;

    @Column(name = "cumplio_meta", nullable = false)
    private boolean cumplioMeta;

    @Column(name = "dia_perfecto", nullable = false)
    private boolean diaPerfecto;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private Timestamp createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private Timestamp updatedAt;
}
