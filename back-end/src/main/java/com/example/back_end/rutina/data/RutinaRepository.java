package com.example.back_end.rutina.data;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.back_end.rutina.model.RutinaEntity;

public interface RutinaRepository extends JpaRepository<RutinaEntity, Integer> {
    Optional<RutinaEntity> findByUsuarioIdAndDia(Integer usuarioId, String dia);
}
