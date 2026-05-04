package com.example.back_end.rutina.model;

import java.security.Timestamp;
import java.util.Map;

import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Entity
@Data
@Builder
@AllArgsConstructor
public class RutinaEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String objetivo;

    @JdbcTypeCode(SqlTypes.JSON)
    private Map<String, Object> ejercicios;

    @Column(name = "usuario_id")
    private int usuarioId;

    @Column(name = "created_at")
    private Timestamp createdAt;

    protected RutinaEntity() {
    }

}
