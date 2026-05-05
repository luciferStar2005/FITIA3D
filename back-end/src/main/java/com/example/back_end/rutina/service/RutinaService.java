package com.example.back_end.rutina.service;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.example.back_end.rutina.data.RutinaRepository;
import com.example.back_end.rutina.dto.RutinaDashBoard;
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
        return rutinaRepository.findTop1ByUsuarioIdAndDiaOrderByCreatedAtDesc(usuarioId, dia)
                .orElseThrow(() -> new RuntimeException("No se encontró rutina"));
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

}
