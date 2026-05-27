package com.example.back_end.rutina.data;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.back_end.rutina.model.ProgresoRutinaEntity;

public interface ProgresoRutinaRepository extends JpaRepository<ProgresoRutinaEntity, Integer> {
    Optional<ProgresoRutinaEntity> findByUsuarioIdAndFecha(Integer usuarioId, LocalDate fecha);

    List<ProgresoRutinaEntity> findByUsuarioIdAndCumplioMetaTrue(Integer usuarioId);
}
