package com.example.back_end.rutina.service;

import java.time.LocalDate;
import java.text.Normalizer;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.example.back_end.rutina.data.ProgresoRutinaRepository;
import com.example.back_end.rutina.data.RutinaRepository;
import com.example.back_end.rutina.dto.DiasConRutinaResponse;
import com.example.back_end.rutina.dto.FinalizarRutinaRequest;
import com.example.back_end.rutina.dto.ProgresoRutinaResponse;
import com.example.back_end.rutina.dto.RachaResponse;
import com.example.back_end.rutina.dto.RutinaDashBoard;
import com.example.back_end.rutina.dto.RutinaEjercicios;
import com.example.back_end.rutina.model.ProgresoRutinaEntity;
import com.example.back_end.rutina.model.RutinaEntity;
import com.example.back_end.usuario.data.UserRepository;
import com.example.back_end.usuario.model.UserEntity;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class RutinaService {

    private static final int PORCENTAJE_MINIMO_RACHA = 60;
    private static final String[] DIAS = {
            "Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"
    };

    private final RutinaRepository rutinaRepository;
    private final ProgresoRutinaRepository progresoRutinaRepository;
    private final UserRepository usuarioRepository;

    public RutinaEntity getRutinaActual(int usuarioId, String dia) {
        return rutinaRepository.findFirstByUsuarioIdAndDiaOrderByCreatedAtDesc(usuarioId, normalizarDia(dia))
                .orElseThrow(() -> new IllegalStateException("No se encontro rutina"));
    }

    public List<RutinaEjercicios> getRutinaHoy() {
        UserEntity usuario = obtenerUsuarioAutenticado();
        return buscarRutinaPorFecha(usuario.getId(), LocalDate.now())
                .map(this::mapearEjercicios)
                .orElse(List.of());
    }

    public List<RutinaEjercicios> getRutinaPorFecha(String fecha) {
        UserEntity usuario = obtenerUsuarioAutenticado();
        LocalDate localDate = LocalDate.parse(fecha);

        return buscarRutinaPorFecha(usuario.getId(), localDate)
                .map(this::mapearEjercicios)
                .orElse(List.of());
    }

    public void crearRutina(RutinaDashBoard rutina) {
        UserEntity usuario = obtenerUsuarioAutenticado();

        RutinaEntity nuevaRutina = RutinaEntity.builder()
                .usuarioId(usuario.getId())
                .dia(normalizarDia(rutina.getDia()))
                .ejercicios(rutina.getEjercicios())
                .build();

        rutinaRepository.save(nuevaRutina);
    }

    public DiasConRutinaResponse getDiasConRutina() {
        UserEntity usuario = obtenerUsuarioAutenticado();
        List<ProgresoRutinaEntity> progresos = progresoRutinaRepository.findByUsuarioIdAndCumplioMetaTrue(usuario.getId());

        List<String> fechasCompletadas = progresos.stream()
                .map(progreso -> progreso.getFecha().toString())
                .toList();

        List<String> fechasParciales = progresos.stream()
                .filter(progreso -> !progreso.isDiaPerfecto())
                .map(progreso -> progreso.getFecha().toString())
                .toList();

        Map<String, Integer> porcentajesPorFecha = progresos.stream()
                .collect(Collectors.toMap(
                        progreso -> progreso.getFecha().toString(),
                        ProgresoRutinaEntity::getPorcentaje,
                        (actual, repetido) -> repetido));

        return new DiasConRutinaResponse(
                rutinaRepository.findDiasConRutinaByUsuarioId(usuario.getId()).stream()
                        .map(this::normalizarDia)
                        .distinct()
                        .toList(),
                fechasCompletadas,
                fechasParciales,
                porcentajesPorFecha);
    }

    public ProgresoRutinaResponse finalizarRutina(FinalizarRutinaRequest request) {
        UserEntity usuario = obtenerUsuarioAutenticado();
        LocalDate fecha = request.getFecha() != null ? request.getFecha() : LocalDate.now();
        RutinaEntity rutina = buscarRutinaPorFecha(usuario.getId(), fecha)
                .orElseThrow(() -> new IllegalStateException("No hay rutina programada para este dia"));

        List<Integer> completados = request.getEjerciciosCompletados() != null
                ? request.getEjerciciosCompletados().stream().distinct().sorted().toList()
                : List.of();

        int total = rutina.getEjercicios() != null ? rutina.getEjercicios().size() : 0;
        if (total == 0) {
            throw new IllegalStateException("La rutina no tiene ejercicios");
        }

        int completadosValidos = (int) completados.stream()
                .filter(id -> id != null && id >= 1 && id <= total)
                .count();
        int porcentaje = Math.round((completadosValidos * 100f) / total);
        boolean cumplioMeta = porcentaje >= PORCENTAJE_MINIMO_RACHA;
        boolean diaPerfecto = porcentaje == 100;

        ProgresoRutinaEntity progreso = progresoRutinaRepository
                .findByUsuarioIdAndFecha(usuario.getId(), fecha)
                .orElseGet(ProgresoRutinaEntity::new);

        progreso.setUsuarioId(usuario.getId());
        progreso.setRutinaId(rutina.getId());
        progreso.setFecha(fecha);
        progreso.setEjerciciosCompletados(completados);
        progreso.setEjerciciosTotales(total);
        progreso.setPorcentaje(porcentaje);
        progreso.setCumplioMeta(cumplioMeta);
        progreso.setDiaPerfecto(diaPerfecto);

        progresoRutinaRepository.save(progreso);

        return construirProgresoResponse(progreso, calcularRachaActual(usuario.getId(), LocalDate.now()));
    }

    public ProgresoRutinaResponse getProgresoPorFecha(String fechaTexto) {
        UserEntity usuario = obtenerUsuarioAutenticado();
        LocalDate fecha = LocalDate.parse(fechaTexto);
        int rachaActual = calcularRachaActual(usuario.getId(), LocalDate.now());

        return progresoRutinaRepository.findByUsuarioIdAndFecha(usuario.getId(), fecha)
                .map(progreso -> construirProgresoResponse(progreso, rachaActual))
                .orElseGet(() -> ProgresoRutinaResponse.builder()
                        .fecha(fecha)
                        .ejerciciosTotales(0)
                        .ejerciciosCompletados(0)
                        .ejerciciosCompletadosIds(List.of())
                        .porcentaje(0)
                        .cumplioMeta(false)
                        .diaPerfecto(false)
                        .rachaActual(rachaActual)
                        .build());
    }

    public RachaResponse getRachaActual() {
        UserEntity usuario = obtenerUsuarioAutenticado();
        LocalDate hoy = LocalDate.now();

        return RachaResponse.builder()
                .rachaActual(calcularRachaActual(usuario.getId(), hoy))
                .calculadaHasta(hoy)
                .build();
    }

    private UserEntity obtenerUsuarioAutenticado() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String email = principal instanceof UserDetails ? ((UserDetails) principal).getUsername()
                : principal.toString();

        return usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalStateException("Usuario no encontrado"));
    }

    private Optional<RutinaEntity> buscarRutinaPorFecha(int usuarioId, LocalDate fecha) {
        return rutinaRepository.findFirstByUsuarioIdAndDiaOrderByCreatedAtDesc(usuarioId, obtenerNombreDia(fecha));
    }

    private List<RutinaEjercicios> mapearEjercicios(RutinaEntity rutina) {
        if (rutina.getEjercicios() == null) {
            return List.of();
        }

        List<RutinaEjercicios> result = new ArrayList<>();
        int id = 1;

        for (Map<String, Object> ejercicio : rutina.getEjercicios()) {
            result.add(RutinaEjercicios.builder()
                    .id(id++)
                    .nombre(String.valueOf(ejercicio.get("nombre")))
                    .series(String.valueOf(ejercicio.get("series")))
                    .repeticiones(String.valueOf(ejercicio.getOrDefault("reps", ejercicio.get("repeticiones"))))
                    .build());
        }

        return result;
    }

    private String obtenerNombreDia(LocalDate fecha) {
        return DIAS[fecha.getDayOfWeek().getValue() % 7];
    }

    private String normalizarDia(String dia) {
        if (dia == null) {
            return null;
        }

        String limpio = Normalizer.normalize(dia.trim(), Normalizer.Form.NFD)
                .replaceAll("\\p{M}", "")
                .toLowerCase();

        return switch (limpio) {
            case "domingo" -> "Domingo";
            case "lunes" -> "Lunes";
            case "martes" -> "Martes";
            case "miercoles" -> "Miercoles";
            case "jueves" -> "Jueves";
            case "viernes" -> "Viernes";
            case "sabado" -> "Sabado";
            default -> dia.trim();
        };
    }

    private ProgresoRutinaResponse construirProgresoResponse(ProgresoRutinaEntity progreso, int rachaActual) {
        List<Integer> completados = progreso.getEjerciciosCompletados() != null
                ? progreso.getEjerciciosCompletados()
                : List.of();

        return ProgresoRutinaResponse.builder()
                .fecha(progreso.getFecha())
                .ejerciciosTotales(progreso.getEjerciciosTotales())
                .ejerciciosCompletados(completados.size())
                .ejerciciosCompletadosIds(completados)
                .porcentaje(progreso.getPorcentaje())
                .cumplioMeta(progreso.isCumplioMeta())
                .diaPerfecto(progreso.isDiaPerfecto())
                .rachaActual(rachaActual)
                .build();
    }

    private int calcularRachaActual(int usuarioId, LocalDate fechaBase) {
        List<RutinaEntity> rutinas = rutinaRepository.findByUsuarioId(usuarioId);
        if (rutinas.isEmpty()) {
            return 0;
        }

        Set<String> diasConRutina = rutinas.stream()
                .map(rutina -> normalizarDia(rutina.getDia()))
                .collect(Collectors.toSet());
        Set<LocalDate> fechasCumplidas = new HashSet<>(progresoRutinaRepository
                .findByUsuarioIdAndCumplioMetaTrue(usuarioId)
                .stream()
                .map(ProgresoRutinaEntity::getFecha)
                .toList());

        LocalDate cursor = fechaBase;
        if (diasConRutina.contains(obtenerNombreDia(cursor)) && !fechasCumplidas.contains(cursor)) {
            cursor = cursor.minusDays(1);
        }

        int racha = 0;
        int diasRevisados = 0;
        while (diasRevisados < 370) {
            String dia = obtenerNombreDia(cursor);
            if (diasConRutina.contains(dia)) {
                if (!fechasCumplidas.contains(cursor)) {
                    break;
                }
                racha++;
            }
            cursor = cursor.minusDays(1);
            diasRevisados++;
        }

        return racha;
    }
}
