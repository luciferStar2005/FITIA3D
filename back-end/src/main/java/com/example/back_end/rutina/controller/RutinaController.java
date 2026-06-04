package com.example.back_end.rutina.controller;

import java.util.List;

import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.example.back_end.rutina.dto.DiasConRutinaResponse;
import com.example.back_end.rutina.dto.RutinaDashBoard;
import com.example.back_end.rutina.dto.RutinaEjercicios;
import com.example.back_end.rutina.service.RutinaService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/v1/rutinas")
@AllArgsConstructor
public class RutinaController {
    private final RutinaService service;

    @PostMapping("/crear")
    public ResponseEntity<?> rutinaDashboard(@RequestHeader("Authorization") String token,
            @RequestBody RutinaDashBoard rutina) {
        service.crearRutina(rutina);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping("/obtener")
    public ResponseEntity<List<RutinaEjercicios>> obtenerRutina(@RequestParam String fecha) {
        return ResponseEntity.ok(service.getRutinaPorFecha(fecha));
    }

    @GetMapping("/misRutinas")
    public ResponseEntity<DiasConRutinaResponse> obtenerHistorial() {
        return ResponseEntity.ok(service.getDiasConRutina());
    }

    @DeleteMapping("/eliminar/{dia}")
    public ResponseEntity<?> eliminarRutina(@PathVariable String dia) {
        service.eliminarRutina(dia);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
