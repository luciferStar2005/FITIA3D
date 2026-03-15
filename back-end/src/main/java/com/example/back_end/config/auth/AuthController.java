package com.example.back_end.config.auth;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.back_end.usuario.dto.LoginRequest;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@AllArgsConstructor
public class AuthController {

    private final AuthenticationManager manager;
    private final JwtService jwtService;
    private final UserDetailService service;
    
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest rq){
        manager.authenticate(
            new UsernamePasswordAuthenticationToken(rq.getEmail(), rq.getPassword())
        );

        UserDetails details = service.loadUserByUsername(rq.getEmail());

        String token= jwtService.generateToken(details);


        return ResponseEntity.ok(token);
    }
}
