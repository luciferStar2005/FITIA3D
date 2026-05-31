package com.example.back_end.rutina.progreso.service;

import java.time.LocalDate;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.example.back_end.rutina.progreso.data.ProgresoRutinaRepository;
import com.example.back_end.rutina.progreso.dto.ProgresoRequest;
import com.example.back_end.rutina.progreso.model.ProgresoRutinaEntity;
import com.example.back_end.usuario.data.UserRepository;
import com.example.back_end.usuario.model.UserEntity;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class ProgresoRutinaService {
    private final ProgresoRutinaRepository progresoRepository;
    private final UserRepository usuarioRepository;

    public void guardarProgreso(ProgresoRequest request) {
        Object principal =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication()
                        .getPrincipal();

        String email = principal instanceof UserDetails
                ? ((UserDetails) principal).getUsername()
                : principal.toString();

        UserEntity usuario = usuarioRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("Usuario no encontrado"));

        LocalDate hoy;

        if (request.getFecha() != null && !request.getFecha().isBlank()) {
        hoy = LocalDate.parse(request.getFecha());
        } else {
        hoy = LocalDate.now();
        }

        ProgresoRutinaEntity progreso =
                progresoRepository
                        .findByUsuarioIdAndFecha(usuario.getId(), hoy)
                        .orElse(
                                ProgresoRutinaEntity.builder()
                                        .usuarioId(usuario.getId())
                                        .fecha(hoy)
                                        .build()
                        );

        progreso.setEjerciciosTotales(request.getEjerciciosTotales());
        progreso.setEjerciciosCompletados(request.getEjerciciosCompletados());
        progreso.setPorcentaje(request.getPorcentaje());
        progreso.setRachaValida(request.getRachaValida());

        progresoRepository.save(progreso);
    }

    public Integer obtenerRachaActual() {
        Object principal =
                SecurityContextHolder.getContext()
                        .getAuthentication()
                        .getPrincipal();

        String email = principal instanceof UserDetails
                ? ((UserDetails) principal).getUsername()
                : principal.toString();

        UserEntity usuario = usuarioRepository
                .findByEmail(email)
                .orElseThrow();

        return progresoRepository
                .findByUsuarioIdAndRachaValidaTrueOrderByFechaDesc(
                        usuario.getId())
                .size();
    }

}