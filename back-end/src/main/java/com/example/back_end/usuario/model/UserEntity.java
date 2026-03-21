package com.example.back_end.usuario.model;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Entity
@Table(name="Usuarios")
@Builder
@AllArgsConstructor
@Data
@EntityListeners(AuditingEntityListener.class)
public class UserEntity {
    @Id
    @Column(name="usuario_cedula")
    private Long identification;

    @Column(name="usuario_nombre_1")
    private String firtsName;

    @Column(name="usuario_nombre_2")
    private String secondName;

    @Column(name="usuario_apellido_1")
    private String lastname;

    @Column(name = "usuario_email")
    private String email;

    @Column(name="usuario_password")
    private String passsword;

    @Column(name="usuario_estado")
    private int status;

    protected UserEntity(){}

    @PrePersist
    public void prePersist() {
        this.status = 1;
        
    }

}
