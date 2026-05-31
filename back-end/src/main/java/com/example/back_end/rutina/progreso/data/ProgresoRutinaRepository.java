package com.example.back_end.rutina.progreso.data;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.back_end.rutina.progreso.model.ProgresoRutinaEntity;

public interface ProgresoRutinaRepository
        extends JpaRepository<ProgresoRutinaEntity, Long> {

    Optional<ProgresoRutinaEntity>
        findByUsuarioIdAndFecha(Integer usuarioId, LocalDate fecha);

    List<ProgresoRutinaEntity>
        findByUsuarioIdAndRachaValidaTrueOrderByFechaDesc(Integer usuarioId);
}