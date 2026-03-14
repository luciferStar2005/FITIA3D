package com.example.back_end.config.auth;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.back_end.usuario.dto.LoginRequest;
import com.example.back_end.usuario.dto.LoginResponse;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(LoginRequest rq){
        LoginResponse response= LoginResponse.builder()
        .email("@example")
        .token("tokenPrueba")
        .build();

        return ResponseEntity.ok(response);
    }
}
