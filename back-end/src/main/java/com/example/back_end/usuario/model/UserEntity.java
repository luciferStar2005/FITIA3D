package com.example.back_end.usuario.model;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Entity
@Table(name = "Usuarios")
@Builder
@AllArgsConstructor
@Data
public class UserEntity {
    @Id
    @Column(name = "usuario_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "usuario_nombre")
    private String firtsName;

    @Column(name = "usuario_apellido")
    private String lastname;

    @Column(name = "usuario_email")
    private String email;

    @Column(name = "usuario_contrasena")
    private String passsword;

    @Column(name = "info_estatura")
    private float stature;

    @Column(name = "info_peso")
    private float weight;

    @Column(name = "info_genero")
    private String gender;

    @Column(name = "info_nacimiento")
    private LocalDate birthDate;

    protected UserEntity() {
    }
}
