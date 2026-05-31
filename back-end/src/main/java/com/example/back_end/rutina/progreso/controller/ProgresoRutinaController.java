package com.example.back_end.rutina.progreso.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.back_end.rutina.progreso.dto.ProgresoRequest;
import com.example.back_end.rutina.progreso.dto.RachaResponse;
import com.example.back_end.rutina.progreso.service.ProgresoRutinaService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/progreso")
@RequiredArgsConstructor
public class ProgresoRutinaController {

    private final ProgresoRutinaService service;

    @PostMapping("/guardar")
    public ResponseEntity<?> guardar(
            @RequestBody ProgresoRequest request) {

        service.guardarProgreso(request);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping("/racha")
    public ResponseEntity<RachaResponse> obtenerRacha() {

        return ResponseEntity.ok(
                new RachaResponse(
                        service.obtenerRachaActual()
                )
        );
    }
}