package com.example.back_end.rutina.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Map;
import com.example.back_end.rutina.data.RutinaRepository;
import com.example.back_end.rutina.dto.DiasConRutinaResponse;
import com.example.back_end.rutina.dto.RutinaDashBoard;
import com.example.back_end.rutina.dto.RutinaEjercicios;
import com.example.back_end.rutina.model.RutinaEntity;
import com.example.back_end.usuario.data.UserRepository;
import com.example.back_end.usuario.model.UserEntity;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class RutinaService {

    private final RutinaRepository rutinaRepository;
    private final UserRepository usuarioRepository;

    public RutinaEntity getRutinaActual(int usuarioId, String dia) {
        return rutinaRepository.findByUsuarioIdAndDia(usuarioId, dia)
                .orElseThrow(() -> new RuntimeException("No se encontró rutina"));
    }

    public java.util.List<com.example.back_end.rutina.dto.RutinaEjercicios> getRutinaHoy() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String email = principal instanceof UserDetails ? ((UserDetails) principal).getUsername()
                : principal.toString();

        UserEntity usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        String[] dias = { "Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado" };
        // getDayOfWeek().getValue() 1 (Mon) to 7 (Sun)
        int dayIndex = java.time.LocalDate.now().getDayOfWeek().getValue();
        String hoy = dias[dayIndex % 7];

        try {
            RutinaEntity rutina = rutinaRepository.findByUsuarioIdAndDia(usuario.getId(), hoy)
                    .orElse(null);
            if (rutina == null)
                return List.of();

            List<RutinaEjercicios> result = new ArrayList<>();
            int id = 1;
            for (java.util.Map<String, Object> ej : rutina.getEjercicios()) {
                result.add(com.example.back_end.rutina.dto.RutinaEjercicios.builder()
                        .id(id++)
                        .nombre((String) ej.get("nombre"))
                        .series(String.valueOf(ej.get("series")))
                        .repeticiones(String.valueOf(ej.get("reps")))
                        .build());
            }
            return result;
        } catch (Exception e) {
            return java.util.List.of();
        }
    }

    public List<RutinaEjercicios> getRutinaPorFecha(String fecha) {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        String email = principal instanceof UserDetails
                ? ((UserDetails) principal).getUsername()
                : principal.toString();

        UserEntity usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        LocalDate localDate = LocalDate.parse(fecha);

        String[] dias = {
                "Domingo",
                "Lunes",
                "Martes",
                "Miércoles",
                "Jueves",
                "Viernes",
                "Sábado"
        };

        String nombreDia = dias[localDate.getDayOfWeek().getValue() % 7];

        RutinaEntity rutina = rutinaRepository
                .findByUsuarioIdAndDia(usuario.getId(), nombreDia)
                .orElse(null);

        if (rutina == null)
            return List.of();

        List<RutinaEjercicios> result = new ArrayList<>();

        int id = 1;

        for (Map<String, Object> ej : rutina.getEjercicios()) {

            result.add(RutinaEjercicios.builder()
                    .id(id++)
                    .nombre((String) ej.get("nombre"))
                    .series(String.valueOf(ej.get("series")))
                    .repeticiones(String.valueOf(ej.get("reps")))
                    .build());
        }

        return result;
    }

    public void crearRutina(RutinaDashBoard rutina) {

        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String email;

        if (principal instanceof UserDetails) {
            email = ((UserDetails) principal).getUsername();
        } else {
            email = principal.toString();
        }

        UserEntity usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        int usuarioId = usuario.getId();

        RutinaEntity nuevaRutina = RutinaEntity.builder()
                .usuarioId(usuarioId)
                .dia(rutina.getDia())
                .ejercicios(rutina.getEjercicios())
                .build();
        rutinaRepository.save(nuevaRutina);
    }

    public DiasConRutinaResponse getDiasConRutina() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String email = principal instanceof UserDetails ? ((UserDetails) principal).getUsername()
                : principal.toString();

        UserEntity usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        return new DiasConRutinaResponse(
                rutinaRepository.findDiasConRutinaByUsuarioId(usuario.getId()));
    }

}
