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
                Object principal = SecurityContextHolder
                        .getContext()
                        .getAuthentication()
                        .getPrincipal();

                String email = principal instanceof UserDetails
                        ? ((UserDetails) principal).getUsername()
                        : principal.toString();

                UserEntity usuario = usuarioRepository
                        .findByEmail(email)
                        .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

                LocalDate hoy = (request.getFecha() != null && !request.getFecha().isBlank())
                        ? LocalDate.parse(request.getFecha())
                        : LocalDate.now();

                // === 1. Guardar / Actualizar el progreso ===
                ProgresoRutinaEntity progreso = progresoRepository
                        .findByUsuarioIdAndFecha(usuario.getId(), hoy)
                        .orElse(ProgresoRutinaEntity.builder()
                                .usuarioId(usuario.getId())
                                .fecha(hoy)
                                .build());

                progreso.setEjerciciosTotales(request.getEjerciciosTotales());
                progreso.setEjerciciosCompletados(request.getEjerciciosCompletados());
                progreso.setPorcentaje(request.getPorcentaje());
                progreso.setRachaValida(request.getRachaValida());

                progresoRepository.save(progreso);

                // === 2. ACTUALIZAR LA RACHA DEL USUARIO ===

                Integer rachaAntes = usuario.getRachaActual();

                if (request.getRachaValida() != null && request.getRachaValida()) {
                        usuario.setRachaActual(usuario.getRachaActual() + 1);
                        System.out.println("✅ RACHA AUMENTADA | Antes: " + rachaAntes + " → Ahora: " + usuario.getRachaActual());
                } else {
                        usuario.setRachaActual(0);  
                        System.out.println("🔴 RACHA RESETEADA A 0 | Antes: " + rachaAntes + " → Ahora: 0");
                }

                usuarioRepository.save(usuario);
                System.out.println("💾 Progreso guardado para fecha: " + hoy + " | RachaValida: " + request.getRachaValida());
        }

        public Integer obtenerRachaActual() {
                Object principal = SecurityContextHolder.getContext()
                        .getAuthentication()
                        .getPrincipal();

                String email = principal instanceof UserDetails
                        ? ((UserDetails) principal).getUsername()
                        : principal.toString();

                UserEntity usuario = usuarioRepository
                        .findByEmail(email)
                        .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

                return usuario.getRachaActual();
        }

}