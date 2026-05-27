package com.example.back_end.rutina.data;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.back_end.rutina.model.RutinaEntity;

public interface RutinaRepository extends JpaRepository<RutinaEntity, Integer> {
    Optional<RutinaEntity> findByUsuarioIdAndDia(Integer usuarioId, String dia);

    Optional<RutinaEntity> findFirstByUsuarioIdAndDiaOrderByCreatedAtDesc(Integer usuarioId, String dia);

    List<RutinaEntity> findByUsuarioId(Integer usuarioId);

    @Query("SELECT r.dia FROM RutinaEntity r WHERE r.usuarioId = :usuarioId")
    List<String> findDiasConRutinaByUsuarioId(@Param("usuarioId") Integer usuarioId);

}
